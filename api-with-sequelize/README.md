# API with Sequelize

REST API using [Sequelize](https://sequelize.org/) ORM with `pg` driver.

Sequelize is a mature, feature-rich ORM that uses an Active Record pattern. Models are defined as classes with `Model.init()` and relationships via `hasMany` / `belongsTo`.

## Key Files

| File | Purpose |
|---|---|
| `src/models/user.ts` | User model definition |
| `src/models/posts.ts` | Post model + associations |
| `src/database/db.ts` | Sequelize instance |
| `migrations/` | Sequelize CLI migrations |
| `config/config.js` | Database config for Sequelize CLI |

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
| `pnpm migration:create` | Create a new migration file |
| `pnpm migrate:undo` | Revert last migration |

## Resources

- https://medium.com/@mghextreme/api-setup-using-nodejs-typescript-postgres-and-sequelize-48a0af72dda6
- https://codevoweb.com/build-a-crud-api-with-nodejs-and-sequelize
