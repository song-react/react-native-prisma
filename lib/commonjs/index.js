"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  NativeQueryCompiler: true,
  queriesExtension: true,
  PrismaSQLite: true
};
Object.defineProperty(exports, "NativeQueryCompiler", {
  enumerable: true,
  get: function () {
    return _native.NativeQueryCompiler;
  }
});
Object.defineProperty(exports, "PrismaSQLite", {
  enumerable: true,
  get: function () {
    return _SQLiteAdapter.PrismaSQLite;
  }
});
Object.defineProperty(exports, "queriesExtension", {
  enumerable: true,
  get: function () {
    return _QueriesExtension.queriesExtension;
  }
});
var _client = require("@prisma/client");
Object.keys(_client).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _client[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _client[key];
    }
  });
});
var _native = require("./native.js");
var _QueriesExtension = require("./QueriesExtension.js");
var _SQLiteAdapter = require("./SQLiteAdapter.js");
//# sourceMappingURL=index.js.map