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
      SizeValidator,
      Injector,
      bind,
      MeasureValues;
  function main() {
    describe('size validator', (function() {
      var validator;
      function createValidator(size) {
        validator = new Injector([SizeValidator.BINDINGS, bind(SizeValidator.SAMPLE_SIZE).toValue(size)]).get(Validator);
      }
      it('should return sampleSize as description', (function() {
        createValidator(2);
        expect(validator.describe()).toEqual({'sampleSize': 2});
      }));
      it('should return null while the completeSample is smaller than the given size', (function() {
        createValidator(2);
        expect(validator.validate([])).toBe(null);
        expect(validator.validate([mv(0, 0, {})])).toBe(null);
      }));
      it('should return the last sampleSize runs when it has at least the given size', (function() {
        createValidator(2);
        var sample = [mv(0, 0, {'a': 1}), mv(1, 1, {'b': 2}), mv(2, 2, {'c': 3})];
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
      SizeValidator = $__m.SizeValidator;
      Injector = $__m.Injector;
      bind = $__m.bind;
      MeasureValues = $__m.MeasureValues;
    }],
    execute: function() {
    }
  };
});

//# sourceMappingURL=benchpress/test/validator/size_validator_spec.map

//# sourceMappingURL=../../../benchpress/test/validator/size_validator_spec.js.map