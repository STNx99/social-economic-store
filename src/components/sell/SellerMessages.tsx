import React, { useState, useEffect, useMemo, useRef } from "react";
import { useChat } from "@/contexts/ChatContext";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Send, User, MessageSquare, Store } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isMe: boolean;
}

interface Conversation {
  userId: string;
  lastMessage: string;
  timestamp: string;
}

/**
 * SellerMessages Component
 * 
 * A real-time messaging interface for sellers to communicate with buyers.
 * Features a conversation list sidebar and a main chat window.
 */
export const SellerMessages: React.FC = () => {
  const { messages, sendMessage, isConnected } = useChat();
  const { user } = useAuth();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [localMessages, setLocalMessages] = useState<Record<string, ChatMessage[]>>({});
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sync incoming messages from the global ChatContext to local state grouped by user
  useEffect(() => {
    if (!user) return;

    setLocalMessages((prevGroups) => {
      const newGroups = { ...prevGroups };
      let changed = false;

      messages.forEach((msg) => {
        const buyerId = msg.payload.fromUserId;
        
        // Skip messages sent by the current user (they are handled by handleSendReply for immediate feedback)
        // unless the server echoes them back with a proper ID.
        if (buyerId === user.id) return;

        if (!newGroups[buyerId]) {
          newGroups[buyerId] = [];
        }

        // Check if message already exists in our local state to avoid duplicates
        const exists = newGroups[buyerId].some((m) => m.id === msg.id);
        if (!exists) {
          newGroups[buyerId].push({
            id: msg.id,
            senderId: buyerId,
            content: msg.payload.content,
            timestamp: msg.payload.timestamp,
            isMe: false,
          });
          changed = true;
        }
      });

      if (changed) {
        // Ensure messages in each conversation are sorted by time
        Object.keys(newGroups).forEach(id => {
          newGroups[id] = [...newGroups[id]].sort((a, b) => 
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          );
        });
        return newGroups;
      }
      return prevGroups;
    });
  }, [messages, user]);

  // Derive the list of conversations for the sidebar
  const conversations = useMemo(() => {
    return Object.entries(localMessages)
      .map(([userId, msgs]) => {
        const lastMsg = msgs[msgs.length - 1];
        return {
          userId,
          lastMessage: lastMsg.content,
          timestamp: lastMsg.timestamp,
        };
      })
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [localMessages]);

  // Auto-scroll to the bottom of the chat when messages update or a conversation is selected
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;
      const timeoutId = setTimeout(() => {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [selectedUserId, localMessages]);

  const handleSendReply = () => {
    if (!selectedUserId || !replyText.trim() || !user) return;

    // Validation: minimum 10 characters as per system rules
    if (replyText.length < 10) return;

    const success = sendMessage(selectedUserId, replyText);
    if (success) {
      // Optimistically add the message to the local conversation for better UX
      const myMsg: ChatMessage = {
        id: `local-${crypto.randomUUID()}`,
        senderId: user.id,
        content: replyText,
        timestamp: new Date().toISOString(),
        isMe: true,
      };

      setLocalMessages((prev) => ({
        ...prev,
        [selectedUserId]: [...(prev[selectedUserId] || []), myMsg],
      }));
      setReplyText("");
    }
  };

  return (
    <div className="flex h-[calc(100vh-10rem)] gap-6 overflow-hidden">
      {/* Sidebar: Conversation List */}
      <Card className="w-80 flex flex-col border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-slate-50/50">
          <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <MessageSquare size={18} className="text-primary" />
            Conversations
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search buyers..." 
              className="pl-9 bg-white border-slate-200 h-9 text-sm" 
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                <MessageSquare className="text-slate-300" size={24} />
              </div>
              <p className="text-sm font-medium text-slate-500">No messages yet</p>
              <p className="text-xs text-slate-400 mt-1">When buyers contact you, they will appear here.</p>
            </div>
          ) : (
            conversations.map((conv) => (
              <button
                key={conv.userId}
                onClick={() => setSelectedUserId(conv.userId)}
                className={cn(
                  "w-full p-4 flex items-start gap-3 hover:bg-slate-50 transition-colors border-b border-slate-100 text-left",
                  selectedUserId === conv.userId && "bg-primary/5 border-l-4 border-l-primary"
                )}
              >
                <div className="relative shrink-0">
                  <Avatar className="h-10 w-10 border border-slate-200">
                    <AvatarFallback className="bg-slate-100 text-slate-600">
                      <User size={20} />
                    </AvatarFallback>
                  </Avatar>
                  <div className={cn(
                    "absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full",
                    isConnected ? "bg-green-500" : "bg-slate-300"
                  )} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-semibold text-sm text-slate-900 truncate">
                      Buyer {conv.userId.substring(0, 6)}
                    </span>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap ml-2">
                      {new Date(conv.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 truncate leading-tight">
                    {conv.lastMessage}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      </Card>

      {/* Main: Chat Window */}
      <Card className="flex-1 flex flex-col border-slate-200 shadow-sm overflow-hidden bg-white">
        {selectedUserId ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-slate-200">
                  <AvatarFallback className="bg-slate-100 text-slate-600">
                    <User size={20} />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-slate-900">Buyer {selectedUserId.substring(0, 8)}</h3>
                  <div className="flex items-center gap-1.5">
                    <div className={cn("w-1.5 h-1.5 rounded-full", isConnected ? "bg-green-500 animate-pulse" : "bg-slate-300")} />
                    <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                      {isConnected ? "Online" : "Offline"}
                    </span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-slate-500 text-xs">
                View Profile
              </Button>
            </div>

            {/* Messages List */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30 scroll-smooth"
            >
              {localMessages[selectedUserId]?.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex flex-col max-w-[75%] space-y-1",
                    msg.isMe ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                      msg.isMe 
                        ? "bg-primary text-primary-foreground rounded-tr-none" 
                        : "bg-white text-slate-800 border border-slate-100 rounded-tl-none"
                    )}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap break-words">
                      {msg.content}
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-400 px-1">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t bg-white">
              <div className="flex gap-2 items-end">
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type your message (min 10 characters)..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendReply();
                      }
                    }}
                    className="pr-10 bg-slate-50 border-slate-200 focus-visible:ring-primary/20 min-h-[44px]"
                  />
                </div>
                <Button 
                  onClick={handleSendReply} 
                  disabled={!isConnected || replyText.length < 10}
                  className="h-11 px-5 shadow-md shadow-primary/10"
                >
                  <Send size={18} className="mr-2" />
                  Send
                </Button>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <p className="text-[10px] text-slate-400">
                  Press Enter to send, Shift+Enter for new line
                </p>
                <span className={cn(
                  "text-[10px] font-medium",
                  replyText.length > 0 && replyText.length < 10 ? "text-destructive" : "text-slate-400"
                )}>
                  {replyText.length}/1000
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
            <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-6 border border-slate-100">
              <Store size={40} className="text-primary/20" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800">Seller Messaging Hub</h3>
            <p className="max-w-sm text-slate-500 mt-2 text-sm">
              Select a buyer from the left sidebar to view their messages and respond to inquiries about your products.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};