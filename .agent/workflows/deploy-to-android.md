---
description: Plan maestro para convertir la web TuEnergiaMaya en App Android (PlayStore) usando Capacitor
---

# Plan de Conversión a Móvil (Android)

Este flujo de trabajo detalla los pasos para empaquetar la aplicación React actual en una aplicación nativa de Android lista para subir a Google Play Store, utilizando **Capacitor**.

## 1. Preparación del Entorno
- [ ] **Android Studio**: Asegúrate de tener instalado Android Studio en tu Mac. Es necesario para compilar el APK/AAB final.
- [ ] **Java/Gradle**: Android Studio instalará las versiones necesarias automáticamente.

## 2. Instalación de Capacitor
Capacitor es el puente que convierte tu web en una app nativa.

```bash
# Ir al directorio del frontend
cd frontend

# Instalar dependencias base
npm install @capacitor/core
npm install -D @capacitor/cli

# Inicializar Capacitor (Nombre: TuEnergiaMaya, ID: com.tuenergiamaya.app)
npx cap init TuEnergiaMaya com.tuenergiamaya.app --web-dir=dist
```

## 3. Configuración de Android
Añadimos la plataforma Android al proyecto.

```bash
# Instalar paquete de Android
npm install @capacitor/android

# Añadir la plataforma
npx cap add android
```

## 4. Sincronización
Cada vez que hagas cambios en React, debes construir y sincronizar.

```bash
# 1. Construir la versión web (React build)
npm run build

# 2. Copiar los archivos build al proyecto nativo
npx cap sync
```

## 5. Diseño de Iconos y Splash Screen
Para que parezca una app profesional, necesitamos iconos adaptativos.
*Usaremos la herramienta `cordova-res` o `@capacitor/assets`.*

1.  Crear carpeta `resources` en `frontend`.
2.  Colocar `icon.png` (1024x1024) y `splash.png` (2732x2732).
3.  Ejecutar generador de recursos.

## 6. Pruebas y Compilación
1.  Abrir el proyecto en Android Studio:
    ```bash
    npx cap open android
    ```
2.  Desde Android Studio:
    *   Conectar un móvil físico o usar el Emulador.
    *   Darle a "Run" (Triángulo verde) para probar.

## 7. Generar Bundle para Play Store (.aab)
Desde Android Studio:
1.  Menu `Build` > `Generate Signed Bundle / APK`.
2.  Seleccionar `Android App Bundle`.
3.  Crear una `KeyStore` (tu firma digital de desarrollador).
4.  Generar el archivo `.aab`.

## 8. Publicación
1.  Crear cuenta en **Google Play Console** ($25 pago único).
2.  Crear nueva app.
3.  Subir el archivo `.aab`.
4.  Rellenar ficha (Imágenes, Descripción, Clasificación de contenido).
5.  Enviar a revisión.

---
// turbo
# Comandos de inicio rápido (Solo Fase 2 y 3)
cd frontend && npm install @capacitor/core @capacitor/cli @capacitor/android && npx cap init TuEnergiaMaya com.tuenergiamaya.app --web-dir=dist && npx cap add android
