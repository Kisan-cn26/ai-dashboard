# AI Dashboard

A Next.js 15 + Supabase authentication dashboard with a mock usage/billing analytics view.

## Architecture Decisions

1. **Next.js App Router is the application shell**  
   Routing, layouts, and page-level rendering are handled in `app/`.

2. **Authentication is powered by Supabase SSR + cookie sessions**  
   Supabase clients are split by runtime:
   - Browser client: `lib/supabase/client.ts`
   - Server client: `lib/supabase/server.ts`
   - Request/session refresh logic: `lib/supabase/proxy.ts`, `proxy.ts`

3. **Route protection is enforced at the proxy layer**  
   `/dashboard` is protected and unauthenticated users are redirected to `/auth/login`. Authenticated users are redirected away from public pages to `/dashboard`.

4. **UI data is currently mock-backed with a service boundary**  
   Dashboard data comes from constants (`lib/constants.ts`) through async service functions (`services/actions.ts`) and React Query hooks (`services/hooks.ts`). This keeps the UI decoupled from a future real API.

5. **Client-side data orchestration uses React Query**  
   Global query state is provided via `providers.tsx`, with a non-zero `staleTime` to avoid immediate refetch after hydration.

6. **Hybrid server/client rendering model**  
   - Server components handle auth-aware UI (for example, `components/auth-button.tsx`, `components/greet.tsx`).
   - Client components handle forms, interactivity, chart toggles, and logout.

7. **UI system is Tailwind + shadcn/ui primitives + Recharts**  
   - Design tokens and theme extensions: `tailwind.config.ts`, `app/globals.css`
   - Reusable primitives: `components/ui/*`
   - Analytics visualizations: `components/usage-chart.tsx`

8. **TypeScript strict mode is enabled**  
   Strong typing and path aliasing are configured in `tsconfig.json`.

9. **Environment-driven Supabase configuration**  
   Required variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

10. **Current quality gate is linting (no automated tests yet)**  
   The project defines `npm run lint` but does not currently include unit/integration/e2e test tooling.

## Project Structure

```text
.
├── app/
│   ├── auth/
│   │   ├── confirm/route.ts
│   │   ├── error/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   ├── login/page.tsx
│   │   ├── sign-up/page.tsx
│   │   ├── sign-up-success/page.tsx
│   │   └── update-password/page.tsx
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                    # shadcn/ui primitives
│   ├── auth-button.tsx
│   ├── dashboard-nav.tsx
│   ├── login-form.tsx
│   ├── sign-up-form.tsx
│   ├── forgot-password-form.tsx
│   ├── update-password-form.tsx
│   ├── stats-cards.tsx
│   ├── usage-chart.tsx
│   └── ...
├── lib/
│   ├── constants.ts           # mock dashboard data
│   ├── utils.ts               # helpers + mock API wrapper
│   └── supabase/
│       ├── client.ts
│       ├── server.ts
│       └── proxy.ts
├── services/
│   ├── actions.ts             # async data-access layer
│   └── hooks.ts               # React Query hooks
├── providers.tsx              # QueryClient provider
├── proxy.ts                   # Next.js proxy/matcher
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

## Run Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create `.env.local` from `.env.example` and set:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-or-anon-key
```

### 3. Start development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build and Run Production Locally

```bash
npm run build
npm run start
```
