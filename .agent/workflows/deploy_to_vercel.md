---
description: Guía paso a paso para desplegar en Vercel y conectar tu dominio .cl
---

# Despliegue en Vercel con Dominio NIC Chile

Sigue estos pasos para poner tu sitio web en línea.

## 1. Preparación del Código (Git)

Si aún no has subido tu código a GitHub:

1.  Crea una cuenta en [GitHub.com](https://github.com) si no tienes una.
2.  Crea un **Nuevo Repositorio** (público o privado).
3.  Sube tu código actual:
    ```bash
    git init
    git add .
    git commit -m "Versión inicial para despliegue"
    git branch -M main
    git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
    git push -u origin main
    ```

## 2. Creación del Proyecto en Vercel

1.  Ve a [Vercel.com](https://vercel.com) y regístrate (puedes usar tu cuenta de GitHub).
2.  En el Dashboard, haz clic en **"Add New..."** > **"Project"**.
3.  Selecciona **"Continue with GitHub"** e importa el repositorio que acabas de crear.
4.  **Configuración del Build**:
    -   **Framework Preset**: Vite
    -   **Root Directory**: `./` (o déjalo en blanco si está en la raíz)
    -   **Build Command**: `npm run build`
    -   **Output Directory**: `dist`
5.  Haz clic en **"Deploy"**.

## 3. Conexión del Dominio (NIC Chile)

Una vez desplegado el sitio:

1.  En Vercel, ve a la pestaña **Settings** > **Domains**.
2.  Escribe `auraph.cl` y haz clic en **Add**.
3.  Vercel te mostrará una configuración inválida y te sugerirá usar **Nameservers**. Copia los valores que te da (usualmente son algo como `ns1.vercel-dns.com` y `ns2.vercel-dns.com`).

## 4. Configuración en NIC Chile

1.  Ingresa a [clientes.nic.cl](https://clientes.nic.cl/registrar/logon.do).
2.  Selecciona tu dominio `auraph.cl`.
3.  Busca la sección de **Servidores de Nombre (DNS)** (a veces llamada "Configuración Técnica").
4.  **REEMPLAZA** los servidores existentes con los que copiaste de Vercel.
5.  Guarda los cambios.

> **Importante**: La propagación global puede tardar hasta 24 horas, pero generalmente funciona en menos de 1 hora. Vercel generará automáticamente tu certificado SSL (el candadito seguro HTTPS).
