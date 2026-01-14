# Guía de Estilo y Lineamientos de Codificación para AuraPH

## 1. Introducción
Este documento define las buenas prácticas y estándares de codificación para el desarrollo del portfolio fotográfico AuraPH. El proyecto se basa en JavaScript (Frontend) y Node.js (Backend). El objetivo es asegurar que el código sea limpio, consistente, mantenible y de alta calidad. Seguir estas guías es obligatorio.

## 2. Principios Generales
- **Idioma del Código:** Nombres de variables, funciones, clases, archivos y rutas deben estar en **Inglés**.
- **Idioma de Comentarios:** Los comentarios explicativos y la documentación (ej. JSDoc) deben estar en **Español**.
- **KISS (Keep It Simple, Stupid):** Prefiere soluciones simples.
- **DRY (Don't Repeat Yourself):** Encapsula lógica reutilizable.
- **Consistencia:** Sigue la convención de nombres estándar de JavaScript/Node.js y las configuraciones de ESLint/Prettier si están definidas.

## 3. Estructura de Archivos y Nomenclatura
- **Directorios/Módulos:** `kebab-case` o `camelCase`. Ejemplo: `src/components/`, `src/utils/`.
- **Archivos JavaScript/TypeScript (`.js`, `.ts`):** `kebab-case` para componentes/módulos, `camelCase` para utilidades/funciones. Ejemplo: `user-profile.js`, `calculateTotal.js`.
- **Archivos de Estilos (`.css`, `.scss`):** `kebab-case`. Ejemplo: `button-primary.css`.
- **Archivos HTML (`.html`):** `kebab-case`. Ejemplo: `about-us.html`.
- **Clases/Componentes (Frontend):** `PascalCase`. Ejemplo: `UserProfile`, `PrimaryButton`.
- **Funciones y Variables:** `camelCase`. Ejemplo: `calculateAverage`, `userCount`.
- **Constantes:** `UPPER_SNAKE_CASE`. Ejemplo: `MAX_ITEMS_PER_PAGE`.
- **Clases CSS (nombres en HTML):** `kebab-case`. Ejemplo: `main-menu`, `btn-primary`.

## 4. Guía de Backend (Node.js)

### Estructura de API
- **Modelos/Esquemas:** Definición de la estructura de datos para la interacción con Supabase (o cualquier otra BBDD).
- **Rutas (Routes):** Definición de los endpoints de la API (ej. usando Express.js o funciones Serverless).
- **Controladores (Controllers):** Lógica de negocio para manejar las peticiones a las rutas.
- **Servicios/Lógica:** Separar la lógica de negocio compleja en módulos de servicio.
- **Middleware:** Para autenticación, validación, etc.

### Documentación (JSDoc)
Todos los módulos y funciones del backend deben estar documentados usando JSDoc en **Español**.

**Documentación a Nivel de Archivo:**
```javascript
/**
 * @file src/api/routes/authRoutes.js
 * @description Define las rutas de autenticación de la API.
 * @author Miguel Olivera Labrin
 */
```

**Documentación a Nivel de Función:**
```javascript
/**
 * Calcula el promedio de una lista de calificaciones.
 *
 * @param {Array<number>} grades - Lista de números flotantes con las calificaciones.
 * @returns {number} El promedio calculado.
 * @throws {Error} Si la lista de calificaciones está vacía.
 */
function calculateAverage(grades) {
    if (!grades || grades.length === 0) {
        throw new Error("La lista de calificaciones no puede estar vacía");
    }
    return grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
}
```

## 5. Guía de Frontend (HTML / CSS / JavaScript)

### Estructura General
-   **Organización por Componentes:** Preferir la organización del código frontend en componentes reutilizables (ej. si se usa React, Vue, Svelte) o módulos de JavaScript vanilla que encapsulen funcionalidad y UI.
-   **Vite:** El proyecto utiliza Vite para el entorno de desarrollo y build, aprovechando sus características de recarga en caliente y optimización.

### Templates HTML
-   Utilizar archivos `.html` planos (como base inicial para el proyecto Vite) que importen los scripts JavaScript principales.
-   Mantener la estructura HTML limpia y semántica.

**Encabezado de Archivo HTML (ej. para `index.html`):**
```html
<!--
    @file index.html
    @description Página principal del portfolio AuraPH.
    @author Miguel Olivera Labrin
-->
```

### Estilos CSS
-   Organizar los estilos de forma modular (ej. siguiendo BEM, CSS Modules, o SCSS parciales) para facilitar el mantenimiento.
-   Priorizar variables CSS (`--var`) para la consistencia del tema.

## 6. Base de Datos (Supabase)
-   La base de datos principal es **Supabase**, utilizada para almacenar información del portfolio (ej. metadatos de imágenes/videos, perfiles).
-   La interacción con Supabase se realizará preferentemente a través del cliente JavaScript de Supabase en el frontend y/o a través del backend de Node.js para operaciones que requieran mayor seguridad o lógica de negocio.
-   Para el backend, se puede utilizar un ORM compatible con Node.js (ej. Knex.js, Prisma) o el cliente de Supabase directamente.
-   Los esquemas de la base de datos deben ser diseñados para optimizar el rendimiento y la escalabilidad del portfolio.

## 7. Trazabilidad de Features (Tickets)
Para mantener la trazabilidad entre los tickets (`TSK-XXX`) y el código, se deben marcar los cambios significativos en el código fuente:

```javascript
// TSK-001: Implementación de la función de carga de imágenes para la galería
function loadGalleryImages() {
    // ... lógica de carga de imágenes
}
```

## 8. Git y Commits
- **Formato:** [Conventional Commits](https://www.conventionalcommits.org/). El mensaje del commit puede ser en inglés o español, pero mantenga consistencia (preferiblemente Español dado los comentarios).
    - `feat:` Nueva funcionalidad.
    - `fix:` Corrección de error.
    - `refactor:` Cambios de código que no alteran funcionalidad.
    - `docs:` Cambios en documentación.
