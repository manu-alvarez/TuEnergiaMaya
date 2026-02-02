# 🌟 TuEnergíaMaya

**Descubre tu Kin del día según el Tzolkin Maya**

[![Live Demo](https://img.shields.io/badge/Demo-Live-00d4aa)](https://manu-alvarez.github.io/TuEnergiaMaya/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717)](https://github.com/manu-alvarez/TuEnergiaMaya)

---

## 📱 Características

- 🔮 **Kin Diario** - Cálculo automático del Kin según el calendario Tzolkin
- 📖 **260 Kines** - Descripciones completas, afirmaciones e imágenes para cada Kin
- 🎴 **20 Sellos Solares** - Galería con descripciones detalladas
- 🎵 **13 Tonos Galácticos** - Explicación de cada frecuencia
- 🔺 **Quinta Fuerza** - Visualización interactiva del Oráculo Maya
- 🤖 **Asistente IA** - Chat con conocimiento del Tzolkin (Google Gemini)
- 🎧 **Podcast Spotify** - Integración del podcast "Tu Energía Maya"
- 📱 **PWA** - Instalable como app en móviles

---

## 🛠️ Stack Tecnológico

### Frontend
| Tecnología | Versión | Uso |
|------------|---------|-----|
| React | 19 | UI Framework |
| Vite | 7.x | Build Tool |
| Material UI | 7 | Design System (M3) |
| Capacitor | 8 | Android Build |

### Backend
| Tecnología | Versión | Uso |
|------------|---------|-----|
| Laravel | 12 | API REST |
| PHP | 8.2 | Runtime |
| MySQL | 8 | Database |

### AI Assistant
| Tecnología | Uso |
|------------|-----|
| FastAPI | Python Server |
| Google Gemini | AI Responses |

---

## 📁 Estructura del Proyecto

```
TuEnergiaMaya/
├── frontend/                 # React + Vite SPA
│   ├── src/
│   │   ├── components/       # 8 componentes React
│   │   │   ├── ChatAssistant.jsx
│   │   │   ├── Infographic.jsx
│   │   │   ├── NatalKinTool.jsx
│   │   │   ├── QuintaFuerza.jsx
│   │   │   ├── SpotifyPlayer.jsx
│   │   │   ├── ToneList.jsx
│   │   │   └── TribeList.jsx
│   │   ├── services/api.js   # API centralized calls
│   │   ├── data/dailyData.json # 260 Kines data
│   │   └── utils/tzolkin.js  # Kin calculation algorithm
│   ├── public/
│   │   ├── manifest.json     # PWA config
│   │   └── sw.js             # Service Worker
│   └── android/              # Capacitor Android build
│
├── backend/                  # Laravel API
│   ├── app/Http/Controllers/Api/
│   │   ├── KinController.php
│   │   └── OracleController.php
│   └── app/Models/
│       ├── Kin.php, Seal.php, Tone.php, User.php
│
├── ai-assistant/             # Python AI Server
│   ├── server.py             # FastAPI endpoint
│   ├── requirements.txt
│   └── knowledge/            # Context for AI
│
└── start_assistant.sh        # Script to start AI server
```

---

## 🚀 Instalación

### Frontend (Development)
```bash
cd frontend
npm install
npm run dev
```

### Backend (Laravel)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve --port=8000
```

### AI Assistant
```bash
cd ai-assistant
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
# Configure GEMINI_API_KEY in .env
python server.py
```

---

## 🌐 Despliegue

| Servicio | URL/Puerto |
|----------|------------|
| **Web (GitHub Pages)** | https://manu-alvarez.github.io/TuEnergiaMaya/ |
| Frontend Dev | http://localhost:5173 |
| Backend API | http://localhost:8000 |
| AI Assistant | http://localhost:8002 |

---

## 📊 API Endpoints

```
GET  /api/kines           # List all 260 Kines
GET  /api/kines/today     # Today's Kin
GET  /api/kines/{number}  # Specific Kin (1-260)
POST /api/assistant/ask   # AI Chat
POST /api/oracle/prophesy # 13-day prophecy
```

---

## 🎨 Design System

- **Primary Color**: Turquoise `#00d4aa`
- **Background**: Dark gradient with glassmorphism
- **Typography**: Cinzel (headers), Lora (body)
- **Effects**: Glow, blur, dynamic shadows

---

## 📱 PWA Features

- ✅ Installable on mobile devices
- ✅ Service Worker for offline caching
- ✅ Custom theme color and icons
- ✅ Standalone display mode

---

## 📄 License

MIT © TuEnergíaMaya
