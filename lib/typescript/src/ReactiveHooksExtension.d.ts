import { Prisma } from '@prisma/client/extension';
export declare const reactiveHooksExtension: () => (client: any) => import("@prisma/client/extension").PrismaClientExtends<import("@prisma/client/runtime/library").InternalArgs<{}, {
    $allModels: {
        useFindMany<T, A>(this: T, args?: Prisma.Exact<A, Prisma.Args<T, "findMany">>): Prisma.Result<T, A, "findMany">;
        useFindUnique<T, A>(this: T, args?: Prisma.Exact<A, Prisma.Args<T, "findUnique">>): Prisma.Result<T, A, "findUnique">;
        useFindFirst<T, A>(this: T, args?: Prisma.Exact<A, Prisma.Args<T, "findFirst">>): Prisma.Result<T, A, "findFirst">;
        useAggregate<T, A>(this: T, args?: Prisma.Exact<A, Prisma.Args<T, "aggregate">>): Prisma.Result<T, A, "aggregate">;
        useGroupBy<T, A>(this: T, args?: Prisma.Exact<A, Prisma.Args<T, "groupBy">>): Prisma.Result<T, A, "groupBy">;
        create<T, A>(this: T, args?: Prisma.Exact<A, Prisma.Args<T, "create">>): Promise<Prisma.Result<T, A, "create">>;
        createMany<T, A>(this: T, args?: Prisma.Exact<A, Prisma.Args<T, "createMany">>): Promise<Prisma.Result<T, A, "createMany">>;
        delete<T, A>(this: T, args?: Prisma.Exact<A, Prisma.Args<T, "delete">>): Promise<Prisma.Result<T, A, "delete">>;
        deleteMany<T, A>(this: T, args?: Prisma.Exact<A, Prisma.Args<T, "deleteMany">>): Promise<Prisma.Result<T, A, "deleteMany">>;
        update<T, A>(this: T, args?: Prisma.Exact<A, Prisma.Args<T, "update">>): Promise<Prisma.Result<T, A, "update">>;
        updateMany<T, A>(this: T, args?: Prisma.Exact<A, Prisma.Args<T, "updateMany">>): Promise<Prisma.Result<T, A, "updateMany">>;
        upsert<T, A>(this: T, args?: Prisma.Exact<A, Prisma.Args<T, "upsert">>): Promise<Prisma.Result<T, A, "upsert">>;
    };
}, {}, {
    $refreshSubscriptions: () => Promise<void>;
}> & import("@prisma/client/runtime/library").DefaultArgs>;
//# sourceMappingURL=ReactiveHooksExtension.d.ts.map