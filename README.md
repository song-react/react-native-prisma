# React Native Prisma 7.9

面向 Expo 与 React Native 新架构的 Prisma 7.9 同步本地数据库方案。

- 使用 Prisma 7 Query Compiler 与 Driver Adapter，不再携带旧版原生 Query Engine。
- 通过 `expo-sqlite` 的 JSI 同步接口直接读写 SQLite。
- CRUD、聚合、关联查询和查询计划事务直接返回结果，不为每次本地查询额外创建 Promise。
- 避免数据库已经返回、界面仍等待 Promise 调度后才更新的问题。
- 当前开发基线为 Expo 58、React Native 0.87、Prisma 7.9.1。

Prisma 7 Query Compiler 使用 WebAssembly，因此 JavaScript Runtime 必须支持 WebAssembly。当前请使用 JSC，暂不支持 Hermes。

## 安装

`prisma`、`@prisma/client` 与本包版本必须一致：

```sh
bun add @prisma/client@7.9.1 expo-sqlite github:song-react/react-native-prisma#release
bun add -d prisma@7.9.1
```

生成器配置：

```prisma
generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}

datasource db {
  provider = "sqlite"
}

model User {
  id   Int    @id @default(autoincrement())
  name String
}
```

每次生成 Prisma Client 后执行准备脚本：

```json
{
  "scripts": {
    "postinstall": "prisma generate && prisma-react-native generated/prisma"
  }
}
```

`prisma-react-native` 会移除生成客户端中的 Node 专用依赖，并准备 React Native 可用的同步 Runtime。

## Demo

```ts
import { PrismaClient } from './generated/prisma/client';
import { queriesExtension } from '@prisma/react-native';
import { PrismaExpoSQLite } from '@prisma/react-native/expo-sqlite';

const adapter = new PrismaExpoSQLite('app.db');

adapter.executeScript(`
  CREATE TABLE IF NOT EXISTS "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
  );
`);

const client = new PrismaClient({ adapter });

// App 启动时等待一次，后续模型操作全部同步返回。
export const databaseReady = client.$connect();
export const db = client.$extends(queriesExtension());
```

连接完成后直接同步调用：

```ts
const start = async () => {
  await databaseReady;

  const user = db.user.create({ data: { name: 'Ada' } });
  const users = db.user.findMany({ orderBy: { id: 'desc' } });
  const count = db.user.count();

  console.log(user, users, count);
};
```

## API

```ts
import { queriesExtension } from '@prisma/react-native';
import type {
  DriverAdapter,
  DriverTransaction,
  QueryableDriver,
} from '@prisma/react-native';
import { PrismaExpoSQLite } from '@prisma/react-native/expo-sqlite';
```

`PrismaExpoSQLite` 支持同步查询、写入、批量 SQL、事务提交和回滚。交互式事务与 PostgreSQL、MySQL 等网络数据库仍应使用异步 API；同步接口只适用于能够在当前进程立即返回的本地驱动。

## 发布分支

- `main`：完整 TypeScript 源码。
- `release`：编译后的 CommonJS、ESM、类型声明及混淆 JS，可直接作为 Git 依赖安装。
