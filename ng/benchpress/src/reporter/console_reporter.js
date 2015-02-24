System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/facade/async", "angular2/src/facade/math", "angular2/di", "../statistic", "../reporter", "../sample_description", "../measure_values"], function($__export) {
  "use strict";
  var assert,
      print,
      isPresent,
      isBlank,
      StringMapWrapper,
      ListWrapper,
      List,
      Promise,
      PromiseWrapper,
      Math,
      bind,
      OpaqueToken,
      Statistic,
      Reporter,
      SampleDescription,
      MeasureValues,
      ConsoleReporter,
      _PRINT,
      _COLUMN_WIDTH,
      _BINDINGS;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      print = $__m.print;
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
    }, function($__m) {
      StringMapWrapper = $__m.StringMapWrapper;
      ListWrapper = $__m.ListWrapper;
      List = $__m.List;
    }, function($__m) {
      Promise = $__m.Promise;
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      Math = $__m.Math;
    }, function($__m) {
      bind = $__m.bind;
      OpaqueToken = $__m.OpaqueToken;
    }, function($__m) {
      Statistic = $__m.Statistic;
    }, function($__m) {
      Reporter = $__m.Reporter;
    }, function($__m) {
      SampleDescription = $__m.SampleDescription;
    }, function($__m) {
      MeasureValues = $__m.MeasureValues;
    }],
    execute: function() {
      ConsoleReporter = $__export("ConsoleReporter", (function($__super) {
        var ConsoleReporter = function ConsoleReporter(columnWidth, sampleDescription, print) {
          $traceurRuntime.superConstructor(ConsoleReporter).call(this);
          this._columnWidth = columnWidth;
          this._metricNames = ConsoleReporter._sortedProps(sampleDescription.metrics);
          this._print = print;
          this._printDescription(sampleDescription);
        };
        return ($traceurRuntime.createClass)(ConsoleReporter, {
          _printDescription: function(sampleDescription) {
            var $__0 = this;
            this._print(("BENCHMARK " + sampleDescription.id));
            this._print('Description:');
            var props = ConsoleReporter._sortedProps(sampleDescription.description);
            props.forEach((function(prop) {
              $__0._print(("- " + prop + ": " + sampleDescription.description[prop]));
            }));
            this._print('Metrics:');
            this._metricNames.forEach((function(metricName) {
              $__0._print(("- " + metricName + ": " + sampleDescription.metrics[metricName]));
            }));
            this._print('');
            this._printStringRow(this._metricNames);
            this._printStringRow(this._metricNames.map((function(_) {
              return '';
            })), '-');
          },
          reportMeasureValues: function(measureValues) {
            assert.argumentTypes(measureValues, MeasureValues);
            var formattedValues = ListWrapper.map(this._metricNames, (function(metricName) {
              var value = measureValues.values[metricName];
              return ConsoleReporter._formatNum(value);
            }));
            this._printStringRow(formattedValues);
            return assert.returnType((PromiseWrapper.resolve(null)), Promise);
          },
          reportSample: function(completeSample, validSample) {
            this._printStringRow(this._metricNames.map((function(_) {
              return '';
            })), '=');
            this._printStringRow(ListWrapper.map(this._metricNames, (function(metricName) {
              var sample = ListWrapper.map(validSample, (function(measureValues) {
                return measureValues.values[metricName];
              }));
              var mean = Statistic.calculateMean(sample);
              var cv = Statistic.calculateCoefficientOfVariation(sample, mean);
              return (ConsoleReporter._formatNum(mean) + "\u00B1" + Math.floor(cv) + "%");
            })));
            return assert.returnType((PromiseWrapper.resolve(null)), Promise);
          },
          _printStringRow: function(parts) {
            var fill = arguments[1] !== (void 0) ? arguments[1] : ' ';
            var $__0 = this;
            this._print(ListWrapper.map(parts, (function(part) {
              var w = $__0._columnWidth;
              return ConsoleReporter._lpad(part, w, fill);
            })).join(' | '));
          }
        }, {
          get PRINT() {
            return _PRINT;
          },
          get COLUMN_WIDTH() {
            return _COLUMN_WIDTH;
          },
          get BINDINGS() {
            return _BINDINGS;
          },
          _lpad: function(value, columnWidth) {
            var fill = arguments[2] !== (void 0) ? arguments[2] : ' ';
            var result = '';
            for (var i = 0; i < columnWidth - value.length; i++) {
              result += fill;
            }
            return result + value;
          },
          _formatNum: function(num) {
            var result;
            if (num === 0) {
              result = '000';
            } else {
              result = ("" + Math.floor(num * 100));
            }
            return result.substring(0, result.length - 2) + '.' + result.substring(result.length - 2);
          },
          _sortedProps: function(obj) {
            var props = [];
            StringMapWrapper.forEach(obj, (function(value, prop) {
              return ListWrapper.push(props, prop);
            }));
            props.sort();
            return props;
          }
        }, $__super);
      }(Reporter)));
      Object.defineProperty(ConsoleReporter.prototype.reportMeasureValues, "parameters", {get: function() {
          return [[MeasureValues]];
        }});
      Object.defineProperty(ConsoleReporter.prototype.reportSample, "parameters", {get: function() {
          return [[assert.genericType(List, MeasureValues)], [assert.genericType(List, MeasureValues)]];
        }});
      _PRINT = new OpaqueToken('ConsoleReporter.print');
      _COLUMN_WIDTH = new OpaqueToken('ConsoleReporter.columnWidht');
      _BINDINGS = [bind(Reporter).toFactory((function(columnWidth, sampleDescription, print) {
        return new ConsoleReporter(columnWidth, sampleDescription, print);
      }), [_COLUMN_WIDTH, SampleDescription, _PRINT]), bind(_COLUMN_WIDTH).toValue(18), bind(_PRINT).toValue(print)];
    }
  };
});

//# sourceMappingURL=benchpress/src/reporter/console_reporter.map

//# sourceMappingURL=../../../benchpress/src/reporter/console_reporter.js.map