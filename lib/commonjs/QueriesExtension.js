"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queriesExtension = void 0;
var _extension = require("@prisma/client/extension");
var _client = require("@prisma/client/runtime/client");
const request = (model, action, args, protocolArgs = args, unpacker) => {
  const _context = _extension.Prisma.getExtensionContext(model);
  const client = _context[Symbol.for('react-native-prisma.client')];
  const modelName = _context.$name;
  const engine = client?._engine;
  if (!engine?.requestSync) {
    throw new Error('Prisma synchronous runtime is unavailable. Install @song-react/react-native-prisma after @prisma/client.');
  }
  const clientMethod = `${modelName}.${action}`;
  const protocolQuery = (0, _client.serializeJsonQuery)({
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
  const response = engine.requestSync(protocolQuery, {
    traceparent: client._tracingHelper.getTraceParent()
  });
  return client._requestHandler.mapSyncQueryEngineResult({
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
  }, response);
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
const queriesExtension = () => _extension.Prisma.defineExtension(client => client.$extends({
  name: 'react-native-prisma-queries',
  client: {
    $applyPendingMigrations: () => client.$applyPendingMigrations()
  },
  model: {
    $allModels: {
      findUnique(args) {
        return request(this, 'findUnique', args);
      },
      findUniqueOrThrow(args) {
        return request(this, 'findUniqueOrThrow', args);
      },
      findFirst(args) {
        return request(this, 'findFirst', args);
      },
      findFirstOrThrow(args) {
        return request(this, 'findFirstOrThrow', args);
      },
      findMany(args) {
        return request(this, 'findMany', args);
      },
      create(args) {
        return request(this, 'create', args);
      },
      createMany(args) {
        return request(this, 'createMany', args);
      },
      createManyAndReturn(args) {
        return request(this, 'createManyAndReturn', args);
      },
      update(args) {
        return request(this, 'update', args);
      },
      updateMany(args) {
        return request(this, 'updateMany', args);
      },
      updateManyAndReturn(args) {
        return request(this, 'updateManyAndReturn', args);
      },
      upsert(args) {
        return request(this, 'upsert', args);
      },
      delete(args) {
        return request(this, 'delete', args);
      },
      deleteMany(args) {
        return request(this, 'deleteMany', args);
      },
      count(args) {
        return request(this, 'count', args, mapCountArgs(args), unpackCount(args));
      },
      aggregate(args) {
        return request(this, 'aggregate', args, mapAggregateArgs(args), unpackAggregate(args));
      },
      groupBy(args) {
        return request(this, 'groupBy', args, mapGroupByArgs(args), unpackGroupBy(args));
      }
    }
  }
}));
exports.queriesExtension = queriesExtension;
//# sourceMappingURL=QueriesExtension.js.map