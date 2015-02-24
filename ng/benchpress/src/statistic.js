System.register(["angular2/src/facade/math", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var Math,
      ListWrapper,
      Statistic;
  return {
    setters: [function($__m) {
      Math = $__m.Math;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }],
    execute: function() {
      Statistic = $__export("Statistic", (function() {
        var Statistic = function Statistic() {};
        return ($traceurRuntime.createClass)(Statistic, {}, {
          calculateCoefficientOfVariation: function(sample, mean) {
            return Statistic.calculateStandardDeviation(sample, mean) / mean * 100;
          },
          calculateMean: function(sample) {
            var total = 0;
            ListWrapper.forEach(sample, (function(x) {
              total += x;
            }));
            return total / sample.length;
          },
          calculateStandardDeviation: function(sample, mean) {
            var deviation = 0;
            ListWrapper.forEach(sample, (function(x) {
              deviation += Math.pow(x - mean, 2);
            }));
            deviation = deviation / (sample.length);
            deviation = Math.sqrt(deviation);
            return deviation;
          },
          calculateRegressionSlope: function(xValues, xMean, yValues, yMean) {
            var dividendSum = 0;
            var divisorSum = 0;
            for (var i = 0; i < xValues.length; i++) {
              dividendSum += (xValues[i] - xMean) * (yValues[i] - yMean);
              divisorSum += Math.pow(xValues[i] - xMean, 2);
            }
            return dividendSum / divisorSum;
          }
        });
      }()));
    }
  };
});

//# sourceMappingURL=benchpress/src/statistic.map

//# sourceMappingURL=../../benchpress/src/statistic.js.map