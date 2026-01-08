# Prompt para Estructurar el Directorio .workflow

## 1. Contexto y Objetivos del Proyecto

**Descripción del Proyecto:**
`[Pagina web de fotografia, en la cual se expondrán fotografias de eventos, para que los usuarios puedan comprar, además de cuadros a la venta`

**Objetivos Principales:**
`[Aquí van los objetivos de negocio o de producto. Ej:
1. dar a conocer mi trabajo en el area de la fotografía.
2. que los usuarios puedan comprar mis fotografías.
3. que los usuarios puedan comprar mis cuadros.`

**Prefijo para Identificadores de Features/Tickets:**
TSK

---

## 2. Instrucciones para la IA

Tu tarea es crear una estructura de directorios y archivos profesional y escalable dentro de la carpeta `.workflow` para gestionar la documentación, roles, features y lineamientos de este proyecto.

### Paso 1: Análisis del Contexto (Si aplica)
Si el proyecto ya tiene archivos (como en este caso), primero analiza la estructura existente para entender el contexto, las tecnologías utilizadas y las convenciones actuales. Adapta las sugerencias a lo que ya existe.

### Paso 2: Creación de la Estructura de Directorios
Crea la siguiente estructura de carpetas dentro de `.workflow` si no existen:
- `roles`: Para describir los roles y responsabilidades del equipo.
- `tickets`: Para la documentación detallada de cada ticket de trabajo (usando el prefijo definido).
- `guidelines`: Para centralizar los estándares de codificación, documentación y diseño.
- `proposals`: Para borrador de propuestas técnicas o de nuevas funcionalidades antes de que se conviertan en `tickets`.
- `tests`: Para almacenar planes de prueba, casos de uso y documentación de QA.

### Paso 3: Creación de Archivos Esenciales
Crea los siguientes archivos con contenido base:

**1. Rol del Ayudante Jefe de Producto (Obligatorio):**
- **Archivo:** `.workflow/roles/Rol_Ayudante_Jefe_Producto.md`
- **Contenido:**
  ```markdown
  # Rol: Ayudante Jefe de Producto

  ## Misión Principal
  Actuar como el puente entre la visión del producto y el equipo de desarrollo. Es responsable de definir, priorizar y comunicar los requisitos de las nuevas funcionalidades, asegurando que cada incremento de valor esté alineado con los objetivos del negocio.

  ## Responsabilidades Clave
  - **Gestión del Backlog:** Crear, mantener y priorizar el backlog de producto.
  - **Redacción de Tickets:** Escribir los tickets de trabajo (Features/Historias de Usuario) con criterios de aceptación claros y concisos.
  - **Comunicación:** Ser el principal punto de contacto para el equipo de desarrollo sobre dudas funcionales.
  - **Validación:** Validar que las funcionalidades desarrolladas cumplen con los requisitos definidos.
  - **Alineación con Stakeholders:** Asegurar que el desarrollo del producto responde a las necesidades de los usuarios y del negocio.
  ```

**2. Otros Roles Sugeridos (Opcional, crear vacíos):**
- `.workflow/roles/Rol_Desarrollador_Senior.md`
- `.workflow/roles/Rol_Arquitecto_Software.md`
- `.workflow/roles/Rol_Ingeniero_QA.md`
- `.workflow/roles/Rol_Disenador_UX_UI.md`

**3. Lineamientos de Codificación (Todos los roles deben guiarse por los lineamientos de codificación):**
- **Archivo:** `.workflow/guidelines/coding_guidelines.md`
- **Contenido:**
  ```markdown
  # Guía de Estilo y Lineamientos de Codificación

  ## Principios Generales
  1. **Consistencia:** El código debe seguir las convenciones del proyecto existente.
  2. **Claridad sobre Concisión:** Escribe código que sea fácil de entender para otros desarrolladores.
  3. **Modularidad:** Favorece la creación de componentes y funciones pequeñas y reutilizables.

  ## Nomenclatura (Si el proyecto ya existe, debe seguirlos lineamientos actuales del proyecto)
  - **Variables y Funciones:** `camelCase`
  - **Clases y Componentes:** `PascalCase`
  - **Constantes:** `UPPER_SNAKE_CASE`

  ## Comentarios
  - Usa comentarios para explicar el *porqué* del código, no el *qué*.
  - Evita comentarios obvios. El código debe ser auto-explicativo.

  ## Pruebas
  - Toda nueva funcionalidad debe ir acompañada de sus pruebas unitarias o de integración correspondientes.

  *Esta guía debe ser actualizada a medida que el proyecto evoluciona.*
  ```

**4. README del Workflow:**
- **Archivo:** `.workflow/README.md`
- **Contenido:**
  ```markdown
  # Documentación del Workflow del Proyecto

  Este directorio contiene toda la documentación funcional y técnica relacionada con el proceso de desarrollo de este proyecto. Su objetivo es centralizar el conocimiento y estandarizar nuestras prácticas.

  - **/tickets**: Contiene la especificación de cada ticket de trabajo.
  - **/guidelines**: Almacena las guías de estilo, estándares de codificación y otras convenciones.
  - **/proposals**: Borradores y propuestas para nuevas funcionalidades o cambios arquitectónicos.
  - **/roles**: Define las responsabilidades de cada miembro del equipo.
  - **/tests**: Documentación relacionada con la estrategia y planes de Quality Assurance.

  Mantener esta documentación actualizada es responsabilidad de todo el equipo.
  ```

### Paso 4: Confirmación
Antes de crear los archivos, presenta un resumen en formato de árbol de la estructura final que vas a generar para mi aprobación.
