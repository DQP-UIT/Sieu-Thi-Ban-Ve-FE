"use client";

import { useState } from "react";
import { IoMdChatbubbles } from "react-icons/io";

type Message = {
  sender: "user" | "bot";
  content: string;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/chatbot/ask`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: userMessage.content }),
        }
      );

      const data = await res.json();
      const botMessage: Message = { sender: "bot", content: data.answer };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", content: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      {/* Icon chat tròn */}
      <div
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg cursor-pointer"
      >
        <IoMdChatbubbles size={24} />
      </div>

      {/* Hộp chat */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-96 z-50 bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col">
          <div className="bg-purple-600 text-white p-3 font-semibold">
            AI Chat Assistant
          </div>
          <div className="flex-1 overflow-y-auto p-3 text-sm space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-gray-500 text-xs animate-pulse">
                Bot is typing...
              </div>
            )}
          </div>
          <div className="border-t p-2">
            <input
              type="text"
              className="w-full p-2 text-sm border rounded focus:outline-none"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={loading}
            />
          </div>
        </div>
      )}
    </>
  );
}
