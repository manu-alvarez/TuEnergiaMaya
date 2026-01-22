---
description: Generar el arte faltante para los Sellos Serpiente, Enlazador y Mano (Kines 45-47) una vez restaurada la cuota.
---

# Tarea: Completar Arte de la Semana (Kines 45, 46, 47)

Estado: Pendiente por Cuota de API (Error 429).
Fecha estimada de desbloqueo: 21 Enero 2026.

## 1. Generar Arte (DALL-E)

Ejecutar la herramienta `generate_image` con los siguientes parámetros. Si alguna falla, detener y reintentar más tarde.

### A. Serpiente Roja (Serpent)
*   **Nombre Imagen**: `serpent_seal_art`
*   **Prompt**: "Vector tarot card style illustration of the Red Serpent Mayan seal (Chicchan). A stylized red serpent rising with vitality (Kundalini concept), shedding skin, passion and life force. Mystical dark cosmic background. Minimalist, premium, clean lines, esoteric aesthetics, crimson red colors."
*   **Acción Posterior**: Mover la imagen generada a `frontend/public/assets/art_seals/serpent.png`.

### B. Enlazador de Mundos Blanco (Worldbridger)
*   **Nombre Imagen**: `worldbridger_seal_art`
*   **Prompt**: "Vector tarot card style illustration of the White Worldbridger Mayan seal (Cimi). A mystical bridge between dimensions, ethereal white gates, ancient stone archway, death and rebirth symbols. Mystical dark cosmic background. Minimalist, premium, clean lines, esoteric aesthetics, white and soft grey colors."
*   **Acción Posterior**: Mover la imagen generada a `frontend/public/assets/art_seals/worldbridger.png`.

### C. Mano Azul (Hand)
*   **Nombre Imagen**: `hand_seal_art`
*   **Prompt**: "Vector tarot card style illustration of the Blue Hand Mayan seal (Manik). A glowing blue hand with a spiral of healing energy in the palm, accomplishment symbols, stars. Mystical dark cosmic background. Minimalist, premium, clean lines, esoteric aesthetics, vibrant blue and turquoise colors."
*   **Acción Posterior**: Mover la imagen generada a `frontend/public/assets/art_seals/hand.png`.

## 2. Regenerar Infografías

Una vez las imágenes estén en su carpeta `art_seals`, ejecutar el script generador para actualizar los Kines afectados.

```bash
node generate-hybrid.js 45
node generate-hybrid.js 46
node generate-hybrid.js 47
```

## 3. Desplegar Cambios

```bash
git add .
git commit -m "feat: complete missing seal art for kins 45-47"
git push
npm run --prefix frontend deploy
```
