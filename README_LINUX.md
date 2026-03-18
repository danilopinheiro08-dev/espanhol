# Como rodar Dale Espanhol no Linux / macOS 🐧🍎

Este guia explica como configurar e rodar a plataforma iDale! Espanhol localmente.

## Pré-requisitos
- **Python 3.10+**
- **Node.js 18+** e **npm**
- **Chave de API do Groq** (Obtenha em [console.groq.com](https://console.groq.com))

## Modo Rápido (Recomendado)
Para configurar e rodar tudo com um único comando, use o script de automação:

```bash
chmod +x setup_and_run.sh
./setup_and_run.sh
```

## Modo Manual (Passo a Passo)

### 1. Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
# Crie um arquivo .env com sua chave:
echo "GROQ_API_KEY=sua_chave_aqui" > .env
python3 main.py
```

### 2. Frontend
Em um novo terminal:
```bash
cd frontend
npm install
npm run dev
```

## Acesso
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend (API)**: [http://localhost:8002](http://localhost:8002)

---
*Dale a estudar! 🎸*
