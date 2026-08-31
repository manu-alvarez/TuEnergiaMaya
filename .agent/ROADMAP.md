# 🗺️ ROADMAP — TuEnergíaMaya

> **Documento vivo** — Se actualiza en cada sesión de trabajo.  
> Última actualización: **31 de agosto de 2026 (Sesión 1 completa)**

---

## 📍 Estado Actual del Proyecto

**URL producción**: https://manu-alvarez.github.io/TuEnergiaMaya/  
**Repo**: https://github.com/manu-alvarez/TuEnergiaMaya  
**Stack activo**: React 19 + Vite 7 + MUI 7 → GitHub Pages (SPA pura)  
**Backend Laravel**: existe en `/backend/` pero **NO está desplegado** en producción  
**AI Assistant**: Gemini 2.0 Flash vía Google Apps Script (proxy CORS)  

---

## 🎨 Guía de Estilo y Tono

> **REGLA DE ORO**: Todo lo que se escriba en la web debe ser entendible por cualquier persona, sin importar si conoce o no el Sincronario Maya.

| Aspecto | Estilo actual (mantener) |
|---|---|
| **Tono** | Místico pero accesible. Cálido, cercano, nunca pedante |
| **Vocabulario** | Español neutro, sencillo. "Sello" en vez de "glifo maya", "Onda" en vez de "wavespell" |
| **Verbos** | Directos: "Conecta", "Descubre", "Siente", "Explora" |
| **Descripciones** | Cortas, evocadoras. Frases de 1-2 líneas máximo por idea |
| **Consejos (advice)** | Formato "Ideal / Evitar" con viñetas claras de 1 línea |
| **Afirmaciones** | Formato Dreamspell estándar: "Yo [verbo] con el fin de [acción]..." |
| **Nombres técnicos** | Siempre con explicación entre paréntesis si es la primera vez |
| **Emojis** | En títulos de secciones sí, en textos descriptivos no |
| **Tipografías** | Cinzel para títulos, Lora para cuerpo, Inter para UI |

**Ejemplos del tono actual** (NO cambiar):
- ✅ "Hoy nace un nuevo ciclo: conecta con tu origen sagrado."
- ✅ "Respira profundo: hoy el viento trae mensajes del espíritu."
- ❌ "El Kin correspondiente a la frecuencia armónica del día actual es..."
- ❌ "Según el algoritmo de correlación Dreamspell GMT..."

---

## ✅ Completado (Sesión 1 — 31 Ago 2026)

### Análisis y Documentación
- [x] Radiografía completa del proyecto (6 secciones)
- [x] Auditoría matemática del motor `calculateKin()` → **estable, sin bugs**
- [x] Mapa de navegación del código con guía rápida
- [x] Estrategia DevOps y checklist de despliegue

### P0 — Limpieza Crítica
- [x] Script de validación `validate-kin.js` — **19/19 tests ✅**
- [x] Eliminado `sellos_maya_coleccion_completa_20.zip` (17 MB) de `public/assets/`
- [x] Eliminadas dependencias `livekit` no usadas del `package.json`
- [x] Eliminado `App.css` residual de Vite (no se importaba)
- [x] `.env` añadido a `.gitignore` para proteger API keys

### P1 — Módulos del Motor
- [x] `colorUtils.js` — Centraliza mapeo de colores (7 funciones)
- [x] `wavespell.js` — Onda Encantada, Castillos, Anillo Solar, Kin de Tránsito
- [x] `psiChrono.js` — Banco Psi + detección de Portales de Activación Galáctica

### Datos Extraídos de PDFs (`/EXTRA/`)
- [x] `psiChronoTable.json` — 357 entradas fecha→Kin parseadas del PDF
- [x] `archetypes.json` — 21 Arquetipos de Hunab Ku 21 con poemas

### Integración de `colorUtils.js`
- [x] `App.jsx` — Reemplazados 3 bloques de ternarios de color con `getColorHex/Gradient/Glow/GlyphFilter`
- [x] `QuintaFuerza.jsx` — Reemplazados 7 bloques de mapeo de color con `getColorHex/getColorGlow`
- [x] `Infographic.jsx` — Eliminado `COLORS_HEX` local, reemplazado con `getColorHex`

### Nuevos Componentes UI (integrados en App.jsx)
- [x] `WavespellView.jsx` — Onda Encantada visual (13 sellos, posición actual, castillo)
- [x] `PsiChronoView.jsx` — Psi Crono del día + Portal de Activación Galáctica + Día Fuera del Tiempo

### DevOps
- [x] `.github/workflows/deploy.yml` — CI/CD automático: validate → build → deploy
- [x] `.env` con API keys de Gemini, OpenRouter, Groq

### Verificación
- [x] Build de producción sin errores (811 KB gzipped: 237 KB)
- [x] 19/19 tests pasan: Tzolkin + Wavespell + Tránsito

---

## 🔲 Pendiente — Fase 2: Refinamiento

### 2A. Descomponer `App.jsx` (ahora ~670 líneas)
- [ ] Extraer `components/layout/AppHeader.jsx`
- [ ] Extraer `components/layout/ExploreMenu.jsx`
- [ ] Extraer `components/layout/Footer.jsx`
- [ ] Extraer `components/kin/KinCard.jsx`
- [ ] Extraer `components/kin/KinReflection.jsx`
- [ ] Crear `hooks/useKinData.js`

### 2B. Nuevos componentes UI avanzados
- [ ] `components/SolarRingView.jsx` — Kin del Año + Kin de Tránsito (requiere Kin natal del usuario)
- [ ] Integrar arquetipos Hunab Ku 21 en `QuintaFuerza.jsx` (tooltip/modal al tocar sello)

---

## 🔲 Pendiente — Fase 3: IA y APIs

- [ ] Evaluar si reemplazar el proxy GAS con llamada directa (Gemini/OpenRouter desde frontend)
- [ ] Actualizar system prompt del asistente con contexto de Onda, Psi Crono, Castillo
- [ ] Añadir conocimiento de arquetipos al asistente

### APIs Disponibles (keys en `.env`)
| Servicio | Estado | Uso |
|---|---|---|
| **Gemini** | Key en `.env` | Principal |
| **OpenRouter** | Key en `.env` | Fallback |
| **Groq** | Key en `.env` | Rápido |
| **Tavily** | Key en conversación | Búsqueda web |
| **OpenAI** | Key en conversación | Premium |

---

## 🔲 Pendiente — Fase 4: Optimización

- [ ] Convertir `background.png` (2 MB) a WebP (~800 KB)
- [ ] Code-split el bundle (Vite manualChunks para separar MUI de app)
- [ ] Verificar `psiChronoTable.json` completo (357 de ~366, revisar faltantes)
- [ ] Expandir contenido largo de arquetipos en `archetypes.json`
- [ ] Añadir `npm run test` como alias de validación

---

## 📁 Inventario de Archivos

### Motor (`src/utils/`)
| Archivo | Funciones principales | Estado |
|---|---|---|
| `tzolkin.js` | `calculateKin`, `getKinConfig`, `calculateOracle` | ✅ Producción |
| `colorUtils.js` | `getColorHex`, `getColorGradient`, `getColorGlow`, `getGlyphFilter` | ✅ Integrado |
| `wavespell.js` | `getWavespell`, `getCastle`, `getSolarRing`, `getTransitKin` | ✅ En uso |
| `psiChrono.js` | `getPsiChrono`, `isGalacticActivationPortal` | ✅ En uso |

### Datos (`src/data/`)
| Archivo | Entradas | Estado |
|---|---|---|
| `dailyData.json` | 260 Kines | ✅ Producción |
| `psiChronoTable.json` | 357 fechas→Kin | ✅ En uso |
| `archetypes.json` | 21 arquetipos | ✅ Disponible |
| `episodes.js` | Podcast | ✅ Producción |

### Componentes (`src/components/`)
| Archivo | Estado |
|---|---|
| `WavespellView.jsx` | ✅ **NUEVO** — En producción |
| `PsiChronoView.jsx` | ✅ **NUEVO** — En producción |
| `ChatAssistant.jsx` | ✅ Producción |
| `QuintaFuerza.jsx` | ✅ Refactorizado (colorUtils) |
| `Infographic.jsx` | ✅ Refactorizado (colorUtils) |
| `NatalKinTool.jsx` | ✅ Producción |
| `TribeList.jsx` | ✅ Producción |
| `ToneList.jsx` | ✅ Producción |
| `SpotifyPlayer.jsx` | ✅ Producción |
| `PWAPrompt.jsx` | ✅ Producción |

---

## 🔑 Notas Técnicas Clave

1. **Motor correcto** — Verificado contra 13lunas.net, lawoftime.org, tortuga1320.com
2. **Deploy**: `cd frontend && npm run deploy` (manual) o push a `main` (CI/CD automático)
3. **Base relativa**: `vite.config.js` → `base: './'`
4. **PWA autoUpdate**: Service Worker se refresca en siguiente visita
5. **Backend es placeholder**: No desplegado, anchor desactualizado en KinController
6. **GAS proxy**: Chatbot pasa por Google Apps Script → Gemini API
