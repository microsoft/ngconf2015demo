System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/change_detection", "angular2/src/core/zone/vm_turn_zone", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var assert,
      FIELD,
      print,
      ChangeDetector,
      VmTurnZone,
      ListWrapper,
      isPresent,
      LifeCycle;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      FIELD = $__m.FIELD;
      print = $__m.print;
      isPresent = $__m.isPresent;
    }, function($__m) {
      ChangeDetector = $__m.ChangeDetector;
    }, function($__m) {
      VmTurnZone = $__m.VmTurnZone;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }],
    execute: function() {
      LifeCycle = $__export("LifeCycle", (function() {
        var LifeCycle = function LifeCycle() {
          var changeDetector = arguments[0] !== (void 0) ? arguments[0] : null;
          var enforceNoNewChanges = arguments[1] !== (void 0) ? arguments[1] : false;
          assert.argumentTypes(changeDetector, ChangeDetector, enforceNoNewChanges, assert.type.boolean);
          this._changeDetector = changeDetector;
          this._enforceNoNewChanges = enforceNoNewChanges;
        };
        return ($traceurRuntime.createClass)(LifeCycle, {
          registerWith: function(zone) {
            var changeDetector = arguments[1] !== (void 0) ? arguments[1] : null;
            var $__0 = this;
            var errorHandler = (function(exception, stackTrace) {
              var longStackTrace = ListWrapper.join(stackTrace, "\n\n-----async gap-----\n");
              print((exception + "\n\n" + longStackTrace));
              throw exception;
            });
            if (isPresent(changeDetector)) {
              this._changeDetector = changeDetector;
            }
            zone.initCallbacks({
              onErrorHandler: errorHandler,
              onTurnDone: (function() {
                return $__0.tick();
              })
            });
          },
          tick: function() {
            this._changeDetector.detectChanges();
            if (this._enforceNoNewChanges) {
              this._changeDetector.checkNoChanges();
            }
          }
        }, {});
      }()));
      Object.defineProperty(LifeCycle, "parameters", {get: function() {
          return [[ChangeDetector], [assert.type.boolean]];
        }});
      Object.defineProperty(LifeCycle.prototype.registerWith, "parameters", {get: function() {
          return [[VmTurnZone], [ChangeDetector]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/core/life_cycle/life_cycle.map

//# sourceMappingURL=../../../../angular2/src/core/life_cycle/life_cycle.js.map