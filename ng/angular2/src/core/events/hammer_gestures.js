System.register(["rtts_assert/rtts_assert", "./hammer_common", "angular2/src/facade/dom", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var assert,
      HammerGesturesPluginCommon,
      Element,
      isPresent,
      BaseException,
      HammerGesturesPlugin;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      HammerGesturesPluginCommon = $__m.HammerGesturesPluginCommon;
    }, function($__m) {
      Element = $__m.Element;
    }, function($__m) {
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
    }],
    execute: function() {
      HammerGesturesPlugin = $__export("HammerGesturesPlugin", (function($__super) {
        var HammerGesturesPlugin = function HammerGesturesPlugin() {
          $traceurRuntime.superConstructor(HammerGesturesPlugin).call(this);
        };
        return ($traceurRuntime.createClass)(HammerGesturesPlugin, {
          supports: function(eventName) {
            assert.argumentTypes(eventName, assert.type.string);
            if (!$traceurRuntime.superGet(this, HammerGesturesPlugin.prototype, "supports").call(this, eventName))
              return assert.returnType((false), assert.type.boolean);
            if (!isPresent(window.Hammer)) {
              throw new BaseException(("Hammer.js is not loaded, can not bind " + eventName + " event"));
            }
            return assert.returnType((true), assert.type.boolean);
          },
          addEventListener: function(element, eventName, handler) {
            assert.argumentTypes(element, Element, eventName, assert.type.string, handler, Function);
            var zone = this.manager.getZone();
            eventName = eventName.toLowerCase();
            zone.runOutsideAngular(function() {
              var mc = new Hammer(element);
              mc.get('pinch').set({enable: true});
              mc.get('rotate').set({enable: true});
              mc.on(eventName, function(eventObj) {
                zone.run(function() {
                  handler(eventObj);
                });
              });
            });
          }
        }, {}, $__super);
      }(HammerGesturesPluginCommon)));
      Object.defineProperty(HammerGesturesPlugin.prototype.supports, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(HammerGesturesPlugin.prototype.addEventListener, "parameters", {get: function() {
          return [[Element], [assert.type.string], [Function]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/core/events/hammer_gestures.map

//# sourceMappingURL=../../../../angular2/src/core/events/hammer_gestures.js.map