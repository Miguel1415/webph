# Ticket: TSK-004 - Pulido Profesional y Optimización para AuraPH
**ID:** TSK-004
**Estado:** En Curso
**Prioridad:** Alta
**Asignado a:** Arquitecto de Software / Diseñador UX/UI / Desarrollador Senior / Ingeniero QA

## Descripción
Esta tarea abarca un conjunto de mejoras técnicas y visuales destinadas a elevar el nivel de profesionalismo del portfolio fotográfico AuraPH (`www.auraph.cl`), asegurando una identidad sólida, mejor posicionamiento en buscadores (SEO) y una experiencia de usuario (UX) fluida y de alto rendimiento, especialmente con la carga de contenido multimedia.

## Requerimientos (Criterios de Aceptación)

- [x] **Identidad de Marca (Favicon):**
    - Implementar un favicon visible en la pestaña del navegador para todas las páginas.
    - Asegurar que el formato sea compatible y de alta calidad para Vercel.

- [x] **Optimización SEO (Metadescripciones):**
    - **Index.html:** Definir meta description específica centrada en "Fotografía de Autor", servicios y la marca AuraPH.
    - **Gallery.html:** Definir meta description específica centrada en "Venta de Cuadros" y "Colecciones Fotográficas de AuraPH".
    - **Videos.html:** Definir meta description específica para "Colección de Videos Profesionales".

- [x] **Corrección de Enlaces Salientes:**
    - Configurar todos los enlaces a redes sociales (Instagram, Facebook, LinkedIn) para que abran en una nueva pestaña (`target="_blank"`).
    - Añadir atributo de seguridad `rel="noopener noreferrer"` para prevenir vulnerabilidades.

- [x] **Validación de Navegación:**
    - Verificar que no existan enlaces rotos o placeholders (`#`) en el pie de página o en la navegación principal.

- [ ] **Optimización de Rendimiento (Imágenes y Videos):**
    - Implementar estrategias de carga optimizada para imágenes y videos (ej. lazy loading, formatos modernos como WebP/AVIF, tamaños adaptativos) para mejorar la velocidad de carga del sitio en Vercel.
    - Asegurar que el backend de Node.js (si maneja la entrega de medios) esté optimizado para ello.

- [ ] **Coherencia Visual y UX:**
    - Revisar la interfaz de usuario para asegurar que todos los elementos (botones, tipografías, espaciados) mantengan la coherencia con la identidad de marca de AuraPH.
    - Verificar la fluidez de las micro-interacciones y animaciones.

- [ ] **Accesibilidad (Básica):**
    - Asegurar que los elementos interactivos sean accesibles mediante teclado.
    - Verificar que las imágenes tienen atributos `alt` descriptivos.

## Notas Técnicas
- Los ajustes se realizarán en `index.html`, `gallery.html`, `videos.html` y los archivos CSS/JS correspondientes.
- La implementación debe considerar la eficiencia de carga en el entorno de Vercel.
- La integración con Supabase para metadatos de medios puede ser una consideración para futuras optimizaciones.
