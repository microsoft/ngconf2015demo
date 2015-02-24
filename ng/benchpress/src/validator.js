System.register(["rtts_assert/rtts_assert", "angular2/src/facade/collection", "angular2/src/facade/lang", "./measure_values"], function($__export) {
  "use strict";
  var assert,
      List,
      ABSTRACT,
      BaseException,
      MeasureValues,
      Validator;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      List = $__m.List;
    }, function($__m) {
      ABSTRACT = $__m.ABSTRACT;
      BaseException = $__m.BaseException;
    }, function($__m) {
      MeasureValues = $__m.MeasureValues;
    }],
    execute: function() {
      Validator = $__export("Validator", (function() {
        var Validator = function Validator() {};
        return ($traceurRuntime.createClass)(Validator, {
          validate: function(completeSample) {
            assert.argumentTypes(completeSample, assert.genericType(List, MeasureValues));
            throw new BaseException('NYI');
          },
          describe: function() {
            throw new BaseException('NYI');
          }
        }, {});
      }()));
      Object.defineProperty(Validator, "annotations", {get: function() {
          return [new ABSTRACT()];
        }});
      Object.defineProperty(Validator.prototype.validate, "parameters", {get: function() {
          return [[assert.genericType(List, MeasureValues)]];
        }});
    }
  };
});

//# sourceMappingURL=benchpress/src/validator.map

//# sourceMappingURL=../../benchpress/src/validator.js.map