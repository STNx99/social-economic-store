import { useState } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Avatar, AvatarFallback } from '../ui/avatar'

interface Message {
  id: string
  text: string
  sender: 'user' | 'admin'
  timestamp: Date
}

export function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Xin chào! Tôi có thể giúp gì cho bạn?',
      sender: 'admin',
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState('')

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages([...messages, newMessage])
    setInputMessage('')

    // Simulate admin response
    setTimeout(() => {
      const adminResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.',
        sender: 'admin',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, adminResponse])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl flex flex-col border border-gray-200 z-50 animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarFallback className="bg-blue-500 text-white">CS</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">Hỗ trợ khách hàng</h3>
                <p className="text-xs text-blue-100">Trực tuyến</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-blue-700"
              onClick={() => setIsOpen(false)}
            >
              <X size={20} />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString('vi-VN', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
            <div className="flex gap-2">
              <Input
                placeholder="Nhập tin nhắn..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Bubble Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 hover:scale-110 group"
        aria-label="Chat với chúng tôi"
      >
        {isOpen ? (
          <X size={24} className="transition-transform duration-300" />
        ) : (
          <>
            <MessageCircle size={24} className="transition-transform duration-300 group-hover:scale-110" />
            {/* Notification badge */}
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-xs flex items-center justify-center animate-pulse">
              1
            </span>
          </>
        )}
      </button>
    </>
  )
}
