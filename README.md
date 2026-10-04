# React Native Prisma

Prisma 7.9.1 的 iOS 同步客户端。通过 Nitro 调用原生 Query Compiler 和系统 SQLite3，支持 Hermes、无损 BigInt、迁移与同步 CRUD，不依赖 Expo。

## 安装

```sh
bun add --trust @prisma/client@7.9.1 @song-react/react-native-prisma@github:song-react/react-native-prisma#release
bun add -d prisma@7.9.1
```

`prisma`、`@prisma/client` 与本包版本需一致。`--trust` 允许本包通过 `postinstall` 自动接入同步运行时和官方生成器；业务工程无需额外生成器、脚本或补丁。Nitro 原生桥由本包自动安装；Expo SDK 54 及以上会自动链接，无需单独声明。使用 React Native 社区 CLI 时需将 Nitro 加入原生链接配置。安装后需重新编译 App。

## 生成

```prisma
generator client {
  provider = "prisma-client"
  output   = "../node_modules/@song-react/react-native-prisma/generated"
}

datasource db {
  provider = "sqlite"
}

model User {
  id   Int    @id @default(autoincrement())
  name String
}
```

保留普通 Prisma 脚本：

```json
{
  "scripts": {
    "db:generate": "prisma generate",
    "db:migrate": "prisma migrate dev",
    "db:push": "prisma db push",
    "db:studio": "prisma studio"
  }
}
```

修改 schema 或迁移后执行 `bun db:generate`。生成器会同时嵌入 `migrations/*/migration.sql`，设备端启动时执行迁移；`db push` 只更新开发机数据库。

## 使用

将数据库与启动 Provider 放在 `components/providers/PrismaProvider.tsx`：

```tsx
import { PrismaClient, queriesExtension } from '@prisma/client';
import { useEffect, useState, type ReactNode } from 'react';

export const db = new PrismaClient().$extends(queriesExtension());

export const PrismaProvider = ({
  children,
  loading,
  error,
}: {
  children: ReactNode;
  loading?: ReactNode;
  error?: (_error: Error) => ReactNode;
}) => {
  const [_error, _setError] = useState<Error | null>();

  useEffect(() => {
    void db.$applyPendingMigrations().then(
      () => _setError(null),
      _cause =>
        _setError(_cause instanceof Error ? _cause : new Error(String(_cause)))
    );
  }, []);

  return _error === undefined
    ? loading
    : _error === null
      ? children
      : error?.(_error);
};
```

`new PrismaClient()` 默认使用 `Library/app.db`，沿用旧版数据库。`$applyPendingMigrations()` 包含首次连接，成功后挂载子页面；加载界面传入 `loading`，失败界面由 `error(error)` 提供。需要重试时重新挂载 Provider。

初始化后直接同步查询：

```ts
import { db } from '../components/providers/PrismaProvider';

const user = db.user.create({ data: { name: 'Ada' } });
const users = db.user.findMany();
```

批量写入使用同步回调事务，出错时整批回滚：

```ts
db.$transaction(tx => {
  tx.user.create({ data: { name: 'Ada' } });
  tx.user.create({ data: { name: 'Lin' } });
});
```

回调内通过 `tx` 同步操作模型，不使用 `async` 或 `await`。同步查询立即执行，因此不支持旧的 `$transaction([操作, ...])`。

## 导入与输出目录

Client、模型和同步扩展支持三个入口，指向同一个 Client：

```ts
import { PrismaClient, queriesExtension, type User } from '@prisma/client';
// 也可从 @song-react/react-native-prisma 或配置的 output 目录导入。
```

`output` 相对 schema 解析，支持工程内目录、`node_modules` 中的独立目录或能解析当前工程依赖的绝对路径。修改后执行 `prisma generate`，本包与 `@prisma/client` 会自动转发到新目录。不能覆盖已安装的 Prisma 包；自动入口绑定一个 schema。

Demo 的生成目录位于 `node_modules`，无需入库。其他输出目录请加入 `.gitignore`。

`main` 保存源码；`release` 包含编译后的 JS、类型声明和 iPhone / 模拟器原生库，可直接作为 Git 依赖安装。
