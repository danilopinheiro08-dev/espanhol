"use client";

import Image from 'next/image'
import Link from 'next/link'
import { curriculum } from '@/lib/curriculum'

export default function LandingPage() {
  return (
    <div className="min-h-screen selection:bg-orange-100 selection:text-orange-900">
      {/* Header/Nav */}
      <nav className="fixed top-0 w-full flex items-center justify-between p-4 md:p-6 bg-[#FDF2E9]/70 backdrop-blur-xl z-50 border-b border-[#E5D8CF]">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-[#F39C12] rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-orange-200 group-hover:scale-110 transition-transform">D</div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-[#2C3E50] leading-none mb-1">iDALE!</span>
            <span className="text-[10px] font-bold text-[#D35400] uppercase tracking-[0.2em]">Espanhol</span>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-10">
          <Link href="/" className="text-sm font-bold text-[#2C3E50] hover:text-[#F39C12] transition-colors">Início</Link>
          <Link href="/chat" className="text-sm font-bold text-[#2C3E50] hover:text-[#F39C12] transition-colors">Tutor IA</Link>
          <a href="#grade" className="text-sm font-bold text-[#2C3E50] hover:text-[#F39C12] transition-colors">Grade Curricular</a>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 space-y-32">
        <section className="text-center space-y-8 py-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full border border-orange-100 animate-in fade-in slide-in-from-top-4 duration-1000">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="text-xs font-black text-orange-600 uppercase tracking-widest">Matrículas Abertas</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black text-[#2C3E50] tracking-tight leading-[0.9] animate-in fade-in slide-in-from-bottom-8 duration-700">
            DALE A <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F39C12] to-[#D35400] italic">ESTUDIAR.</span>
          </h1>

          <p className="text-xl md:text-2xl text-[#7F8C8D] max-w-2xl mx-auto leading-relaxed font-medium">
            O Professor Hermano é seu guia na jornada para o espanhol da vida real. Aprenda com cultura, música e diversão latina.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
            <Link href="/chat" className="px-10 py-5 bg-[#F39C12] text-white rounded-3xl font-black text-lg shadow-2xl shadow-orange-200 hover:bg-[#D35400] hover:-translate-y-1 transition-all active:scale-95">
              Começar Agora
            </Link>
            <a href="#grade" className="px-10 py-5 bg-white text-[#2C3E50] rounded-3xl font-black text-lg border-2 border-[#E5D8CF] hover:border-[#F39C12] hover:bg-orange-50 transition-all">
              Ver os 6 Libros
            </a>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: "Lições Ativas", value: "205", color: "text-orange-600", bg: "bg-orange-50" },
            { label: "Níveis (Libros)", value: "06", color: "text-orange-600", bg: "bg-orange-50" },
            { label: "Foco Cultural", value: "100%", color: "text-orange-600", bg: "bg-orange-50" },
          ].map((stat, i) => (
            <div key={i} className={`${stat.bg} p-10 rounded-[2.5rem] border border-orange-100 space-y-2 group hover:scale-105 transition-all duration-500`}>
              <p className="text-sm font-black text-orange-400 uppercase tracking-widest">{stat.label}</p>
              <p className={`text-6xl font-black ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </section>

        {/* Why it works Section */}
        <section className="pt-24 space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-[#2C3E50] tracking-tight">Por que o Dale Espanhol funciona?</h2>
            <p className="text-lg font-bold text-[#7F8C8D]">O método do Professor Hermano une ciência e cultura latina</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Técnica de Feynman", desc: "Explicamos conceitos complexos como se estivéssemos falando com um 'hermano'.", icon: "🤝" },
              { title: "Recordação Ativa", desc: "Quizzes rápidos ao final de cada lição para garantir que você nunca esqueça.", icon: "🧠" },
              { title: "Imersão Cultural", desc: "Aprenda com artistas reais (Calle 13, Shakira) e o espanhol falado nas ruas.", icon: "🎸" },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] border-2 border-[#E5D8CF] hover:border-[#F39C12] transition-colors space-y-6">
                <div className="text-4xl">{feature.icon}</div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-[#2C3E50]">{feature.title}</h3>
                  <p className="text-[#7F8C8D] leading-relaxed font-medium">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Curriculum Grid */}
        <section id="grade" className="pt-24 space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-[#2C3E50] tracking-tight">A Jornada do Hermano</h2>
            <p className="text-lg font-bold text-[#7F8C8D]">6 Libros para te levar do zero absoluto à maestria cultural</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {["Libro 1", "Libro 2", "Libro 3", "Libro 4", "Libro 5", "Libro 6"].map((lvl) => (
              <div key={lvl} className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#F39C12] text-white rounded-2xl flex items-center justify-center text-xl font-black shadow-lg shadow-orange-100">
                    {lvl.split(' ')[1]}
                  </div>
                  <h3 className="text-2xl font-black text-[#2C3E50]">{lvl}</h3>
                </div>
                <div className="bg-white rounded-[2rem] border-2 border-[#E5D8CF] p-2 max-h-[400px] overflow-y-auto scrollbar-hide space-y-2">
                  {curriculum.filter(l => l.level === lvl).map(lesson => (
                    <Link
                      key={lesson.id}
                      href={`/lesson/${lesson.id}`}
                      className="block p-4 bg-white rounded-2xl border border-transparent hover:border-[#F39C12] hover:bg-orange-50 transition-all group cursor-pointer active:scale-[0.98]"
                    >
                      <div className="flex justify-between items-start gap-3">
                        <span className="text-[10px] font-black text-[#F39C12] uppercase tracking-wider">{lesson.unit}</span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">🎸</span>
                      </div>
                      <h4 className="font-bold text-[#2C3E50] leading-tight">{lesson.title}</h4>
                      <p className="text-xs text-[#7F8C8D] mt-1">{lesson.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-24 pb-12 border-t border-[#E5D8CF] text-center space-y-8">
          <div className="flex justify-center gap-8">
            <a href="https://www.tiktok.com/@dale_espanhol" target="_blank" rel="noopener noreferrer" className="text-3xl grayscale hover:grayscale-0 transition-all hover:scale-110">📱</a>
            <a href="https://www.instagram.com/dale_espanhol/" target="_blank" rel="noopener noreferrer" className="text-3xl grayscale hover:grayscale-0 transition-all hover:scale-110">📸</a>
            <a href="https://organizar-ee.notion.site/Dale-Curso-de-Espanhol-62b852bc71b1824287d5012fdb6f3c34" target="_blank" rel="noopener noreferrer" className="text-3xl grayscale hover:grayscale-0 transition-all hover:scale-110">🗒️</a>
          </div>
          <div className="space-y-2">
            <p className="text-[#7F8C8D] font-bold">Dale Espanhol © 2026</p>
            <p className="text-xs text-[#7F8C8D] uppercase tracking-widest font-black">Dale a estudar.</p>
          </div>
        </footer>
      </main>
    </div>
  )
}
