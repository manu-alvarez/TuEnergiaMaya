# 🛠️ Informe Técnico: TuEnergíaMaya

Este documento detalla la arquitectura, tecnologías y herramientas utilizadas en el desarrollo de **TuEnergíaMaya**, diseñado para cumplir con estándares profesionales de escalabilidad, rendimiento y experiencia de usuario.

---

## 1. Arquitectura Frontend (Cliente Web & Móvil)
El cliente ha sido construido como una **Single Page Application (SPA)** moderna, priorizando la reactividad y el rendimiento visual.

### **Core**
*   **React 19**: Biblioteca principal para la construcción de interfaces, aprovechando las últimas características de concurrencia y gestión de estado.
*   **Vite 7.2**: Entorno de desarrollo y bundler de próxima generación, garantizando tiempos de carga instantáneos y Hot Module Replacement (HMR) ultra-rápido.
*   **JavaScript (ESNext)**: Lógica de cliente moderna y modular.

### **Diseño e Interfaz (UI/UX)**
*   **Material UI (MUI) v7**: Sistema de diseño robusto que implementa **Material Design 3**. Personalizado con un tema "Cyber-Maya" (colores neón, efectos glassmorphism).
*   **Emotion / Styled Components**: Motor de estilos CSS-in-JS para componentes dinámicos y theming avanzado.
*   **Glassmorphism & Neumorphism**: Estilos visuales personalizados mediante CSS3 moderno (`backdrop-filter`, `box-shadow` dinámicos) para crear profundidad e inmersión.
*   **Canvas API**: Implementación nativa para la renderización de gráficos complejos en tiempo real (ej. visualización del Oráculo y líneas de energía dinámicas).
*   **Fuentes**: `Cinzel` (títulos sagrados) y `Lora` (textos de lectura), importadas vía Google Fonts para legibilidad y estética premium.

### **Móvil (Híbrido)**
*   **Capacitor 8**: Puente nativo que encapsula la aplicación web React para su despliegue como app nativa .apk en Android, permitiendo acceso a APIs del dispositivo manteniendo un solo código base.

---

## 2. Arquitectura Backend (API & Lógica)
El servidor opera bajo una arquitectura **RESTful API**, separando completamente la lógica de negocio de la presentación.

### **Core**
*   **Laravel 12**: Framework PHP de nivel empresarial, elegido por su seguridad, elegancia sintáctica y robustez.
*   **PHP 8.2**: Lenguaje base, optimizado para alto rendimiento con JIT Compiler.

### **Seguridad y Autenticación**
*   **Laravel Sanctum**: Sistema de autenticación ligero para SPAs y APIs, gestionando tokens seguros para la comunicación cliente-servidor.
*   **CORS & Middleware**: Protección de rutas API integrada para asegurar que solo orígenes autorizados consuman los datos.
*   **Validación Estricta**: Sanitización de entradas en todos los endpoints para prevenir inyecciones SQL y XSS.

### **Base de Datos**
*   **MySQL**: Sistema de gestión de bases de datos relacional para el almacenamiento estructurado de usuarios, perfiles y datos del Tzolkin.
*   **Eloquent ORM**: Capa de abstracción de base de datos de Laravel para consultas intuitivas y relaciones de modelos eficientes.

---

## 3. Integraciones y Servicios Externos

### **Datos y Sincronismo**
*   **Algoritmo Tzolkin (Custom)**: Motor lógico interno desarrollado en JavaScript (`utils/tzolkin.js`) para el cálculo astronómico preciso de Kines, Ondas Encantadas y Oráculos basado en la fecha de nacimiento.
*   **Spotify Web API (o Embeds)**: Integración para la reproducción de "La Voz del Kin" (podcasts diarios) directamente en la interfaz.

---

## 4. Infraestructura y Despliegue (DevOps)

### **Frontend Hosting**
*   **GitHub Pages**: Alojamiento estático globalmente distribuido para la entrega rápida de la aplicación cliente (React).

### **Backend Hosting**
*   **VPS (Virtual Private Server)**: Alojamiento auto-gestionado (Self-Hosted) para la API Laravel y la base de datos MySQL, garantizando soberanía de datos y control total del entorno.

### **Control de Versiones**
*   **Git & GitHub**: Gestión de código fuente con flujo de trabajo basado en ramas (Features/Fixes) y despliegue continuo manual.

---

## 5. Resumen de Herramientas
| Categoría | Tecnología | Uso Principal |
| :--- | :--- | :--- |
| **Frontend** | React 19 + Vite | Lógica de Cliente y Build System |
| **UI Framework** | Material UI (MUI) v7 | Componentes Visuales y Sistema de Diseño |
| **Mobile** | Capacitor v8 | Compilación Nativa Android |
| **Backend** | Laravel 12 (PHP 8.2) | API REST y Lógica de Negocio |
| **Database** | MySQL | Persistencia de Datos |
| **Auth** | Laravel Sanctum | Seguridad API Token-based |
| **Gráficos** | HTML5 Canvas | Visualización de Quinta Fuerza (Oráculo) |

## Estándares de Código
*   **Clean Code**: Funciones puras, componentes pequeños y reutilizables.
*   **Responsive Design**: Adaptabilidad total desde móviles pequeños hasta pantallas de escritorio (Mobile-First).
*   **Accesibilidad (a11y)**: Uso de contrastes adecuados y etiquetas semánticas.
