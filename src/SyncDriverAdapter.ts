import type {
  IsolationLevel,
  SqlDriverAdapter,
  SqlQuery,
  SqlResultSet,
  Transaction,
} from '@prisma/driver-adapter-utils';

export interface SynchronousQueryable {
  queryRawSync(query: SqlQuery): SqlResultSet;
  executeRawSync(query: SqlQuery): number;
}

export interface SynchronousTransaction
  extends Transaction,
    SynchronousQueryable {
  commitSync(): void;
  rollbackSync(): void;
}

export interface SynchronousDriverAdapter
  extends SqlDriverAdapter,
    SynchronousQueryable {
  startTransactionSync(isolationLevel?: IsolationLevel): SynchronousTransaction;
}
