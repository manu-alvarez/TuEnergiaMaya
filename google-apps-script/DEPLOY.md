# 🔮 Deploy del Asistente IA con Google Apps Script

## Paso 1: Crear el Script

1. Ve a [script.google.com](https://script.google.com)
2. Click **Nuevo proyecto**
3. Renombra: `TuEnergíaMaya AI`
4. Borra el código existente y pega el contenido de `assistant.gs`

## Paso 2: Añadir API Key

1. Click en ⚙️ **Configuración del proyecto** (rueda dentada izquierda)
2. Click **Propiedades del script** → **Añadir propiedad**
3. Propiedad: `GEMINI_API_KEY`
4. Valor: `[tu API key de Google AI Studio]`
5. Click **Guardar**

## Paso 3: Desplegar como Web App

1. Click **Implementar** → **Nueva implementación**
2. Tipo: **Aplicación web**
3. Configuración:
   - Descripción: `Asistente IA v1`
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier persona**
4. Click **Implementar**
5. **Copia la URL** que te da (algo como `https://script.google.com/macros/s/AKfy.../exec`)

## Paso 4: Probar

Abre esta URL en el navegador (debería mostrar `{"status":"ok"}`):
```
https://script.google.com/macros/s/TU_ID/exec
```

## Paso 5: Actualizar Frontend

Una vez tengas la URL, dámela y actualizaré el frontend para usarla.

---

## ⚠️ Notas Importantes

- La primera petición tarda más (~3-5s) porque Google "despierta" el script
- Las siguientes son más rápidas (~1-2s)
- El límite gratuito es ~20,000 ejecuciones/día
