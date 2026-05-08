import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { X, Send, MessageCircle, Minimize2 } from 'lucide-react';

interface Message {
  id: number;
  type: 'bot' | 'user';
  text: string;
}

const INITIAL_MESSAGES: Message[] = [
  { id: 1, type: 'bot', text: 'Halo! 👋 Saya RumahKu AI Assistant. Ada yang bisa saya bantu?' },
];

export function AIChatWidget() {
  const location = useLocation();
  const navigate = useNavigate();

  const [sectionVisible, setSectionVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pendingScroll = useRef(false);

  // Re-run whenever the route changes so the observer is always fresh
  useEffect(() => {
    // If we just navigated to home with a pending scroll request, scroll to section
    if (pendingScroll.current && location.pathname === '/') {
      pendingScroll.current = false;
      setTimeout(() => {
        document.getElementById('ai-assistant')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }

    const section = document.getElementById('ai-assistant');
    if (!section) {
      // Not on homepage — always show the floating button
      setSectionVisible(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setSectionVisible(entry.isIntersecting);
        if (entry.isIntersecting) setOpen(false);
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [location.pathname]);

  // Scroll chat to bottom on new messages or when popup opens
  useEffect(() => {
    if (open) {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    }
  }, [messages, open]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text || typing) return;
    const id = Date.now();
    setMessages((prev) => [...prev, { id, type: 'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: id + 1,
          type: 'bot',
          text: 'Terima kasih atas pertanyaannya! Saya siap membantu Anda dengan informasi properti, budget, dan lokasi. 🏠',
        },
      ]);
      setTyping(false);
    }, 1000);
  };

  const goToSection = () => {
    setOpen(false);
    if (location.pathname === '/') {
      document.getElementById('ai-assistant')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      pendingScroll.current = true;
      navigate('/');
    }
  };

  const hasUnread = !open && messages.length > INITIAL_MESSAGES.length;

  return (
    <>
      {/* Chat popup */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col transition-all duration-300 ease-out origin-bottom-right ${
          open && !sectionVisible
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-90 pointer-events-none'
        }`}
        style={{ height: '440px' }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] flex-shrink-0">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-sm leading-none">RumahKu AI Assistant</p>
            <p className="text-blue-100 text-xs mt-0.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block animate-pulse" />
              Online
            </p>
          </div>
          <div className="flex items-center gap-1">
            {/* Expand to full section — navigates to homepage if needed */}
            <button
              onClick={goToSection}
              title="Buka tampilan penuh"
              className="text-white/70 hover:text-white transition-colors p-1 rounded"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors p-1 rounded">
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-br from-slate-50 to-blue-50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-end gap-2 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.type === 'bot' && (
                <div className="w-6 h-6 bg-gradient-to-br from-[#2563EB] to-[#06B6D4] rounded-full flex items-center justify-center flex-shrink-0 mb-0.5">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              <div className={`max-w-[82%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm ${
                msg.type === 'user'
                  ? 'bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white rounded-br-sm'
                  : 'bg-white text-[#0F172A] border border-slate-200 rounded-bl-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div className="flex items-end gap-2 justify-start">
              <div className="w-6 h-6 bg-gradient-to-br from-[#2563EB] to-[#06B6D4] rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick actions */}
        <div className="px-3 pt-2 flex gap-2 flex-shrink-0">
          <button
            onClick={() => setInput('Berapa budget yang saya butuhkan?')}
            className="flex-1 px-2 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-xs font-medium text-[#2563EB] hover:bg-blue-100 transition-colors truncate"
          >
            💰 Budget
          </button>
          <button
            onClick={() => setInput('Lokasi properti mana yang bagus?')}
            className="flex-1 px-2 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-xs font-medium text-[#2563EB] hover:bg-blue-100 transition-colors truncate"
          >
            📍 Lokasi
          </button>
        </div>

        {/* Input */}
        <div className="flex gap-2 p-3 flex-shrink-0">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Tanyakan tentang properti..."
            className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-[#0F172A]"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || typing}
            className="w-9 h-9 bg-[#2563EB] text-white rounded-xl flex items-center justify-center hover:bg-[#1d4ed8] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Floating button */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ease-out ${
          sectionVisible
            ? 'opacity-0 scale-75 pointer-events-none translate-y-4'
            : 'opacity-100 scale-100 pointer-events-auto translate-y-0'
        }`}
      >
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={`relative w-14 h-14 rounded-full shadow-lg shadow-blue-500/40 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-xl hover:shadow-blue-500/50 ${
            open
              ? 'bg-slate-700'
              : 'bg-gradient-to-br from-[#2563EB] to-[#3B82F6]'
          }`}
        >
          <span className={`absolute transition-all duration-200 ${open ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}`}>
            <X className="w-6 h-6 text-white" />
          </span>
          <span className={`absolute transition-all duration-200 ${open ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'}`}>
            <MessageCircle className="w-6 h-6 text-white" />
          </span>
        </button>

        {/* Unread badge */}
        {hasUnread && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        )}
      </div>
    </>
  );
}
