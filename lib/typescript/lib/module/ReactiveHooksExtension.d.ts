export function reactiveHooksExtension(): (client: any) => import("@prisma/client/extension").PrismaClientExtends<import("@prisma/client/runtime/library").InternalArgs<{}, {
    $allModels: {
        useFindMany(args: any): never[];
        useFindUnique(args: any): undefined;
        useFindFirst(args: any): undefined;
        useAggregate(args: any): undefined;
        useGroupBy(args: any): undefined;
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
//# sourceMappingURL=ReactiveHooksExtension.d.ts.map