System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var assert,
      int,
      global,
      List,
      Promise,
      PromiseWrapper;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      int = $__m.int;
      global = $__m.global;
    }, function($__m) {
      List = $__m.List;
    }],
    execute: function() {
      Promise = $__export("Promise", global.Promise);
      PromiseWrapper = $__export("PromiseWrapper", (function() {
        var PromiseWrapper = function PromiseWrapper() {};
        return ($traceurRuntime.createClass)(PromiseWrapper, {}, {
          resolve: function(obj) {
            return assert.returnType((Promise.resolve(obj)), Promise);
          },
          reject: function(obj) {
            return assert.returnType((Promise.reject(obj)), Promise);
          },
          all: function(promises) {
            assert.argumentTypes(promises, List);
            if (promises.length == 0)
              return assert.returnType((Promise.resolve([])), Promise);
            return assert.returnType((Promise.all(promises)), Promise);
          },
          then: function(promise, success, rejection) {
            assert.argumentTypes(promise, Promise, success, Function, rejection, Function);
            return assert.returnType((promise.then(success, rejection)), Promise);
          },
          completer: function() {
            var resolve;
            var reject;
            var p = new Promise(function(res, rej) {
              resolve = res;
              reject = rej;
            });
            return {
              promise: p,
              complete: resolve,
              reject: reject
            };
          },
          setTimeout: function(fn, millis) {
            assert.argumentTypes(fn, Function, millis, int);
            global.setTimeout(fn, millis);
          },
          isPromise: function(maybePromise) {
            return assert.returnType((maybePromise instanceof Promise), assert.type.boolean);
          }
        });
      }()));
      Object.defineProperty(PromiseWrapper.all, "parameters", {get: function() {
          return [[List]];
        }});
      Object.defineProperty(PromiseWrapper.then, "parameters", {get: function() {
          return [[Promise], [Function], [Function]];
        }});
      Object.defineProperty(PromiseWrapper.setTimeout, "parameters", {get: function() {
          return [[Function], [int]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/facade/async.map

//# sourceMappingURL=../../../angular2/src/facade/async.js.map