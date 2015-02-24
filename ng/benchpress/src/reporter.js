System.register(["rtts_assert/rtts_assert", "angular2/src/facade/async", "angular2/src/facade/lang", "./measure_values"], function($__export) {
  "use strict";
  var assert,
      Promise,
      PromiseWrapper,
      ABSTRACT,
      BaseException,
      MeasureValues,
      Reporter;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Promise = $__m.Promise;
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      ABSTRACT = $__m.ABSTRACT;
      BaseException = $__m.BaseException;
    }, function($__m) {
      MeasureValues = $__m.MeasureValues;
    }],
    execute: function() {
      Reporter = $__export("Reporter", (function() {
        var Reporter = function Reporter() {};
        return ($traceurRuntime.createClass)(Reporter, {
          reportMeasureValues: function(values) {
            assert.argumentTypes(values, MeasureValues);
            throw new BaseException('NYI');
          },
          reportSample: function(completeSample, validSample) {
            assert.argumentTypes(completeSample, assert.genericType(List, MeasureValues), validSample, assert.genericType(List, MeasureValues));
            throw new BaseException('NYI');
          }
        }, {});
      }()));
      Object.defineProperty(Reporter, "annotations", {get: function() {
          return [new ABSTRACT()];
        }});
      Object.defineProperty(Reporter.prototype.reportMeasureValues, "parameters", {get: function() {
          return [[MeasureValues]];
        }});
      Object.defineProperty(Reporter.prototype.reportSample, "parameters", {get: function() {
          return [[assert.genericType(List, MeasureValues)], [assert.genericType(List, MeasureValues)]];
        }});
    }
  };
});

//# sourceMappingURL=benchpress/src/reporter.map

//# sourceMappingURL=../../benchpress/src/reporter.js.map