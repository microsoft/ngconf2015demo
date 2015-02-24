System.register(["rtts_assert/rtts_assert", "./compile_element", "./compile_control"], function($__export) {
  "use strict";
  var assert,
      CompileElement,
      CompileControl,
      CompileStep;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      CompileElement = $__m.CompileElement;
    }, function($__m) {
      CompileControl = $__m.CompileControl;
    }],
    execute: function() {
      CompileStep = $__export("CompileStep", (function() {
        var CompileStep = function CompileStep() {};
        return ($traceurRuntime.createClass)(CompileStep, {process: function(parent, current, control) {
            assert.argumentTypes(parent, CompileElement, current, CompileElement, control, CompileControl);
          }}, {});
      }()));
      Object.defineProperty(CompileStep.prototype.process, "parameters", {get: function() {
          return [[CompileElement], [CompileElement], [CompileControl]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/core/compiler/pipeline/compile_step.map

//# sourceMappingURL=../../../../../angular2/src/core/compiler/pipeline/compile_step.js.map