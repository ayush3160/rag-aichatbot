import React from 'react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isBot }) => {
  return (
    <div className={`flex gap-2 ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
        {isBot ? <Bot size={20} /> : <User size={20} />}
      </div>
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          isBot
            ? 'bg-gray-100 text-gray-800'
            : 'bg-blue-500 text-white ml-auto'
        }`}
      >
        {message}
      </div>
    </div>
  );
};