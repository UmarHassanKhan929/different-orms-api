# API with Prisma

REST API using [Prisma](https://www.prisma.io/) as the ORM.

Prisma uses a dedicated `.prisma` schema file to define models and generates a fully type-safe client.

## Key Files

| File | Purpose |
|---|---|
| `prisma/schema.prisma` | Data model definition |
| `prisma/migrations/` | Auto-generated SQL migrations |
| `src/controllers/posts.ts` | Post CRUD using Prisma Client |
| `src/controllers/users.ts` | User operations using Prisma Client |

## Setup

```bash
cp .env.example .env
pnpm install
pnpm migrate:up
pnpm dev
```

## Available Scripts

| Script | Command |
|---|---|
| `pnpm dev` | Start dev server with hot reload |
| `pnpm build` | Compile TypeScript |
| `pnpm generate` | Regenerate Prisma Client |
| `pnpm migrate:up` | Run migrations |
| `pnpm migrate:create` | Create a new migration |

## Resources

- https://medium.com/@hugoandregg/how-to-setup-an-api-with-nodejs-express-typescript-prisma-and-docker-cc5b2df2a5bb
