import { type IsolationLevel, type SqlDriverAdapter, type SqlDriverAdapterFactory, type SqlQuery, type SqlResultSet, type Transaction } from '@prisma/driver-adapter-utils';
import { type SQLiteDatabase } from 'expo-sqlite';
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
    protected readonly db: SQLiteDatabase;
    readonly provider: "sqlite";
    readonly adapterName = "@prisma/react-native";
    constructor(db: SQLiteDatabase);
    queryRawSync(query: SqlQuery): SqlResultSet;
    executeRawSync(query: SqlQuery): number;
    queryRaw(query: SqlQuery): Promise<SqlResultSet>;
    executeRaw(query: SqlQuery): Promise<number>;
}
declare class ExpoSQLiteTransaction extends Queryable implements DriverTransaction {
    readonly options: {
        usePhantomQuery: boolean;
    };
    commitSync(): void;
    commit(): Promise<void>;
    rollbackSync(): void;
    rollback(): Promise<void>;
}
declare class ExpoSQLiteAdapter extends Queryable implements DriverAdapter {
    private readonly onDispose;
    constructor(db: SQLiteDatabase, onDispose: () => void);
    executeScript(script: string): Promise<void>;
    startTransactionSync(isolationLevel?: IsolationLevel): ExpoSQLiteTransaction;
    startTransaction(isolationLevel?: IsolationLevel): Promise<ExpoSQLiteTransaction>;
    getConnectionInfo(): {
        maxBindValues: number;
        supportsRelationJoins: boolean;
    };
    applyPendingMigrations(migrations: readonly Migration[]): void;
    dispose(): Promise<void>;
}
export declare class PrismaExpoSQLite implements SqlDriverAdapterFactory {
    #private;
    private readonly config;
    readonly provider: "sqlite";
    readonly adapterName = "@prisma/react-native";
    constructor(config: Config | string);
    private connectAdapter;
    setMigrations(migrations: readonly Migration[]): void;
    applyPendingMigrations(): void;
    connect(): Promise<ExpoSQLiteAdapter>;
}
export {};
//# sourceMappingURL=ExpoSQLiteAdapter.d.ts.map