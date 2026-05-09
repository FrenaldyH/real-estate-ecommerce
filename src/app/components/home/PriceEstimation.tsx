import { useState, useEffect, useRef } from 'react';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { useWishlist } from '../../context/WishlistContext';
import { useChat } from '../../context/ChatContext';

function MessageText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.*?)\*\*/gs);
  return (
    <span className="whitespace-pre-wrap">
      {parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
      )}
    </span>
  );
}

export function PriceEstimation() {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { messages, typing, sendMessage } = useChat();
  const [inputMessage, setInputMessage] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = chatContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  const affordableProperties = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1706808849803-f61304e024ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      price: "Rp 1.850.000.000",
      title: "Rumah Modern Minimalis",
      location: "Serpong, Tangerang Selatan",
      badge: "Rekomendasi AI"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1706808849777-96e0d7be3bb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      price: "Rp 1.650.000.000",
      title: "Rumah Klasik Elegan",
      location: "Bintaro, Tangerang Selatan",
      badge: "Terjangkau"
    }
  ];

  const handleSendMessage = () => {
    const text = inputMessage.trim();
    if (!text || typing) return;
    setInputMessage('');
    sendMessage(text);
  };

  return (
    <section id="ai-assistant" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
          {/* Chatbot Header */}
          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-200">
            <div className="w-12 h-12 bg-gradient-to-br from-[#2563EB] to-[#06B6D4] rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
                RumahKu AI Assistant
                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">Online</span>
              </h2>
              <p className="text-sm text-[#64748B]">Asisten pintar untuk menemukan rumah impian Anda</p>
            </div>
          </div>

          {/* Chat Messages */}
          <div ref={chatContainerRef} className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 mb-4 h-96 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    {message.type === 'bot' && (
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#2563EB] to-[#06B6D4] rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-xs text-[#64748B] font-medium">AI Assistant</span>
                      </div>
                    )}
                    <div className={`rounded-2xl p-4 shadow-md ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white'
                        : 'bg-white text-[#0F172A] border border-slate-200'
                    }`}>
                      <p className="text-sm leading-relaxed"><MessageText text={message.text} /></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <button
              onClick={() => { setInputMessage(''); sendMessage('Berapa budget yang saya butuhkan?'); }}
              disabled={typing}
              className="px-4 py-3 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl hover:shadow-md transition-all text-sm font-medium text-[#0F172A] disabled:opacity-40"
            >
              💰 Budget Info
            </button>
            <button
              onClick={() => { setInputMessage(''); sendMessage('Lokasi properti mana yang bagus?'); }}
              disabled={typing}
              className="px-4 py-3 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl hover:shadow-md transition-all text-sm font-medium text-[#0F172A] disabled:opacity-40"
            >
              📍 Rekomendasi Lokasi
            </button>
          </div>

          {/* Chat Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Tanyakan apa saja tentang properti..."
              className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-[#0F172A]"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || typing}
              className="px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all font-semibold flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
