export function reactiveQueriesExtension(): (client: any) => import("@prisma/client/extension").PrismaClientExtends<import("@prisma/client/runtime/library").InternalArgs<{}, {
    $allModels: {
        findMany(cb: any, args: any): () => void;
        aggregate(cb: any, args: any): () => void;
        groupBy(cb: any, args: any): () => void;
        findUnique(cb: any, args: any): () => void;
        findFirst(cb: any, args: any): () => void;
        create(args: any): Promise<any>;
        createMany(args: any): Promise<any>;
        delete(args: any): Promise<any>;
        deleteMany(args: any): Promise<any>;
        update(args: any): Promise<any>;
        updateMany(args: any): Promise<any>;
        upsert(args: any): Promise<any>;
    };
}, {}, {
    $refreshSubscriptions: () => Promise<void>;
}> & import("@prisma/client/runtime/library").DefaultArgs>;
//# sourceMappingURL=ReactiveQueriesExtension.d.ts.map