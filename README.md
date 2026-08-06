# Trail Guide

A small Express application for browsing hiking trails, built as a backend recap project. It combines routing, middleware, the MVC pattern, Nunjucks templating, and SQLite into a single working application.

## What it does

Trail Guide has three surfaces sharing the same Express app, the same SQLite database, and the same model layer:

- **Public website** — browse all trails, view a single trail's details, and browse trails grouped by region
- **Admin panel** — create, edit, and delete trails through HTML forms, mounted at `/admin`
- **REST API** — read and write trail and region data as JSON, mounted at `/api`. Read endpoints are open; write endpoints require an `x-api-key` header

The data model has two tables: `regions` (e.g. "Bavarian Alps") and `trails`, which reference their region through a foreign key.

## Tech stack

- Express
- TypeScript
- Nunjucks (templating)
- pico.css (class-less styling)
- SQLite (`sqlite` + `sqlite3`)
- Bun (runtime and package manager)
- nodemon (dev-mode restarts for template and asset changes)

## Getting started

1. Clone the repo and install dependencies:

```bash
   bun install
```

2. Copy the example environment file and fill in your own values:

```bash
   cp .env.example .env
```

3. Seed the database:

```bash
   bun run db:seed
```

4. Start the dev server:

```bash
   bun run dev
```

## Project structure

```
src/
  app.ts
  routes/
  controllers/
  models/
  middleware/
views/
  macros/
  admin/
public/
data/
```

## API

All write endpoints (`POST`, `PATCH`, `DELETE`) require an `x-api-key` header matching the `API_KEY` value in `.env`.

| Method | Route                       | Description                                                     |
| ------ | --------------------------- | --------------------------------------------------------------- |
| GET    | `/api/trails`               | List all trails, optional `?region=` and `?difficulty=` filters |
| GET    | `/api/trails/:slug`         | Get a single trail with its region                              |
| GET    | `/api/regions`              | List all regions                                                |
| GET    | `/api/regions/:slug/trails` | List trails belonging to one region                             |
| POST   | `/api/trails`               | Create a trail                                                  |
| PATCH  | `/api/trails/:id`           | Update a trail                                                  |
| DELETE | `/api/trails/:id`           | Delete a trail                                                  |

```

```
