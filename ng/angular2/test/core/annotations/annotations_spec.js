System.register(["angular2/test_lib", "angular2/src/core/annotations/annotations"], function($__export) {
  "use strict";
  var ddescribe,
      describe,
      it,
      iit,
      expect,
      beforeEach,
      Directive,
      onChange;
  function main() {
    describe("Directive", (function() {
      describe("lifecycle", (function() {
        it("should be false when no lifecycle specified", (function() {
          var d = new Directive();
          expect(d.hasLifecycleHook(onChange)).toBe(false);
        }));
        it("should be false when the lifecycle does not contain the hook", (function() {
          var d = new Directive({lifecycle: []});
          expect(d.hasLifecycleHook(onChange)).toBe(false);
        }));
        it("should be true otherwise", (function() {
          var d = new Directive({lifecycle: [onChange]});
          expect(d.hasLifecycleHook(onChange)).toBe(true);
        }));
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      ddescribe = $__m.ddescribe;
      describe = $__m.describe;
      it = $__m.it;
      iit = $__m.iit;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
    }, function($__m) {
      Directive = $__m.Directive;
      onChange = $__m.onChange;
    }],
    execute: function() {
    }
  };
});

//# sourceMappingURL=angular2/test/core/annotations/annotations_spec.map

//# sourceMappingURL=../../../../angular2/test/core/annotations/annotations_spec.js.map