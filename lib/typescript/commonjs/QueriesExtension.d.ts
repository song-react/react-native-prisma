import { Prisma } from '@prisma/client/extension';
export declare const queriesExtension: () => (client: any) => import("@prisma/client/extension").PrismaClientExtends<import("@prisma/client/runtime/client").InternalArgs<{}, {
    $allModels: {
        findUnique<T, A>(this: T, args: Prisma.Exact<A, Prisma.Args<T, "findUnique">>): Prisma.Result<T, A, "findUnique">;
        findUniqueOrThrow<T, A>(this: T, args: Prisma.Exact<A, Prisma.Args<T, "findUniqueOrThrow">>): Prisma.Result<T, A, "findUniqueOrThrow">;
        findFirst<T, A>(this: T, args?: Prisma.Exact<A, Prisma.Args<T, "findFirst">>): Prisma.Result<T, A, "findFirst">;
        findFirstOrThrow<T, A>(this: T, args?: Prisma.Exact<A, Prisma.Args<T, "findFirstOrThrow">>): Prisma.Result<T, A, "findFirstOrThrow">;
        findMany<T, A>(this: T, args?: Prisma.Exact<A, Prisma.Args<T, "findMany">>): Prisma.Result<T, A, "findMany">;
        create<T, A>(this: T, args: Prisma.Exact<A, Prisma.Args<T, "create">>): Prisma.Result<T, A, "create">;
        createMany<T, A>(this: T, args: Prisma.Exact<A, Prisma.Args<T, "createMany">>): Prisma.Result<T, A, "createMany">;
        createManyAndReturn<T, A>(this: T, args: Prisma.Exact<A, Prisma.Args<T, "createManyAndReturn">>): Prisma.Result<T, A, "createManyAndReturn">;
        update<T, A>(this: T, args: Prisma.Exact<A, Prisma.Args<T, "update">>): Prisma.Result<T, A, "update">;
        updateMany<T, A>(this: T, args: Prisma.Exact<A, Prisma.Args<T, "updateMany">>): Prisma.Result<T, A, "updateMany">;
        updateManyAndReturn<T, A>(this: T, args: Prisma.Exact<A, Prisma.Args<T, "updateManyAndReturn">>): Prisma.Result<T, A, "updateManyAndReturn">;
        upsert<T, A>(this: T, args: Prisma.Exact<A, Prisma.Args<T, "upsert">>): Prisma.Result<T, A, "upsert">;
        delete<T, A>(this: T, args: Prisma.Exact<A, Prisma.Args<T, "delete">>): Prisma.Result<T, A, "delete">;
        deleteMany<T, A>(this: T, args?: Prisma.Exact<A, Prisma.Args<T, "deleteMany">>): Prisma.Result<T, A, "deleteMany">;
        count<T, A>(this: T, args?: Prisma.Exact<A, Prisma.Args<T, "count">>): Prisma.Result<T, A, "count">;
        aggregate<T, A>(this: T, args: Prisma.Exact<A, Prisma.Args<T, "aggregate">>): Prisma.Result<T, A, "aggregate">;
        groupBy<T, A>(this: T, args: Prisma.Exact<A, Prisma.Args<T, "groupBy">>): Prisma.Result<T, A, "groupBy">;
    };
}, {}, {}> & import("@prisma/client/runtime/client").DefaultArgs>;
//# sourceMappingURL=QueriesExtension.d.ts.map