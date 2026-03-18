"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface Message {
    role: "user" | "assistant";
    content: string;
}

const STARTER_QUESTIONS = [
    "🎸 Quais são as melhores músicas para aprender espanhol?",
    "🌎 Como peço direções em espanhol?",
    "📚 Por onde devo começar no Libro 1?",
    "😂 Me ensina uma gíria latina divertida!"
];

function renderMd(text: string) {
    // Simple markdown: **bold** -> <strong>, *italic* -> <em>
    return text
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br/>');
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async (text?: string) => {
        const userMessage = (text || input).trim();
        if (!userMessage || isLoading) return;

        setInput("");
        setMessages(prev => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:8002/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMessage,
                    history: messages.slice(-6)
                })
            });

            if (!response.ok) throw new Error("Erro na comunicação com o servidor");

            const data = await response.json();
            setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
        } catch {
            setMessages(prev => [...prev, { role: "assistant", content: "Lo siento, hermano! Tive um pequeño problema técnico. Pode repetir?" }]);
        } finally {
            setIsLoading(false);
        }
    };

    const isEmpty = messages.length === 0;

    return (
        <div className="flex flex-col h-screen bg-[#FDF2E9]">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 border-b border-[#E5D8CF] bg-white/80 backdrop-blur-md sticky top-0 z-10">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-9 h-9 bg-gradient-to-br from-[#F39C12] to-[#D35400] rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform">
                        🎸
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="font-black text-[#2C3E50] text-sm">Dale Espanhol</span>
                        <span className="text-[10px] font-bold text-[#7F8C8D] uppercase tracking-wider">← Voltar ao início</span>
                    </div>
                </Link>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full border border-orange-100">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
                        </span>
                        <span className="text-xs font-black text-orange-600">Professor Hermano</span>
                    </div>
                </div>
            </header>

            {/* Chat Area */}
            <main className="flex-1 overflow-y-auto p-4 md:p-8 max-w-4xl mx-auto w-full" ref={scrollRef}>

                {/* Empty State */}
                {isEmpty && (
                    <div className="flex flex-col items-center justify-center min-h-[70%] gap-8 text-center">
                        <div className="space-y-3">
                            <div className="w-24 h-24 bg-gradient-to-br from-[#F39C12] to-[#D35400] rounded-full flex items-center justify-center text-5xl shadow-2xl shadow-orange-200 mx-auto">
                                🎸
                            </div>
                            <h2 className="text-2xl font-black text-[#2C3E50]">¡Hola, Hermano!</h2>
                            <p className="text-[#7F8C8D] font-medium max-w-sm">
                                Sou o Professor Hermano, seu guia no espanhol da vida real.<br />
                                O que vamos estudar hoje?
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                            {STARTER_QUESTIONS.map((q, i) => (
                                <button
                                    key={i}
                                    onClick={() => sendMessage(q)}
                                    className="p-4 bg-white border-2 border-[#E5D8CF] rounded-2xl text-sm font-bold text-[#2C3E50] hover:border-[#F39C12] hover:bg-orange-50 transition-all text-left active:scale-95"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Messages */}
                <div className="space-y-6">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                            {msg.role === "assistant" && (
                                <div className="w-9 h-9 bg-gradient-to-br from-[#F39C12] to-[#D35400] rounded-full flex items-center justify-center text-xl flex-shrink-0 shadow-md shadow-orange-100 self-end">
                                    🎸
                                </div>
                            )}
                            <div className={`max-w-[80%] p-5 rounded-[2rem] shadow-sm ${msg.role === "user"
                                ? "bg-gradient-to-br from-[#F39C12] to-[#D35400] text-white rounded-tr-sm"
                                : "bg-white text-[#2C3E50] border border-[#E5D8CF] rounded-tl-sm"
                                }`}>
                                {msg.role === "assistant" ? (
                                    <p className="leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: renderMd(msg.content) }} />
                                ) : (
                                    <p className="leading-relaxed font-medium">{msg.content}</p>
                                )}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex gap-4 justify-start">
                            <div className="w-9 h-9 bg-gradient-to-br from-[#F39C12] to-[#D35400] rounded-full flex items-center justify-center text-xl flex-shrink-0 self-end shadow-md shadow-orange-100">
                                🎸
                            </div>
                            <div className="bg-white p-5 rounded-[2rem] rounded-tl-sm border border-[#E5D8CF]">
                                <div className="flex gap-1.5 items-center">
                                    <div className="w-2.5 h-2.5 bg-orange-400 rounded-full animate-bounce" />
                                    <div className="w-2.5 h-2.5 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                    <div className="w-2.5 h-2.5 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Input Area */}
            <footer className="p-4 md:p-6 border-t border-[#E5D8CF] bg-white">
                <div className="max-w-4xl mx-auto flex gap-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        placeholder="Escreva sua dúvida em espanhol ou português..."
                        className="flex-1 p-4 bg-[#FDF2E9] border-2 border-[#E5D8CF] rounded-2xl focus:outline-none focus:ring-0 focus:border-[#F39C12] transition-all text-[#2C3E50] font-medium placeholder:text-[#7F8C8D]"
                    />
                    <button
                        onClick={() => sendMessage()}
                        disabled={isLoading || !input.trim()}
                        className="px-6 py-4 bg-gradient-to-r from-[#F39C12] to-[#D35400] text-white rounded-2xl font-black hover:opacity-90 disabled:opacity-40 transition-all flex items-center justify-center min-w-[60px] shadow-lg shadow-orange-100 active:scale-95"
                    >
                        {isLoading ? "..." : "→"}
                    </button>
                </div>
                <p className="text-center text-[10px] text-[#7F8C8D] mt-3 uppercase tracking-widest font-black">
                    Dale Espanhol · Professor Hermano v2
                </p>
            </footer>
        </div>
    );
}
