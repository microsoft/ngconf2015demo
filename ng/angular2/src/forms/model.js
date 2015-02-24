System.register(["rtts_assert/rtts_assert", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var assert,
      StringMapWrapper,
      Control,
      ControlGroup;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      StringMapWrapper = $__m.StringMapWrapper;
    }],
    execute: function() {
      Control = $__export("Control", (function() {
        var Control = function Control(value) {
          assert.argumentTypes(value, assert.type.any);
          this.value = value;
        };
        return ($traceurRuntime.createClass)(Control, {}, {});
      }()));
      Object.defineProperty(Control, "parameters", {get: function() {
          return [[assert.type.any]];
        }});
      ControlGroup = $__export("ControlGroup", (function() {
        var ControlGroup = function ControlGroup(controls) {
          this.controls = controls;
        };
        return ($traceurRuntime.createClass)(ControlGroup, {get value() {
            var res = {};
            StringMapWrapper.forEach(this.controls, (function(control, name) {
              res[name] = control.value;
            }));
            return res;
          }}, {});
      }()));
    }
  };
});

//# sourceMappingURL=angular2/src/forms/model.map

//# sourceMappingURL=../../../angular2/src/forms/model.js.map