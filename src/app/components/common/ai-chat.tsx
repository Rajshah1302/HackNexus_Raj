"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { MousePointer2Icon, Send } from "lucide-react";

interface Message {
  id: number;
  text: string;
  role: "user" | "bot";
  time: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hello! How can I help you today?",
    role: "bot",
    time: "0h ago",
  },
  {
    id: 2,
    text: "I'm just testing the chat feature.",
    role: "user",
    time: "0h ago",
  },
];

const ChatComponent = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState<string>("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const currentTime = new Date().toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      role: "user",
      time: currentTime,
    };

    setMessages([...messages, userMessage]);
    setNewMessage("");

    // Simulating a bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: "Thanks for reaching out! This is an automated response.",
        role: "bot",
        time: currentTime,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100svh-17rem)] bg-purple-800">
      {/* Chat Messages */}
      <ScrollArea 
        ref={scrollAreaRef}
        className="flex-1 p-4 bg-purple-600"
      >
        <div className="space-y-4 min-h-full">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-[75%] p-3 rounded-lg bg-purple-800 ${
                msg.role === "user"
                  ? "ml-auto text-left border-r-2 rounded-r-none border-highlight"
                  : "mr-auto border-l-2 rounded-l-none border-primary"
              }`}
            >
              <p className="text-sm text-primary">{msg.text}</p>
              <span className="text-xs text-purple-400 block text-right mt-1">
                {msg.time}
              </span>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Chat Input Area */}
      <div className="p-4 bg-purple-800 flex items-center gap-2 border-t border-purple-600/30">
        <Input
          type="text"
          placeholder="Type your message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 bg-purple-800 placeholder:text-primary/60 text-primary ring-0 border-none focus-visible:ring-0"
        />
        <Button
          onClick={handleSendMessage}
          className="bg-primary size-10 rounded-full hover:bg-primary/90"
        >
          <MousePointer2Icon fill="#ffc9f3" className="text-highlight rotate-90"/>
        </Button>
      </div>
    </div>
  );
};

export default ChatComponent;