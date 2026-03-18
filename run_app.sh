#!/bin/bash

# Kill any existing processes on ports 8002 and 3000
fuser -k 8002/tcp
fuser -k 3000/tcp

echo "🚀 Iniciando o Espanhol Maestro..."

# Start Backend
cd backend
source venv/bin/activate
export GROQ_API_KEY=$(cat .env | grep GROQ_API_KEY | cut -d'=' -f2)
python3 main.py &
BACKEND_PID=$!

# Start Frontend
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo "✅ Backend rodando em http://localhost:8002"
echo "✅ Frontend rodando em http://localhost:3000"
echo "Pressione Ctrl+C para parar."

trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
