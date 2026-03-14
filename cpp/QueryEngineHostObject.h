
#ifndef query_engine_host_object_h
#define query_engine_host_object_h

#include <TargetConditionals.h>
#if TARGET_OS_SIMULATOR
#include "../engines/ios/QueryEngine.xcframework/ios-arm64_x86_64-simulator/Headers/query_engine.h"
#else
#include "../engines/ios/QueryEngine.xcframework/ios-arm64/Headers/query_engine.h"
#endif
#include <jsi/jsi.h>
#include <memory>
#include <string>

namespace prisma {
namespace jsi = facebook::jsi;

class JSI_EXPORT QueryEngineHostObject : public jsi::HostObject {
public:
  QueryEngineHostObject(std::string id,
                        std::function<void(std::string)> log_callback);

  void setEngine(QueryEngine *ptr);

  std::string id;
  std::function<void(std::string)> log_callback;
  QueryEngine *engine;
};
} // namespace prisma

#endif
