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
const portableRuntime = (
  runtime.includes('import { Buffer } from "buffer"')
    ? runtime
    : runtime.replace(
        'import * as runtime from "@prisma/client/runtime/client"',
        'import { Buffer } from "buffer"\nimport * as runtime from "@prisma/client/runtime/client"'
      )
)
  .replace(
    /(?:async )?function decodeBase64AsWasm\(wasmBase64: string\): (?:Promise<)?WebAssembly\.Module>? \{[\s\S]*?\n\}/,
    `function decodeBase64AsWasm(wasmBase64: string): WebAssembly.Module {
  return new WebAssembly.Module(Buffer.from(wasmBase64, 'base64'))
}`
  );
if (
  portableRuntime === runtime &&
  !runtime.includes("Buffer.from(wasmBase64, 'base64')")
) {
  throw new Error(`Unsupported Prisma client: ${classPath}`);
}
fs.writeFileSync(classPath, portableRuntime);

console.log(`Prepared generated Prisma 7 client: ${directory}`);
