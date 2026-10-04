export declare class NativeSQLiteDatabase {
    #private;
    constructor(name: string, directory?: string);
    query(sql: string, args?: unknown[]): {
        columnNames: string[];
        rows: unknown[][];
        changes: number;
        lastInsertId: string;
    };
    all<T>(sql: string, args?: unknown[]): T[];
    exec(sql: string): void;
    close(): void;
}
export declare class NativeQueryCompiler {
    #private;
    constructor(params: unknown);
    compile(request: string): any;
    compileBatch(request: string): any;
    free(): void;
}
//# sourceMappingURL=native.d.ts.map