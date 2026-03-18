"use client";

import Image from 'next/image'
import Link from 'next/link'
import { curriculum } from '@/lib/curriculum'

export default function LandingPage() {
  return (
    <div className="min-h-screen selection:bg-orange-100 selection:text-orange-900">
      {/* Header/Nav */}
      <nav className="fixed top-0 w-full flex items-center justify-between p-4 md:p-6 bg-[#FDF2E9]/80 backdrop-blur-xl z-50 border-b border-[#E5D8CF]">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-gradient-to-br from-[#F39C12] to-[#D35400] rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-orange-200 group-hover:scale-110 transition-transform">
            🎸
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-[#2C3E50] leading-none mb-1">Dale</span>
            <span className="text-[10px] font-bold text-[#D35400] uppercase tracking-[0.2em]">Espanhol</span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/chat" className="hidden md:block text-sm font-bold text-[#2C3E50] hover:text-[#F39C12] transition-colors">
            Tutor IA
          </Link>
          <a href="#grade" className="hidden md:block text-sm font-bold text-[#2C3E50] hover:text-[#F39C12] transition-colors">
            Grade Curricular
          </a>
          <Link href="/chat" className="px-5 py-2.5 bg-[#F39C12] text-white rounded-2xl font-black text-sm shadow-lg shadow-orange-200 hover:bg-[#D35400] transition-all hover:-translate-y-0.5 active:scale-95">
            Começar Agora →
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-28 pb-24 space-y-32">

        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12">
          {/* Left: Text */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full border border-orange-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
              </span>
              <span className="text-xs font-black text-orange-600 uppercase tracking-widest">Matrículas Abertas</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-[#2C3E50] tracking-tight leading-[0.9]">
              DALE A{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F39C12] to-[#D35400] italic block">ESTUDIAR.</span>
            </h1>

            <p className="text-xl text-[#7F8C8D] leading-relaxed font-medium max-w-lg">
              O Professor Hermano é seu guia na jornada para o espanhol da vida real. Aprenda com <strong className="text-[#D35400]">cultura</strong>, música e diversão latina.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/chat" className="px-10 py-5 bg-gradient-to-r from-[#F39C12] to-[#D35400] text-white rounded-3xl font-black text-lg shadow-2xl shadow-orange-200 hover:-translate-y-1 transition-all active:scale-95 text-center">
                Começar com o Hermano 🎸
              </Link>
              <a href="#grade" className="px-10 py-5 bg-white text-[#2C3E50] rounded-3xl font-black text-lg border-2 border-[#E5D8CF] hover:border-[#F39C12] hover:bg-orange-50 transition-all text-center">
                Ver os 6 Libros
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-6 pt-2">
              <div className="text-center">
                <p className="text-2xl font-black text-[#F39C12]">205</p>
                <p className="text-xs font-bold text-[#7F8C8D] uppercase tracking-wider">Lições</p>
              </div>
              <div className="w-px h-10 bg-[#E5D8CF]" />
              <div className="text-center">
                <p className="text-2xl font-black text-[#F39C12]">6</p>
                <p className="text-xs font-bold text-[#7F8C8D] uppercase tracking-wider">Libros</p>
              </div>
              <div className="w-px h-10 bg-[#E5D8CF]" />
              <div className="text-center">
                <p className="text-2xl font-black text-[#F39C12]">100%</p>
                <p className="text-xs font-bold text-[#7F8C8D] uppercase tracking-wider">Cultural</p>
              </div>
            </div>
          </div>

          {/* Right: Hero Illustration */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 rounded-[3rem] opacity-20 blur-3xl scale-95" />
              <Image
                src="/professor-hermano.png"
                alt="Professor Hermano - Dale Espanhol"
                width={600}
                height={600}
                className="relative rounded-[2.5rem] w-full object-cover shadow-2xl shadow-orange-200"
                priority
              />
            </div>
          </div>
        </section>

        {/* Why it works Section */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black text-[#2C3E50] tracking-tight">Por que o Dale Espanhol funciona?</h2>
            <p className="text-lg font-bold text-[#7F8C8D]">O método do Professor Hermano une ciência e cultura latina</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Técnica de Feynman", desc: "Explicamos conceitos complexos como se estivéssemos falando com um 'hermano'. Clara, simples, sem enrolação.", icon: "🤝", color: "from-orange-400 to-orange-600" },
              { title: "Recordação Ativa", desc: "Quizzes rápidos ao final de cada lição com feedback imediato para garantir que você nunca esqueça.", icon: "🧠", color: "from-amber-400 to-orange-500" },
              { title: "Imersão Cultural", desc: "Aprenda com artistas reais (Calle 13, Bad Bunny, Shakira) e o espanhol falado nas ruas, não em livros.", icon: "🎸", color: "from-orange-500 to-red-500" },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] border-2 border-[#E5D8CF] hover:border-[#F39C12] hover:-translate-y-1 transition-all duration-300 space-y-6 group">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-orange-100 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-[#2C3E50]">{feature.title}</h3>
                  <p className="text-[#7F8C8D] leading-relaxed font-medium">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Curriculum Grid */}
        <section id="grade" className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black text-[#2C3E50] tracking-tight">A Jornada do Hermano</h2>
            <p className="text-lg font-bold text-[#7F8C8D]">6 Libros para te levar do zero absoluto à maestria cultural</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {["Libro 1", "Libro 2", "Libro 3", "Libro 4", "Libro 5", "Libro 6"].map((lvl, idx) => (
              <div key={lvl} className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#F39C12] to-[#D35400] text-white rounded-2xl flex items-center justify-center text-xl font-black shadow-lg shadow-orange-100">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#2C3E50]">{lvl}</h3>
                    <p className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                      {["Sobrevivência", "Cotidiano", "Viagens", "Trabalho", "Debates", "Literatura"][idx]}
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-[2rem] border-2 border-[#E5D8CF] p-2 max-h-[380px] overflow-y-auto space-y-1 scrollbar-hide">
                  {curriculum.filter(l => l.level === lvl).map(lesson => (
                    <Link
                      key={lesson.id}
                      href={`/lesson/${lesson.id}`}
                      className="block p-4 rounded-2xl border border-transparent hover:border-[#F39C12] hover:bg-orange-50 transition-all group cursor-pointer active:scale-[0.98]"
                    >
                      <div className="flex justify-between items-start gap-3">
                        <span className="text-[10px] font-black text-[#F39C12] uppercase tracking-wider">{lesson.unit}</span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-sm">→</span>
                      </div>
                      <h4 className="font-bold text-[#2C3E50] leading-tight mt-1">{lesson.title}</h4>
                      <p className="text-xs text-[#7F8C8D] mt-1">{lesson.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Block */}
        <section className="bg-gradient-to-br from-[#F39C12] to-[#D35400] rounded-[3rem] p-16 text-center space-y-6 shadow-2xl shadow-orange-200">
          <h2 className="text-4xl font-black text-white tracking-tight">Pronto para dar o Dale?</h2>
          <p className="text-orange-100 font-bold text-lg">El Hermano está esperando por você. Não deixe para amanhã.</p>
          <Link href="/chat" className="inline-block px-12 py-5 bg-white text-[#D35400] rounded-3xl font-black text-xl hover:-translate-y-1 transition-all shadow-xl active:scale-95">
            Falar com o Hermano Agora 🎸
          </Link>
        </section>

        {/* Footer */}
        <footer className="pt-8 pb-12 border-t border-[#E5D8CF]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#F39C12] to-[#D35400] rounded-xl flex items-center justify-center text-white text-xl font-black">
                🎸
              </div>
              <div>
                <p className="font-black text-[#2C3E50]">Dale Espanhol</p>
                <p className="text-xs text-[#7F8C8D] font-bold uppercase tracking-widest">Dale a estudiar · © 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <a href="https://www.tiktok.com/@dale_espanhol" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-[#E5D8CF] rounded-2xl font-bold text-sm text-[#2C3E50] hover:border-[#F39C12] hover:text-[#F39C12] transition-all">
                📱 TikTok
              </a>
              <a href="https://www.instagram.com/dale_espanhol/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-[#E5D8CF] rounded-2xl font-bold text-sm text-[#2C3E50] hover:border-[#F39C12] hover:text-[#F39C12] transition-all">
                📸 Instagram
              </a>
              <a href="https://organizar-ee.notion.site/Dale-Curso-de-Espanhol-62b852bc71b1824287d5012fdb6f3c34" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-[#E5D8CF] rounded-2xl font-bold text-sm text-[#2C3E50] hover:border-[#F39C12] hover:text-[#F39C12] transition-all">
                🗒️ Notion
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
