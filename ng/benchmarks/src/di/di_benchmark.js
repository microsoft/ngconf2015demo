System.register(["rtts_assert/rtts_assert", "angular2/di", "angular2/src/reflection/reflection", "angular2/src/test_lib/benchmark_util"], function($__export) {
  "use strict";
  var assert,
      Injector,
      Key,
      reflector,
      getIntParameter,
      bindAction,
      count,
      A,
      B,
      C,
      D,
      E;
  function setupReflector() {
    reflector.registerType(A, {
      'factory': (function() {
        return new A();
      }),
      'parameters': [],
      'annotations': []
    });
    reflector.registerType(B, {
      'factory': (function(a) {
        return new B(a);
      }),
      'parameters': [[A]],
      'annotations': []
    });
    reflector.registerType(C, {
      'factory': (function(b) {
        return new C(b);
      }),
      'parameters': [[B]],
      'annotations': []
    });
    reflector.registerType(D, {
      'factory': (function(c, b) {
        return new D(c, b);
      }),
      'parameters': [[C], [B]],
      'annotations': []
    });
    reflector.registerType(E, {
      'factory': (function(d, c) {
        return new E(d, c);
      }),
      'parameters': [[D], [C]],
      'annotations': []
    });
  }
  function main() {
    var iterations = getIntParameter('iterations');
    setupReflector();
    var bindings = [A, B, C, D, E];
    var injector = new Injector(bindings);
    var D_KEY = Key.get(D);
    var E_KEY = Key.get(E);
    var childInjector = injector.createChild([]).createChild([]).createChild([]).createChild([]).createChild([]);
    function getByToken() {
      for (var i = 0; i < iterations; ++i) {
        injector.get(D);
        injector.get(E);
      }
    }
    function getByKey() {
      for (var i = 0; i < iterations; ++i) {
        injector.get(D_KEY);
        injector.get(E_KEY);
      }
    }
    function getChild() {
      for (var i = 0; i < iterations; ++i) {
        childInjector.get(D);
        childInjector.get(E);
      }
    }
    function instantiate() {
      for (var i = 0; i < iterations; ++i) {
        var child = injector.createChild([E]);
        child.get(E);
      }
    }
    bindAction('#getByToken', getByToken);
    bindAction('#getByKey', getByKey);
    bindAction('#getChild', getChild);
    bindAction('#instantiate', instantiate);
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Injector = $__m.Injector;
      Key = $__m.Key;
    }, function($__m) {
      reflector = $__m.reflector;
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
        var B = function B(a) {
          assert.argumentTypes(a, A);
          count++;
        };
        return ($traceurRuntime.createClass)(B, {}, {});
      }());
      Object.defineProperty(B, "parameters", {get: function() {
          return [[A]];
        }});
      C = (function() {
        var C = function C(b) {
          assert.argumentTypes(b, B);
          count++;
        };
        return ($traceurRuntime.createClass)(C, {}, {});
      }());
      Object.defineProperty(C, "parameters", {get: function() {
          return [[B]];
        }});
      D = (function() {
        var D = function D(c, b) {
          assert.argumentTypes(c, C, b, B);
          count++;
        };
        return ($traceurRuntime.createClass)(D, {}, {});
      }());
      Object.defineProperty(D, "parameters", {get: function() {
          return [[C], [B]];
        }});
      E = (function() {
        var E = function E(d, c) {
          assert.argumentTypes(d, D, c, C);
          count++;
        };
        return ($traceurRuntime.createClass)(E, {}, {});
      }());
      Object.defineProperty(E, "parameters", {get: function() {
          return [[D], [C]];
        }});
    }
  };
});

//# sourceMappingURL=benchmarks/src/di/di_benchmark.map

//# sourceMappingURL=../../../benchmarks/src/di/di_benchmark.js.map