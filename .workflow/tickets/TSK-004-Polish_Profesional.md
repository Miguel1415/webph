# Ticket: Pulido Profesional y Correcciones Técnicas
**ID:** TSK-004
**Estado:** Completado
**Prioridad:** Alta
**Asignado a:** Arquitecto de Software / Diseñador UX/UI

## Descripción
Esta tarea abarca un conjunto de mejoras técnicas y visuales destinadas a elevar el nivel de profesionalismo del sitio web `auraph.cl`, asegurando una identidad sólida, mejor posicionamiento en buscadores (SEO) y una experiencia de usuario (UX) fluida.

## Requerimientos (Acceptance Criteria)

- [x] **Identidad de Marca (Favicon):**
    - Implementar un favicon (icono de cámara 📷) visible en la pestaña del navegador para todas las páginas.
    - Asegurar que el formato sea compatible (SVG/ICO).

- [x] **Optimización SEO:**
    - **Index.html:** Definir meta description específica centrada en "Fotografía de Autor" y servicios.
    - **Gallery.html:** Definir meta description específica centrada en "Venta de Cuadros" y "Colección".

- [x] **Corrección de Enlaces Salientes:**
    - Configurar todos los enlaces a redes sociales (Instagram, Facebook, LinkedIn) para que abran en una nueva pestaña (`target="_blank"`).
    - Añadir atributo de seguridad `rel="noopener noreferrer"` para prevenir vulnerabilidades de seguridad.

- [x] **Validación de Navegación:**
    - Verificar que no existan enlaces rotos o placeholder (`#`) en el pie de página.

## Notas Técnicas
- Se utilizó un SVG inline para el favicon para minimizar peticiones HTTP.
- Se actualizaron `index.html` y `gallery.html` manteniendo la consistencia de estilos.

# Ticket: Fix Gallery 404 (Build Config)
**ID:** TSK-005
**Estado:** En Progreso
**Prioridad:** Crítica

## Descripción
El despliegue en Vercel devuelve un error 404 al intentar acceder a `/gallery.html`. Esto se debe a que Vite, por defecto, solo incluye `index.html` en el build final si no se especifica lo contrario.

## Solución
- [x] Crear `vite.config.js`.
- [x] Configurar `rollupOptions.input` para incluir tanto `index.html` como `gallery.html`.

# Ticket: Custom Logo Integration
**ID:** TSK-006
**Estado:** En Progreso
**Prioridad:** Alta

## Requerimientos
- [x] Mover imagen subida a `public/assets/images/logo-camera.png`.
- [x] Actualizar Favicon en `index.html` y `gallery.html`.
- [x] Mover imagen subida a `public/assets/images/logo-camera.png`.
- [x] Actualizar Favicon en `index.html` y `gallery.html`.
- [x] Insertar logo en Navbar (REVERTIDO a petición del usuario).
- [x] Eliminar fondo rectangular del logo (No aplicable).
- [x] Reducir tamaño título Hero y botones (30%).
- [ ] Implementar nuevo Favicon Profesional (favicon-pro.png).
- [x] Reemplazar Favicon por imagen V2 (favicon-pro-v2.png) a petición del usuario.
- [x] Actualizar sección "Nosotros" a "Sobre Mí" con nuevo texto.
- [ ] Eliminar efecto visual "Cuadro de Pared" (Frames Mockup).
- [x] Reemplazar Favicon por imagen V2 (favicon-pro-v2.png) a petición del usuario.
