System.register(["rtts_assert/rtts_assert", "angular2/src/facade/async", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var assert,
      Promise,
      PromiseWrapper,
      ABSTRACT,
      BaseException,
      Metric;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Promise = $__m.Promise;
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      ABSTRACT = $__m.ABSTRACT;
      BaseException = $__m.BaseException;
    }],
    execute: function() {
      Metric = $__export("Metric", (function() {
        var Metric = function Metric() {};
        return ($traceurRuntime.createClass)(Metric, {
          beginMeasure: function() {
            throw new BaseException('NYI');
          },
          endMeasure: function(restart) {
            assert.argumentTypes(restart, assert.type.boolean);
            throw new BaseException('NYI');
          },
          describe: function() {
            throw new BaseException('NYI');
          }
        }, {});
      }()));
      Object.defineProperty(Metric, "annotations", {get: function() {
          return [new ABSTRACT()];
        }});
      Object.defineProperty(Metric.prototype.endMeasure, "parameters", {get: function() {
          return [[assert.type.boolean]];
        }});
    }
  };
});

//# sourceMappingURL=benchpress/src/metric.map

//# sourceMappingURL=../../benchpress/src/metric.js.map