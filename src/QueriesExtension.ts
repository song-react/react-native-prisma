import { Prisma } from '@prisma/client/extension';
import { type Action, serializeJsonQuery } from '@prisma/client/runtime/client';

const request = (
  model: unknown,
  action: Action,
  args: any,
  protocolArgs = args,
  unpacker?: (data: any) => any
) => {
  const _context = Prisma.getExtensionContext(model as never) as any;
  const client = _context[Symbol.for('react-native-prisma.client')];
  const modelName = _context.$name;
  const engine = client?._engine;
  if (!engine?.requestSync) {
    throw new Error(
      'Prisma synchronous runtime is unavailable. Install @song-react/react-native-prisma after @prisma/client.'
    );
  }

  const clientMethod = `${modelName}.${action}`;
  const protocolQuery = serializeJsonQuery({
    modelName,
    runtimeDataModel: client._runtimeDataModel,
    action,
    args: protocolArgs,
    clientMethod,
    callsite: undefined,
    extensions: client._extensions,
    errorFormat: client._errorFormat,
    clientVersion: client._clientVersion,
    previewFeatures: client._previewFeatures,
    globalOmit: client._globalOmit,
  });
  const response = engine.requestSync(protocolQuery, {
    traceparent: client._tracingHelper.getTraceParent(),
  });

  return client._requestHandler.mapSyncQueryEngineResult(
    {
      protocolQuery,
      modelName,
      action,
      clientMethod,
      dataPath: [],
      args,
      extensions: client._extensions,
      transaction: undefined,
      unpacker,
      otelParentCtx: undefined,
      otelChildCtx: client._tracingHelper.getActiveContext(),
      globalOmit: client._globalOmit,
      customDataProxyFetch: undefined,
    },
    response
  );
};

const aggregateKeys = new Set(['_avg', '_count', '_sum', '_min', '_max']);

const normalizeCount = (args: any = {}) =>
  typeof args._count === 'boolean'
    ? { ...args, _count: { _all: args._count } }
    : args;

const mapAggregateArgs = (args: any = {}) =>
  Object.entries(normalizeCount(args)).reduce<any>(
    (mapped, [key, value]) => {
      if (aggregateKeys.has(key)) {
        mapped.select[key] = { select: value };
      } else {
        mapped[key] = value;
      }
      return mapped;
    },
    { select: {} }
  );

const unpackAggregate =
  (args: any = {}) =>
  (data: any) => {
    if (typeof args._count === 'boolean') {
      data._count = data._count._all;
    }
    return data;
  };

const mapCountArgs = (args: any = {}) => {
  const { select, ...rest } = args;
  return mapAggregateArgs({
    ...rest,
    _count: typeof select === 'object' ? select : { _all: true },
  });
};

const unpackCount =
  (args: any = {}) =>
  (data: any) => {
    const count = unpackAggregate(args)(data)._count;
    return typeof args.select === 'object' ? count : count._all;
  };

const mapGroupByArgs = (args: any = {}) => {
  const mapped = mapAggregateArgs(args);
  const by = Array.isArray(mapped.by) ? mapped.by : [mapped.by];
  for (const field of by) {
    if (typeof field === 'string') {
      mapped.select[field] = true;
    }
  }
  return mapped;
};

const unpackGroupBy =
  (args: any = {}) =>
  (data: any[]) => {
    if (typeof args._count === 'boolean') {
      data.forEach(row => {
        row._count = row._count._all;
      });
    }
    return data;
  };

export const queriesExtension = () =>
  Prisma.defineExtension(client =>
    client.$extends({
      name: 'react-native-prisma-queries',
      client: {
        $applyPendingMigrations: (): Promise<void> =>
          (client as any).$applyPendingMigrations(),
      },
      model: {
        $allModels: {
          findUnique<T, A>(
            this: T,
            args: Prisma.Exact<A, Prisma.Args<T, 'findUnique'>>
          ): Prisma.Result<T, A, 'findUnique'> {
            return request(this, 'findUnique', args);
          },
          findUniqueOrThrow<T, A>(
            this: T,
            args: Prisma.Exact<A, Prisma.Args<T, 'findUniqueOrThrow'>>
          ): Prisma.Result<T, A, 'findUniqueOrThrow'> {
            return request(this, 'findUniqueOrThrow', args);
          },
          findFirst<T, A>(
            this: T,
            args?: Prisma.Exact<A, Prisma.Args<T, 'findFirst'>>
          ): Prisma.Result<T, A, 'findFirst'> {
            return request(this, 'findFirst', args);
          },
          findFirstOrThrow<T, A>(
            this: T,
            args?: Prisma.Exact<A, Prisma.Args<T, 'findFirstOrThrow'>>
          ): Prisma.Result<T, A, 'findFirstOrThrow'> {
            return request(this, 'findFirstOrThrow', args);
          },
          findMany<T, A>(
            this: T,
            args?: Prisma.Exact<A, Prisma.Args<T, 'findMany'>>
          ): Prisma.Result<T, A, 'findMany'> {
            return request(this, 'findMany', args);
          },
          create<T, A>(
            this: T,
            args: Prisma.Exact<A, Prisma.Args<T, 'create'>>
          ): Prisma.Result<T, A, 'create'> {
            return request(this, 'create', args);
          },
          createMany<T, A>(
            this: T,
            args: Prisma.Exact<A, Prisma.Args<T, 'createMany'>>
          ): Prisma.Result<T, A, 'createMany'> {
            return request(this, 'createMany', args);
          },
          createManyAndReturn<T, A>(
            this: T,
            args: Prisma.Exact<A, Prisma.Args<T, 'createManyAndReturn'>>
          ): Prisma.Result<T, A, 'createManyAndReturn'> {
            return request(this, 'createManyAndReturn', args);
          },
          update<T, A>(
            this: T,
            args: Prisma.Exact<A, Prisma.Args<T, 'update'>>
          ): Prisma.Result<T, A, 'update'> {
            return request(this, 'update', args);
          },
          updateMany<T, A>(
            this: T,
            args: Prisma.Exact<A, Prisma.Args<T, 'updateMany'>>
          ): Prisma.Result<T, A, 'updateMany'> {
            return request(this, 'updateMany', args);
          },
          updateManyAndReturn<T, A>(
            this: T,
            args: Prisma.Exact<A, Prisma.Args<T, 'updateManyAndReturn'>>
          ): Prisma.Result<T, A, 'updateManyAndReturn'> {
            return request(this, 'updateManyAndReturn', args);
          },
          upsert<T, A>(
            this: T,
            args: Prisma.Exact<A, Prisma.Args<T, 'upsert'>>
          ): Prisma.Result<T, A, 'upsert'> {
            return request(this, 'upsert', args);
          },
          delete<T, A>(
            this: T,
            args: Prisma.Exact<A, Prisma.Args<T, 'delete'>>
          ): Prisma.Result<T, A, 'delete'> {
            return request(this, 'delete', args);
          },
          deleteMany<T, A>(
            this: T,
            args?: Prisma.Exact<A, Prisma.Args<T, 'deleteMany'>>
          ): Prisma.Result<T, A, 'deleteMany'> {
            return request(this, 'deleteMany', args);
          },
          count<T, A>(
            this: T,
            args?: Prisma.Exact<A, Prisma.Args<T, 'count'>>
          ): Prisma.Result<T, A, 'count'> {
            return request(
              this,
              'count',
              args,
              mapCountArgs(args),
              unpackCount(args)
            );
          },
          aggregate<T, A>(
            this: T,
            args: Prisma.Exact<A, Prisma.Args<T, 'aggregate'>>
          ): Prisma.Result<T, A, 'aggregate'> {
            return request(
              this,
              'aggregate',
              args,
              mapAggregateArgs(args),
              unpackAggregate(args)
            );
          },
          groupBy<T, A>(
            this: T,
            args: Prisma.Exact<A, Prisma.Args<T, 'groupBy'>>
          ): Prisma.Result<T, A, 'groupBy'> {
            return request(
              this,
              'groupBy',
              args,
              mapGroupByArgs(args),
              unpackGroupBy(args)
            );
          },
        },
      },
    })
  );
