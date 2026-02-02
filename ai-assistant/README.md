# 🎙️ TuEnergíaMaya Voice Agent

## Configuración Previa
1.  Asegúrate de tener Python 3.9+ instalado.
2.  Configura las variables de entorno en `.env`:
    - `LIVEKIT_URL`: Tu URL de proyecto LiveKit Cloud via cloud.livekit.io.
    - `LIVEKIT_API_KEY`: Tu API Key.
    - `LIVEKIT_API_SECRET`: Tu API Secret.
    - `ZHIPU_API_KEY`: Tu clave de Zhipu AI (ya pre-configurada, pero revísala).

## Ejecución
1.  Instala dependencias:
    ```bash
    pip install -r requirements.txt
    ```

2.  Ejecuta el agente:
    ```bash
    python agent.py dev
    ```

3.  ¡Abre la web! El asistente debería conectarse automáticamente cuando pulses el botón del micrófono en la interfaz.

## Notas
- El agente lee el contexto de `knowledge/context.md`.
- Usa Whisper (OpenAI Plugin) para escucha y Zhipu (GLM-4) para pensar.
