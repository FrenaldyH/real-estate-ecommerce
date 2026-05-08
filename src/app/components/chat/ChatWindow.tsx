import { useState } from 'react';
import { Button } from '../common/Button';
import { Spinner } from '../common/Spinner';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatWindow({ isOpen, onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Halo! 👋 Saya adalah asisten virtual RumahKu. Bagaimana saya bisa membantu Anda mencari rumah impian hari ini?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Terima kasih atas pertanyaannya! Kami sedang memproses informasi terbaru. Silakan hubungi agen kami untuk bantuan lebih lanjut.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-4 w-96 h-96 bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col z-40">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-2xl flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-lg">
            🏠
          </div>
          <div>
            <h3 className="font-semibold text-sm">RumahKu Assistant</h3>
            <p className="text-xs text-blue-100">Online & siap membantu</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:bg-white/20 rounded-full p-2 transition"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                msg.type === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-white text-slate-700 border border-slate-200 rounded-bl-none'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-slate-700 border border-slate-200 rounded-lg rounded-bl-none px-4 py-3 flex items-center gap-2">
              <Spinner size="sm" />
              <span className="text-xs">Memproses...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-slate-200 p-4 bg-white rounded-b-2xl">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tulis pesan..."
            disabled={isLoading}
            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100"
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
            size="sm"
            variant="primary"
            className="!px-3"
          >
            ↓
          </Button>
        </div>
      </div>
    </div>
  );
}
