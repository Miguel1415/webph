# Ticket: TSK-005 - Corrección de Error 404 en Galería (Configuración de Build)
**ID:** TSK-005
**Estado:** Completado
**Prioridad:** Crítica
**Asignado a:** Arquitecto de Software / Desarrollador Senior

## Descripción
El despliegue del portfolio fotográfico AuraPH en Vercel devolvía un error 404 al intentar acceder a `/gallery.html`. Esto se debía a que Vite, por defecto, solo incluye `index.html` en el build final si no se especifica explícitamente la entrada para múltiples páginas.

## Solución Implementada
- [x] Se creó el archivo `vite.config.js`.
- [x] Se configuró `rollupOptions.input` para incluir tanto `index.html` como `gallery.html`, asegurando que ambos se incluyan en el build de producción.

## Criterios de Aceptación
- [x] La página `gallery.html` es accesible en el entorno de producción de Vercel sin errores 404.
- [x] La configuración de build en `vite.config.js` maneja correctamente múltiples puntos de entrada HTML.
