#import "Prisma.h"
#import <jsi/jsi.h>
#import <React/RCTBridge.h>
#import <React/RCTBridge+Private.h>
#import <React/RCTSurfacePresenterBridgeAdapter.h>
#import <dispatch/dispatch.h>
#import <ReactCommon/RCTTurboModule.h>
#import <UIKit/UIKit.h>
#import <iostream>

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNPrismaSpecJSI.h"
#endif

// Forward declare runtimeExecutor to silence selector warnings on older headers
@interface RCTBridge (RuntimeExecutorForwardDecl)
- (facebook::react::RuntimeExecutor)runtimeExecutor;
@end

static NSString *PrismaLibraryPath() {
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSLibraryDirectory, NSUserDomainMask, true);
    return [paths objectAtIndex:0];
}

static NSString *PrismaMigrationsPath() {
    auto bundleURL = NSBundle.mainBundle.bundleURL;
    auto migrations_path_absolute = [NSString stringWithFormat:@"%@%@", bundleURL.absoluteString, @"migrations"];
    return [migrations_path_absolute stringByReplacingOccurrencesOfString:@"file://" withString:@""];
}

static inline void InstallInRuntime(facebook::jsi::Runtime &runtime,
                                    std::shared_ptr<facebook::react::CallInvoker> callInvoker) {
    NSString *libraryPath = PrismaLibraryPath();
    NSString *migrationsPath = PrismaMigrationsPath();
    prisma::install_cxx(runtime, callInvoker, [libraryPath UTF8String], [migrationsPath UTF8String]);
}

static RCTBridge *ResolveBridge(id<RCTBridgeModule> module) {
    RCTBridge *bridge = nil;
    if ([module respondsToSelector:@selector(bridge)]) {
        bridge = ((id<RCTBridgeModule>)module).bridge;
    }
    if (bridge == nil) {
        bridge = [RCTBridge currentBridge];
    }
    return bridge;
}

@implementation Prisma

@synthesize bridge=_bridge;

RCT_EXPORT_MODULE()

// Old-arch sync install for classic bridge
#if !RCT_NEW_ARCH_ENABLED
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(install)
{
#if DEBUG
    std::cout << "▲ NSHomeDirectory:\n" << [NSHomeDirectory() UTF8String] << std::endl;
    std::cout << "▲ Library Path:\n" << [PrismaLibraryPath() UTF8String] << std::endl;
    std::cout << "▲ Migrations Path:\n" << [PrismaMigrationsPath() UTF8String] << std::endl;
#endif

    BOOL ok = NO;
    auto okPtr = &ok;
    RCTBridge *bridge = ResolveBridge(self);

    // Try new-arch path first if runtimeExecutor is available
    if (bridge && [bridge respondsToSelector:@selector(runtimeExecutor)]) {
        facebook::react::RuntimeExecutor executor = RCTRuntimeExecutorFromBridge(bridge);
        dispatch_semaphore_t sema = dispatch_semaphore_create(0);
        executor([&](facebook::jsi::Runtime &runtime) {
          InstallInRuntime(runtime, bridge.jsCallInvoker);
          *okPtr = YES;
          dispatch_semaphore_signal(sema);
        });
        dispatch_semaphore_wait(sema, DISPATCH_TIME_FOREVER);
        return @(ok);
    }

    // Fallback to old-arch bridge access
    RCTBridge *legacyBridge = _bridge ?: bridge;
    RCTCxxBridge *cxxBridge = (RCTCxxBridge *)legacyBridge;
    if (cxxBridge == nil || cxxBridge.runtime == nil) {
        NSLog(@"[Prisma] no runtime available to install cxx");
        return @false;
    }

    auto jsiRuntime = (facebook::jsi::Runtime *)cxxBridge.runtime;
    auto &runtime = *jsiRuntime;
    auto callInvoker = _bridge ? _bridge.jsCallInvoker : legacyBridge.jsCallInvoker;
    
    InstallInRuntime(runtime, callInvoker);
    return @true;
}
#else
// Required by NativePrismaSpec protocol in new-arch; TurboModule path uses C++ spec below.
- (void)install {}
#endif

#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    class PrismaCxxTurboModule final : public facebook::react::NativePrismaCxxSpec<PrismaCxxTurboModule> {
    public:
        explicit PrismaCxxTurboModule(std::shared_ptr<facebook::react::CallInvoker> jsInvoker)
            : NativePrismaCxxSpec(std::move(jsInvoker)) {}

        void install(facebook::jsi::Runtime &rt) {
            InstallInRuntime(rt, this->jsInvoker_);
        }
    };

    return std::make_shared<PrismaCxxTurboModule>(params.jsInvoker);
}
#endif

- (void)invalidate {
        prisma::invalidate();
}

@end
