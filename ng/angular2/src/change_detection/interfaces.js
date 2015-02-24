System.register(["rtts_assert/rtts_assert", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var assert,
      List,
      ChangeRecord,
      CHECK_ONCE,
      CHECKED,
      CHECK_ALWAYS,
      DETACHED,
      ChangeDispatcher,
      ChangeDetector;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      List = $__m.List;
    }],
    execute: function() {
      ChangeRecord = $__export("ChangeRecord", (function() {
        var ChangeRecord = function ChangeRecord(bindingMemento, change) {
          this.bindingMemento = bindingMemento;
          this.change = change;
        };
        return ($traceurRuntime.createClass)(ChangeRecord, {
          get currentValue() {
            return this.change.currentValue;
          },
          get previousValue() {
            return this.change.previousValue;
          }
        }, {});
      }()));
      CHECK_ONCE = $__export("CHECK_ONCE", "CHECK_ONCE");
      CHECKED = $__export("CHECKED", "CHECKED");
      CHECK_ALWAYS = $__export("CHECK_ALWAYS", "ALWAYS_CHECK");
      DETACHED = $__export("DETACHED", "DETACHED");
      ChangeDispatcher = $__export("ChangeDispatcher", (function() {
        var ChangeDispatcher = function ChangeDispatcher() {};
        return ($traceurRuntime.createClass)(ChangeDispatcher, {onRecordChange: function(directiveMemento, records) {
            assert.argumentTypes(directiveMemento, assert.type.any, records, assert.genericType(List, ChangeRecord));
          }}, {});
      }()));
      Object.defineProperty(ChangeDispatcher.prototype.onRecordChange, "parameters", {get: function() {
          return [[], [assert.genericType(List, ChangeRecord)]];
        }});
      ChangeDetector = $__export("ChangeDetector", (function() {
        var ChangeDetector = function ChangeDetector() {};
        return ($traceurRuntime.createClass)(ChangeDetector, {
          addChild: function(cd) {
            assert.argumentTypes(cd, ChangeDetector);
          },
          removeChild: function(cd) {
            assert.argumentTypes(cd, ChangeDetector);
          },
          remove: function() {},
          setContext: function(context) {
            assert.argumentTypes(context, assert.type.any);
          },
          markPathToRootAsCheckOnce: function() {},
          detectChanges: function() {},
          checkNoChanges: function() {}
        }, {});
      }()));
      Object.defineProperty(ChangeDetector.prototype.addChild, "parameters", {get: function() {
          return [[ChangeDetector]];
        }});
      Object.defineProperty(ChangeDetector.prototype.removeChild, "parameters", {get: function() {
          return [[ChangeDetector]];
        }});
      Object.defineProperty(ChangeDetector.prototype.setContext, "parameters", {get: function() {
          return [[assert.type.any]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/change_detection/interfaces.map

//# sourceMappingURL=../../../angular2/src/change_detection/interfaces.js.map