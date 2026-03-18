"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "¡Hola, hermano! Soy el Professor Hermano, tu guía en Dale Espanhol. ¿Qué vamos a estudiar hoy? ¿Música, cultura o gramática real?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages(prev => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:8002/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMessage,
                    history: messages.slice(-5)
                })
            });

            if (!response.ok) throw new Error("Erro na comunicação com o servidor");

            const data = await response.json();
            setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: "assistant", content: "Lo siento, hermano. Tuve un pequeno problema. ¿Puedes repetir?" }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-[#FDF2E9]">
            {/* Header */}
            <header className="flex items-center justify-between p-4 border-b border-[#E5D8CF] bg-white/80 backdrop-blur-md sticky top-0 z-10">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-[#F39C12] rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:bg-[#D35400] transition-colors">D</div>
                    <span className="font-bold text-[#2C3E50]">iDALE! Espanhol</span>
                </Link>
                <div className="text-sm font-bold text-[#D35400]">Professor Hermano 👨‍🏫</div>
            </header>

            {/* Chat Area */}
            <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 max-w-4xl mx-auto w-full" ref={scrollRef}>
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                        <div className={`max-w-[85%] p-5 rounded-[2rem] shadow-sm ${msg.role === "user"
                            ? "bg-[#F39C12] text-white rounded-tr-none"
                            : "bg-white text-[#2C3E50] border border-[#E5D8CF] rounded-tl-none"
                            }`}>
                            <p className="leading-relaxed font-medium">{msg.content}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white p-5 rounded-[2rem] rounded-tl-none border border-[#E5D8CF]">
                            <div className="flex gap-1.5">
                                <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Input Area */}
            <footer className="p-4 md:p-8 border-t border-[#E5D8CF] bg-white">
                <div className="max-w-4xl mx-auto flex gap-4">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        placeholder="Habla con el Hermano..."
                        className="flex-1 p-5 bg-[#FDF2E9] border border-[#E5D8CF] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F39C12]/20 focus:border-[#F39C12] transition-all text-[#2C3E50] font-bold"
                    />
                    <button
                        onClick={sendMessage}
                        disabled={isLoading}
                        className="p-5 bg-[#F39C12] text-white rounded-2xl font-black hover:bg-[#D35400] disabled:opacity-50 transition-all flex items-center justify-center min-w-[70px] shadow-lg shadow-orange-100"
                    >
                        {isLoading ? "..." : "→"}
                    </button>
                </div>
                <p className="text-center text-[10px] text-[#7F8C8D] mt-4 uppercase tracking-[0.2em] font-black">
                    Dale a estudiar · v1.0
                </p>
            </footer>
        </div>
    );
}
