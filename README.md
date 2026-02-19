# 💰 Millonario React Edition

Una experiencia inmersiva basada en el famoso show televisivo "¿Quién quiere ser millonario?", construida con tecnologías web de última generación. Este proyecto es una **Single Page Application (SPA)** estática, optimizada para dispositivos móviles y diseñada con un enfoque en la experiencia de usuario (UX).

![Logo del Proyecto](/public/logo.png) ## 🚀 Tecnologías Utilizadas

* **React 19** - Librería principal para la interfaz.
* **Vite** - Entorno de desarrollo ultra rápido.
* **Tailwind CSS 4** - Estilizado moderno y eficiente.
* **Framer Motion** - Animaciones fluidas y transiciones de estado.
* **Lucide React** - Iconografía limpia.
* **Use-Sound** - Gestión de efectos sonoros y música de tensión.

## ✨ Características Principales

* **Curva de Dificultad Real:** 15 preguntas que escalan en complejidad.
* **Sistema de Comodines (Lifelines):**
    * **50:50:** Elimina dos opciones incorrectas al azar.
    * **Llamada al amigo:** Un experto te da su opinión honesta.
    * **Voto del Público:** Gráfica de barras basada en probabilidades según el nivel.
* **Temporizador Dinámico:** 30 segundos de pura tensión con alertas visuales.
* **Diseño Mobile-First:** Interfaz totalmente adaptativa con menús laterales para dispositivos táctiles.
* **Estado de Juego Persistente:** Lógica centralizada mediante Custom Hooks.

## 🛠️ Instalación y Configuración

1.  **Clona el repositorio:**
    ```bash
    git clone [https://github.com/tu-usuario/millonario-react.git](https://github.com/tu-usuario/millonario-react.git)
    cd millonario-react
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

4.  **Construye para producción:**
    ```bash
    npm run build
    ```

## 📁 Estructura del Proyecto

```text
src/
├── components/     # Componentes visuales (Timer, Modal, Pyramid)
├── data/           # Archivos JSON de preguntas y premios
├── features/       # Lógica específica (AnswerOption)
├── hooks/          # Custom Hook useGameLogic.js (El cerebro del juego)
└── App.jsx         # Layout principal y orquestador