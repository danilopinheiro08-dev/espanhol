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

class LessonRequest(BaseModel):
    title: str
    level: str

@app.post("/lesson-content")
async def get_lesson_content(request: LessonRequest):
    if not os.getenv("GROQ_API_KEY"):
        raise HTTPException(status_code=500, detail="GROQ_API_KEY não configurada")
    
    prompt = f"""Você é a 'Esposa do Virgilio', uma tutora de espanhol carismática e expert em pedagogia.
Gere uma aula sobre o tópico: "{request.title}" para o nível {request.level}.

ESTRUTURA DA RESPOSTA (OBRIGATÓRIO SER JSON):
{{
  "explanation": "Uma explicação divertida usando a Técnica de Feynman (simples e clara) com exemplos em espanhol e traduções.",
  "quiz": [
    {{
      "question": "Pergunta 1?",
      "options": ["A", "B", "C", "D"],
      "answer": 0,
      "explanation": "Por que a A está correta?"
    }},
    ... (total de 3 perguntas)
  ]
}}

Responda APENAS o JSON, sem textos adicionais."""

    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            response_format={ "type": "json_object" }
        )
        import json
        return json.loads(completion.choices[0].message.content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/chat")
async def chat(request: ChatRequest):
    if not os.getenv("GROQ_API_KEY"):
        raise HTTPException(status_code=500, detail="GROQ_API_KEY não configurada")
    
    # Simple "RAG" - include the relevant knowledge context
    # In a full RAG we would use embeddings and vector search, 
    # but for this scale, providing the core KB is effective.
    system_prompt = f"""Você é o 'Professor Hermano', um instrutor de espanhol ultra carismático e apaixonado pela cultura hispânica.
Use o seguinte conhecimento como base para suas respostas:

{KNOWLEDGE_BASE}

Diretrizes de Personalidade:
1. Estilo 'Dale': Energético, motivador e focado no 'espanhol da vida real'.
2. Conexão Cultural: Sempre que possível, cite músicas (ex: Calle 13, Shakira), filmes ou curiosidades culturais da América Latina e Espanha.
3. Técnica de Feynman: Explique gramática complexa como se estivesse conversando com um irmão ('Hermano').
4. Recordação Ativa: Termine com um desafio rápido ou pergunta provocativa.
5. CURRÍCULO DALE: Estamos organizados em 'Libros' (1 a 6).
   - Libros 1-2: Sobrevivência e cotidiano.
   - Libros 3-4: Fluência em viagens e trabalho.
   - Libros 5-6: Debates avançados, literatura e cinema.
6. Se o aluno perguntar 'por onde começo', sugira o 'Libro 1: Unidad 1 - Hola, ¿cómo estás?'."""

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
    uvicorn.run(app, host="0.0.0.0", port=8002)
