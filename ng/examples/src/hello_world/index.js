System.register(["./index_common", "angular2/src/reflection/reflection", "angular2/src/reflection/reflection_capabilities"], function($__export) {
  "use strict";
  var app,
      reflector,
      ReflectionCapabilities;
  function main() {
    reflector.reflectionCapabilities = new ReflectionCapabilities();
    app.main();
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      app = $__m;
    }, function($__m) {
      reflector = $__m.reflector;
    }, function($__m) {
      ReflectionCapabilities = $__m.ReflectionCapabilities;
    }],
    execute: function() {
    }
  };
});

//# sourceMappingURL=examples/src/hello_world/index.map

//# sourceMappingURL=../../../examples/src/hello_world/index.js.map