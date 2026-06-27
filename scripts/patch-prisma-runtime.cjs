#!/usr/bin/env node

const fs = require('node:fs');

function resolveRuntime() {
  const paths = [process.env.INIT_CWD, process.cwd()].filter(Boolean);
  return require.resolve('@prisma/client/runtime/react-native.js', { paths });
}

function patchRuntime(runtimePath) {
  let source = fs.readFileSync(runtimePath, 'utf8');
  let patched = false;

  const queryMethod =
    'query(t,r,n,i){return __PrismaProxy.execute(this.engineObject,t,r,n,i)}compile(){throw new Error("not implemented")}';
  const querySyncMethod =
    'query(t,r,n,i){return __PrismaProxy.execute(this.engineObject,t,r,n,i)}querySync(t,r,n,i){return globalThis.__PrismaProxy.executeSync(this.engineObject,t,r,n,i)}compile(){throw new Error("not implemented")}';

  if (source.includes(queryMethod)) {
    source = source.replace(queryMethod, querySyncMethod);
    patched = true;
  } else if (!source.includes(querySyncMethod)) {
    throw new Error(
      `Unsupported @prisma/client react-native QueryEngine shape: ${runtimePath}`
    );
  }

  const wrapEngineQuery =
    'metrics:t.metrics?.bind(t),query:this.withRequestId(t.query.bind(t)),rollbackTransaction:this.withRequestId(t.rollbackTransaction.bind(t))';
  const wrapEngineQuerySync =
    'metrics:t.metrics?.bind(t),query:this.withRequestId(t.query.bind(t)),querySync:t.querySync?.bind(t),rollbackTransaction:this.withRequestId(t.rollbackTransaction.bind(t))';

  if (source.includes(wrapEngineQuery)) {
    source = source.replace(wrapEngineQuery, wrapEngineQuerySync);
    patched = true;
  } else if (!source.includes(wrapEngineQuerySync)) {
    throw new Error(
      `Unsupported @prisma/client react-native wrapEngine shape: ${runtimePath}`
    );
  }

  if (patched) {
    fs.writeFileSync(runtimePath, source);
  }
  return patched;
}

try {
  const runtimePath = resolveRuntime();
  if (patchRuntime(runtimePath)) {
    console.log(`Patched Prisma React Native runtime: ${runtimePath}`);
  }
} catch (error) {
  console.warn(
    `Could not patch Prisma React Native runtime: ${
      error instanceof Error ? error.message : String(error)
    }`
  );
}
