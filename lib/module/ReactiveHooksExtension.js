var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __hasOwnProp = Object.prototype.hasOwnProperty;
function __accessProp(key) {
  return this[key];
}
var __toCommonJS = (from) => {
  var entry = (__moduleCache ??= new WeakMap).get(from), desc;
  if (entry)
    return entry;
  entry = __defProp({}, "__esModule", { value: true });
  if (from && typeof from === "object" || typeof from === "function") {
    for (var key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(entry, key))
        __defProp(entry, key, {
          get: __accessProp.bind(from, key),
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
  }
  __moduleCache.set(from, entry);
  return entry;
};
var __moduleCache;
var __returnValue = (v) => v;
function __exportSetter(name, newValue) {
  this[name] = __returnValue.bind(null, newValue);
}
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: __exportSetter.bind(all, name)
    });
};
var __esm = (fn, res) => () => (fn && (res = fn(fn = 0)), res);

// src/ReactiveHooksExtension.ts
import { Prisma } from "@prisma/client/extension";
import { useEffect, useState } from "react";
var reactiveHooksExtension = () => Prisma.defineExtension((client) => {
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
    name: "prisma-reactive-hooks-extension",
    client: {
      $refreshSubscriptions: async () => {
        await refreshSubscriptions();
      }
    },
    model: {
      $allModels: {
        useFindMany(args) {
          const ctx = Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.findMany(args);
          const [engineResponse, setEngineResponse] = useState([]);
          useEffect(() => {
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
          const ctx = Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.findUnique(args);
          const [engineResponse, setEngineResponse] = useState();
          useEffect(() => {
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
          const ctx = Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.findFirst(args);
          const [engineResponse, setEngineResponse] = useState();
          useEffect(() => {
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
          const ctx = Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.aggregate(args);
          const [engineResponse, setEngineResponse] = useState();
          useEffect(() => {
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
          const ctx = Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.groupBy(args);
          const [engineResponse, setEngineResponse] = useState();
          useEffect(() => {
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
          const ctx = Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.create(args);
          const data = await prismaPromise;
          await refreshSubscriptions();
          return data;
        },
        async createMany(args) {
          const ctx = Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.createMany(args);
          const data = await prismaPromise;
          await refreshSubscriptions();
          return data;
        },
        async delete(args) {
          const ctx = Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.delete(args);
          const data = await prismaPromise;
          await refreshSubscriptions();
          return data;
        },
        async deleteMany(args) {
          const ctx = Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.deleteMany(args);
          const data = await prismaPromise;
          await refreshSubscriptions();
          return data;
        },
        async update(args) {
          const ctx = Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.update(args);
          const data = await prismaPromise;
          await refreshSubscriptions();
          return data;
        },
        async updateMany(args) {
          const ctx = Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.updateMany(args);
          const data = await prismaPromise;
          await refreshSubscriptions();
          return data;
        },
        async upsert(args) {
          const ctx = Prisma.getExtensionContext(this);
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
export {
  reactiveHooksExtension
};
