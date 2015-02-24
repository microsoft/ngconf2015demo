System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/async", "angular2/src/facade/collection", "angular2/di", "./metric", "./validator", "./reporter", "./web_driver_extension", "./web_driver_adapter", "./sample_options", "./measure_values"], function($__export) {
  "use strict";
  var assert,
      isPresent,
      isBlank,
      Date,
      DateWrapper,
      Promise,
      PromiseWrapper,
      StringMapWrapper,
      List,
      ListWrapper,
      bind,
      OpaqueToken,
      Metric,
      Validator,
      Reporter,
      WebDriverExtension,
      WebDriverAdapter,
      Options,
      MeasureValues,
      Sampler,
      SampleState,
      _TIME,
      _BINDINGS;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      Date = $__m.Date;
      DateWrapper = $__m.DateWrapper;
    }, function($__m) {
      Promise = $__m.Promise;
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      StringMapWrapper = $__m.StringMapWrapper;
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      bind = $__m.bind;
      OpaqueToken = $__m.OpaqueToken;
    }, function($__m) {
      Metric = $__m.Metric;
    }, function($__m) {
      Validator = $__m.Validator;
    }, function($__m) {
      Reporter = $__m.Reporter;
    }, function($__m) {
      WebDriverExtension = $__m.WebDriverExtension;
    }, function($__m) {
      WebDriverAdapter = $__m.WebDriverAdapter;
    }, function($__m) {
      Options = $__m.Options;
    }, function($__m) {
      MeasureValues = $__m.MeasureValues;
    }],
    execute: function() {
      Sampler = $__export("Sampler", (function() {
        var Sampler = function Sampler() {
          var $__2 = arguments[0] !== (void 0) ? arguments[0] : {},
              driver = $__2.driver,
              driverExtension = $__2.driverExtension,
              metric = $__2.metric,
              reporter = $__2.reporter,
              validator = $__2.validator,
              forceGc = $__2.forceGc,
              prepare = $__2.prepare,
              execute = $__2.execute,
              time = $__2.time;
          this._driver = driver;
          this._driverExtension = driverExtension;
          this._metric = metric;
          this._reporter = reporter;
          this._validator = validator;
          this._forceGc = forceGc;
          this._prepare = prepare;
          this._execute = execute;
          this._time = time;
        };
        return ($traceurRuntime.createClass)(Sampler, {
          sample: function() {
            var $__0 = this;
            var loop;
            loop = (function(lastState) {
              return $__0._iterate(lastState).then((function(newState) {
                if (isPresent(newState.validSample)) {
                  return newState;
                } else {
                  return loop(newState);
                }
              }));
            });
            return assert.returnType((this._gcIfNeeded().then((function(_) {
              return loop(new SampleState([], null));
            }))), assert.genericType(Promise, SampleState));
          },
          _gcIfNeeded: function() {
            if (this._forceGc) {
              return this._driverExtension.gc();
            } else {
              return PromiseWrapper.resolve(null);
            }
          },
          _iterate: function(lastState) {
            var $__0 = this;
            var resultPromise;
            if (isPresent(this._prepare)) {
              resultPromise = this._driver.waitFor(this._prepare).then((function(_) {
                return $__0._gcIfNeeded();
              }));
            } else {
              resultPromise = PromiseWrapper.resolve(null);
            }
            if (isPresent(this._prepare) || lastState.completeSample.length === 0) {
              resultPromise = resultPromise.then((function(_) {
                return $__0._metric.beginMeasure();
              }));
            }
            return resultPromise.then((function(_) {
              return $__0._driver.waitFor($__0._execute);
            })).then((function(_) {
              return $__0._gcIfNeeded();
            })).then((function(_) {
              return $__0._metric.endMeasure(isBlank($__0._prepare));
            })).then((function(measureValues) {
              return $__0._report(lastState, measureValues);
            }));
          },
          _report: function(state, metricValues) {
            var $__0 = this;
            var measureValues = new MeasureValues(state.completeSample.length, this._time(), metricValues);
            var completeSample = ListWrapper.concat(state.completeSample, [measureValues]);
            var validSample = this._validator.validate(completeSample);
            var resultPromise = this._reporter.reportMeasureValues(measureValues);
            if (isPresent(validSample)) {
              resultPromise = resultPromise.then((function(_) {
                return $__0._reporter.reportSample(completeSample, validSample);
              }));
            }
            return assert.returnType((resultPromise.then((function(_) {
              return new SampleState(completeSample, validSample);
            }))), assert.genericType(Promise, SampleState));
          }
        }, {
          get BINDINGS() {
            return _BINDINGS;
          },
          get TIME() {
            return _TIME;
          }
        });
      }()));
      Object.defineProperty(Sampler.prototype._report, "parameters", {get: function() {
          return [[SampleState], [assert.type.any]];
        }});
      SampleState = $__export("SampleState", (function() {
        var SampleState = function SampleState(completeSample, validSample) {
          assert.argumentTypes(completeSample, List, validSample, List);
          this.completeSample = completeSample;
          this.validSample = validSample;
        };
        return ($traceurRuntime.createClass)(SampleState, {}, {});
      }()));
      Object.defineProperty(SampleState, "parameters", {get: function() {
          return [[List], [List]];
        }});
      _TIME = new OpaqueToken('Sampler.time');
      _BINDINGS = [bind(Sampler).toFactory((function(driver, driverExtension, metric, reporter, validator, forceGc, prepare, execute, time) {
        return new Sampler({
          driver: driver,
          driverExtension: driverExtension,
          reporter: reporter,
          validator: validator,
          metric: metric,
          forceGc: forceGc,
          prepare: prepare !== false ? prepare : null,
          execute: execute,
          time: time
        });
      }), [WebDriverAdapter, WebDriverExtension, Metric, Reporter, Validator, Options.FORCE_GC, Options.PREPARE, Options.EXECUTE, _TIME]), bind(Options.FORCE_GC).toValue(false), bind(Options.PREPARE).toValue(false), bind(_TIME).toValue((function() {
        return DateWrapper.now();
      }))];
    }
  };
});

//# sourceMappingURL=benchpress/src/sampler.map

//# sourceMappingURL=../../benchpress/src/sampler.js.map