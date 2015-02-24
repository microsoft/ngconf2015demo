System.register(["rtts_assert/rtts_assert", "angular2/src/facade/collection", "angular2/di", "../validator", "../statistic", "../measure_values"], function($__export) {
  "use strict";
  var assert,
      List,
      ListWrapper,
      bind,
      OpaqueToken,
      Validator,
      Statistic,
      MeasureValues,
      RegressionSlopeValidator,
      _SAMPLE_SIZE,
      _METRIC,
      _BINDINGS;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      bind = $__m.bind;
      OpaqueToken = $__m.OpaqueToken;
    }, function($__m) {
      Validator = $__m.Validator;
    }, function($__m) {
      Statistic = $__m.Statistic;
    }, function($__m) {
      MeasureValues = $__m.MeasureValues;
    }],
    execute: function() {
      RegressionSlopeValidator = $__export("RegressionSlopeValidator", (function($__super) {
        var RegressionSlopeValidator = function RegressionSlopeValidator(sampleSize, metric) {
          $traceurRuntime.superConstructor(RegressionSlopeValidator).call(this);
          this._sampleSize = sampleSize;
          this._metric = metric;
        };
        return ($traceurRuntime.createClass)(RegressionSlopeValidator, {
          describe: function() {
            return assert.returnType(({
              'sampleSize': this._sampleSize,
              'regressionSlopeMetric': this._metric
            }), assert.type.any);
          },
          validate: function(completeSample) {
            assert.argumentTypes(completeSample, assert.genericType(List, MeasureValues));
            if (completeSample.length >= this._sampleSize) {
              var latestSample = ListWrapper.slice(completeSample, completeSample.length - this._sampleSize, completeSample.length);
              var xValues = [];
              var yValues = [];
              for (var i = 0; i < latestSample.length; i++) {
                ListWrapper.push(xValues, i);
                ListWrapper.push(yValues, latestSample[i].values[this._metric]);
              }
              var regressionSlope = Statistic.calculateRegressionSlope(xValues, Statistic.calculateMean(xValues), yValues, Statistic.calculateMean(yValues));
              return assert.returnType((regressionSlope >= 0 ? latestSample : null), assert.genericType(List, MeasureValues));
            } else {
              return assert.returnType((null), assert.genericType(List, MeasureValues));
            }
          }
        }, {
          get SAMPLE_SIZE() {
            return _SAMPLE_SIZE;
          },
          get METRIC() {
            return _METRIC;
          },
          get BINDINGS() {
            return _BINDINGS;
          }
        }, $__super);
      }(Validator)));
      Object.defineProperty(RegressionSlopeValidator.prototype.validate, "parameters", {get: function() {
          return [[assert.genericType(List, MeasureValues)]];
        }});
      _SAMPLE_SIZE = new OpaqueToken('RegressionSlopeValidator.sampleSize');
      _METRIC = new OpaqueToken('RegressionSlopeValidator.metric');
      _BINDINGS = [bind(Validator).toFactory((function(sampleSize, metric) {
        return new RegressionSlopeValidator(sampleSize, metric);
      }), [_SAMPLE_SIZE, _METRIC]), bind(_SAMPLE_SIZE).toValue(10), bind(_METRIC).toValue('script')];
    }
  };
});

//# sourceMappingURL=benchpress/src/validator/regression_slope_validator.map

//# sourceMappingURL=../../../benchpress/src/validator/regression_slope_validator.js.map