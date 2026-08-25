import { type IsolationLevel, type SqlDriverAdapter, type SqlDriverAdapterFactory, type SqlQuery, type SqlResultSet, type Transaction } from '@prisma/driver-adapter-utils';
import { type SQLiteDatabase } from 'expo-sqlite';
import type { DriverAdapter, DriverTransaction } from './DriverAdapter';
type Config = {
    url: string;
    directory?: string;
};
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
declare class ExpoSQLiteTransaction extends Queryable implements Transaction, DriverTransaction {
    readonly options: {
        usePhantomQuery: boolean;
    };
    commitSync(): void;
    commit(): Promise<void>;
    rollbackSync(): void;
    rollback(): Promise<void>;
}
declare class ExpoSQLiteAdapter extends Queryable implements SqlDriverAdapter, DriverAdapter {
    private readonly onDispose;
    constructor(db: SQLiteDatabase, onDispose: () => void);
    executeScriptSync(script: string): void;
    executeScript(script: string): Promise<void>;
    startTransactionSync(isolationLevel?: IsolationLevel): ExpoSQLiteTransaction;
    startTransaction(isolationLevel?: IsolationLevel): Promise<ExpoSQLiteTransaction>;
    getConnectionInfo(): {
        maxBindValues: number;
        supportsRelationJoins: boolean;
    };
    dispose(): Promise<void>;
}
export declare class PrismaExpoSQLite implements SqlDriverAdapterFactory {
    #private;
    private readonly config;
    readonly provider: "sqlite";
    readonly adapterName = "@prisma/react-native";
    constructor(config: Config | string);
    private connectAdapter;
    executeScript(script: string): void;
    connect(): Promise<ExpoSQLiteAdapter>;
}
export {};
//# sourceMappingURL=ExpoSQLiteAdapter.d.ts.map