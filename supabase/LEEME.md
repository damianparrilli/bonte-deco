# Bonté App + Supabase

La Bonté App (`/bonteapp`) usa Supabase como base de datos, login de usuarios
y almacenamiento de fotos. La lista de precios es de uso interno: hace falta
iniciar sesión para verla (`/precios` redirige a la app).

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

## Usuarios

Hay dos tipos de usuario:

- **Consulta** (por ejemplo, ventas): solo ve la *Lista de precios*, sin el botón *Editar*.
  Para crearlo: Authentication → Users → **Invite user** con su email. Nada más.
- **Admin**: ve todos los accesos del tarjetero (Lista de precios con el botón *Editar*,
  Productos e Importar / Exportar). Además de invitarlo, agregá su email en SQL Editor:
  `insert into public.admins (email) values ('persona@mail.com');`

Para quitarle el permiso de admin: `delete from public.admins where email = 'persona@mail.com';`
Para quitarle todo acceso: Authentication → Users → borrar el usuario.

## Seguridad

- Solo usuarios **logueados** pueden leer la lista (los visitantes no ven nada).
- Solo los emails de la tabla `admins` pueden crear, editar o borrar productos y fotos.
- La clave `sb_publishable_…` está en el código a propósito: es pública.
  **Nunca** pongas la clave secreta (`sb_secret_…` / `service_role`) en el sitio.
