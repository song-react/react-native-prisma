"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.synchronousQueriesExtension = void 0;
var _extension = require("@prisma/client/extension");
var _reactNative = require("@prisma/client/runtime/react-native");
const requestSync = (client, modelName, action, args, protocolArgs = args, unpacker) => {
  const engine = client._engine;
  if (!engine?.libraryStarted || !engine.engine?.querySync || !globalThis.__PrismaProxy?.executeSync) {
    throw new Error('Prisma synchronous query engine is not connected');
  }
  const clientMethod = `${modelName}.${action}`;
  const protocolQuery = (0, _reactNative.serializeJsonQuery)({
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
    globalOmit: client._globalOmit
  });
  const response = engine.parseEngineResponse(engine.engine.querySync(JSON.stringify(protocolQuery), JSON.stringify({
    traceparent: client._tracingHelper.getTraceParent()
  }), undefined));
  if (response.errors) {
    throw response.errors.length === 1 ? engine.buildQueryError(response.errors[0]) : new Error(JSON.stringify(response.errors));
  }
  if (engine.loggerRustPanic) {
    throw engine.loggerRustPanic;
  }
  return client._requestHandler.mapQueryEngineResult({
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
    customDataProxyFetch: undefined
  }, {
    data: response
  });
};
const aggregateKeys = new Set(['_avg', '_count', '_sum', '_min', '_max']);
const normalizeCount = (args = {}) => typeof args._count === 'boolean' ? {
  ...args,
  _count: {
    _all: args._count
  }
} : args;
const mapAggregateArgs = (args = {}) => Object.entries(normalizeCount(args)).reduce((mapped, [key, value]) => {
  if (aggregateKeys.has(key)) {
    mapped.select[key] = {
      select: value
    };
  } else {
    mapped[key] = value;
  }
  return mapped;
}, {
  select: {}
});
const unpackAggregate = (args = {}) => data => {
  if (typeof args._count === 'boolean') {
    data._count = data._count._all;
  }
  return data;
};
const mapCountArgs = (args = {}) => {
  const {
    select,
    ...rest
  } = args;
  return mapAggregateArgs({
    ...rest,
    _count: typeof select === 'object' ? select : {
      _all: true
    }
  });
};
const unpackCount = (args = {}) => data => {
  const count = unpackAggregate(args)(data)._count;
  return typeof args.select === 'object' ? count : count._all;
};
const mapGroupByArgs = (args = {}) => {
  const mapped = mapAggregateArgs(args);
  const by = Array.isArray(mapped.by) ? mapped.by : [mapped.by];
  for (const field of by) {
    if (typeof field === 'string') {
      mapped.select[field] = true;
    }
  }
  return mapped;
};
const unpackGroupBy = (args = {}) => data => {
  if (typeof args._count === 'boolean') {
    data.forEach(row => {
      row._count = row._count._all;
    });
  }
  return data;
};
const modelNameOf = (client, model) => {
  const context = _extension.Prisma.getExtensionContext(model);
  const name = context.$name;
  const modelName = Object.keys(client._runtimeDataModel.models).find(candidate => candidate.toLowerCase() === name?.toLowerCase());
  if (!modelName) {
    throw new Error(`Unknown Prisma model: ${name ?? 'undefined'}`);
  }
  return modelName;
};
const synchronousQueriesExtension = () => _extension.Prisma.defineExtension(client => client.$extends({
  name: 'prisma-react-native-synchronous-queries',
  client: {
    $applyPendingMigrations: () => client.$applyPendingMigrations()
  },
  model: {
    $allModels: {
      findUnique(args) {
        return requestSync(client, modelNameOf(client, this), 'findUnique', args);
      },
      findUniqueOrThrow(args) {
        return requestSync(client, modelNameOf(client, this), 'findUniqueOrThrow', args);
      },
      findFirst(args) {
        return requestSync(client, modelNameOf(client, this), 'findFirst', args);
      },
      findFirstOrThrow(args) {
        return requestSync(client, modelNameOf(client, this), 'findFirstOrThrow', args);
      },
      findMany(args) {
        return requestSync(client, modelNameOf(client, this), 'findMany', args);
      },
      count(args) {
        const modelName = modelNameOf(client, this);
        return requestSync(client, modelName, 'count', args, mapCountArgs(args), unpackCount(args));
      },
      aggregate(args) {
        return requestSync(client, modelNameOf(client, this), 'aggregate', args, mapAggregateArgs(args), unpackAggregate(args));
      },
      groupBy(args) {
        return requestSync(client, modelNameOf(client, this), 'groupBy', args, mapGroupByArgs(args), unpackGroupBy(args));
      }
    }
  }
}));
exports.synchronousQueriesExtension = synchronousQueriesExtension;
//# sourceMappingURL=SyncQueriesExtension.js.map