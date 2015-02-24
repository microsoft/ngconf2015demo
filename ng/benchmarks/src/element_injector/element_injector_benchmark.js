System.register(["rtts_assert/rtts_assert", "angular2/src/reflection/reflection", "angular2/di", "angular2/src/core/compiler/element_injector", "angular2/src/test_lib/benchmark_util"], function($__export) {
  "use strict";
  var assert,
      reflector,
      Injector,
      ProtoElementInjector,
      getIntParameter,
      bindAction,
      count,
      A,
      B,
      C;
  function setupReflector() {
    reflector.registerType(A, {
      'factory': (function() {
        return new A();
      }),
      'parameters': [],
      'annotations': []
    });
    reflector.registerType(B, {
      'factory': (function() {
        return new B();
      }),
      'parameters': [],
      'annotations': []
    });
    reflector.registerType(C, {
      'factory': (function(a, b) {
        return new C(a, b);
      }),
      'parameters': [[A], [B]],
      'annotations': []
    });
  }
  function main() {
    var iterations = getIntParameter('iterations');
    setupReflector();
    var appInjector = new Injector([]);
    var bindings = [A, B, C];
    var proto = new ProtoElementInjector(null, 0, bindings);
    var elementInjector = proto.instantiate(null, null, null);
    function instantiate() {
      for (var i = 0; i < iterations; ++i) {
        var ei = proto.instantiate(null, null, null);
        ei.instantiateDirectives(appInjector, null, null);
      }
    }
    function instantiateDirectives() {
      for (var i = 0; i < iterations; ++i) {
        elementInjector.clearDirectives();
        elementInjector.instantiateDirectives(appInjector, null, null);
      }
    }
    bindAction('#instantiate', instantiate);
    bindAction('#instantiateDirectives', instantiateDirectives);
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      reflector = $__m.reflector;
    }, function($__m) {
      Injector = $__m.Injector;
    }, function($__m) {
      ProtoElementInjector = $__m.ProtoElementInjector;
    }, function($__m) {
      getIntParameter = $__m.getIntParameter;
      bindAction = $__m.bindAction;
    }],
    execute: function() {
      count = 0;
      A = (function() {
        var A = function A() {
          count++;
        };
        return ($traceurRuntime.createClass)(A, {}, {});
      }());
      B = (function() {
        var B = function B() {
          count++;
        };
        return ($traceurRuntime.createClass)(B, {}, {});
      }());
      C = (function() {
        var C = function C(a, b) {
          assert.argumentTypes(a, A, b, B);
          count++;
        };
        return ($traceurRuntime.createClass)(C, {}, {});
      }());
      Object.defineProperty(C, "parameters", {get: function() {
          return [[A], [B]];
        }});
    }
  };
});

//# sourceMappingURL=benchmarks/src/element_injector/element_injector_benchmark.map

//# sourceMappingURL=../../../benchmarks/src/element_injector/element_injector_benchmark.js.map