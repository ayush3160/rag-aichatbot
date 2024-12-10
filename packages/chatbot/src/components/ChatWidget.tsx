import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { ChatMessage } from './ChatMessage';

interface ChatWidgetProps {
  projectId: string;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ projectId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean }>>([
    { text: "Hello! How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { text: input, isBot: false }]);
    setInput('');

    fetch(`${process.env.VITE_REACT_APP_API_URL}/api/chat/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: input, projectId })
    })
      .then((data) => {
        data.body?.getReader().read().then(({ value }) => {
          const response = new TextDecoder('utf-8').decode(value);
          console.log(response);
          setMessages(prev => [...prev, { text: response, isBot: true }]);
        });
      })
      .catch(err => {
        console.error('Failed to send message', err);
      });
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition-all duration-200 flex items-center justify-center"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-[350px] h-[500px] flex flex-col overflow-hidden">
          <div className="p-4 bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold text-base">Chat Support</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-600 rounded-full p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} message={msg.text} isBot={msg.isBot} />
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 text-gray-800"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors flex items-center justify-center"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};