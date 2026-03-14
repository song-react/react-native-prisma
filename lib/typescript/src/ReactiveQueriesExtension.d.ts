import { Prisma } from '@prisma/client/extension';
export declare const reactiveQueriesExtension: () => (client: any) => import("@prisma/client/extension").PrismaClientExtends<import("@prisma/client/runtime/library").InternalArgs<{}, {
    $allModels: {
        findMany<T, A>(this: T, cb: (data: Prisma.Result<T, A, "findMany">) => void, args?: Prisma.Exact<A, Prisma.Args<T, "findMany">>): () => void;
        aggregate<T, A>(this: T, cb: (data: Prisma.Result<T, A, "aggregate">) => void, args?: Prisma.Exact<A, Prisma.Args<T, "aggregate">>): () => void;
        groupBy<T, A>(this: T, cb: (data: Prisma.Result<T, A, "groupBy">) => void, args?: Prisma.Exact<A, Prisma.Args<T, "groupBy">>): () => void;
        findUnique<T, A>(this: T, cb: (data: Prisma.Result<T, A, "findMany">) => void, args?: Prisma.Exact<A, Prisma.Args<T, "findUnique">>): () => void;
        findFirst<T, A>(this: T, cb: (data: Prisma.Result<T, A, "findMany">) => void, args?: Prisma.Exact<A, Prisma.Args<T, "findFirst">>): () => void;
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
//# sourceMappingURL=ReactiveQueriesExtension.d.ts.map