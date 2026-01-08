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

> [!NOTE]
> La propagación de DNS puede tardar desde unos minutos hasta 48 horas, aunque usualmente con Vercel y NIC Chile es bastante rápido (menos de 2 horas).

## 3. Certificado SSL
Vercel generará automáticamente el certificado SSL (HTTPS) una vez que los DNS apunten correctamente. No es necesario realizar pasos adicionales.
