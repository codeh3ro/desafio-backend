<h1 align="center">Desafio Técnico(Backend) </h1>

<h2>Tecnologias utilizadas</h2>

- [TypeScript](https://www.typescriptlang.org/) <img width="30" align="center" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" />

- [NodeJS](https://nodejs.org/pt) <img width="30" align="center" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" />

- [Fastify](https://fastify.dev/) <img src="https://avatars.githubusercontent.com/u/24939410?s=200&v=4" width="30" align="center" />

- [Zod](https://zod.dev) <img src="https://zod.dev/logo.svg" width="30" align="center" />

- [SQLite](https://sqlite.org/) <img width="30" align="center" src="https://avatars.githubusercontent.com/u/48680494?v=4" />

- [Prisma ORM](https://www.prisma.io/) <img src="https://avatars.githubusercontent.com/u/17219288?s=200&v=4" width="30" align="center" />


<h2>Como rodar a aplicação</h2>

<h4>Pré-requistos:</h4>

- Node instalado v20.16 (LTS)

Pelo terminal, clone este repositório com o comando:

- `git clone https://github.com/codeh3ro/desafio-backend.git`

Entre no diretório `desafio-backend`:

- `cd desafio-backend`

Instale as dependências:

- `npm install`

Para subir a tabela e popular um usuário pré-definido no banco de dados:

- `npx prisma migrate dev`

Para subir um servidor Node:

- `npm run dev`

## Endpoints da aplicação

| Método          | Endpoint                 |
|:---------------:|:------------------------:|
| `POST`          | `/api/auth/login`        |
| `POST`          | `/api/cars`              |
| `GET`           | `/api/cars`              |
| `GET`           | `/api/cars/:id`          |
| `PUT`           | `/api/cars/:id`          |
| `DELETE`        | `/api/cars/:id`          |
