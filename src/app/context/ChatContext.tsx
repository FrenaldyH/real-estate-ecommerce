import { createContext, useContext, useState, ReactNode } from 'react';
import { sendChatMessage } from '../services/chat';

export interface ChatMessage {
  id: number;
  type: 'bot' | 'user';
  text: string;
}

interface ChatContextType {
  messages: ChatMessage[];
  typing: boolean;
  sendMessage: (text: string) => Promise<void>;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  { id: 1, type: 'bot', text: 'Halo! 👋 Saya RumahKu AI Assistant. Saya siap membantu Anda menemukan properti impian sesuai budget.' },
  { id: 2, type: 'bot', text: 'Tanyakan apapun tentang properti, KPR, lokasi, atau gunakan tombol quick action di bawah!' },
];

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [typing, setTyping] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim() || typing) return;
    const id = Date.now();
    setMessages(prev => [...prev, { id, type: 'user', text }]);
    setTyping(true);
    try {
      const data = await sendChatMessage(text);
      setMessages(prev => [...prev, { id: id + 1, type: 'bot', text: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { id: id + 1, type: 'bot', text: 'Maaf, terjadi kesalahan. Silakan coba lagi.' }]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, typing, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used within ChatProvider');
  return ctx;
}
