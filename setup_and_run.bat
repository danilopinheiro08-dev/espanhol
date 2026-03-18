@echo off
TITLE iDALE! ESPANHOL - SETUP & RUN (WINDOWS)
echo --------------------------------------------------
echo    iDALE! ESPANHOL - SETUP ^& RUN (WINDOWS)      
echo --------------------------------------------------

:: 1. Check for .env file
if not exist backend\.env (
    echo [ERROR] Arquivo backend\.env nao encontrado!
    echo Por favor, crie o arquivo backend\.env com sua GROQ_API_KEY.
    echo Exemplo: GROQ_API_KEY=gsk_...
    pause
    exit /b 1
)

:: 2. Setup Backend
echo [BACKEND] Configurando...
cd backend
if not exist venv (
    python -m venv venv
)
call venv\Scripts\activate
pip install -r requirements.txt
cd ..

:: 3. Setup Frontend
echo [FRONTEND] Configurando (isso pode demorar um pouco)...
cd frontend
if not exist node_modules (
    npm install
)
cd ..

:: 4. Run Application
echo [RUN] Iniciando...
start /b cmd /c "cd backend && venv\Scripts\activate && python main.py"
start /b cmd /c "cd frontend && npm run dev"

echo --------------------------------------------------
echo ✅ Tudo pronto! 
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:8002
echo --------------------------------------------------
echo Pressione Ctrl+C na janela do terminal para parar.
pause
