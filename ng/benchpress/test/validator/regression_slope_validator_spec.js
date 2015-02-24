System.register(["angular2/test_lib", "angular2/src/facade/lang", "angular2/src/facade/collection", "benchpress/benchpress"], function($__export) {
  "use strict";
  var describe,
      ddescribe,
      it,
      iit,
      xit,
      expect,
      beforeEach,
      afterEach,
      Date,
      DateWrapper,
      ListWrapper,
      Validator,
      RegressionSlopeValidator,
      Injector,
      bind,
      MeasureValues;
  function main() {
    describe('regression slope validator', (function() {
      var validator;
      function createValidator($__0) {
        var $__1 = $__0,
            size = $__1.size,
            metric = $__1.metric;
        validator = new Injector([RegressionSlopeValidator.BINDINGS, bind(RegressionSlopeValidator.METRIC).toValue(metric), bind(RegressionSlopeValidator.SAMPLE_SIZE).toValue(size)]).get(Validator);
      }
      it('should return sampleSize and metric as description', (function() {
        createValidator({
          size: 2,
          metric: 'script'
        });
        expect(validator.describe()).toEqual({
          'sampleSize': 2,
          'regressionSlopeMetric': 'script'
        });
      }));
      it('should return null while the completeSample is smaller than the given size', (function() {
        createValidator({
          size: 2,
          metric: 'script'
        });
        expect(validator.validate([])).toBe(null);
        expect(validator.validate([mv(0, 0, {})])).toBe(null);
      }));
      it('should return null while the regression slope is < 0', (function() {
        createValidator({
          size: 2,
          metric: 'script'
        });
        expect(validator.validate([mv(0, 0, {'script': 2}), mv(1, 1, {'script': 1})])).toBe(null);
      }));
      it('should return the last sampleSize runs when the regression slope is ==0', (function() {
        createValidator({
          size: 2,
          metric: 'script'
        });
        var sample = [mv(0, 0, {'script': 1}), mv(1, 1, {'script': 1}), mv(2, 2, {'script': 1})];
        expect(validator.validate(ListWrapper.slice(sample, 0, 2))).toEqual(ListWrapper.slice(sample, 0, 2));
        expect(validator.validate(sample)).toEqual(ListWrapper.slice(sample, 1, 3));
      }));
      it('should return the last sampleSize runs when the regression slope is >0', (function() {
        createValidator({
          size: 2,
          metric: 'script'
        });
        var sample = [mv(0, 0, {'script': 1}), mv(1, 1, {'script': 2}), mv(2, 2, {'script': 3})];
        expect(validator.validate(ListWrapper.slice(sample, 0, 2))).toEqual(ListWrapper.slice(sample, 0, 2));
        expect(validator.validate(sample)).toEqual(ListWrapper.slice(sample, 1, 3));
      }));
    }));
  }
  function mv(runIndex, time, values) {
    return new MeasureValues(runIndex, DateWrapper.fromMillis(time), values);
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      describe = $__m.describe;
      ddescribe = $__m.ddescribe;
      it = $__m.it;
      iit = $__m.iit;
      xit = $__m.xit;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
      afterEach = $__m.afterEach;
    }, function($__m) {
      Date = $__m.Date;
      DateWrapper = $__m.DateWrapper;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      Validator = $__m.Validator;
      RegressionSlopeValidator = $__m.RegressionSlopeValidator;
      Injector = $__m.Injector;
      bind = $__m.bind;
      MeasureValues = $__m.MeasureValues;
    }],
    execute: function() {
    }
  };
});

//# sourceMappingURL=benchpress/test/validator/regression_slope_validator_spec.map

//# sourceMappingURL=../../../benchpress/test/validator/regression_slope_validator_spec.js.map