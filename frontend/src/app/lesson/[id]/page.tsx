"use client";

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { curriculum } from '@/lib/curriculum';

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

function renderMd(text: string) {
    return text
        .replace(/\*\*(.+?)\*\*/g, '<strong class="text-[#D35400]">$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br/>');
}

export default function LessonPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [content, setContent] = useState<LessonContent | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
    const [showResult, setShowResult] = useState<Record<number, boolean>>({});
    const [quizComplete, setQuizComplete] = useState(false);

    const lesson = curriculum.find(l => l.id === parseInt(id));

    useEffect(() => {
        if (!lesson) { setLoading(false); return; }

        const fetchLesson = async () => {
            try {
                const response = await fetch('http://localhost:8002/lesson-content', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title: lesson.title, level: lesson.level })
                });
                if (!response.ok) throw new Error('Falha ao carregar a aula');
                const data = await response.json();
                setContent(data);
            } catch (err) {
                setError('Não foi possível carregar o conteúdo. Verifique se o servidor está rodando.');
            } finally {
                setLoading(false);
            }
        };
        fetchLesson();
    }, [lesson]);

    const handleAnswer = (questionIdx: number, optionIdx: number) => {
        if (showResult[questionIdx]) return;
        setSelectedAnswers(prev => ({ ...prev, [questionIdx]: optionIdx }));
        setShowResult(prev => ({ ...prev, [questionIdx]: true }));

        // Check if all answered
        if (content && Object.keys({ ...showResult, [questionIdx]: true }).length === content.quiz.length) {
            setTimeout(() => setQuizComplete(true), 800);
        }
    };

    const getScore = () => {
        if (!content) return 0;
        return content.quiz.reduce((score, q, i) => {
            return score + (selectedAnswers[i] === q.answer ? 1 : 0);
        }, 0);
    };

    const levelColors: Record<string, string> = {
        "Libro 1": "from-green-400 to-emerald-600",
        "Libro 2": "from-teal-400 to-cyan-600",
        "Libro 3": "from-blue-400 to-indigo-600",
        "Libro 4": "from-violet-400 to-purple-600",
        "Libro 5": "from-pink-400 to-rose-600",
        "Libro 6": "from-orange-400 to-red-600",
    };

    if (!lesson) {
        return (
            <div className="min-h-screen bg-[#FDF2E9] flex items-center justify-center p-8">
                <div className="text-center space-y-4">
                    <div className="text-6xl">🤔</div>
                    <h1 className="text-2xl font-black text-[#2C3E50]">Lição não encontrada</h1>
                    <Link href="/" className="inline-block px-6 py-3 bg-[#F39C12] text-white rounded-2xl font-bold hover:bg-[#D35400] transition-colors">
                        ← Voltar ao Início
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDF2E9]">
            {/* Header */}
            <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-[#E5D8CF] z-10">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#F39C12] to-[#D35400] rounded-xl flex items-center justify-center text-white text-lg group-hover:scale-110 transition-transform">
                            🎸
                        </div>
                        <div className="text-sm font-black text-[#7F8C8D] group-hover:text-[#F39C12] transition-colors">
                            ← Dale Espanhol
                        </div>
                    </Link>
                    <div className={`px-4 py-1.5 bg-gradient-to-r ${levelColors[lesson.level] || 'from-orange-400 to-orange-600'} rounded-full`}>
                        <span className="text-xs font-black text-white uppercase tracking-wider">{lesson.level}</span>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-12 space-y-10">

                {/* Lesson Title */}
                <div className="space-y-3">
                    <p className="text-xs font-black text-[#F39C12] uppercase tracking-widest">{lesson.unit}</p>
                    <h1 className="text-4xl md:text-5xl font-black text-[#2C3E50] leading-tight">{lesson.title}</h1>
                    <p className="text-[#7F8C8D] font-medium text-lg">{lesson.description}</p>
                </div>

                {/* Hermano Intro Card */}
                <div className="flex items-start gap-4 p-6 bg-orange-50 border-2 border-orange-100 rounded-[2rem]">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#F39C12] to-[#D35400] rounded-full flex items-center justify-center text-3xl flex-shrink-0 shadow-lg shadow-orange-200">
                        🎸
                    </div>
                    <div>
                        <p className="font-black text-[#D35400] text-sm uppercase tracking-wider mb-1">Professor Hermano</p>
                        <p className="font-medium text-[#2C3E50]">¡Hola, hermano! Preparei uma aula especial sobre <strong>{lesson.title}</strong>. Vamos nessa!</p>
                    </div>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#F39C12] to-[#D35400] rounded-full flex items-center justify-center text-3xl animate-bounce shadow-2xl shadow-orange-200">
                            🎸
                        </div>
                        <p className="text-[#7F8C8D] font-bold">O Hermano está preparando sua aula...</p>
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 bg-orange-400 rounded-full animate-bounce" />
                            <div className="w-2.5 h-2.5 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <div className="w-2.5 h-2.5 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        </div>
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="p-8 bg-red-50 border-2 border-red-100 rounded-[2rem] text-center space-y-3">
                        <div className="text-4xl">😞</div>
                        <p className="font-bold text-red-600">{error}</p>
                        <p className="text-sm text-red-400">Certifique-se de que o backend está rodando na porta 8002.</p>
                    </div>
                )}

                {/* Content */}
                {content && !loading && (
                    <>
                        {/* Explanation */}
                        <div className="bg-white border-2 border-[#E5D8CF] rounded-[2rem] p-8 space-y-4">
                            <h2 className="text-2xl font-black text-[#2C3E50] flex items-center gap-3">
                                <span className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-xl">📖</span>
                                A Aula
                            </h2>
                            <div
                                className="text-[#2C3E50] leading-relaxed font-medium text-lg"
                                dangerouslySetInnerHTML={{ __html: renderMd(content.explanation) }}
                            />
                        </div>

                        {/* Quiz */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-black text-[#2C3E50] flex items-center gap-3">
                                <span className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-xl">🧠</span>
                                Quiz Rápido
                            </h2>
                            <div className="space-y-6">
                                {content.quiz.map((q, qIdx) => {
                                    const answered = showResult[qIdx];
                                    return (
                                        <div key={qIdx} className="bg-white border-2 border-[#E5D8CF] rounded-[2rem] p-8 space-y-5">
                                            <div className="flex items-start gap-4">
                                                <span className="w-9 h-9 bg-gradient-to-br from-[#F39C12] to-[#D35400] text-white rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0">
                                                    {qIdx + 1}
                                                </span>
                                                <p className="text-xl font-bold text-[#2C3E50]">{q.question}</p>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ml-13">
                                                {q.options.map((opt, oIdx) => {
                                                    const isSelected = selectedAnswers[qIdx] === oIdx;
                                                    const isCorrect = q.answer === oIdx;
                                                    let style = "border-2 border-[#E5D8CF] bg-white text-[#2C3E50] hover:border-[#F39C12] hover:bg-orange-50";
                                                    if (answered) {
                                                        if (isCorrect) style = "border-2 border-green-400 bg-green-50 text-green-800";
                                                        else if (isSelected) style = "border-2 border-red-400 bg-red-50 text-red-700";
                                                        else style = "border-2 border-[#E5D8CF] bg-white opacity-50 text-[#2C3E50]";
                                                    }
                                                    return (
                                                        <button
                                                            key={oIdx}
                                                            onClick={() => handleAnswer(qIdx, oIdx)}
                                                            disabled={answered}
                                                            className={`p-4 rounded-2xl text-left font-bold transition-all duration-200 ${style} ${!answered ? 'active:scale-95 cursor-pointer' : 'cursor-default'}`}
                                                        >
                                                            <span className="font-black text-xs uppercase tracking-wider opacity-50 mr-2">
                                                                {['A', 'B', 'C', 'D'][oIdx]}.
                                                            </span>
                                                            {opt}
                                                            {answered && isCorrect && <span className="ml-2">✅</span>}
                                                            {answered && isSelected && !isCorrect && <span className="ml-2">❌</span>}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                            {answered && (
                                                <div className={`ml-13 p-4 rounded-2xl text-sm font-medium animate-in fade-in duration-300 ${selectedAnswers[qIdx] === q.answer ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-orange-50 text-[#D35400] border border-orange-200'}`}>
                                                    <strong>Hermano diz:</strong> {q.explanation}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Score Card */}
                        {quizComplete && (
                            <div className="bg-gradient-to-br from-[#F39C12] to-[#D35400] rounded-[2rem] p-10 text-center space-y-6 shadow-2xl shadow-orange-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="text-6xl">{getScore() === content.quiz.length ? '🏆' : getScore() >= 2 ? '⭐' : '💪'}</div>
                                <div>
                                    <p className="text-white/80 font-black uppercase tracking-widest text-sm mb-2">Resultado Final</p>
                                    <p className="text-5xl font-black text-white">{getScore()}/{content.quiz.length}</p>
                                    <p className="text-white/90 font-bold text-lg mt-1">
                                        {getScore() === content.quiz.length ? '¡Perfecto! Hermano está orgulhoso!' : getScore() >= 2 ? '¡Muy bien! Quase lá!' : '¡Dale! Continue praticando, hermano!'}
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link href="/" className="px-8 py-4 bg-white text-[#D35400] rounded-2xl font-black hover:opacity-90 transition-all active:scale-95">
                                        ← Ver mais Lições
                                    </Link>
                                    <Link href="/chat" className="px-8 py-4 bg-white/20 border-2 border-white text-white rounded-2xl font-black hover:bg-white/30 transition-all active:scale-95">
                                        Tirar dúvidas com o Hermano 🎸
                                    </Link>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
