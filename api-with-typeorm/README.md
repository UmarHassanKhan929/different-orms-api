# API with TypeORM

REST API using [TypeORM](https://typeorm.io/) with decorator-based entities.

TypeORM uses TypeScript decorators to define entities and supports both Active Record and Data Mapper patterns. This project uses the Data Mapper (repository) pattern.

## Key Files

| File | Purpose |
|---|---|
| `src/entity/User.ts` | User entity with decorators |
| `src/entity/Post.ts` | Post entity with decorators |
| `src/data-source.ts` | DataSource configuration |
| `src/migration/` | SQL migrations |

## Setup

```bash
cp .env.example .env
pnpm install
pnpm migration
pnpm dev
```

## Available Scripts

| Script | Command |
|---|---|
| `pnpm dev` | Start dev server with hot reload |
| `pnpm build` | Compile TypeScript |
| `pnpm migration` | Run pending migrations |
| `pnpm migration:generate` | Create a new migration file |
| `pnpm migrate:down` | Revert last migration |

## Resources

- https://medium.com/@christianinyekaka/building-a-rest-api-with-typescript-express-typeorm-authentication-authorization-and-postgres-e87d07d1af08
