# Como rodar Dale Espanhol no Windows 🪟

Este guia explica como configurar e rodar a plataforma iDale! Espanhol localmente no Windows.

## Pré-requisitos
- **Python 3.10+** (Certifique-se de marcar "Add Python to PATH" na instalação)
- **Node.js 18+** e **npm**
- **Chave de API do Groq** (Obtenha em [console.groq.com](https://console.groq.com))

## Modo Rápido (Recomendado)
Para configurar e rodar tudo automaticamente, clique duas vezes no arquivo:

**`setup_and_run.bat`**

## Modo Manual (PowerShell / CMD)

### 1. Backend
```powershell
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
# Crie um arquivo .env na pasta backend:
# GROQ_API_KEY=sua_chave_aqui
python main.py
```

### 2. Frontend
Em um novo terminal:
```powershell
cd frontend
npm install
npm run dev
```

## Acesso
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend (API)**: [http://localhost:8002](http://localhost:8002)

---
*Dale a estudar! 🎸*
