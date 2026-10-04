"use strict";

import { NitroModules } from 'react-native-nitro-modules';
const native = NitroModules.createHybridObject('PrismaQueryCompiler');
export class NativeSQLiteDatabase {
  #handle;
  constructor(name, directory) {
    this.#handle = native.openDatabase(name, directory);
  }
  query(sql, args = []) {
    const _result = JSON.parse(native.queryDatabase(this.#handle, sql, JSON.stringify(args)));
    _result.rows = _result.rows.map(_row => _row.map(_value => _value?.$type === 'BigInt' ? BigInt(_value.value) : _value?.$type === 'Bytes' ? Uint8Array.from(atob(_value.value), _char => _char.charCodeAt(0)) : _value));
    return _result;
  }
  all(sql, args = []) {
    const _result = this.query(sql, args);
    return _result.rows.map(_row => Object.fromEntries(_result.columnNames.map((_name, _index) => [_name, _row[_index]])));
  }
  exec(sql) {
    native.executeScript(this.#handle, sql);
  }
  close() {
    native.closeDatabase(this.#handle);
  }
}
export class NativeQueryCompiler {
  #handle;
  constructor(params) {
    this.#handle = native.create(JSON.stringify(params));
  }
  compile(request) {
    return JSON.parse(native.compile(this.#handle, request));
  }
  compileBatch(request) {
    return JSON.parse(native.compileBatch(this.#handle, request));
  }
  free() {
    native.free(this.#handle);
  }
}
//# sourceMappingURL=native.js.map