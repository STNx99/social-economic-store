import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, Store } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useChat } from "@/contexts/ChatContext";
import { useToast } from "@/contexts/ToastContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ContactSellerDialogProps {
  sellerId: string;
  sellerName: string;
  productName: string;
}

interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isMe: boolean;
}

/**
 * ContactSellerDialog Component
 * 
 * Provides a real-time chat interface for users to contact sellers.
 * Uses the useWebSocket hook to send and receive messages.
 * Replaces ScrollArea with a standard div for better control and reliability.
 */
export const ContactSellerDialog: React.FC<ContactSellerDialogProps> = ({
  sellerId,
  sellerName,
  productName,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [localConversation, setLocalConversation] = useState<ChatMessage[]>([]);
  const { sendMessage, messages, isConnected } = useChat();
  const { showToast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sync incoming messages from the hook to our local conversation
  useEffect(() => {
    const newMessages = messages
      .filter(msg => msg.payload.fromUserId === sellerId)
      .map(msg => ({
        id: msg.id,
        senderId: msg.payload.fromUserId,
        content: msg.payload.content,
        timestamp: msg.payload.timestamp,
        isMe: false
      }));

    if (newMessages.length > 0) {
      setLocalConversation(prev => {
        const existingIds = new Set(prev.map(m => m.id));
        const uniqueNew = newMessages.filter(m => !existingIds.has(m.id));
        if (uniqueNew.length === 0) return prev;
        
        return [...prev, ...uniqueNew].sort((a, b) => 
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
      });
    }
  }, [messages, sellerId]);

  // Scroll to bottom when conversation updates
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [localConversation]);

  const handleSendMessage = () => {
    if (!message.trim() || !user) return;

    if (message.length < 10) {
      showToast({
        title: "Tin nhắn quá ngắn",
        description: "Vui lòng nhập ít nhất 10 ký tự",
        variant: "error",
      });
      return;
    }

    const success = sendMessage(sellerId, message);

    if (success) {
      // Add to local conversation immediately for better UX
      const myMsg: ChatMessage = {
        id: crypto.randomUUID(),
        senderId: user.id,
        content: message,
        timestamp: new Date().toISOString(),
        isMe: true
      };
      setLocalConversation(prev => [...prev, myMsg]);
      setMessage("");
    } else {
      showToast({
        title: "Lỗi gửi tin nhắn",
        description: "Không thể kết nối tới máy chủ real-time",
        variant: "error",
      });
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen && !isAuthenticated) {
      showToast({
        title: "Vui lòng đăng nhập",
        description: "Bạn cần đăng nhập để liên hệ với người bán",
        variant: "error",
        duration: 3000,
      });
      navigate({ to: "/auth/login" });
      return;
    }
    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 h-14 border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all">
          <MessageSquare size={18} className="text-primary" />
          Liên hệ người bán
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] h-[650px] flex flex-col p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-6 border-b bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Store size={20} />
            </div>
            <div>
              <DialogTitle className="text-lg">Chat với {sellerName}</DialogTitle>
              <DialogDescription className="text-xs line-clamp-1">
                Sản phẩm: <span className="font-medium text-foreground">{productName}</span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Message List Container */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-4 bg-white scroll-smooth"
        >
          {localConversation.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-sm space-y-4 opacity-60">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
                <MessageSquare size={32} />
              </div>
              <div className="text-center">
                <p className="font-medium">Chưa có tin nhắn</p>
                <p className="text-xs">Bắt đầu cuộc trò chuyện với người bán ngay</p>
              </div>
            </div>
          ) : (
            localConversation.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex flex-col max-w-[85%] space-y-1",
                  msg.isMe ? "ml-auto items-end" : "mr-auto items-start"
                )}
              >
                <div
                  className={cn(
                    "rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                    msg.isMe 
                      ? "bg-primary text-primary-foreground rounded-tr-none" 
                      : "bg-slate-100 text-slate-900 rounded-tl-none"
                  )}
                >
                  <p className="leading-relaxed whitespace-pre-wrap break-words">
                    {msg.content}
                  </p>
                </div>
                <span className="text-[10px] text-muted-foreground px-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t bg-slate-50/50">
          <div className="relative">
            <Textarea
              placeholder="Nhập tin nhắn của bạn (tối thiểu 10 ký tự)..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[100px] pr-12 resize-none bg-white border-slate-200 focus-visible:ring-primary/20"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button 
              size="icon"
              onClick={handleSendMessage} 
              disabled={!isConnected || message.length < 10}
              className={cn(
                "absolute bottom-3 right-3 h-8 w-8 rounded-full transition-all",
                message.length >= 10 ? "scale-100 opacity-100" : "scale-90 opacity-50"
              )}
            >
              <Send size={14} />
            </Button>
          </div>
          
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-wider">
              <div className={cn(
                "w-1.5 h-1.5 rounded-full", 
                isConnected ? "bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-red-500"
              )} />
              <span className={isConnected ? "text-green-600" : "text-red-600"}>
                {isConnected ? "Trực tuyến" : "Ngoại tuyến"}
              </span>
            </div>
            <span className={cn(
              "text-[10px]",
              message.length > 0 && message.length < 10 ? "text-destructive font-medium" : "text-muted-foreground"
            )}>
              {message.length}/1000 ký tự
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};