# Bonté App + Supabase

La app de productos (`/bonteapp`) y la lista de precios online (`/precios`)
usan Supabase como base de datos, login de usuarios y almacenamiento de fotos.

## Instalación (una sola vez)

1. Supabase → **SQL Editor** → *New query* → pegar todo `instalar.sql`.
2. En la línea `('TU_EMAIL@ejemplo.com')` poner tu email → **Run**.
   El script crea las tablas, la seguridad, el bucket de fotos y carga la
   lista de precios de noviembre 2026. Se puede volver a correr sin duplicar.
3. **Authentication → URL Configuration**:
   - *Site URL*: `https://bontedeco.netlify.app/bonteapp`
   - *Redirect URLs*: agregar `https://bontedeco.netlify.app/bonteapp` y
     `http://localhost:4321/bonteapp` (para probar en la compu).
4. **Authentication → Sign In / Providers → Email**: desactivar
   *Allow new users to sign up* (los usuarios se invitan).
5. **Authentication → Users → Invite user** con tu email. Te llega un mail:
   el link abre `/bonteapp` y te pide elegir la contraseña.

## Agregar otra persona

1. SQL Editor: `insert into public.admins (email) values ('persona@mail.com');`
2. Authentication → Users → **Invite user** con ese email.

Para sacarle el acceso: `delete from public.admins where email = 'persona@mail.com';`

## Seguridad

- Cualquiera puede **leer** productos y variantes publicadas (es la lista de precios pública).
- Solo los emails de la tabla `admins` pueden crear, editar o borrar productos y fotos.
- La clave `sb_publishable_…` está en el código a propósito: es pública.
  **Nunca** pongas la clave secreta (`sb_secret_…` / `service_role`) en el sitio.
