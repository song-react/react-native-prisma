# Prisma 7 for React Native

Synchronous Prisma model operations for React Native. The package contains:

- a synchronous Prisma 7 runtime extension;
- a small synchronous driver contract for local databases;
- an Expo SQLite implementation powered by `expo-sqlite` sync APIs.

Prisma still supports its usual database providers. Only a local driver that implements the synchronous contract can return immediately; network databases such as PostgreSQL and MySQL should remain behind an API and use asynchronous I/O.

## Install

Versions of `prisma` and `@prisma/client` must match this package exactly.

```sh
bun add @prisma/client@7.9.1 github:song-react/react-native-prisma expo-sqlite
bun add -d prisma@7.9.1
```

Prisma 7's query compiler uses WebAssembly. Use a React Native JavaScript runtime with WebAssembly support; Hermes is not supported by this package.

## Generate the client

```prisma
generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}

datasource db {
  provider = "sqlite"
}
```

Generate and prepare the client for React Native:

```json
{
  "scripts": {
    "prisma:generate": "prisma generate && prisma-react-native generated/prisma"
  }
}
```

`prisma-react-native` removes Node-only imports from the generated client. Run it after every `prisma generate`.

## Use Expo SQLite

```ts
import { PrismaClient } from './generated/prisma/client';
import { synchronousQueriesExtension } from '@prisma/react-native';
import { PrismaExpoSQLite } from '@prisma/react-native/expo-sqlite';

const adapter = new PrismaExpoSQLite('app.db');
const client = new PrismaClient({ adapter });

export const db = client.$extends(synchronousQueriesExtension());
export const initializeDatabase = () => client.$connect();
```

Call `initializeDatabase()` once during app startup. After it resolves, model operations return values directly:

```ts
const created = db.user.create({ data: { name: 'Ada' } });
const users = db.user.findMany();
```

Reads, writes, aggregates, relation queries, and query-plan transactions are synchronous. Failed nested writes roll back synchronously. For idempotent startup SQL, run `adapter.executeScriptSync(sql)` before connecting the client.

## Other local databases

Implement and pass a normal Prisma driver adapter that also satisfies `SynchronousDriverAdapter`. Its query, write, and transaction methods must execute synchronously. No database-specific code is built into the synchronous extension.
