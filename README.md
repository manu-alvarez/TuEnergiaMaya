# 🌟 TuEnergíaMaya

**Tu portal sagrado al Tzolkin Maya — Descubre tu Kin del día, explora los Sellos, Tonos, Ondas Encantadas, Castillos, Arquetipos y mucho más.**

[![Live Demo](https://img.shields.io/badge/🌐_Demo-Live-00c8ff?style=for-the-badge)](https://manu-alvarez.github.io/TuEnergiaMaya/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/manu-alvarez/TuEnergiaMaya)

---

## ✨ ¿Qué es TuEnergíaMaya?

TuEnergíaMaya es una aplicación web progresiva (PWA) que traduce la sabiduría ancestral del calendario Tzolkin Maya a una experiencia digital moderna, inmersiva y accesible desde cualquier dispositivo. Cada día calcula automáticamente el Kin energético, su Sello Solar, Tono Galáctico, Onda Encantada, Castillo, Arquetipo y Unidad Psi-Crono, presentándolo todo bajo un diseño **Glassmorphism** cósmico.

---

## 📱 Características Principales

### 🔮 Kin del Día
- Cálculo automático del Kin según el calendario Tzolkin (260 días).
- Tarjeta principal con sello, tono, color, reflexión diaria y descripción expandible.
- Selector de fecha para consultar cualquier día pasado o futuro.

### 🎴 Sellos Solares (20)
- Galería completa de los 20 Sellos Solares con glifos originales.
- Modal de detalle individual con esencia, animación cósmica y palabras clave.

### 🎵 Tonos Galácticos (13)
- Los 13 Tonos de la Creación con sus glifos, funciones y preguntas guía.
- Detalle modal inmersivo con visualización de cada frecuencia.

### 🌊 Ondas Encantadas (20)
- Visualización de la Onda Encantada actual con navegación entre las 20 ondas.
- Desglose de los 13 kines dentro de cada onda y su posición tonal.
- Descripciones detalladas de cada onda con contexto mitológico y simbólico.

### 🏰 Castillos (5)
- Los 5 Castillos del Tzolkin: Rojo, Blanco, Azul, Amarillo y Verde.
- Indicador del Castillo actual con color temático dinámico.
- Información detallada de cada castillo: poder, función, ondas que lo integran y significado cósmico.

### 🧠 Psi-Crono
- Cálculo de la Unidad Psi-Crono (Kin de la memoria cósmica) para cada fecha.
- Visualización del sello y tono Psi-Crono con glosa y significado.

### ✨ Arquetipos Galácticos (21)
- Los 21 Arquetipos del sistema Hunab Ku 21, codificados por José Argüelles.
- Tarjetas con arte original, poema y lectura completa de cada arquetipo.
- Lightbox con zoom para explorar las imágenes en detalle.

### 🔺 Quinta Fuerza (Oráculo)
- Visualización interactiva del Oráculo Maya con las 5 posiciones (Destino, Guía, Antípoda, Análogo, Oculto).
- Infografía expandible a pantalla completa.

### 🌍 Curiosidades
- Sección con datos fascinantes sobre la cosmovisión maya y el Tzolkin.
- Fusión Astro-Maya integrada.

### 🎧 Podcast
- Integración directa con Spotify para escuchar los episodios del podcast *Tu Energía Maya*.

### 🤖 Asistente IA
- Chat conversacional con conocimiento del Tzolkin (Google Gemini).
- Contexto automático del Kin actual para respuestas personalizadas.

### 📱 PWA & Menú Unificado
- Instalable como app nativa en iOS, Android y escritorio.
- **Menú Principal** desplegable unificado con acceso a todas las secciones.
- 4 mini-tarjetas interactivas (Onda, Castillo, Psi-Crono, Arquetipo) con animación de levitación.

---

## 🛠️ Stack Tecnológico

### Frontend
| Tecnología | Versión | Uso |
|------------|---------|-----|
| React | 19 | UI Framework (SPA) |
| Vite | 7.x | Build Tool & Dev Server |
| Material UI | 7 | Design System (M3) |
| Capacitor | 8 | Android Build (Play Store) |

### Backend / API
| Tecnología | Versión | Uso |
|------------|---------|-----|
| Laravel | 12 | API REST Framework |
| PHP | 8.2 | Runtime con JIT |
| MySQL | 8.x | Base de datos relacional |
| Eloquent ORM | — | Abstracción de BD |

### AI Assistant
| Tecnología | Uso |
|------------|-----|
| FastAPI | Servidor Python (puerto 8002) |
| Google Gemini 2.0 Flash | Motor de respuestas IA |
| Uvicorn | ASGI Server |

### Despliegue
| Servicio | URL |
|----------|-----|
| **Producción (GitHub Pages)** | https://manu-alvarez.github.io/TuEnergiaMaya/ |
| Frontend Dev | http://localhost:5173 |
| Backend API | http://localhost:8000 |
| AI Assistant | http://localhost:8002 |

---

## 📁 Estructura del Proyecto

```
TuEnergiaMaya/
├── frontend/                     # React + Vite SPA
│   ├── src/
│   │   ├── components/           # 16 componentes React
│   │   │   ├── ArchetypesView.jsx    # 21 Arquetipos Galácticos
│   │   │   ├── AstroFusionModal.jsx  # Fusión Astro-Maya
│   │   │   ├── CastlesView.jsx       # 5 Castillos del Tzolkin
│   │   │   ├── ChatAssistant.jsx     # Asistente IA (Gemini)
│   │   │   ├── Infographic.jsx       # Infografía / Oráculo visual
│   │   │   ├── ModalLayout.jsx       # Layout unificado para modales
│   │   │   ├── NatalKinTool.jsx      # Calculadora de Kin Natal
│   │   │   ├── ObservatorioModal.jsx  # Curiosidades
│   │   │   ├── PsiChronoView.jsx     # Unidad Psi-Crono
│   │   │   ├── PWAPrompt.jsx         # Prompt de instalación PWA
│   │   │   ├── QuintaFuerza.jsx      # Oráculo de la Quinta Fuerza
│   │   │   ├── SpotifyPlayer.jsx     # Reproductor de Podcast
│   │   │   ├── ToneList.jsx          # 13 Tonos Galácticos
│   │   │   ├── TribeList.jsx         # 20 Sellos Solares
│   │   │   └── WavespellView.jsx     # 20 Ondas Encantadas
│   │   ├── data/
│   │   │   ├── archetypes.json       # Datos de los 21 Arquetipos
│   │   │   ├── dailyData.json        # 260 Kines con descripciones
│   │   │   └── wavespellContent.js   # Contenido de Ondas y Castillos
│   │   ├── utils/
│   │   │   ├── tzolkin.js            # Algoritmo de cálculo del Kin
│   │   │   ├── wavespell.js          # Cálculo de Onda y Castillo
│   │   │   ├── psiChrono.js          # Cálculo de Psi-Crono
│   │   │   └── colorUtils.js         # Sistema de colores dinámicos
│   │   ├── services/api.js           # Llamadas API centralizadas
│   │   ├── App.jsx                   # Componente raíz y Menú Principal
│   │   └── index.css                 # Design System (Glassmorphism)
│   ├── public/
│   │   ├── assets/                   # Glifos, arquetipos, iconos
│   │   ├── manifest.webmanifest      # Configuración PWA
│   │   └── background.png            # Fondo cósmico
│   └── android/                      # Build Capacitor (Android)
│
├── backend/                          # Laravel API
│   ├── app/Http/Controllers/Api/
│   │   ├── KinController.php
│   │   └── OracleController.php
│   └── app/Models/
│       ├── Kin.php, Seal.php, Tone.php, User.php
│
├── ai-assistant/                     # Python AI Server
│   ├── server.py                     # FastAPI endpoint
│   ├── requirements.txt
│   └── knowledge/                    # Contexto para IA
│
└── README.md
```

---

## 🚀 Instalación

### Frontend (Desarrollo)
```bash
cd frontend
npm install
npm run dev          # → http://localhost:5173
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
# Configurar GEMINI_API_KEY en .env
python server.py     # → http://localhost:8002
```

### Despliegue a Producción
```bash
cd frontend
npm run build        # Genera dist/
npm run deploy       # Publica en GitHub Pages
```

---

## 🎨 Design System

| Elemento | Valor |
|----------|-------|
| **Color Primario** | Cyan Cósmico `#00c8ff` |
| **Background** | Gradiente oscuro + glassmorphism |
| **Tipografía Headers** | Cinzel (serif) |
| **Tipografía Body** | Lora (serif, italic) |
| **Tipografía UI** | Inter (sans-serif) |
| **Efectos** | Glow, blur, sombras dinámicas, neón |
| **Cards** | `.glass-card` — cristal translúcido con bordes luminosos |
| **Border Radius** | `30px–40px` (cards), `30px` (botones) |
| **Animaciones** | Levitación, pulso neón, cosmic pulse, fade-in |

---

## 📊 API Endpoints

```
GET  /api/kines           # Lista los 260 Kines
GET  /api/kines/today     # Kin de hoy
GET  /api/kines/{number}  # Kin específico (1-260)
POST /api/assistant/ask   # Chat IA
POST /api/oracle/prophesy # Profecía de 13 días
```

---

## 📱 PWA Features

- ✅ Instalable como app nativa (iOS, Android, Desktop)
- ✅ Service Worker con precaching de assets
- ✅ Modo standalone (sin barra del navegador)
- ✅ Tema oscuro nativo con safe-area support
- ✅ Responsive completo: móvil, tablet, escritorio

---

## 🗺️ Menú de Secciones

| Nº | Sección | Icono | Descripción |
|----|---------|-------|-------------|
| 1 | Kin Natal | 🎂 | Calcula tu Kin de nacimiento |
| 2 | Sellos Solares | 👥 | Los 20 Sellos con glifos y esencias |
| 3 | Tonos Galácticos | 🎵 | Los 13 Tonos de la Creación |
| 4 | Ondas Encantadas | 🌊 | Las 20 Ondas con sus 13 kines |
| 5 | Castillos | 🏰 | Los 5 Castillos del Tzolkin |
| 6 | Psi-Crono | 🧠 | Unidad Psi-Crono del día |
| 7 | Arquetipos | ✨ | 21 Arquetipos de Hunab Ku 21 |
| 8 | Curiosidades | 🌍 | Datos y saberes del Tzolkin |
| 9 | Podcast | 🎧 | Podcast diario en Spotify |

---

## 📄 Licencia

MIT © TuEnergíaMaya — Creado por **Mano Eléctrica Azul** 💙
