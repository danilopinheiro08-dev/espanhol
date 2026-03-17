import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Espanhol AI Tutor Backend")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

class ChatRequest(BaseModel):
    message: str
    history: list = []

@app.get("/")
async def root():
    return {"message": "Bem-vindo ao tutor de espanhol!"}

def load_knowledge():
    kb_path = "../data/knowledge_base/espanhol_basico.txt"
    if os.path.exists(kb_path):
        with open(kb_path, "r", encoding="utf-8") as f:
            return f.read()
    return ""

KNOWLEDGE_BASE = load_knowledge()

@app.post("/chat")
async def chat(request: ChatRequest):
    if not os.getenv("GROQ_API_KEY"):
        raise HTTPException(status_code=500, detail="GROQ_API_KEY não configurada")
    
    # Simple "RAG" - include the relevant knowledge context
    # In a full RAG we would use embeddings and vector search, 
    # but for this scale, providing the core KB is effective.
    system_prompt = f"""Você é o 'Danilinho', um tutor de espanhol amigável e divertido. 
Use o seguinte conhecimento como base para suas respostas:

{KNOWLEDGE_BASE}

Orientações:
- Use analogias, quizzes e histórias para ensinar. 
- Responda em português, mas use exemplos em espanhol. 
- Seu estilo é encorajador e focado em resultados reais."""

    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": system_prompt},
                *request.history,
                {"role": "user", "content": request.message}
            ],
            temperature=0.7,
            max_tokens=1024,
            stream=False
        )
        return {"response": completion.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
