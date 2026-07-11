# NXTDES | Next Destination

<img width="1512" alt="Screenshot 2024-06-30 at 12 00 48" src="https://github.com/RobArkesteijn/NXTDES-Next-Destination/assets/106165450/c49eee7b-ed01-4aae-882f-9c1f281c0428">

Monorepo managed with **pnpm** workspaces + **Turborepo**. The Nuxt app lives in
`packages/web`. See [`docs/MIGRATION_PLAN.md`](docs/MIGRATION_PLAN.md) for the
ongoing migration.

## Setup

Copy `packages/web/.env` and create a `packages/web/.env.local`.
Make sure to add the correct values for the env variables.

Requires Node 20 and pnpm 10. Install the dependencies from the repo root:

```bash
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
pnpm preview
```
