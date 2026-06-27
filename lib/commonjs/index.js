"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "reactiveHooksExtension", {
  enumerable: true,
  get: function () {
    return _ReactiveHooksExtension.reactiveHooksExtension;
  }
});
Object.defineProperty(exports, "reactiveQueriesExtension", {
  enumerable: true,
  get: function () {
    return _ReactiveQueriesExtension.reactiveQueriesExtension;
  }
});
Object.defineProperty(exports, "synchronousQueriesExtension", {
  enumerable: true,
  get: function () {
    return _SyncQueriesExtension.synchronousQueriesExtension;
  }
});
require("react-native-url-polyfill/auto");
var _reactNative = require("react-native");
var _reactNativeQuickBase = require("react-native-quick-base64");
var _ReactiveHooksExtension = require("./ReactiveHooksExtension");
var _ReactiveQueriesExtension = require("./ReactiveQueriesExtension");
var _SyncQueriesExtension = require("./SyncQueriesExtension");
global.atob = _reactNativeQuickBase.atob;
global.btoa = _reactNativeQuickBase.btoa;
// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;
const PrismaModule = isTurboModuleEnabled ? require('./NativePrisma').default : _reactNative.NativeModules.Prisma;
if (!PrismaModule) {
  throw new Error('🟥 @prisma/react-native failed to initialize');
}
PrismaModule.install();
if (!global.__PrismaProxy) {
  throw new Error('🟥 prisma/react-native C++ bindings failed to initialize');
}

// Wrap the create function to stringify the env variables if necessary
const ogCreate = __PrismaProxy.create;
global.__PrismaProxy = {
  ...global.__PrismaProxy,
  create: options => {
    if (typeof options.env !== 'string') {
      options.env = JSON.stringify(options.env);
    }
    if (typeof options.datasourceOverrides !== 'string') {
      options.datasourceOverrides = JSON.stringify(options.datasourceOverrides);
    }
    return ogCreate(options);
  }
};
//# sourceMappingURL=index.js.map