System.register(["rtts_assert/rtts_assert", "angular2/src/facade/async"], function($__export) {
  "use strict";
  var assert,
      Promise,
      XHR;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Promise = $__m.Promise;
    }],
    execute: function() {
      XHR = $__export("XHR", (function() {
        var XHR = function XHR() {};
        return ($traceurRuntime.createClass)(XHR, {get: function(url) {
            assert.argumentTypes(url, assert.type.string);
            return assert.returnType((null), assert.genericType(Promise, assert.type.string));
          }}, {});
      }()));
      Object.defineProperty(XHR.prototype.get, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/core/compiler/xhr/xhr.map

//# sourceMappingURL=../../../../../angular2/src/core/compiler/xhr/xhr.js.map