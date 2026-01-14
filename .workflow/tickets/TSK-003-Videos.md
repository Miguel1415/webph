# TSK-003: Implementación de la Página de Videos (AuraPH)

## Objetivo
Crear y poblar la nueva página `videos.html` con una colección de videos profesionales. La página debe estar preparada para cargar videos dinámicamente y ofrecer una experiencia de visualización atractiva y organizada.

## Descripción
La sección de videos en `index.html` (ahora un simple placeholder) será reemplazada por una página dedicada (`videos.html`) que mostrará los videos del portfolio. Esta página debe ser capaz de integrar múltiples videos que el fotógrafo subirá en el futuro, con metadatos (título, descripción) que podrían ser gestionados a través de un backend de Node.js y almacenados en Supabase.

## Requisitos
1.  **Estructura de Página:** La página `videos.html` debe mantener la navegación y footer del sitio, e incluir una sección principal para la visualización de videos.
2.  **Grid de Videos:** Implementar un layout de grid para mostrar múltiples videos, similar a la galería de imágenes, pero adaptado para contenido audiovisual.
3.  **Reproductor de Video:** Integrar un reproductor de video con controles básicos (play/pause, volumen, pantalla completa).
4.  **Metadatos de Video:** Cada video debe tener un título y una descripción.
5.  **Preparación para Datos Dinámicos:** La estructura HTML/JS debe permitir la carga dinámica de videos desde una fuente de datos (anticipando Node.js y Supabase).
6.  **Styling Profesional:** Asegurar que los videos y sus metadatos se presenten de manera atractiva y profesional, siguiendo la estética de AuraPH.
7.  **Responsividad:** Adaptabilidad total a diferentes tamaños de pantalla.

## Checklist
- [ ] La página `videos.html` está creada con la estructura básica (header, navbar, footer).
- [ ] El enlace "Videos" en la navegación apunta a `videos.html`.
- [ ] La página `videos.html` contiene una sección de videos con un layout de grid.
- [ ] Se incluye al menos un video de ejemplo (`/videos/RIO PEULLA.mp4`) con su título y descripción.
- [ ] El reproductor de video muestra los controles adecuados y el video no se recorta.
- [ ] La estructura está preparada para añadir más videos dinámicamente.
- [ ] El diseño es responsive y sigue la estética del sitio.
