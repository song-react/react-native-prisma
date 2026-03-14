import 'react-native-url-polyfill/auto';
export { reactiveHooksExtension } from './ReactiveHooksExtension';
export { reactiveQueriesExtension } from './ReactiveQueriesExtension';
declare global {
    var __PrismaProxy: PrismaProxy | undefined;
}
type PrismaCreateOptions = {
    datamodel: string;
    logLevel: string;
    logQueries: boolean;
    logCallback: (msg: string) => void;
    ignoreEnvVarErrors: boolean;
    datasourceOverrides: object | string;
    env: object | string;
};
type QueryEngineObject = object;
type PrismaProxy = {
    create: (options: PrismaCreateOptions) => QueryEngineObject;
    connect: (engine: QueryEngineObject, trace: string) => void;
    execute: (engine: QueryEngineObject, body: string, headers: string, txId: string) => Promise<string>;
    startTransaction: (engine: QueryEngineObject, body: string, hdears: string) => string;
    commitTransaction: (engine: QueryEngineObject, txId: string, headers: string) => string;
    rollbackTransaction: (engine: QueryEngineObject, txId: string, headers: string) => string;
    disconnect: (engine: QueryEngineObject, headers: string) => void;
    pushSchema: (engine: QueryEngineObject, schema: string) => void;
    applyPendingMigrations: (engine: QueryEngineObject) => void;
};
//# sourceMappingURL=index.d.ts.map