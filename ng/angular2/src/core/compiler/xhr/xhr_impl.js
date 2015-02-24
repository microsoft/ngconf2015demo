System.register(["rtts_assert/rtts_assert", "angular2/src/facade/async", "./xhr"], function($__export) {
  "use strict";
  var assert,
      Promise,
      PromiseWrapper,
      XHR,
      XHRImpl;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Promise = $__m.Promise;
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      XHR = $__m.XHR;
    }],
    execute: function() {
      XHRImpl = $__export("XHRImpl", (function($__super) {
        var XHRImpl = function XHRImpl() {
          $traceurRuntime.superConstructor(XHRImpl).apply(this, arguments);
        };
        return ($traceurRuntime.createClass)(XHRImpl, {get: function(url) {
            assert.argumentTypes(url, assert.type.string);
            var completer = PromiseWrapper.completer();
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'text';
            xhr.onload = function() {
              var status = xhr.status;
              if (200 <= status && status <= 300) {
                completer.complete(xhr.responseText);
              } else {
                completer.reject(("Failed to load " + url));
              }
            };
            xhr.onerror = function() {
              completer.reject(("Failed to load " + url));
            };
            xhr.send();
            return assert.returnType((completer.promise), assert.genericType(Promise, assert.type.string));
          }}, {}, $__super);
      }(XHR)));
      Object.defineProperty(XHRImpl.prototype.get, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/core/compiler/xhr/xhr_impl.map

//# sourceMappingURL=../../../../../angular2/src/core/compiler/xhr/xhr_impl.js.map