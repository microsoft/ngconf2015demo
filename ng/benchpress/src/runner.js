System.register(["rtts_assert/rtts_assert", "angular2/di", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/facade/async", "./sampler", "./reporter/console_reporter", "./validator/regression_slope_validator", "./metric/perflog_metric", "./webdriver/chrome_driver_extension", "./sample_description", "./sample_options"], function($__export) {
  "use strict";
  var assert,
      Injector,
      bind,
      isPresent,
      isBlank,
      List,
      ListWrapper,
      Promise,
      Sampler,
      SampleState,
      ConsoleReporter,
      RegressionSlopeValidator,
      PerflogMetric,
      ChromeDriverExtension,
      SampleDescription,
      Options,
      Runner,
      _DEFAULT_BINDINGS;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Injector = $__m.Injector;
      bind = $__m.bind;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      Promise = $__m.Promise;
    }, function($__m) {
      Sampler = $__m.Sampler;
      SampleState = $__m.SampleState;
    }, function($__m) {
      ConsoleReporter = $__m.ConsoleReporter;
    }, function($__m) {
      RegressionSlopeValidator = $__m.RegressionSlopeValidator;
    }, function($__m) {
      PerflogMetric = $__m.PerflogMetric;
    }, function($__m) {
      ChromeDriverExtension = $__m.ChromeDriverExtension;
    }, function($__m) {
      SampleDescription = $__m.SampleDescription;
    }, function($__m) {
      Options = $__m.Options;
    }],
    execute: function() {
      Runner = $__export("Runner", (function() {
        var Runner = function Runner() {
          var defaultBindings = arguments[0] !== (void 0) ? arguments[0] : null;
          assert.argumentTypes(defaultBindings, List);
          if (isBlank(defaultBindings)) {
            defaultBindings = [];
          }
          this._defaultBindings = defaultBindings;
        };
        return ($traceurRuntime.createClass)(Runner, {sample: function($__1) {
            var $__2 = $__1,
                id = $__2.id,
                execute = $__2.execute,
                prepare = $__2.prepare,
                bindings = $__2.bindings;
            var sampleBindings = [_DEFAULT_BINDINGS, this._defaultBindings, bind(Options.SAMPLE_ID).toValue(id), bind(Options.EXECUTE).toValue(execute)];
            if (isPresent(prepare)) {
              ListWrapper.push(sampleBindings, bind(Options.PREPARE).toValue(prepare));
            }
            if (isPresent(bindings)) {
              ListWrapper.push(sampleBindings, bindings);
            }
            return assert.returnType((new Injector(sampleBindings).asyncGet(Sampler).then((function(sampler) {
              return sampler.sample();
            }))), assert.genericType(Promise, SampleState));
          }}, {});
      }()));
      Object.defineProperty(Runner, "parameters", {get: function() {
          return [[List]];
        }});
      _DEFAULT_BINDINGS = [Sampler.BINDINGS, ConsoleReporter.BINDINGS, RegressionSlopeValidator.BINDINGS, ChromeDriverExtension.BINDINGS, PerflogMetric.BINDINGS, SampleDescription.BINDINGS];
    }
  };
});

//# sourceMappingURL=benchpress/src/runner.map

//# sourceMappingURL=../../benchpress/src/runner.js.map