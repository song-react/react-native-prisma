import type {
  IsolationLevel,
  SqlDriverAdapter,
  SqlQuery,
  SqlResultSet,
  Transaction as PrismaTransaction,
} from '@prisma/driver-adapter-utils';

export interface QueryableDriver {
  queryRawSync(query: SqlQuery): SqlResultSet;
  executeRawSync(query: SqlQuery): number;
}

export interface DriverTransaction
  extends PrismaTransaction,
    QueryableDriver {
  commitSync(): void;
  rollbackSync(): void;
}

export interface DriverAdapter
  extends SqlDriverAdapter,
    QueryableDriver {
  startTransactionSync(isolationLevel?: IsolationLevel): DriverTransaction;
}
