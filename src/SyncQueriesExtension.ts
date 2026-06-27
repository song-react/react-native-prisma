import { Prisma } from '@prisma/client/extension';
import {
  type Action,
  serializeJsonQuery,
} from '@prisma/client/runtime/react-native';

const requestSync = (
  client: any,
  modelName: string,
  action: Action,
  args: any,
  protocolArgs = args,
  unpacker?: (data: any) => any
) => {
  const engine = client._engine;
  if (
    !engine?.libraryStarted ||
    !engine.engine?.querySync ||
    !globalThis.__PrismaProxy?.executeSync
  ) {
    throw new Error('Prisma synchronous query engine is not connected');
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
  const response = engine.parseEngineResponse(
    engine.engine.querySync(
      JSON.stringify(protocolQuery),
      JSON.stringify({
        traceparent: client._tracingHelper.getTraceParent(),
      }),
      undefined
    )
  );

  if (response.errors) {
    throw response.errors.length === 1
      ? engine.buildQueryError(response.errors[0])
      : new Error(JSON.stringify(response.errors));
  }
  if (engine.loggerRustPanic) {
    throw engine.loggerRustPanic;
  }

  return client._requestHandler.mapQueryEngineResult(
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
    { data: response }
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
      data.forEach((row) => {
        row._count = row._count._all;
      });
    }
    return data;
  };

const modelNameOf = (client: any, model: unknown) => {
  const context = Prisma.getExtensionContext(model as never) as {
    $name?: string;
  };
  const name = context.$name;
  const modelName = Object.keys(client._runtimeDataModel.models).find(
    (candidate) => candidate.toLowerCase() === name?.toLowerCase()
  );
  if (!modelName) {
    throw new Error(`Unknown Prisma model: ${name ?? 'undefined'}`);
  }
  return modelName;
};

export const synchronousQueriesExtension = () =>
  Prisma.defineExtension((client) =>
    client.$extends({
      name: 'prisma-react-native-synchronous-queries',
      client: {
        $applyPendingMigrations: () =>
          (client as any).$applyPendingMigrations(),
      },
      model: {
        $allModels: {
          findUnique<T, A>(
            this: T,
            args: Prisma.Exact<A, Prisma.Args<T, 'findUnique'>>
          ): Prisma.Result<T, A, 'findUnique'> {
            return requestSync(
              client,
              modelNameOf(client, this),
              'findUnique',
              args
            );
          },
          findUniqueOrThrow<T, A>(
            this: T,
            args: Prisma.Exact<A, Prisma.Args<T, 'findUniqueOrThrow'>>
          ): Prisma.Result<T, A, 'findUniqueOrThrow'> {
            return requestSync(
              client,
              modelNameOf(client, this),
              'findUniqueOrThrow',
              args
            );
          },
          findFirst<T, A>(
            this: T,
            args?: Prisma.Exact<A, Prisma.Args<T, 'findFirst'>>
          ): Prisma.Result<T, A, 'findFirst'> {
            return requestSync(
              client,
              modelNameOf(client, this),
              'findFirst',
              args
            );
          },
          findFirstOrThrow<T, A>(
            this: T,
            args?: Prisma.Exact<A, Prisma.Args<T, 'findFirstOrThrow'>>
          ): Prisma.Result<T, A, 'findFirstOrThrow'> {
            return requestSync(
              client,
              modelNameOf(client, this),
              'findFirstOrThrow',
              args
            );
          },
          findMany<T, A>(
            this: T,
            args?: Prisma.Exact<A, Prisma.Args<T, 'findMany'>>
          ): Prisma.Result<T, A, 'findMany'> {
            return requestSync(
              client,
              modelNameOf(client, this),
              'findMany',
              args
            );
          },
          count<T, A>(
            this: T,
            args?: Prisma.Exact<A, Prisma.Args<T, 'count'>>
          ): Prisma.Result<T, A, 'count'> {
            const modelName = modelNameOf(client, this);
            return requestSync(
              client,
              modelName,
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
            return requestSync(
              client,
              modelNameOf(client, this),
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
            return requestSync(
              client,
              modelNameOf(client, this),
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
