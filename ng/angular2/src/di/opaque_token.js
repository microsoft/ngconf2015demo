System.register(["rtts_assert/rtts_assert"], function($__export) {
  "use strict";
  var assert,
      OpaqueToken;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }],
    execute: function() {
      OpaqueToken = $__export("OpaqueToken", (function() {
        var OpaqueToken = function OpaqueToken(desc) {
          assert.argumentTypes(desc, assert.type.string);
          this._desc = ("Token(" + desc + ")");
        };
        return ($traceurRuntime.createClass)(OpaqueToken, {toString: function() {
            return this._desc;
          }}, {});
      }()));
      Object.defineProperty(OpaqueToken, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/di/opaque_token.map

//# sourceMappingURL=../../../angular2/src/di/opaque_token.js.map