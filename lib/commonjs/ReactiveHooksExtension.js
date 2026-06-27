"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reactiveHooksExtension = void 0;
var _extension = require("@prisma/client/extension");
var _react = require("react");
const reactiveHooksExtension = () => _extension.Prisma.defineExtension(client => {
  const subscribedQueries = {};
  const refreshSubscriptions = async () => {
    for (const key in subscribedQueries) {
      const subscription = subscribedQueries[key];
      const data = await subscription.query();
      for (const callbackKey in subscription.callbacks) {
        const callback = subscription.callbacks[callbackKey];
        callback(data);
      }
    }
  };
  return client.$extends({
    name: 'prisma-reactive-hooks-extension',
    client: {
      $refreshSubscriptions: async () => {
        await refreshSubscriptions();
      }
    },
    model: {
      $allModels: {
        useFindMany(args) {
          const ctx = _extension.Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.findMany(args);
          const [engineResponse, setEngineResponse] = (0, _react.useState)([]);
          (0, _react.useEffect)(() => {
            const key = `${model} :: findMany :: ${JSON.stringify(args)}`;
            const callbackKey = `${model} :: findMany :: ${JSON.stringify(args)} :: ${Math.random()}`;
            if (subscribedQueries[key] != null) {
              subscribedQueries[key].callbacks[callbackKey] = setEngineResponse;
            } else {
              subscribedQueries[key] = {
                callbacks: {
                  [callbackKey]: setEngineResponse
                },
                query: () => model.findMany(args)
              };
            }
            prismaPromise.then(setEngineResponse);
            return () => {
              delete subscribedQueries[key].callbacks[callbackKey];
            };
          }, []);
          return engineResponse;
        },
        useFindUnique(args) {
          const ctx = _extension.Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.findUnique(args);
          const [engineResponse, setEngineResponse] = (0, _react.useState)();
          (0, _react.useEffect)(() => {
            const key = `${model} :: findUnique :: ${JSON.stringify(args)}`;
            const callbackKey = `${model} :: findUnique :: ${JSON.stringify(args)} :: ${Math.random()}`;
            if (subscribedQueries[key] != null) {
              subscribedQueries[key].callbacks[callbackKey] = setEngineResponse;
            } else {
              subscribedQueries[key] = {
                callbacks: {
                  [callbackKey]: setEngineResponse
                },
                query: () => model.findUnique(args)
              };
            }
            prismaPromise.then(setEngineResponse);
            return () => {
              delete subscribedQueries[key].callbacks[callbackKey];
            };
          }, []);
          return engineResponse;
        },
        useFindFirst(args) {
          const ctx = _extension.Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.findFirst(args);
          const [engineResponse, setEngineResponse] = (0, _react.useState)();
          (0, _react.useEffect)(() => {
            const key = `${model} :: findFirst :: ${JSON.stringify(args)}`;
            const callbackKey = `${model} :: findFirst :: ${JSON.stringify(args)} :: ${Math.random()}`;
            if (subscribedQueries[key] != null) {
              subscribedQueries[key].callbacks[callbackKey] = setEngineResponse;
            } else {
              subscribedQueries[key] = {
                callbacks: {
                  [callbackKey]: setEngineResponse
                },
                query: () => model.findFirst(args)
              };
            }
            prismaPromise.then(setEngineResponse);
            return () => {
              delete subscribedQueries[key].callbacks[callbackKey];
            };
          }, []);
          return engineResponse;
        },
        useAggregate(args) {
          const ctx = _extension.Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.aggregate(args);
          const [engineResponse, setEngineResponse] = (0, _react.useState)();
          (0, _react.useEffect)(() => {
            const key = `${model} :: aggregate :: ${JSON.stringify(args)}`;
            const callbackKey = `${model} :: aggregate :: ${JSON.stringify(args)} :: ${Math.random()}`;
            if (subscribedQueries[key] != null) {
              subscribedQueries[key].callbacks[callbackKey] = setEngineResponse;
            } else {
              subscribedQueries[key] = {
                callbacks: {
                  [callbackKey]: setEngineResponse
                },
                query: () => model.aggregate(args)
              };
            }
            prismaPromise.then(setEngineResponse);
            return () => {
              delete subscribedQueries[key].callbacks[callbackKey];
            };
          }, []);
          return engineResponse;
        },
        useGroupBy(args) {
          const ctx = _extension.Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.groupBy(args);
          const [engineResponse, setEngineResponse] = (0, _react.useState)();
          (0, _react.useEffect)(() => {
            const key = `${model} :: groupBy :: ${JSON.stringify(args)}`;
            const callbackKey = `${model} :: groupBy :: ${JSON.stringify(args)} :: ${Math.random()}`;
            if (subscribedQueries[key] != null) {
              subscribedQueries[key].callbacks[callbackKey] = setEngineResponse;
            } else {
              subscribedQueries[key] = {
                callbacks: {
                  [callbackKey]: setEngineResponse
                },
                query: () => model.groupBy(args)
              };
            }
            prismaPromise.then(setEngineResponse);
            return () => {
              delete subscribedQueries[key].callbacks[callbackKey];
            };
          }, []);
          return engineResponse;
        },
        async create(args) {
          const ctx = _extension.Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.create(args);
          const data = await prismaPromise;
          await refreshSubscriptions();
          return data;
        },
        async createMany(args) {
          const ctx = _extension.Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.createMany(args);
          const data = await prismaPromise;
          await refreshSubscriptions();
          return data;
        },
        async delete(args) {
          const ctx = _extension.Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.delete(args);
          const data = await prismaPromise;
          await refreshSubscriptions();
          return data;
        },
        async deleteMany(args) {
          const ctx = _extension.Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.deleteMany(args);
          const data = await prismaPromise;
          await refreshSubscriptions();
          return data;
        },
        async update(args) {
          const ctx = _extension.Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.update(args);
          const data = await prismaPromise;
          await refreshSubscriptions();
          return data;
        },
        async updateMany(args) {
          const ctx = _extension.Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.updateMany(args);
          const data = await prismaPromise;
          await refreshSubscriptions();
          return data;
        },
        async upsert(args) {
          const ctx = _extension.Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.upsert(args);
          const data = await prismaPromise;
          await refreshSubscriptions();
          return data;
        }
      }
    }
  });
});
exports.reactiveHooksExtension = reactiveHooksExtension;
//# sourceMappingURL=ReactiveHooksExtension.js.map