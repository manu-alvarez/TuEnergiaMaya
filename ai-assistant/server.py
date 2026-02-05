import os
import logging
import asyncio
from typing import Optional
from fastapi import FastAPI, Form, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("text-assistant")

app = FastAPI(title="TuEnergíaMaya Text Assistant")

# CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Gemini Configuration
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
# Model is now instantiated per-request to support dynamic system instructions

# Knowledge Base Loading
try:
    with open("knowledge/context.md", "r") as f:
        KNOWLEDGE_BASE = f.read()
except FileNotFoundError:
    KNOWLEDGE_BASE = "TuEnergíaMaya es un proyecto sobre sabiduría maya e innovación."

try:
    with open("knowledge/tzolkin_summary.txt", "r") as f:
        TZOLKIN_DATA = f.read()
    KNOWLEDGE_BASE += "\n\nSABIDURÍA TZOLKIN:\n" + TZOLKIN_DATA
except FileNotFoundError:
    pass

SYSTEM_PROMPT = f"""
Eres un asistente experto en sabiduría Maya y el proyecto TuEnergíaMaya. 
Tu objetivo es responder de forma didáctica, profesional y mística, pero clara.

CONOCIMIENTO DEL PROYECTO Y SABIDURÍA:
{KNOWLEDGE_BASE}

REGLAS DE RESPUESTA:
- Responde siempre en Español.
- Sé conciso pero con contenido valioso.
- Si te preguntan sobre Kines, utiliza la terminología correcta.
- Responde directamente al usuario sin prefijos innecesarios.
"""

@app.post("/ask")
async def ask_question(
    text: Optional[str] = Form(None),
    history: Optional[str] = Form(None),  # JSON string of previous messages
    context: Optional[str] = Form(None)   # JSON string of current Kin context
):
    try:
        if not text:
            raise HTTPException(status_code=400, detail="No query provided")
        
        # Parse history if provided
        chat_history = []
        if history:
            try:
                import json
                raw_history = json.loads(history)
                # Convert to Gemini format: {"role": "user"|"model", "parts": [text]}
                for msg in raw_history:
                    role = "user" if msg['sender'] == 'user' else "model"
                    chat_history.append({"role": role, "parts": [msg['text']]})
            except Exception as e:
                logger.warning(f"Failed to parse history: {e}")

        # Prepare dynamic system prompt based on context
        dynamic_system_prompt = SYSTEM_PROMPT
        if context:
            dynamic_system_prompt += f"\n\nCONTEXTO ACTUAL (EL KIN QUE EL USUARIO VE EN PANTALLA):\n{context}"

        logger.info(f"Asking Gemini (Conversational): {text}")
        
        # Instantiate model WITH system instruction for robust context
        # This ensures personality and constraints persist even with history
        current_model = genai.GenerativeModel(
            'models/gemini-2.0-flash',
            system_instruction=dynamic_system_prompt
        )
        
        # Start chat with history
        chat = current_model.start_chat(history=chat_history)
        
        # Send message (no need to prepend prompt anymore, it's in system_instruction)
        response = await asyncio.to_thread(chat.send_message, text)
        answer_text = response.text

        logger.info(f"Gemini Answer: {answer_text}")

        return {
            "query": text,
            "answer": answer_text
        }

    except Exception as e:
        logger.error(f"Error in ask_question: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)
