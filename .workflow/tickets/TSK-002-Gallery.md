# TSK-002: Implementación de la Sección de Galería (AuraPH)

## Descripción
Transformar y ampliar la sección de galería para exhibir el portafolio fotográfico de AuraPH, con un enfoque en la presentación profesional de "Fine Art" y otras categorías. La galería debe ser capaz de cargar y mostrar colecciones de imágenes de forma eficiente, idealmente preparándose para una gestión futura desde Supabase.

## Requisitos
1.  **Header**: Título de la sección como "Colecciones Fotográficas" o similar, con una breve descripción.
2.  **Layout**: Grid adaptable mostrando las diferentes colecciones (Paisajes, Cuadros, Sesiones, Deportiva, Fauna, Familiar, Productos).
3.  **Filtrado por Categorías**: Implementar un sistema de filtros (ya iniciado en `gallery.html`) para las categorías principales y subcategorías (ej. para fotografía deportiva).
4.  **Estructura de Ítem de Galería**: Cada ítem debe incluir:
    -   Imagen de alta calidad.
    -   Título (`h3`).
    -   Descripción/Subtítulo (`p.collection-desc`).
    -   Llamada a la Acción: "Ver Detalles" (Link).
5.  **Styling**:
    -   Mantener la lógica del Tema Oscuro del sitio.
    -   Adaptar la estética para realzar las fotografías, utilizando efectos de hover elegantes (zoom/fade) y asegurando que las imágenes verticales no se recorten (`object-fit: contain`).
6.  **Responsiveness**: Layout adaptable a dispositivos móviles (1 columna), tablets y escritorios (2-3 columnas).
7.  **Preparación para Datos Dinámicos**: La estructura HTML de la galería debe estar preparada para cargar los ítems de forma dinámica, anticipando el uso de Node.js como backend para la gestión de datos de imágenes y Supabase como base de datos.
8.  **Nuevas Categorías Integradas**: Asegurar que las categorías ya definidas (Sesiones, Fotografía deportiva con sus subcategorías, Fauna, Familiar, Productos) se muestren correctamente y sean funcionales.

## Criterios de Aceptación
- [ ] La sección de galería se muestra con la estética profesional de "Colecciones Fotográficas".
- [ ] El sistema de filtros por categorías funciona correctamente, mostrando los ítems relevantes.
- [ ] Los efectos de hover y la visualización de imágenes (sin recortes) funcionan fluidamente.
- [ ] El diseño es completamente responsive.
- [ ] La estructura de cada ítem de galería permite la fácil integración de datos desde un backend (Node.js/Supabase).
- [ ] Todos los ítems de galería existentes se muestran correctamente bajo sus respectivas categorías/subcategorías.
