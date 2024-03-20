# Repository for Different ORMs & Frameowrks basic APIs

The repository contains APIs made using node, express, typescript and postgress alogn with different ORMs, giving a starting point to user to get started with API template of choice.
The APIs have simple User and Posts models as DB tables, where user can have many posts and posts belongs to one user.

The ERD is attached below.

## Tech Stack Required

Make sure to have following things installed on your system for smooth start

- Docker
- PNPM

## Steps to Follow

- Run `docker compose up` to run a postgres DB instance along with adminer for ease of use.
- PostgreSQL instance is running on port `6500` with following credentials
  - POSTGRES_PASSWORD: `example`
  - POSTGRES_USER: `root`
  - POSTGRES_DB: `example_database`
- Adminer instance is running on port `8080`
- To run any API, update their `ENV` according to choice, run `pnpm install` and `pnpm run dev` to run the API
- Following routes are exposed by all APIs
  - `(GET)` (Get All Posts) `/api/posts/`
  - `(GET)` (Get Single Post) `/api/posts/:id/`
  - `(POST)` (Create Post) `/api/posts/`
    - Req Body { title, content, author_id }
  - `(PATCH)` (Update Post) `/api/posts/:id/`
    - Req Body { title, content }
  - `(DELETE)` (Delete Post) `/api/posts/`
    - Req Body { id } (post id)
  - `(GET)` (Get User Posts) `api/users/:id/posts/`
  - `(POST)` (Create User) `api/users/`
