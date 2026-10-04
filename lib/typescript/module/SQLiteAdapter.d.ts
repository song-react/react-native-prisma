import { type IsolationLevel, type SqlDriverAdapter, type SqlDriverAdapterFactory, type SqlQuery, type SqlResultSet, type Transaction } from '@prisma/driver-adapter-utils';
import { NativeSQLiteDatabase } from './native';
type Config = {
    url: string;
    directory?: string;
};
type Migration = {
    name: string;
    checksum: string;
    sql: string;
};
interface QueryableDriver {
    queryRawSync(query: SqlQuery): SqlResultSet;
    executeRawSync(query: SqlQuery): number;
}
interface DriverTransaction extends Transaction, QueryableDriver {
    commitSync(): void;
    rollbackSync(): void;
}
interface DriverAdapter extends SqlDriverAdapter, QueryableDriver {
    startTransactionSync(isolationLevel?: IsolationLevel): DriverTransaction;
}
declare class Queryable {
    protected readonly db: NativeSQLiteDatabase;
    readonly provider: "sqlite";
    readonly adapterName = "@song-react/react-native-prisma";
    constructor(db: NativeSQLiteDatabase);
    queryRawSync(query: SqlQuery): SqlResultSet;
    executeRawSync(query: SqlQuery): number;
    queryRaw(query: SqlQuery): Promise<SqlResultSet>;
    executeRaw(query: SqlQuery): Promise<number>;
}
declare class SQLiteTransaction extends Queryable implements DriverTransaction {
    readonly options: {
        usePhantomQuery: boolean;
    };
    commitSync(): void;
    commit(): Promise<void>;
    rollbackSync(): void;
    rollback(): Promise<void>;
}
declare class SQLiteAdapter extends Queryable implements DriverAdapter {
    private readonly onDispose;
    constructor(db: NativeSQLiteDatabase, onDispose: () => void);
    executeScript(script: string): Promise<void>;
    startTransactionSync(isolationLevel?: IsolationLevel): SQLiteTransaction;
    startTransaction(isolationLevel?: IsolationLevel): Promise<SQLiteTransaction>;
    getConnectionInfo(): {
        maxBindValues: number;
        supportsRelationJoins: boolean;
    };
    applyPendingMigrations(migrations: readonly Migration[]): void;
    dispose(): Promise<void>;
}
export declare class PrismaSQLite implements SqlDriverAdapterFactory {
    #private;
    private readonly config;
    readonly provider: "sqlite";
    readonly adapterName = "@song-react/react-native-prisma";
    constructor(config?: Config | string);
    private connectAdapter;
    setMigrations(migrations: readonly Migration[]): void;
    applyPendingMigrations(): void;
    connect(): Promise<SQLiteAdapter>;
}
export {};
//# sourceMappingURL=SQLiteAdapter.d.ts.map