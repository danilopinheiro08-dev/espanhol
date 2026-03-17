import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12 md:py-24">
      {/* Header / Navbar simulation */}
      <nav className="fixed top-0 w-full max-w-7xl flex items-center justify-between p-6 bg-white/80 backdrop-blur-md z-50 rounded-b-2xl shadow-sm border-b border-blue-100">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">E</div>
          <span className="text-xl font-bold text-blue-900 tracking-tight">Espanhol Maestro</span>
        </div>
        <div className="hidden md:flex gap-8 items-center text-sm font-medium text-slate-600">
          <Link href="#" className="hover:text-blue-600 transition-colors">Início</Link>
          <Link href="#" className="hover:text-blue-600 transition-colors">Cursos</Link>
          <Link href="#" className="hover:text-blue-600 transition-colors">Tutor IA</Link>
          <Link href="#" className="hover:text-blue-600 transition-colors">Progresso</Link>
        </div>
        <div className="flex gap-4 items-center">
          <button className="px-5 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded-full transition-all">Sair</button>
        </div>
      </nav>

      {/* Main Hero Section */}
      <main className="w-full max-w-5xl text-center mt-12 space-y-12">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Aprender espanhol nunca foi tão divertido
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight">
            Domine o <span className="text-blue-600">Espanhol</span><br />
            de um Jeito Inteligente 🎓
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            O Danilinho é seu tutor IA que ensina com diálogos interativos, gramática aplicada e cultura hispânica. Prepare-se para fluência real enquanto se diverte.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center pt-6">
            <Link href="/chat" className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
              🚀 Começar com o Danilinho
            </Link>
            <Link href="#cursos" className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-xl font-bold shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              📜 Explorar Lições
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
          {[
            { label: "Lições", value: "30+" },
            { label: "Níveis", value: "6" },
            { label: "Tópicos", value: "800+" },
            { label: "Tutor IA", value: "24/7" },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold text-blue-600 mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Trails Section Header */}
        <div id="cursos" className="pt-24 space-y-4">
          <h2 className="text-3xl font-bold text-slate-900">Trilhas de Estudo</h2>
          <p className="text-slate-500">Escolha seu foco e acelere seu aprendizado</p>
        </div>

        {/* Trails Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Espanhol para Viagens", icon: "✈️", color: "bg-blue-500", tags: ["A1", "A2"] },
            { title: "Negócios & Trabalho", icon: "💼", color: "bg-indigo-500", tags: ["B1", "B2"] },
            { title: "Gramática Essencial", icon: "✍️", color: "bg-sky-500", tags: ["Todos"] },
            { title: "Conversação Livre", icon: "🗣️", color: "bg-blue-400", tags: ["Prática"] },
            { title: "Cultura & Cinema", icon: "🎬", color: "bg-blue-600", tags: ["Imersão"] },
            { title: "Preparatório DELE", icon: "🎖️", color: "bg-blue-800", tags: ["C1", "C2"] },
          ].map((trail, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:border-blue-200 group text-left transition-all cursor-pointer">
              <div className={`w-12 h-12 ${trail.color} rounded-xl mb-4 flex items-center justify-center text-2xl`}>{trail.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{trail.title}</h3>
              <div className="flex gap-2">
                {trail.tags.map(tag => <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs font-semibold rounded uppercase tracking-wider">{tag}</span>)}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mt-32 py-12 border-t border-slate-100 text-center text-slate-500 text-sm">
        <p>© 2026 Danilinho Espanhol — Aprendizado Inteligente</p>
      </footer>
    </div>
  );
}
