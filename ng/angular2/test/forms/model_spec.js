System.register(["angular2/test_lib", "angular2/forms"], function($__export) {
  "use strict";
  var ddescribe,
      describe,
      it,
      iit,
      xit,
      expect,
      beforeEach,
      afterEach,
      el,
      ControlGroup,
      Control;
  function main() {
    describe("ControlGroup", (function() {
      describe("value", (function() {
        it("should be the reduced value of the child controls", (function() {
          var g = new ControlGroup({
            "one": new Control("111"),
            "two": new Control("222")
          });
          expect(g.value).toEqual({
            "one": "111",
            "two": "222"
          });
        }));
        it("should be empty when there are no child controls", (function() {
          var g = new ControlGroup({});
          expect(g.value).toEqual({});
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
      xit = $__m.xit;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
      afterEach = $__m.afterEach;
      el = $__m.el;
    }, function($__m) {
      ControlGroup = $__m.ControlGroup;
      Control = $__m.Control;
    }],
    execute: function() {
    }
  };
});

//# sourceMappingURL=angular2/test/forms/model_spec.map

//# sourceMappingURL=../../../angular2/test/forms/model_spec.js.map