"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reactiveQueriesExtension = void 0;
var _extension = require("@prisma/client/extension");
const reactiveQueriesExtension = () => _extension.Prisma.defineExtension(client => {
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
    name: 'prisma-reactive-queries-extension',
    client: {
      $refreshSubscriptions: async () => {
        await refreshSubscriptions();
      }
    },
    model: {
      $allModels: {
        findMany(cb, args) {
          const ctx = _extension.Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const key = `${model} :: findMany :: ${JSON.stringify(args)}`;
          const callbackKey = `${model} :: findMany :: ${JSON.stringify(args)} :: ${Math.random()}`;
          if (subscribedQueries[key] != null) {
            subscribedQueries[key].callbacks[callbackKey] = cb;
          } else {
            subscribedQueries[key] = {
              callbacks: {
                [callbackKey]: cb
              },
              query: () => model.findMany(args)
            };
          }
          refreshSubscriptions();
          return () => {
            delete subscribedQueries[key].callbacks[callbackKey];
          };
        },
        aggregate(cb, args) {
          const ctx = _extension.Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const key = `${model} :: aggregate :: ${JSON.stringify(args)}`;
          const callbackKey = `${model} :: aggregate :: ${JSON.stringify(args)} :: ${Math.random()}`;
          if (subscribedQueries[key] != null) {
            subscribedQueries[key].callbacks[callbackKey] = cb;
          } else {
            subscribedQueries[key] = {
              callbacks: {
                [callbackKey]: cb
              },
              query: () => model.aggregate(args)
            };
          }
          return () => {
            delete subscribedQueries[key].callbacks[callbackKey];
          };
        },
        groupBy(cb, args) {
          const ctx = _extension.Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const key = `${model} :: groupBy :: ${JSON.stringify(args)}`;
          const callbackKey = `${model} :: groupBy :: ${JSON.stringify(args)} :: ${Math.random()}`;
          if (subscribedQueries[key] != null) {
            subscribedQueries[key].callbacks[callbackKey] = cb;
          } else {
            subscribedQueries[key] = {
              callbacks: {
                [callbackKey]: cb
              },
              query: () => model.groupBy(args)
            };
          }
          return () => {
            delete subscribedQueries[key].callbacks[callbackKey];
          };
        },
        findUnique(cb, args) {
          const ctx = _extension.Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const key = `${model} :: findUnique :: ${JSON.stringify(args)}`;
          const callbackKey = `${model} :: findUnique :: ${JSON.stringify(args)} :: ${Math.random()}`;
          if (subscribedQueries[key] != null) {
            subscribedQueries[key].callbacks[callbackKey] = cb;
          } else {
            subscribedQueries[key] = {
              callbacks: {
                [callbackKey]: cb
              },
              query: () => model.findUnique(args)
            };
          }
          return () => {
            delete subscribedQueries[key].callbacks[callbackKey];
          };
        },
        findFirst(cb, args) {
          const ctx = _extension.Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const key = `${model} :: findUnique :: ${JSON.stringify(args)}`;
          const callbackKey = `${model} :: findUnique :: ${JSON.stringify(args)} :: ${Math.random()}`;
          if (subscribedQueries[key] != null) {
            subscribedQueries[key].callbacks[callbackKey] = cb;
          } else {
            subscribedQueries[key] = {
              callbacks: {
                [callbackKey]: cb
              },
              query: () => model.findUnique(args)
            };
          }
          return () => {
            delete subscribedQueries[key].callbacks[callbackKey];
          };
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
exports.reactiveQueriesExtension = reactiveQueriesExtension;
//# sourceMappingURL=ReactiveQueriesExtension.js.map