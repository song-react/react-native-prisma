"use strict";

import { Prisma } from '@prisma/client/extension';
import { serializeJsonQuery } from '@prisma/client/runtime/client';
const request = (model, action, args, protocolArgs = args, unpacker) => {
  const _context = Prisma.getExtensionContext(model);
  const client = _context[Symbol.for('react-native-prisma.client')];
  const modelName = _context.$name;
  const engine = client?._engine;
  if (!engine?.requestSync) {
    throw new Error('Prisma synchronous runtime is unavailable. Install @prisma/react-native after @prisma/client.');
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
export const queriesExtension = () => Prisma.defineExtension(client => client.$extends({
  name: 'react-native-prisma-queries',
  client: {
    $applyPendingMigrations: () => client.$applyPendingMigrations(),
    $transaction(_callback) {
      if (typeof _callback !== 'function') {
        throw new Error('同步事务需要回调函数，不能传入已经执行的查询结果数组');
      }
      if (Object.prototype.toString.call(_callback) === '[object AsyncFunction]') {
        throw new Error('同步事务回调不能是 async 函数');
      }
      const _owner = Prisma.getExtensionContext(this);
      const _adapter = _owner._engineConfig.adapter;
      if (typeof _adapter?.transactionSync !== 'function') {
        throw new Error('当前 Prisma adapter 不支持同步事务');
      }
      let _closed = false;
      const _guard = () => {
        if (_closed) throw new Error('同步事务已经结束，不能继续使用 tx');
      };
      const _models = new Set(Object.keys(_owner._runtimeDataModel.models).map(_name => _name[0].toLowerCase() + _name.slice(1)));
      const _proxy = (_target, _model = false) => new Proxy(_target, {
        get(_target, _key, _receiver) {
          _guard();
          if (!_model && typeof _key === 'string' && _key.startsWith('$')) {
            throw new Error(`同步事务中不能调用 ${_key}`);
          }
          const _value = Reflect.get(_target, _key, _receiver);
          if (typeof _value === 'function') {
            return new Proxy(_value, {
              apply(_function, _this, _args) {
                _guard();
                return Reflect.apply(_function, _this, _args);
              }
            });
          }
          return !_model && typeof _key === 'string' && _models.has(_key) ? _proxy(_value, true) : _value;
        }
      });
      try {
        return _adapter.transactionSync(() => _callback(_proxy(_owner)));
      } finally {
        _closed = true;
      }
    }
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
//# sourceMappingURL=QueriesExtension.js.map