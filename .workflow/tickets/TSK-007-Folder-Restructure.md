# Ticket: TSK-007 - Reestructuración de Carpetas por Frontend/Backend (AuraPH)

**Nombre:** TSK-007
**Estado:** En Curso
**Fecha Inicio:** 2026-01-13
**Fecha Finalización:**(Pendiente)
**Prioridad:** Media

## Descripción
- **Contexto del Negocio:** Para el portfolio fotográfico AuraPH, una estructura de proyecto clara y bien definida es fundamental para la eficiencia del equipo, especialmente al escalar y al introducir nuevas funcionalidades como el backend de Node.js y la gestión de contenido con Supabase. Una organización lógica de las carpetas facilita la incorporación de nuevos miembros, reduce la curva de aprendizaje y mejora la gestión general del proyecto.
- **Funcionalidad/Servicios:** Esta reestructuración no introduce nuevas funcionalidades directas al usuario final. Su impacto es interno, mejorando la organización del código fuente, los activos estáticos y los scripts de configuración, lo cual impacta positivamente en la mantenibilidad, escalabilidad, rendimiento del desarrollo del frontend (Vite/HTML/CSS/JS) y del backend (Node.js).

## Propuesta de Estructura de Carpetas

La siguiente estructura propone una clara separación entre el frontend y el backend, lo cual es ideal para proyectos modernos que utilizan un API.

```
.
├── .git/
├── .github/              # GitHub Actions o workflows de CI/CD (ej. para Vercel)
├── .workflow/            # Documentación del workflow (este directorio)
├── backend/              # Código del backend (Node.js)
│   ├── src/              # Código fuente del backend
│   │   ├── api/          # Rutas/controladores de la API (ej. Express.js)
│   │   ├── services/     # Lógica de negocio
│   │   ├── models/       # Modelos/esquemas de datos (para interacción con Supabase)
│   │   └── utils/        # Funciones de utilidad
│   ├── .env.example      # Ejemplo de variables de entorno
│   ├── package.json      # Dependencias y scripts del backend
│   └── ...               # Otros archivos de configuración del backend (ej. tsconfig.json si es TypeScript)
├── frontend/             # Código del frontend (HTML/CSS/JS con Vite)
│   ├── public/           # Activos estáticos (imágenes, videos, favicon, etc.)
│   │   ├── assets/       # Organizado por tipo, ej. assets/images/clientes, assets/videos
│   │   └── ...
│   ├── src/              # Código fuente del frontend
│   │   ├── css/          # Archivos CSS
│   │   ├── js/           # Archivos JavaScript (o TypeScript)
│   │   ├── components/   # Si se usa un framework como React, Vue, etc.
│   │   └── ...
│   ├── index.html        # Página principal del frontend
│   ├── gallery.html      # Página de la galería
│   ├── videos.html       # Página de videos
│   ├── vite.config.js    # Configuración de Vite
│   ├── package.json      # Dependencias y scripts del frontend
│   └── ...               # Otros archivos de configuración del frontend
├── node_modules/         # Dependencias globales/de herramientas de la raíz (si aplica)
├── package.json          # package.json de la raíz (para gestión de monorepo o scripts globales)
├── package-lock.json
├── .gitignore
├── README.md             # README del proyecto (nivel alto)
└── ...
```

## Historia de Usuario
- **Como** arquitecto de software y desarrollador,
- **Quiero** que la estructura de carpetas del proyecto AuraPH esté claramente diferenciada entre frontend y backend,
- **Para** mejorar la claridad del código, facilitar la navegación por el proyecto, optimizar el proceso de desarrollo y despliegue, y preparar el proyecto para futuras expansiones (ej. integración de un framework de frontend más robusto y mejor gestión de los servicios de Node.js).

## Requisitos Mínimos Viables (MVP)
- [ ] Creación de una carpeta `frontend/` en la raíz del proyecto que contenga todo el código del cliente (HTML, CSS, JavaScript y la configuración de Vite).
- [ ] Creación de una carpeta `backend/` en la raíz del proyecto que contenga todo el código del servidor (archivos Node.js y configuraciones específicas).
- [ ] Reubicación de la carpeta `public/` (que contiene los activos estáticos como imágenes y videos) dentro de `frontend/` (ej. `frontend/public/`).
- [ ] Actualización de todas las rutas de importación, referencias de archivos (ej. en HTML, CSS, JavaScript) y configuraciones (ej. `vite.config.js`) para reflejar la nueva estructura de carpetas.
- [ ] Verificación de que la aplicación se construye (`npm run build`) y se ejecuta (`npm run dev`) correctamente desde la nueva estructura (una vez resueltos los problemas de ejecución del servidor).

## Trazabilidad de Roles y Tareas

**Rol: Ayudante Jefe de Producto**
- [ ] Validar que la nueva estructura de carpetas satisface la necesidad de claridad y organización para la gestión del proyecto.

**Rol: Arquitecto de Software**
- [x] Definir la estructura de alto nivel de las nuevas carpetas `frontend/` y `backend/`.
- [x] Validar la propuesta de reestructuración con respecto a la escalabilidad, la separación de responsabilidades y las mejores prácticas de desarrollo.
    - **Validación:** La propuesta de estructura de carpetas ha sido validada y aprobada. Cumple con los requisitos de escalabilidad, separación de responsabilidades y se alinea con las mejores prácticas de desarrollo para una aplicación moderna con frontend y backend separados.

**Rol: Desarrollador Senior**
- [x] Ejecutar la reorganización física de archivos y directorios.
- [x] Actualizar todas las rutas internas y referencias en el código base (frontend y backend).
    - **Implementación:** Se ha completado la reestructuración física de carpetas (`frontend/`, `backend/`). Se han verificado todas las rutas internas en el frontend (HTML, CSS, JS, Vite config). Se ha añadido una sección de galería destacada en `frontend/index.html` según las recomendaciones, se han integrado dos nuevos videos en `frontend/videos.html`, y se ha reordenado la página de inicio para mostrar la galería de fotos antes de la sección audiovisual.
- [ ] Realizar pruebas de integración exhaustivas para asegurar que la aplicación funciona post-reestructuración y que no se han introducido regresiones.

**Rol: Ingeniero DevOps**
- [ ] Revisar las implicaciones de la nueva estructura para el `vite.config.js` y el proceso de despliegue continuo en Vercel.
- [ ] Actualizar scripts de build/deploy y configuraciones de Vercel si fuera necesario para adaptarse a la nueva organización.

**Rol: Ingeniero QA**
- [ ] Realizar pruebas de humo y pruebas funcionales completas en los entornos de desarrollo y compilación para verificar que la aplicación funciona correctamente y que todos los activos (imágenes, videos, estilos) se cargan adecuadamente desde la nueva estructura.
- [ ] Reportar cualquier anomalía en la carga de recursos o funcionamiento general de la aplicación.

**Rol: Refinador Técnico**
- [x] **Análisis Pre-Desarrollo:** Velar por que la propuesta de reestructuración cumpla con la `Guía de Estilo y Lineamientos de Codificación para AuraPH` (`@.workflow/guidelines/coding_guidelines.md`).
- [x] **Identificación de Alcance:** Identificar todos los archivos (`.html`, `.css`, `.js`, archivos de Node.js, `vite.config.js`, etc.) que se verán afectados por la reestructuración antes de que comience el desarrollo.
- [ ] **Validación Post-Desarrollo:** Validar los cambios una vez realizada la reestructuración, asegurando que se cumplen los lineamientos de codificación y que la trazabilidad de rutas es correcta.