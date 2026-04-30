# API with Knex

REST API using [Knex.js](https://knexjs.org/) as the SQL query builder with `pg` driver.

Knex is a lightweight SQL query builder (not a full ORM). You write queries that closely resemble SQL, giving you full control while still providing a fluent JavaScript API.

## Key Files

| File | Purpose |
|---|---|
| `knexfile.ts` | Knex configuration (DB connection, migration paths) |
| `db/db.ts` | Knex instance export |
| `db/migrations/` | Migration files |
| `src/controllers/posts.ts` | Post CRUD using Knex query builder |
| `src/controllers/users.ts` | User operations with manual JOINs |

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
| `pnpm migrate` | Run pending migrations |
| `pnpm migration:generate` | Create a new migration file |
| `pnpm migration:undo` | Rollback last migration |

## Resources

- https://blog.openreplay.com/create-a-node-api-with-knex-and-postgresql/
