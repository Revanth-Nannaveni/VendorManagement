import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Chatbot = ({ isOpen: isOpenProp, onClose: onCloseProp }) => {
  const [isOpen, setIsOpen] = useState(isOpenProp || false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef(null);

  useEffect(() => {
    setIsOpen(isOpenProp);
    if (isOpenProp && messages.length === 0) {
      addBotMessage("Hello! How can I assist you today? Choose an option:", [
        { text: "View Budget Details", action: () => handleOptionSelect("budget") },
        { text: "Generate Report", action: () => handleOptionSelect("report") },
        { text: "Chat with me", action: () => handleOptionSelect("chat") },
      ]);
    }
  }, [isOpenProp]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const addBotMessage = (text, options = []) => {
    setMessages(prev => [...prev, { type: "bot", text, options }]);
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, { type: "user", text }]);
  };

  const handleOptionSelect = (option) => {
    addUserMessage(option);
    switch (option) {
      case "budget":
        addBotMessage("Fetching budget details...");
        break;
      case "report":
        addBotMessage("Generating report...");
        break;
      case "chat":
        addBotMessage("Feel free to ask me anything about your dashboard!");
        break;
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    addUserMessage(input);
    addBotMessage("Thanks for your message! How can I assist further?");
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && onCloseProp) onCloseProp(!isOpen);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={toggleChat}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-white text-xs"
          size="icon"
          aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
        >
          {isOpen ? <X className="h-7 w-7 text-white" /> : <MessageCircle className="h-7 w-7 text-white" />}
        </Button>
      </div>

      {isOpen && (
        <div className="fixed bottom-20 right-6 w-full sm:w-80 h-[400px] bg-white rounded-xl shadow-2xl z-50 flex flex-col transition-all duration-300">
          <div className="flex items-center justify-between p-2 border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-xl text-xs">
            <span className="font-semibold">Business Assistant</span>
            <Button variant="ghost" size="sm" onClick={toggleChat} className="text-white hover:text-gray-200">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50 text-xs">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[80%] ${message.type === "user" ? "ml-auto bg-blue-500 text-white" : "bg-white text-gray-800"} p-2 rounded-xl shadow-md`}
              >
                
                {message.text}
                {message.options && message.options.length > 0 && (
                  <div className="mt-2 flex flex-col gap-2">
                    {message.options.map((option, optIndex) => (
                      <Button
                        key={optIndex}
                        onClick={() => option.action()}
                        variant="outline"
                        className="w-full bg-white hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 rounded-lg text-xs"
                      >
                        {option.text}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="p-2 border-t bg-gray-50 flex items-center rounded-b-xl">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 text-xs p-2 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            <Button onClick={handleSend} size="icon" className="bg-blue-500 hover:bg-blue-600 ml-2 rounded-lg">
              <Send className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;