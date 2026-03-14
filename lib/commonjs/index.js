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

// src/NativePrisma.ts
var exports_NativePrisma = {};
__export(exports_NativePrisma, {
  default: () => NativePrisma_default
});
module.exports = __toCommonJS(exports_NativePrisma);
var import_react_native, NativePrisma_default;
var init_NativePrisma = __esm(() => {
  import_react_native = require("react-native");
  NativePrisma_default = import_react_native.TurboModuleRegistry.getEnforcing("Prisma");
});

// src/ReactiveHooksExtension.ts
var exports_ReactiveHooksExtension = {};
__export(exports_ReactiveHooksExtension, {
  reactiveHooksExtension: () => reactiveHooksExtension
});
module.exports = __toCommonJS(exports_ReactiveHooksExtension);
var import_extension = require("@prisma/client/extension");
var import_react = require("react");
var reactiveHooksExtension = () => import_extension.Prisma.defineExtension((client) => {
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
          const ctx = import_extension.Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.findMany(args);
          const [engineResponse, setEngineResponse] = import_react.useState([]);
          import_react.useEffect(() => {
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
          const ctx = import_extension.Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.findUnique(args);
          const [engineResponse, setEngineResponse] = import_react.useState();
          import_react.useEffect(() => {
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
          const ctx = import_extension.Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.findFirst(args);
          const [engineResponse, setEngineResponse] = import_react.useState();
          import_react.useEffect(() => {
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
          const ctx = import_extension.Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.aggregate(args);
          const [engineResponse, setEngineResponse] = import_react.useState();
          import_react.useEffect(() => {
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
          const ctx = import_extension.Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.groupBy(args);
          const [engineResponse, setEngineResponse] = import_react.useState();
          import_react.useEffect(() => {
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
          const ctx = import_extension.Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.create(args);
          const data = await prismaPromise;
          await refreshSubscriptions();
          return data;
        },
        async createMany(args) {
          const ctx = import_extension.Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.createMany(args);
          const data = await prismaPromise;
          await refreshSubscriptions();
          return data;
        },
        async delete(args) {
          const ctx = import_extension.Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.delete(args);
          const data = await prismaPromise;
          await refreshSubscriptions();
          return data;
        },
        async deleteMany(args) {
          const ctx = import_extension.Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.deleteMany(args);
          const data = await prismaPromise;
          await refreshSubscriptions();
          return data;
        },
        async update(args) {
          const ctx = import_extension.Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.update(args);
          const data = await prismaPromise;
          await refreshSubscriptions();
          return data;
        },
        async updateMany(args) {
          const ctx = import_extension.Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.updateMany(args);
          const data = await prismaPromise;
          await refreshSubscriptions();
          return data;
        },
        async upsert(args) {
          const ctx = import_extension.Prisma.getExtensionContext(this);
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

// src/ReactiveQueriesExtension.ts
var exports_ReactiveQueriesExtension = {};
__export(exports_ReactiveQueriesExtension, {
  reactiveQueriesExtension: () => reactiveQueriesExtension
});
module.exports = __toCommonJS(exports_ReactiveQueriesExtension);
var import_extension2 = require("@prisma/client/extension");
var reactiveQueriesExtension = () => import_extension2.Prisma.defineExtension((client) => {
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
    name: "prisma-reactive-queries-extension",
    client: {
      $refreshSubscriptions: async () => {
        await refreshSubscriptions();
      }
    },
    model: {
      $allModels: {
        findMany(cb, args) {
          const ctx = import_extension2.Prisma.getExtensionContext(this);
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
          const ctx = import_extension2.Prisma.getExtensionContext(this);
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
          const ctx = import_extension2.Prisma.getExtensionContext(this);
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
          const ctx = import_extension2.Prisma.getExtensionContext(this);
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
          const ctx = import_extension2.Prisma.getExtensionContext(this);
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
          const ctx = import_extension2.Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.create(args);
          const data = await prismaPromise;
          await refreshSubscriptions();
          return data;
        },
        async createMany(args) {
          const ctx = import_extension2.Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.createMany(args);
          const data = await prismaPromise;
          await refreshSubscriptions();
          return data;
        },
        async delete(args) {
          const ctx = import_extension2.Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.delete(args);
          const data = await prismaPromise;
          await refreshSubscriptions();
          return data;
        },
        async deleteMany(args) {
          const ctx = import_extension2.Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.deleteMany(args);
          const data = await prismaPromise;
          await refreshSubscriptions();
          return data;
        },
        async update(args) {
          const ctx = import_extension2.Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.update(args);
          const data = await prismaPromise;
          await refreshSubscriptions();
          return data;
        },
        async updateMany(args) {
          const ctx = import_extension2.Prisma.getExtensionContext(this);
          const model = ctx.$parent[ctx.$name];
          const prismaPromise = model.updateMany(args);
          const data = await prismaPromise;
          await refreshSubscriptions();
          return data;
        },
        async upsert(args) {
          const ctx = import_extension2.Prisma.getExtensionContext(this);
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

// src/index.ts
var exports_src = {};
__export(exports_src, {
  reactiveQueriesExtension: () => reactiveQueriesExtension,
  reactiveHooksExtension: () => reactiveHooksExtension
});
module.exports = __toCommonJS(exports_src);
var import_auto = require("react-native-url-polyfill/auto");
var import_react_native2 = require("react-native");
var import_react_native_quick_base64 = require("react-native-quick-base64");
global.atob = import_react_native_quick_base64.atob;
global.btoa = import_react_native_quick_base64.btoa;
var isTurboModuleEnabled = global.__turboModuleProxy != null;
var PrismaModule = isTurboModuleEnabled ? (init_NativePrisma(), __toCommonJS(exports_NativePrisma)).default : import_react_native2.NativeModules.Prisma;
if (!PrismaModule) {
  throw new Error("\uD83D\uDFE5 @prisma/react-native failed to initialize");
}
PrismaModule.install();
if (!global.__PrismaProxy) {
  throw new Error("\uD83D\uDFE5 prisma/react-native C++ bindings failed to initialize");
}
var ogCreate = __PrismaProxy.create;
global.__PrismaProxy = {
  ...global.__PrismaProxy,
  create: (options) => {
    if (typeof options.env !== "string") {
      options.env = JSON.stringify(options.env);
    }
    if (typeof options.datasourceOverrides !== "string") {
      options.datasourceOverrides = JSON.stringify(options.datasourceOverrides);
    }
    return ogCreate(options);
  }
};
