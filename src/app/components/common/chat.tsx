"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { MousePointer2Icon, ExternalLink } from "lucide-react";
import {
  useDynamicContext,
  useSendBalance,
} from "@dynamic-labs/sdk-react-core";
import { ethers } from "ethers";

interface Message {
  id: string;  // Changed to string to use more unique IDs
  text: string | React.ReactNode;
  role: "user" | "bot";
  time: string;
}

const BLOCK_EXPLORER_URL = "https://base-sepolia.blockscout.com/";

const generateMessageId = () => `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

const initialMessages: Message[] = [
  {
    id: generateMessageId(),
    text: "Hi! I am you in game assitant. Just tell me something like 'send 0.1 ETH to 0x...'",
    role: "bot",
    time: "0h ago",
  },
];

const ChatComponent = () => {
  const { primaryWallet } = useDynamicContext();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { open } = useSendBalance();

  useEffect(() => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  const isValidWalletAddress = (address: string) => {
    try {
      return ethers.isAddress(address);
    } catch {
      return false;
    }
  };

  const handleTransfer = async (extractedData: {
    address: string;
    amount: string;
  }) => {
    if (!primaryWallet?.address) {
      throw new Error("Wallet not connected");
    }
    console.log("primaryWallet", primaryWallet);

    console.log("Sending", extractedData, "to", extractedData.address);

    const tx = await open({
      recipientAddress: extractedData.address,
      value: ethers.parseEther(extractedData.amount),
    });

    return tx;
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || isProcessing) return;

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMessage: Message = {
      id: generateMessageId(),
      text: newMessage,
      role: "user",
      time: currentTime,
    };

    const processingMessage: Message = {
      id: generateMessageId(),
      text: "Processing your request...",
      role: "bot",
      time: currentTime,
    };

    setMessages((prev) => [...prev, userMessage, processingMessage]);
    setNewMessage("");
    setIsProcessing(true);

    try {
      const response = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: newMessage }),
      });

      const data = await response.json();
      const action = data.result.completion[0]?.action;

      if (action !== "transfer") {
        throw new Error("Only transfer commands are supported");
      }

      const { address, amount } = data.result.completion[0];

      if (!isValidWalletAddress(address)) {
        throw new Error("Invalid wallet address provided");
      }

      const result = await handleTransfer({ address, amount });

      setMessages((prev) => [
        ...prev.slice(0, -1), // Remove processing message
        {
          id: generateMessageId(),
          text: (
            <div className="flex items-center gap-2">
              <span>Transaction sent: </span>
              <a
                href={`${BLOCK_EXPLORER_URL}${result}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 flex items-center gap-1"
              >
                <ExternalLink size={16} />
              </a>
            </div>
          ),
          role: "bot",
          time: currentTime,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          id: generateMessageId(),
          text: `Error: ${error instanceof Error ? error.message : "Transaction failed"}`,
          role: "bot",
          time: currentTime,
        },
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!primaryWallet?.address) {
    return (
      <div className="h-full flex flex-col gap-y-3 items-center justify-center text-4xl font-bold text-primary">
        Connect your wallet
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100svh-17rem)] bg-purple-800">
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4 bg-purple-600">
        <div className="space-y-4 min-h-full">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-[75%] p-3 rounded-lg bg-purple-800 ${
                msg.role === "user"
                  ? "ml-auto text-left border-r-4 rounded-r-none border-highlight"
                  : "mr-auto border-l-4 rounded-l-none border-primary"
              }`}
            >
              <div className="text-sm text-primary">{msg.text}</div>
              <span className="text-xs text-purple-400 block text-right mt-1">
                {msg.time}
              </span>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      <div className="p-4 bg-purple-800 flex items-center gap-2 border-t border-purple-600/30">
        <Input
          type="text"
          placeholder="Type your message (e.g., 'send 0.1 ETH to 0x...')"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isProcessing}
          className="flex-1 bg-purple-800 placeholder:text-primary/60 text-primary ring-0 border-none focus-visible:ring-0"
        />
        <Button
          onClick={handleSendMessage}
          disabled={isProcessing}
          className="bg-primary size-10 rounded-full hover:bg-primary/90 disabled:opacity-50"
        >
          <MousePointer2Icon
            fill="#ffc9f3"
            className="text-highlight rotate-90"
          />
        </Button>
      </div>
    </div>
  );
};

export default ChatComponent;