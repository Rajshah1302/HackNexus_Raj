"use client";

import { useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function ChatPage({ repo }) {
  const [state, setState] = useState({
    repoUrl: repo,
    userInput: "",
    chatHistory: [
      {
        role: "assistant",
        content:
          "Hi! I'm your personalized repo chatbot. How can I assist you today?",
      },
    ],
    isLoading: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!state.userInput.trim()) return;

    const newMessage = {
      role: "user",
      content: state.userInput,
    };

    setState((prev) => ({
      ...prev,
      isLoading: true,
      chatHistory: [...prev.chatHistory, newMessage],
      userInput: "",
    }));

    try {
      const response = await axios.post("http://localhost:4000/api/chat", {
        repoUrl: state.repoUrl,
        userInput: state.userInput,
        chatHistory: [...state.chatHistory, newMessage],
      });

      setState((prev) => ({
        ...prev,
        chatHistory: [
          ...prev.chatHistory,
          { role: "assistant", content: response.data.assistantResponse },
        ],
        isLoading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "Failed to send message",
        isLoading: false,
      }));
    }
  };

  return (
    <div className="bg-[#0d1117] text-white h-[50vh]">
      <Card className="bg-[#161b22] border-[#30363d] h-full flex flex-col">
        <CardHeader>
          <CardTitle className="text-white">Chat</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col flex-grow justify-between">
          <div className="space-y-4 mb-4 overflow-y-auto">
            {state.chatHistory.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === "user"
                      ? "bg-[#1f6feb] text-white"
                      : "bg-[#30363d] text-gray-300"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {state.isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#30363d] rounded-lg px-4 py-2 text-gray-300">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={state.userInput}
              onChange={(e) =>
                setState((prev) => ({ ...prev, userInput: e.target.value }))
              }
              placeholder="Type your message..."
              className="flex-grow bg-[#0d1117] border-[#30363d] text-white"
            />
            <Button
              type="submit"
              disabled={state.isLoading}
              className="bg-[#1f6feb] hover:bg-[#388bfd] text-white"
            >
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
