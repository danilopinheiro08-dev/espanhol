#!/bin/bash

# Dale Espanhol - Linux/macOS Setup & Run Script 🚀

echo "--------------------------------------------------"
echo "   iDALE! ESPANHOL - SETUP & RUN (LINUX/MAC)      "
echo "--------------------------------------------------"

# 1. Check for .env file
if [ ! -f backend/.env ]; then
    echo "⚠️  ERRO: Arquivo backend/.env não encontrado!"
    echo "Por favor, crie o arquivo backend/.env com sua GROQ_API_KEY."
    echo "Exemplo: GROQ_API_KEY=gsk_..."
    exit 1
fi

# 2. Setup Backend
echo "📦 Configurando Backend..."
cd backend
if [ ! -d venv ]; then
    python3 -m venv venv
fi
source venv/bin/activate
pip install -r requirements.txt
cd ..

# 3. Setup Frontend
echo "📦 Configurando Frontend (isso pode demorar um pouco)..."
cd frontend
if [ ! -d node_modules ]; then
    npm install
fi
cd ..

# 4. Run Application
echo "🚀 Iniciando Aplicação..."
chmod +x run_app.sh
./run_app.sh
