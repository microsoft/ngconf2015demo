System.register(["rtts_assert/rtts_assert", "./event_manager", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var assert,
      EventManagerPlugin,
      StringMapWrapper,
      _eventNames,
      HammerGesturesPluginCommon;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      EventManagerPlugin = $__m.EventManagerPlugin;
    }, function($__m) {
      StringMapWrapper = $__m.StringMapWrapper;
    }],
    execute: function() {
      _eventNames = {
        'pan': true,
        'panstart': true,
        'panmove': true,
        'panend': true,
        'pancancel': true,
        'panleft': true,
        'panright': true,
        'panup': true,
        'pandown': true,
        'pinch': true,
        'pinchstart': true,
        'pinchmove': true,
        'pinchend': true,
        'pinchcancel': true,
        'pinchin': true,
        'pinchout': true,
        'press': true,
        'pressup': true,
        'rotate': true,
        'rotatestart': true,
        'rotatemove': true,
        'rotateend': true,
        'rotatecancel': true,
        'swipe': true,
        'swipeleft': true,
        'swiperight': true,
        'swipeup': true,
        'swipedown': true,
        'tap': true
      };
      HammerGesturesPluginCommon = $__export("HammerGesturesPluginCommon", (function($__super) {
        var HammerGesturesPluginCommon = function HammerGesturesPluginCommon() {
          $traceurRuntime.superConstructor(HammerGesturesPluginCommon).call(this);
        };
        return ($traceurRuntime.createClass)(HammerGesturesPluginCommon, {supports: function(eventName) {
            assert.argumentTypes(eventName, assert.type.string);
            eventName = eventName.toLowerCase();
            return assert.returnType((StringMapWrapper.contains(_eventNames, eventName)), assert.type.boolean);
          }}, {}, $__super);
      }(EventManagerPlugin)));
      Object.defineProperty(HammerGesturesPluginCommon.prototype.supports, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/core/events/hammer_common.map

//# sourceMappingURL=../../../../angular2/src/core/events/hammer_common.js.map