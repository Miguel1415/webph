# Guía de Despliegue y Configuración de Dominio

Esta guía detalla el proceso para desplegar la web en Vercel e integrar un dominio de NIC Chile (`.cl`).

## 1. Despliegue en Vercel
1. Conecta tu repositorio de GitHub a [Vercel](https://vercel.com).
2. Asegúrate de que el "Build Command" sea `npm run build` y el "Output Directory" sea `dist`.

## 2. Configuración de Dominio (NIC Chile)

Para el dominio `auraph.cl`, recomendamos el método de **Nameservers** por su facilidad de gestión:

### Paso A: En Vercel
1. Ve a **Project Settings** > **Domains**.
2. Agrega `auraph.cl`.
3. Vercel detectará que el dominio no está apuntando y te dará una lista de **Nameservers** (ej: `ns1.vercel-dns.com`, `ns2.vercel-dns.com`).

### Paso B: En NIC Chile
1. Ingresa a tu cuenta en [nic.cl](https://www.nic.cl).
2. Haz clic en el dominio `auraph.cl`.
3. Busca la sección **"Configuración técnica"** o **"Servidores de Nombre (DNS)"**.
4. Borra los que existan y agrega los que te entregó Vercel.
5. Haz clic en **"Actualizar datos del dominio"**.

## 4. Consideraciones de Backend (Node.js)

Si el proyecto incluye un backend en Node.js, Vercel lo detectará automáticamente y lo desplegará como funciones Serverless (sin servidor). Asegúrate de que tu `package.json` tenga los scripts adecuados y que los puntos de entrada de tus funciones (API routes) sigan la estructura de Vercel (ej: `api/*.js`).

## 5. Integración con Base de Datos (Supabase)

Para conectar tu aplicación a Supabase, necesitarás configurar variables de entorno en Vercel.

### Paso A: Obtener Credenciales de Supabase
1. Ingresa a tu proyecto en [Supabase](https://supabase.com/).
2. Ve a **Project Settings** > **API**.
3. Copia tu `anon public key` y tu `service role key` (mantén esta última segura).
4. Copia también tu URL de la API.

### Paso B: Configurar Variables de Entorno en Vercel
1. En tu proyecto de Vercel, ve a **Settings** > **Environment Variables**.
2. Agrega las siguientes variables (ajusta los nombres según tu implementación):
    - `SUPABASE_URL`: `[Tu URL de la API de Supabase]`
    - `SUPABASE_ANON_KEY`: `[Tu anon public key de Supabase]`
    - `SUPABASE_SERVICE_ROLE_KEY`: `[Tu service role key de Supabase]` (usar solo en entornos seguros y si tu backend lo requiere para operaciones privilegiadas)
3. Asegúrate de que estas variables estén disponibles para los entornos de "Development", "Preview" y "Production" según sea necesario.
