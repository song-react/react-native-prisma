#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

require('./patch-prisma-runtime.cjs');

const directory = path.resolve(process.argv[2] ?? 'generated/prisma');
const clientPath = path.join(directory, 'client.ts');
const classPath = path.join(directory, 'internal/class.ts');

let client = fs.readFileSync(clientPath, 'utf8');
const portableClient = client.replace(
  /import \* as process from 'node:process'\nimport \* as path from 'node:path'\nimport \{ fileURLToPath \} from 'node:url'\nglobalThis\['__dirname'\] = path\.dirname\(fileURLToPath\(import\.meta\.url\)\)/,
  "globalThis['__dirname'] = '/'"
);
if (portableClient === client && !client.includes("globalThis['__dirname'] = '/'")) {
  throw new Error(`Unsupported Prisma client: ${clientPath}`);
}
fs.writeFileSync(clientPath, portableClient);

let runtime = fs.readFileSync(classPath, 'utf8');
runtime = runtime.replace('import { Buffer } from "buffer"\n', '');
if (!runtime.includes('from "@prisma/react-native/native"')) {
  runtime = runtime.replace(
    'import * as runtime from "@prisma/client/runtime/client"',
    'import * as runtime from "@prisma/client/runtime/client"\nimport { NativeQueryCompiler } from "@prisma/react-native/native"'
  );
}
if (!runtime.includes('getNativeQueryCompiler')) {
  const functionStart = runtime.indexOf('function decodeBase64AsWasm');
  const start = runtime.lastIndexOf('\n', functionStart) + 1;
  const end = runtime.indexOf('\n\n\nexport type ', start);
  if (functionStart < 0 || end < 0) {
    throw new Error(`Unsupported Prisma client: ${classPath}`);
  }
  runtime =
    runtime.slice(0, start) +
    `config.compilerWasm = {
  getNativeQueryCompiler: async () => NativeQueryCompiler
} as any` +
    runtime.slice(end);
}
if (!runtime.includes('getNativeQueryCompiler')) {
  throw new Error(`Unsupported Prisma client: ${classPath}`);
}
fs.writeFileSync(classPath, runtime);

console.log(`Prepared generated Prisma 7 client: ${directory}`);
