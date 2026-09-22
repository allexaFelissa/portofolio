# Allexa Portfolio

Next.js portfolio with owner-editable content in `src/content/site-content.ts`, grounded Gemini chat, and Resend-backed contact delivery.

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and provide `GEMINI_API_KEY`, `MAIL_API_KEY`, `MAIL_FROM`, and `MAIL_TO`. These values are server-only; never prefix them with `NEXT_PUBLIC_`. Add the same variables in the Vercel project settings before deployment.

Quality checks: `npm test`, `npm run typecheck`, and `npm run build`.
