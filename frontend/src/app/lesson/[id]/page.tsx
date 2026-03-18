"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { curriculum } from "@/lib/curriculum";

interface QuizQuestion {
    question: string;
    options: string[];
    answer: number;
    explanation: string;
}

interface LessonContent {
    explanation: string;
    quiz: QuizQuestion[];
}

export default function LessonPage() {
    const params = useParams();
    const id = parseInt(params.id as string);
    const lesson = curriculum.find(l => l.id === id);

    const [content, setContent] = useState<LessonContent | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    useEffect(() => {
        if (lesson) {
            fetch("http://localhost:8002/lesson-content", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: lesson.title, level: lesson.level })
            })
                .then(res => res.json())
                .then(data => {
                    setContent(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [lesson]);

    if (!lesson) return <div className="p-10 text-center">Lição não encontrada.</div>;

    const handleOptionSelect = (idx: number) => {
        if (showFeedback) return;
        setSelectedOption(idx);
        setShowFeedback(true);
        if (idx === content?.quiz[currentQuestion].answer) {
            setScore(s => s + 1);
        }
    };

    const nextQuestion = () => {
        if (currentQuestion < (content?.quiz.length || 0) - 1) {
            setCurrentQuestion(c => c + 1);
            setSelectedOption(null);
            setShowFeedback(false);
        } else {
            setQuizFinished(true);
        }
    };

    return (
        <div className="min-h-screen bg-[#FDF2E9]">
            {/* Header */}
            <nav className="fixed top-0 w-full flex items-center justify-between p-4 md:p-6 bg-white/70 backdrop-blur-xl z-50 border-b border-[#E5D8CF]">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#F39C12] rounded-xl flex items-center justify-center text-white font-black text-xl">D</div>
                    <span className="text-xl font-black text-[#2C3E50]">iDALE! Espanhol</span>
                </Link>
                <div className="px-5 py-2 bg-orange-50 text-[#F39C12] border border-orange-100 rounded-full text-xs font-black uppercase tracking-widest">
                    {lesson.level}
                </div>
            </nav>

            <main className="max-w-4xl mx-auto pt-32 pb-24 px-6">
                {loading ? (
                    <div className="flex flex-col items-center justify-center space-y-4 py-20">
                        <div className="w-12 h-12 border-4 border-[#F39C12] border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-[#7F8C8D] font-bold animate-pulse text-center">O Professor Hermano está preparando seu material cultural... 🎸</p>
                    </div>
                ) : content ? (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {/* Explanation Section */}
                        <section className="space-y-8">
                            <div className="space-y-2">
                                <h1 className="text-4xl md:text-5xl font-black text-[#2C3E50] leading-tight">{lesson.title}</h1>
                                <p className="text-[#F39C12] font-black uppercase tracking-[0.2em] text-sm">Aula de Dale Espanhol com Professor Hermano 👨‍🏫</p>
                            </div>

                            <div className="prose prose-slate max-w-none text-lg text-[#2C3E50] leading-relaxed bg-white p-8 md:p-12 rounded-[2.5rem] border-2 border-[#E5D8CF] shadow-sm whitespace-pre-wrap font-medium">
                                {content.explanation}
                            </div>
                        </section>

                        {/* Quiz Section */}
                        {!quizFinished ? (
                            <section className="space-y-8 pt-12 border-t-2 border-[#E5D8CF]">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#F39C12] text-white rounded-2xl flex items-center justify-center text-xl font-black shadow-lg shadow-orange-100">
                                        {currentQuestion + 1}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-[#2C3E50]">Quiz do Hermano</h2>
                                        <p className="text-[#7F8C8D] font-bold">Verifique o que você aprendeu agora!</p>
                                    </div>
                                </div>

                                <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border-2 border-[#E5D8CF] shadow-xl space-y-8 transition-all">
                                    <h3 className="text-xl md:text-2xl font-bold text-[#2C3E50] leading-tight">
                                        {content.quiz[currentQuestion].question}
                                    </h3>

                                    <div className="grid grid-cols-1 gap-4">
                                        {content.quiz[currentQuestion].options.map((opt, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleOptionSelect(i)}
                                                className={`p-6 text-left rounded-2xl border-2 font-black transition-all flex items-center justify-between group
                          ${selectedOption === i
                                                        ? (i === content.quiz[currentQuestion].answer ? 'bg-green-50 border-green-500 text-green-700' : 'bg-red-50 border-red-500 text-red-700')
                                                        : showFeedback && i === content.quiz[currentQuestion].answer
                                                            ? 'bg-green-50 border-green-500 text-green-700'
                                                            : 'bg-white border-[#E5D8CF] hover:border-[#F39C12] text-[#2C3E50] hover:bg-orange-50'
                                                    }
                        `}
                                            >
                                                <span>{opt}</span>
                                                {selectedOption === i && (
                                                    <span>{i === content.quiz[currentQuestion].answer ? '✅' : '❌'}</span>
                                                )}
                                            </button>
                                        ))}
                                    </div>

                                    {showFeedback && (
                                        <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100 animate-in zoom-in-95 duration-300">
                                            <p className="text-[#D35400] font-black mb-4">💡 {content.quiz[currentQuestion].explanation}</p>
                                            <button
                                                onClick={nextQuestion}
                                                className="w-full py-5 bg-[#F39C12] text-white rounded-2xl font-black shadow-lg shadow-orange-200 hover:bg-[#D35400] transition-all"
                                            >
                                                {currentQuestion < content.quiz.length - 1 ? "Próxima Pergunta →" : "Ver Resultado Final 🏆"}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </section>
                        ) : (
                            <section className="text-center py-24 space-y-8 bg-[#F39C12] rounded-[3rem] text-white shadow-2xl animate-in zoom-in-95 duration-500 px-6">
                                <div className="text-9xl">🎸</div>
                                <div className="space-y-2">
                                    <h2 className="text-5xl font-black tracking-tight">¡Dale, hermano!</h2>
                                    <p className="text-xl font-bold opacity-90 italic">Você destruiu na lição {lesson.id}</p>
                                </div>
                                <div className="text-7xl font-black">
                                    {score} / {content.quiz.length}
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                                    <Link href="/" className="px-12 py-5 bg-white text-[#F39C12] rounded-2xl font-black text-xl hover:shadow-2xl transition-all">
                                        Voltar para Início
                                    </Link>
                                    <Link href="/chat" className="px-12 py-5 bg-[#D35400] text-white rounded-2xl font-black text-xl border-2 border-orange-400 hover:bg-orange-400 transition-all">
                                        Chat com Hermano
                                    </Link>
                                </div>
                            </section>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-20 text-[#2C3E50] font-bold">Erro ao carregar o Hermano. Tente novamente!</div>
                )}
            </main>
        </div>
    );
}
