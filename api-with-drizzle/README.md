# API with Drizzle

REST API using [Drizzle ORM](https://orm.drizzle.team/) with the `pg` driver.

Drizzle defines schemas in TypeScript using a functional table builder, with SQL-like query syntax and full type inference.

## Key Files

| File | Purpose |
|---|---|
| `src/db/schema/index.ts` | Table definitions + relations |
| `src/db/drizzle/` | Auto-generated SQL migrations |
| `src/db/index.ts` | Database connection pool |
| `src/db/migrate.ts` | Migration runner |
| `drizzle.config.ts` | Drizzle Kit configuration |

## Setup

```bash
cp .env.example .env
pnpm install
pnpm migrate
pnpm dev
```

## Available Scripts

| Script | Command |
|---|---|
| `pnpm dev` | Start dev server with hot reload |
| `pnpm build` | Compile TypeScript |
| `pnpm generate` | Generate migrations from schema changes |
| `pnpm migrate` | Run pending migrations |
| `pnpm studio` | Open Drizzle Studio (DB GUI) |

## Resources

- https://www.youtube.com/watch?v=Eljdg5_EgOI
