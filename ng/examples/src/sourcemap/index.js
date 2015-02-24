System.register(["angular2/src/facade/lang"], function($__export) {
  "use strict";
  var BaseException,
      print,
      CONST,
      TestAnnotation,
      Test;
  function main() {
    new Test().run();
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      BaseException = $__m.BaseException;
      print = $__m.print;
      CONST = $__m.CONST;
    }],
    execute: function() {
      TestAnnotation = (function() {
        var TestAnnotation = function TestAnnotation() {};
        return ($traceurRuntime.createClass)(TestAnnotation, {}, {});
      }());
      Object.defineProperty(TestAnnotation, "annotations", {get: function() {
          return [new CONST()];
        }});
      Test = (function() {
        var Test = function Test() {};
        return ($traceurRuntime.createClass)(Test, {run: function() {
            try {
              throw new BaseException('Sourcemap test');
            } catch (e) {
              print(e);
            }
          }}, {});
      }());
      Object.defineProperty(Test, "annotations", {get: function() {
          return [new TestAnnotation()];
        }});
    }
  };
});

//# sourceMappingURL=examples/src/sourcemap/index.map

//# sourceMappingURL=../../../examples/src/sourcemap/index.js.map