# Disunity

Disunity, a Discord alike.

## What is Disunity?

Disunity is a Discord alike, but it's open source and free. It's a project that I'm working on, and I'm hoping to get it to a point where it's usable. It's not there yet, but it's getting there.

## Tech Stack

- Electron
- SvelteKit
- NestJS
- Prisma
- PostgreSQL
- Docker-compose
- Jwt

## How to run

### Prerequisites

- Docker
- Docker-compose

### Running

1. Clone the repo

2. Run the api

```bash
$ cd disunity

$ cd api

$ npm install

$ docker-compose up -d

$ npm run start:dev
```

3. Run the frontend

```bash
$ cd disunity

$ cd svelte

$ npm install

$ npm run dev
```
