# Arratel SaaS Template

Personal starter template for Arratel SaaS products. It is built with Next.js App Router, React 19, TypeScript, Tailwind CSS 4, Drizzle ORM, Postgres, Stripe, and localized German/English pages.

## What Is Included

- Localized marketing homepage, social links page, FAQ, imprint, privacy, and terms pages
- Product demo area that can be replaced by the real first-use experience
- Email/password authentication with JWT session cookies
- Team dashboard with account, security, billing, members, and activity pages
- Stripe checkout, customer portal, webhook handling, and local mock billing
- Drizzle schema, migrations, seed script, and Docker Postgres helper
- Deployment modes for full SaaS projects or minimal static launches

## First Steps After Copying

1. Update `lib/site-config.ts` with product name, metadata, domain, icons, optional product social profiles, contact, and legal data. Keep `brand` for Arratel as the umbrella brand.
2. Update `lib/i18n/messages.ts` for all visible German and English product copy.
3. Replace the demo product components in `features/pdf-merge-demo` with the real product experience.
4. Copy `.env.example` to `.env` and fill the values for your mode.
5. Run `npm run build` before deploying.

The social links page is available at `/links` for link-in-bio use. It reads product website, contact email, claim, and social profiles from `lib/site-config.ts`. Product socials can override the Arratel brand fallback.

## Deployment Modes

Use `DEPLOYMENT_MODE` to choose how much of the template is active.

### Minimal Mode

Use this for landing pages or early product validation without database, auth, or Stripe.

```bash
DEPLOYMENT_MODE=minimal
BASE_URL=https://arratel.dev
```

Minimal mode keeps the public localized pages available and hides database-dependent app flows.

### Full Mode

Use this for a complete SaaS with auth, teams, dashboard, billing, and activity logging.

```bash
DEPLOYMENT_MODE=full
BASE_URL=https://your-product.arratel.dev
POSTGRES_URL=postgres://...
AUTH_SECRET=dummy
MOCK_STRIPE=true
STRIPE_SECRET_KEY=dummy
STRIPE_WEBHOOK_SECRET=dummy
```

For production billing, set `MOCK_STRIPE=false`, add real Stripe keys, create products/prices in Stripe, and configure the webhook endpoint:

```text
https://your-product.arratel.dev/api/stripe/webhook
```

## Local Development

Install dependencies:

```bash
npm install
```

Start only the local database:

```bash
npm run db:create
```

Run migrations and seed data:

```bash
npm run db:migrate
npm run db:seed
```

Start the dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

Default seeded account:

- Email: `test@test.com`
- Password: `admin123`

## Useful Commands

```bash
npm run dev
npm run build
npm run start
npm run icons -- path/to/source.png
npm run db:create
npm run db:setup
npm run db:generate
npm run db:migrate
npm run db:seed
npm run db:studio
```

## Icons

Export the logo as a square transparent PNG, ideally 512x512 or larger, and save it as:

```txt
assets/icons/source.png
```

Then run:

```bash
npm run icons
```

The script generates:

- `app/favicon.ico`
- `app/icon.png`
- `app/apple-icon.png`

## Environment Variables

See `.env.example`.

Important production values:

- `BASE_URL`: public app URL
- `POSTGRES_URL`: production Postgres connection string
- `AUTH_SECRET`: long random secret for session signing
- `MOCK_STRIPE`: `false` for real Stripe billing
- `STRIPE_SECRET_KEY`: Stripe secret key
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook signing secret

## Legal Notes

The legal content is starter content, not legal advice. The imprint page stays visible in all deployment modes. `lib/site-config.ts` intentionally separates the Arratel umbrella brand, the current product, and the legal provider. Address, phone, representative, commercial register, and VAT ID may stay empty until real data exists. Before launching publicly, review the imprint, privacy policy, and terms for the specific product and jurisdiction.
