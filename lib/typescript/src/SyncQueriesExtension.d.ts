import { Prisma } from '@prisma/client/extension';
export declare const synchronousQueriesExtension: () => (client: any) => import("@prisma/client/extension").PrismaClientExtends<import("@prisma/client/runtime/library").InternalArgs<{}, {
    $allModels: {
        findUnique<T, A>(this: T, args: Prisma.Exact<A, Prisma.Args<T, "findUnique">>): Prisma.Result<T, A, "findUnique">;
        findUniqueOrThrow<T, A>(this: T, args: Prisma.Exact<A, Prisma.Args<T, "findUniqueOrThrow">>): Prisma.Result<T, A, "findUniqueOrThrow">;
        findFirst<T, A>(this: T, args?: Prisma.Exact<A, Prisma.Args<T, "findFirst">>): Prisma.Result<T, A, "findFirst">;
        findFirstOrThrow<T, A>(this: T, args?: Prisma.Exact<A, Prisma.Args<T, "findFirstOrThrow">>): Prisma.Result<T, A, "findFirstOrThrow">;
        findMany<T, A>(this: T, args?: Prisma.Exact<A, Prisma.Args<T, "findMany">>): Prisma.Result<T, A, "findMany">;
        count<T, A>(this: T, args?: Prisma.Exact<A, Prisma.Args<T, "count">>): Prisma.Result<T, A, "count">;
        aggregate<T, A>(this: T, args: Prisma.Exact<A, Prisma.Args<T, "aggregate">>): Prisma.Result<T, A, "aggregate">;
        groupBy<T, A>(this: T, args: Prisma.Exact<A, Prisma.Args<T, "groupBy">>): Prisma.Result<T, A, "groupBy">;
    };
}, {}, {
    $applyPendingMigrations: () => any;
}> & import("@prisma/client/runtime/library").DefaultArgs>;
//# sourceMappingURL=SyncQueriesExtension.d.ts.map