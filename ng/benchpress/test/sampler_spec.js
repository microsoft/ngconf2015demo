System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/facade/async", "benchpress/benchpress"], function($__export) {
  "use strict";
  var assert,
      describe,
      it,
      iit,
      xit,
      expect,
      beforeEach,
      afterEach,
      isBlank,
      isPresent,
      BaseException,
      stringify,
      Date,
      DateWrapper,
      ListWrapper,
      List,
      PromiseWrapper,
      Promise,
      Sampler,
      WebDriverAdapter,
      WebDriverExtension,
      Validator,
      Metric,
      Reporter,
      Browser,
      bind,
      Injector,
      Options,
      MeasureValues,
      MockDriverAdapter,
      MockDriverExtension,
      MockValidator,
      MockMetric,
      MockReporter;
  function main() {
    var EMPTY_EXECUTE = (function() {});
    describe('sampler', (function() {
      var sampler;
      function createSampler() {
        var $__1 = arguments[0] !== (void 0) ? arguments[0] : {},
            driver = $__1.driver,
            driverExtension = $__1.driverExtension,
            metric = $__1.metric,
            reporter = $__1.reporter,
            validator = $__1.validator,
            forceGc = $__1.forceGc,
            prepare = $__1.prepare,
            execute = $__1.execute;
        var time = 1000;
        if (isBlank(metric)) {
          metric = new MockMetric([]);
        }
        if (isBlank(reporter)) {
          reporter = new MockReporter([]);
        }
        if (isBlank(driver)) {
          driver = new MockDriverAdapter([]);
        }
        if (isBlank(driverExtension)) {
          driverExtension = new MockDriverExtension([]);
        }
        var bindings = ListWrapper.concat(Sampler.BINDINGS, [bind(Metric).toValue(metric), bind(Reporter).toValue(reporter), bind(WebDriverAdapter).toValue(driver), bind(WebDriverExtension).toValue(driverExtension), bind(Options.EXECUTE).toValue(execute), bind(Validator).toValue(validator), bind(Sampler.TIME).toValue((function() {
          return DateWrapper.fromMillis(time++);
        }))]);
        if (isPresent(prepare)) {
          ListWrapper.push(bindings, bind(Options.PREPARE).toValue(prepare));
        }
        if (isPresent(forceGc)) {
          ListWrapper.push(bindings, bind(Options.FORCE_GC).toValue(forceGc));
        }
        sampler = new Injector(bindings).get(Sampler);
      }
      it('should call the prepare and execute callbacks using WebDriverAdapter.waitFor', (function(done) {
        var log = [];
        var count = 0;
        var driver = new MockDriverAdapter([], (function(callback) {
          var result = callback();
          ListWrapper.push(log, result);
          return PromiseWrapper.resolve(result);
        }));
        createSampler({
          driver: driver,
          validator: createCountingValidator(2),
          prepare: (function() {
            return count++;
          }),
          execute: (function() {
            return count++;
          })
        });
        sampler.sample().then((function(_) {
          expect(count).toBe(4);
          expect(log).toEqual([0, 1, 2, 3]);
          done();
        }));
      }));
      it('should call prepare, gc, beginMeasure, execute, gc, endMeasure for every iteration', (function(done) {
        var workCount = 0;
        var log = [];
        createSampler({
          forceGc: true,
          metric: createCountingMetric(log),
          driverExtension: new MockDriverExtension(log),
          validator: createCountingValidator(2),
          prepare: (function() {
            ListWrapper.push(log, ("p" + workCount++));
          }),
          execute: (function() {
            ListWrapper.push(log, ("w" + workCount++));
          })
        });
        sampler.sample().then((function(_) {
          expect(log).toEqual([['gc'], 'p0', ['gc'], ['beginMeasure'], 'w1', ['gc'], ['endMeasure', false, {'script': 0}], 'p2', ['gc'], ['beginMeasure'], 'w3', ['gc'], ['endMeasure', false, {'script': 1}]]);
          done();
        }));
      }));
      it('should call execute, gc, endMeasure for every iteration if there is no prepare callback', (function(done) {
        var log = [];
        var workCount = 0;
        createSampler({
          forceGc: true,
          metric: createCountingMetric(log),
          driverExtension: new MockDriverExtension(log),
          validator: createCountingValidator(2),
          execute: (function() {
            ListWrapper.push(log, ("w" + workCount++));
          }),
          prepare: null
        });
        sampler.sample().then((function(_) {
          expect(log).toEqual([['gc'], ['beginMeasure'], 'w0', ['gc'], ['endMeasure', true, {'script': 0}], 'w1', ['gc'], ['endMeasure', true, {'script': 1}]]);
          done();
        }));
      }));
      it('should not gc if the flag is not set', (function(done) {
        var workCount = 0;
        var log = [];
        createSampler({
          metric: createCountingMetric(),
          driverExtension: new MockDriverExtension(log),
          validator: createCountingValidator(2),
          prepare: EMPTY_EXECUTE,
          execute: EMPTY_EXECUTE
        });
        sampler.sample().then((function(_) {
          expect(log).toEqual([]);
          done();
        }));
      }));
      it('should only collect metrics for execute and ignore metrics from prepare', (function(done) {
        var scriptTime = 0;
        var iterationCount = 1;
        createSampler({
          validator: createCountingValidator(2),
          metric: new MockMetric([], (function() {
            var result = PromiseWrapper.resolve({'script': scriptTime});
            scriptTime = 0;
            return result;
          })),
          prepare: (function() {
            scriptTime = 1 * iterationCount;
          }),
          execute: (function() {
            scriptTime = 10 * iterationCount;
            iterationCount++;
          })
        });
        sampler.sample().then((function(state) {
          expect(state.completeSample.length).toBe(2);
          expect(state.completeSample[0]).toEqual(mv(0, 1000, {'script': 10}));
          expect(state.completeSample[1]).toEqual(mv(1, 1001, {'script': 20}));
          done();
        }));
      }));
      it('should call the validator for every execution and store the valid sample', (function(done) {
        var log = [];
        var validSample = [{}];
        createSampler({
          metric: createCountingMetric(),
          validator: createCountingValidator(2, validSample, log),
          execute: EMPTY_EXECUTE
        });
        sampler.sample().then((function(state) {
          expect(state.validSample).toBe(validSample);
          expect(log.length).toBe(2);
          expect(log[0]).toEqual(['validate', [mv(0, 1000, {'script': 0})], null]);
          expect(log[1]).toEqual(['validate', [mv(0, 1000, {'script': 0}), mv(1, 1001, {'script': 1})], validSample]);
          done();
        }));
      }));
      it('should report the metric values', (function(done) {
        var log = [];
        var validSample = [{}];
        createSampler({
          validator: createCountingValidator(2, validSample),
          metric: createCountingMetric(),
          reporter: new MockReporter(log),
          execute: EMPTY_EXECUTE
        });
        sampler.sample().then((function(_) {
          expect(log.length).toBe(3);
          expect(log[0]).toEqual(['reportMeasureValues', mv(0, 1000, {'script': 0})]);
          expect(log[1]).toEqual(['reportMeasureValues', mv(1, 1001, {'script': 1})]);
          expect(log[2]).toEqual(['reportSample', [mv(0, 1000, {'script': 0}), mv(1, 1001, {'script': 1})], validSample]);
          done();
        }));
      }));
    }));
  }
  function mv(runIndex, time, values) {
    return new MeasureValues(runIndex, DateWrapper.fromMillis(time), values);
  }
  function createCountingValidator(count) {
    var validSample = arguments[1] !== (void 0) ? arguments[1] : null;
    var log = arguments[2] !== (void 0) ? arguments[2] : null;
    return new MockValidator(log, (function(completeSample) {
      count--;
      if (count === 0) {
        return isPresent(validSample) ? validSample : completeSample;
      } else {
        return null;
      }
    }));
  }
  function createCountingMetric() {
    var log = arguments[0] !== (void 0) ? arguments[0] : null;
    var scriptTime = 0;
    return new MockMetric(log, (function() {
      return {'script': scriptTime++};
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      describe = $__m.describe;
      it = $__m.it;
      iit = $__m.iit;
      xit = $__m.xit;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
      afterEach = $__m.afterEach;
    }, function($__m) {
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
      stringify = $__m.stringify;
      Date = $__m.Date;
      DateWrapper = $__m.DateWrapper;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      List = $__m.List;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
      Promise = $__m.Promise;
    }, function($__m) {
      Sampler = $__m.Sampler;
      WebDriverAdapter = $__m.WebDriverAdapter;
      WebDriverExtension = $__m.WebDriverExtension;
      Validator = $__m.Validator;
      Metric = $__m.Metric;
      Reporter = $__m.Reporter;
      Browser = $__m.Browser;
      bind = $__m.bind;
      Injector = $__m.Injector;
      Options = $__m.Options;
      MeasureValues = $__m.MeasureValues;
    }],
    execute: function() {
      MockDriverAdapter = (function($__super) {
        var MockDriverAdapter = function MockDriverAdapter() {
          var log = arguments[0] !== (void 0) ? arguments[0] : null;
          var waitFor = arguments[1] !== (void 0) ? arguments[1] : null;
          $traceurRuntime.superConstructor(MockDriverAdapter).call(this);
          if (isBlank(log)) {
            log = [];
          }
          this._log = log;
          this._waitFor = waitFor;
        };
        return ($traceurRuntime.createClass)(MockDriverAdapter, {waitFor: function(callback) {
            assert.argumentTypes(callback, Function);
            if (isPresent(this._waitFor)) {
              return assert.returnType((this._waitFor(callback)), Promise);
            } else {
              return assert.returnType((PromiseWrapper.resolve(callback())), Promise);
            }
          }}, {}, $__super);
      }(WebDriverAdapter));
      Object.defineProperty(MockDriverAdapter.prototype.waitFor, "parameters", {get: function() {
          return [[Function]];
        }});
      MockDriverExtension = (function($__super) {
        var MockDriverExtension = function MockDriverExtension() {
          var log = arguments[0] !== (void 0) ? arguments[0] : null;
          $traceurRuntime.superConstructor(MockDriverExtension).call(this);
          if (isBlank(log)) {
            log = [];
          }
          this._log = log;
        };
        return ($traceurRuntime.createClass)(MockDriverExtension, {gc: function() {
            ListWrapper.push(this._log, ['gc']);
            return assert.returnType((PromiseWrapper.resolve(null)), Promise);
          }}, {}, $__super);
      }(WebDriverExtension));
      MockValidator = (function($__super) {
        var MockValidator = function MockValidator() {
          var log = arguments[0] !== (void 0) ? arguments[0] : null;
          var validate = arguments[1] !== (void 0) ? arguments[1] : null;
          $traceurRuntime.superConstructor(MockValidator).call(this);
          this._validate = validate;
          if (isBlank(log)) {
            log = [];
          }
          this._log = log;
        };
        return ($traceurRuntime.createClass)(MockValidator, {validate: function(completeSample) {
            assert.argumentTypes(completeSample, assert.genericType(List, MeasureValues));
            var stableSample = isPresent(this._validate) ? this._validate(completeSample) : completeSample;
            ListWrapper.push(this._log, ['validate', completeSample, stableSample]);
            return assert.returnType((stableSample), assert.genericType(List, MeasureValues));
          }}, {}, $__super);
      }(Validator));
      Object.defineProperty(MockValidator.prototype.validate, "parameters", {get: function() {
          return [[assert.genericType(List, MeasureValues)]];
        }});
      MockMetric = (function($__super) {
        var MockMetric = function MockMetric() {
          var log = arguments[0] !== (void 0) ? arguments[0] : null;
          var endMeasure = arguments[1] !== (void 0) ? arguments[1] : null;
          $traceurRuntime.superConstructor(MockMetric).call(this);
          this._endMeasure = endMeasure;
          if (isBlank(log)) {
            log = [];
          }
          this._log = log;
        };
        return ($traceurRuntime.createClass)(MockMetric, {
          beginMeasure: function() {
            ListWrapper.push(this._log, ['beginMeasure']);
            return PromiseWrapper.resolve(null);
          },
          endMeasure: function(restart) {
            var measureValues = isPresent(this._endMeasure) ? this._endMeasure() : {};
            ListWrapper.push(this._log, ['endMeasure', restart, measureValues]);
            return PromiseWrapper.resolve(measureValues);
          }
        }, {}, $__super);
      }(Metric));
      MockReporter = (function($__super) {
        var MockReporter = function MockReporter() {
          var log = arguments[0] !== (void 0) ? arguments[0] : null;
          $traceurRuntime.superConstructor(MockReporter).call(this);
          if (isBlank(log)) {
            log = [];
          }
          this._log = log;
        };
        return ($traceurRuntime.createClass)(MockReporter, {
          reportMeasureValues: function(values) {
            ListWrapper.push(this._log, ['reportMeasureValues', values]);
            return assert.returnType((PromiseWrapper.resolve(null)), Promise);
          },
          reportSample: function(completeSample, validSample) {
            ListWrapper.push(this._log, ['reportSample', completeSample, validSample]);
            return assert.returnType((PromiseWrapper.resolve(null)), Promise);
          }
        }, {}, $__super);
      }(Reporter));
    }
  };
});

//# sourceMappingURL=benchpress/test/sampler_spec.map

//# sourceMappingURL=../../benchpress/test/sampler_spec.js.map