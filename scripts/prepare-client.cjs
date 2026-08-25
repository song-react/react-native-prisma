#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

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
const portableRuntime = runtime.replace(
  /async function decodeBase64AsWasm\(wasmBase64: string\): Promise<WebAssembly\.Module> \{[\s\S]*?\n\}/,
  `function decodeBase64AsWasm(wasmBase64: string): WebAssembly.Module {
  return new WebAssembly.Module(Uint8Array.from(atob(wasmBase64), value => value.charCodeAt(0)))
}`
);
if (portableRuntime === runtime && !runtime.includes('Uint8Array.from(atob(wasmBase64)')) {
  throw new Error(`Unsupported Prisma client: ${classPath}`);
}
fs.writeFileSync(classPath, portableRuntime);

console.log(`Prepared Prisma 7 client for React Native: ${directory}`);
