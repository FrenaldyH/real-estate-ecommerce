import { useState, useEffect } from 'react';
import { ChatWindow } from './ChatWindow';

const SCROLL_THRESHOLD = 300; // pixels - when to show the button

export function FloatingChatBot() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when user scrolls past the threshold
      setIsVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 right-4 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center text-2xl font-bold
          ${
            isVisible
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-75 pointer-events-none'
          }
          ${
            isOpen
              ? 'bg-blue-700 hover:bg-blue-800'
              : 'bg-blue-600 hover:bg-blue-700 animate-pulse'
          }
          text-white`}
        title="Chat dengan asisten RumahKu"
      >
        💬
      </button>

      {/* Chat Window */}
      <ChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
