System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "benchpress/benchpress", "angular2/src/facade/lang", "angular2/src/facade/async"], function($__export) {
  "use strict";
  var assert,
      describe,
      it,
      iit,
      xit,
      expect,
      beforeEach,
      afterEach,
      Runner,
      Sampler,
      SampleDescription,
      Validator,
      bind,
      Injector,
      Metric,
      Options,
      isBlank,
      Promise,
      PromiseWrapper,
      MockValidator,
      MockMetric,
      MockSampler;
  function main() {
    describe('runner', (function() {
      var injector;
      var runner;
      function createRunner() {
        var defaultBindings = arguments[0] !== (void 0) ? arguments[0] : null;
        if (isBlank(defaultBindings)) {
          defaultBindings = [];
        }
        runner = new Runner([defaultBindings, bind(Sampler).toFactory((function(_injector) {
          injector = _injector;
          return new MockSampler();
        }), [Injector]), bind(Metric).toFactory((function() {
          return new MockMetric();
        }), []), bind(Validator).toFactory((function() {
          return new MockValidator();
        }), [])]);
        return runner;
      }
      it('should set SampleDescription.id', (function(done) {
        createRunner().sample({id: 'someId'}).then((function(_) {
          expect(injector.get(SampleDescription).id).toBe('someId');
          done();
        }));
      }));
      it('should merge SampleDescription.description', (function(done) {
        createRunner([bind(Options.DEFAULT_DESCRIPTION).toValue({'a': 1})]).sample({
          id: 'someId',
          bindings: [bind(Options.SAMPLE_DESCRIPTION).toValue({'b': 2})]
        }).then((function(_) {
          expect(injector.get(SampleDescription).description).toEqual({
            'forceGc': false,
            'a': 1,
            'b': 2,
            'v': 11
          });
          done();
        }));
      }));
      it('should fill SampleDescription.metrics from the Metric', (function(done) {
        createRunner().sample({id: 'someId'}).then((function(_) {
          expect(injector.get(SampleDescription).metrics).toEqual({'m1': 'some metric'});
          done();
        }));
      }));
      it('should bind Options.EXECUTE', (function(done) {
        var execute = (function() {});
        createRunner().sample({
          id: 'someId',
          execute: execute
        }).then((function(_) {
          expect(injector.get(Options.EXECUTE)).toEqual(execute);
          done();
        }));
      }));
      it('should bind Options.PREPARE', (function(done) {
        var prepare = (function() {});
        createRunner().sample({
          id: 'someId',
          prepare: prepare
        }).then((function(_) {
          expect(injector.get(Options.PREPARE)).toEqual(prepare);
          done();
        }));
      }));
      it('should overwrite bindings per sample call', (function(done) {
        createRunner([bind(Options.DEFAULT_DESCRIPTION).toValue({'a': 1})]).sample({
          id: 'someId',
          bindings: [bind(Options.DEFAULT_DESCRIPTION).toValue({'a': 2})]
        }).then((function(_) {
          expect(injector.get(SampleDescription).description['a']).toBe(2);
          done();
        }));
      }));
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
      Runner = $__m.Runner;
      Sampler = $__m.Sampler;
      SampleDescription = $__m.SampleDescription;
      Validator = $__m.Validator;
      bind = $__m.bind;
      Injector = $__m.Injector;
      Metric = $__m.Metric;
      Options = $__m.Options;
    }, function($__m) {
      isBlank = $__m.isBlank;
    }, function($__m) {
      Promise = $__m.Promise;
      PromiseWrapper = $__m.PromiseWrapper;
    }],
    execute: function() {
      MockValidator = (function($__super) {
        var MockValidator = function MockValidator() {
          $traceurRuntime.superConstructor(MockValidator).call(this);
        };
        return ($traceurRuntime.createClass)(MockValidator, {describe: function() {
            return {'v': 11};
          }}, {}, $__super);
      }(Validator));
      MockMetric = (function($__super) {
        var MockMetric = function MockMetric() {
          $traceurRuntime.superConstructor(MockMetric).call(this);
        };
        return ($traceurRuntime.createClass)(MockMetric, {describe: function() {
            return {'m1': 'some metric'};
          }}, {}, $__super);
      }(Metric));
      MockSampler = (function($__super) {
        var MockSampler = function MockSampler() {
          $traceurRuntime.superConstructor(MockSampler).call(this);
        };
        return ($traceurRuntime.createClass)(MockSampler, {sample: function() {
            return assert.returnType((PromiseWrapper.resolve(23)), Promise);
          }}, {}, $__super);
      }(Sampler));
    }
  };
});

//# sourceMappingURL=benchpress/test/runner_spec.map

//# sourceMappingURL=../../benchpress/test/runner_spec.js.map