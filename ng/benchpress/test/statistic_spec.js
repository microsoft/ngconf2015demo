System.register(["angular2/test_lib", "benchpress/src/statistic", "angular2/src/facade/math"], function($__export) {
  "use strict";
  var describe,
      ddescribe,
      it,
      iit,
      xit,
      expect,
      beforeEach,
      afterEach,
      Statistic,
      NaN;
  function main() {
    describe('statistic', (function() {
      it('should calculate the mean', (function() {
        expect(Statistic.calculateMean([])).toBeNaN();
        expect(Statistic.calculateMean([1, 2, 3])).toBe(2.0);
      }));
      it('should calculate the standard deviation', (function() {
        expect(Statistic.calculateStandardDeviation([], NaN)).toBeNaN();
        expect(Statistic.calculateStandardDeviation([1], 1)).toBe(0.0);
        expect(Statistic.calculateStandardDeviation([2, 4, 4, 4, 5, 5, 7, 9], 5)).toBe(2.0);
      }));
      it('should calculate the coefficient of variation', (function() {
        expect(Statistic.calculateCoefficientOfVariation([], NaN)).toBeNaN();
        expect(Statistic.calculateCoefficientOfVariation([1], 1)).toBe(0.0);
        expect(Statistic.calculateCoefficientOfVariation([2, 4, 4, 4, 5, 5, 7, 9], 5)).toBe(40.0);
      }));
      it('should calculate the regression slope', (function() {
        expect(Statistic.calculateRegressionSlope([], NaN, [], NaN)).toBeNaN();
        expect(Statistic.calculateRegressionSlope([1], 1, [2], 2)).toBeNaN();
        expect(Statistic.calculateRegressionSlope([1, 2], 1.5, [2, 4], 3)).toBe(2.0);
      }));
    }));
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
      Statistic = $__m.Statistic;
    }, function($__m) {
      NaN = $__m.NaN;
    }],
    execute: function() {
    }
  };
});

//# sourceMappingURL=benchpress/test/statistic_spec.map

//# sourceMappingURL=../../benchpress/test/statistic_spec.js.map