#!/bin/bash

# Script to start the Text Assistant Server for TuEnergíaMaya

echo "🔮 Iniciando Asistente de Texto TuEnergíaMaya..."

# Ensure we are in the project root
cd "$(dirname "$0")"

# Start the Python AI Server
cd ai-assistant
lsof -ti :8002 | xargs kill -9 2>/dev/null
./venv/bin/python server.py > server.log 2>&1 &
PID_SERVER=$!

echo "✅ Servidor de Asistente de Texto iniciado (PID: $PID_SERVER)"
echo "Logs disponibles en: ai-assistant/server.log"
echo "Presiona Ctrl+C para detener."

# Keep script running to allow graceful shutdown
trap "kill $PID_SERVER; echo 'Deteniendo servicios...'; exit" SIGINT SIGTERM
wait
