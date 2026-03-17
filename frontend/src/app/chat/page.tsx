"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "¡Hola! Soy Danilinho, tu tutor de español. ¿Qué te gustaría aprender hoy?" }
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
            const response = await fetch("http://localhost:8001/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMessage,
                    history: messages.slice(-5) // Send last few messages for context
                })
            });

            if (!response.ok) throw new Error("Erro na comunicação com o servidor");

            const data = await response.json();
            setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: "assistant", content: "Lo siento, tuve un problema. ¿Puedes repetir?" }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-white">
            {/* Header */}
            <header className="flex items-center justify-between p-4 border-b border-blue-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:bg-blue-700 transition-colors">E</div>
                    <span className="font-bold text-blue-900">Espanhol Maestro</span>
                </Link>
                <div className="text-sm font-medium text-slate-500">Tutor Danilinho ✨</div>
            </header>

            {/* Chat Area */}
            <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 max-w-4xl mx-auto w-full" ref={scrollRef}>
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                        <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${msg.role === "user"
                                ? "bg-blue-600 text-white rounded-tr-none"
                                : "bg-slate-100 text-slate-800 border border-slate-200 rounded-tl-none"
                            }`}>
                            <p className="leading-relaxed">{msg.content}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none border border-slate-200">
                            <div className="flex gap-1.5">
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Input Area */}
            <footer className="p-4 md:p-8 border-t border-blue-100 bg-white shadow-lg">
                <div className="max-w-4xl mx-auto flex gap-4">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        placeholder="Pergunte algo ao Danilinho em espanhol..."
                        className="flex-1 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800"
                    />
                    <button
                        onClick={sendMessage}
                        disabled={isLoading}
                        className="p-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center justify-center min-w-[60px]"
                    >
                        {isLoading ? "..." : "→"}
                    </button>
                </div>
                <p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-widest font-semibold">
                    Powered by Groq ✨
                </p>
            </footer>
        </div>
    );
}
