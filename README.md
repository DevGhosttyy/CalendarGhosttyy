# Calendario PWA – GitHub Pages + Supabase

## 1) Requisitos
- Node 20 + pnpm
- Cuenta GitHub (Pages activado)
- Proyecto Supabase (URL + ANON KEY, Service Role KEY)

## 2) Configurar Supabase
1. Crea un proyecto y copia `SUPABASE_URL` y claves.
2. En SQL Editor, ejecuta **`supabase/migrations/001_init.sql`** (tablas + RLS).
3. Activa providers de **Auth** (email/password y OAuth si quieres).
4. **Edge Functions**: instala CLI `supabase`, luego:
   ```bash
   supabase functions deploy events
   supabase functions deploy events/[id]
   supabase functions deploy import-ics
   supabase functions deploy export-ics
   supabase functions deploy subscriptions/push
   supabase functions deploy cron-send-reminders
   ```
   Obtén la URL base de funciones: `https://<ref>.functions.supabase.co`.

## 3) Configurar el frontend
1. Copia `.env.example` a `.env` y completa:
   ```bash
   VITE_SUPABASE_URL=...
   VITE_SUPABASE_ANON_KEY=...
   VITE_EDGE_URL=https://<ref>.functions.supabase.co
   VITE_VAPID_PUBLIC_KEY=<clave pública VAPID>
   ```
2. Edita `vite.config.ts` → `base: '/<tu-repo>/'` y `manifest.start_url` si el repo no es `calendar-app`.

## 4) Ejecutar en local
```bash
pnpm i
pnpm dev
```
Abre `http://localhost:5173`.

## 5) Desplegar a GitHub Pages
1. Crea repo y sube el código a rama **main**.
2. En GitHub **Settings → Secrets and variables → Actions**, añade:
   - `SUPABASE_EDGE_URL` = `https://<ref>.functions.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY` = (Service Role) para el cron (**no exponer en frontend**).
3. En **Settings → Pages**, Source: **GitHub Actions**.
4. Push a `main`. El workflow **Deploy to GitHub Pages** publicará `dist`.

## 6) Cron de recordatorios
El workflow **Send reminders cron** ejecuta cada 5 minutos y hace `curl` a `cron-send-reminders`. Ajusta la lógica de envío en `supabase/functions/cron-send-reminders/` y las claves (`RESEND_API_KEY`, VAPID) como **Variables** de Supabase.

## 7) PWA y Offline
- PWA con `vite-plugin-pwa`.
- Cache `GET /api/events` (rango) y cola de mutaciones básica (Background Sync).

## 8) Notas de seguridad
- Las Edge Functions usan `SERVICE_ROLE_KEY`. Mantener **solo** en el runtime de Supabase o en GitHub Actions (cron). Nunca en el frontend.
- Sanitiza `description` en el backend si aceptas rich text.

## 9) Roadmap inmediato
- Implementar Auth UI (Supabase Auth) en `src/pages/AuthPage.tsx`.
- Completar CRUD en Edge Functions (POST / PATCH “solo instancia/serie/desde aquí”).
- Implementar import/export ICS en funciones `import-ics` y `export-ics`.
- Añadir Web Push almacén de suscripciones y envío real.
- Tests E2E (Playwright) con escenarios: drag/resize, offline+sync.

## 10) Scripts útiles
```bash
pnpm build           # construye
pnpm preview         # sirve dist
pnpm test            # unit tests
```
