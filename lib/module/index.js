import 'react-native-url-polyfill/auto';
import { NativeModules } from 'react-native';
import { atob, btoa } from 'react-native-quick-base64';
global.atob = atob;
global.btoa = btoa;
export { reactiveHooksExtension } from './ReactiveHooksExtension';
export { reactiveQueriesExtension } from './ReactiveQueriesExtension';
export { synchronousQueriesExtension } from './SyncQueriesExtension';
// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;
const PrismaModule = isTurboModuleEnabled ? require('./NativePrisma').default : NativeModules.Prisma;
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