/**
 * Automatically generated by expo-modules-autolinking.
 *
 * This autogenerated class provides a list of classes of native Expo modules,
 * but only these that are written in Swift and use the new API for creating Expo modules.
 */

import ExpoModulesCore
import ExpoBlur
import EXConstants
import ExpoFileSystem
import ExpoKeepAwake
import ExpoLinearGradient

@objc(ExpoModulesProvider)
public class ExpoModulesProvider: ModulesProvider {
  public override func getModuleClasses() -> [AnyModule.Type] {
    return [
      BlurViewModule.self,
      ConstantsModule.self,
      FileSystemModule.self,
      KeepAwakeModule.self,
      LinearGradientModule.self
    ]
  }

  public override func getAppDelegateSubscribers() -> [ExpoAppDelegateSubscriber.Type] {
    return [
      FileSystemBackgroundSessionHandler.self
    ]
  }

  public override func getReactDelegateHandlers() -> [ExpoReactDelegateHandlerTupleType] {
    return [
    ]
  }
}