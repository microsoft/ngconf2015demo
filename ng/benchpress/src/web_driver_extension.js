System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/async", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var assert,
      BaseException,
      ABSTRACT,
      Promise,
      List,
      WebDriverExtension;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      BaseException = $__m.BaseException;
      ABSTRACT = $__m.ABSTRACT;
    }, function($__m) {
      Promise = $__m.Promise;
    }, function($__m) {
      List = $__m.List;
    }],
    execute: function() {
      WebDriverExtension = $__export("WebDriverExtension", (function() {
        var WebDriverExtension = function WebDriverExtension() {};
        return ($traceurRuntime.createClass)(WebDriverExtension, {
          gc: function() {
            throw new BaseException('NYI');
          },
          timeStamp: function(name, names) {
            assert.argumentTypes(name, assert.type.string, names, assert.genericType(List, String));
            throw new BaseException('NYI');
          },
          timeBegin: function(name) {
            throw new BaseException('NYI');
          },
          timeEnd: function(name, restart) {
            assert.argumentTypes(name, assert.type.any, restart, assert.type.boolean);
            throw new BaseException('NYI');
          },
          readPerfLog: function() {
            throw new BaseException('NYI');
          }
        }, {});
      }()));
      Object.defineProperty(WebDriverExtension, "annotations", {get: function() {
          return [new ABSTRACT()];
        }});
      Object.defineProperty(WebDriverExtension.prototype.timeStamp, "parameters", {get: function() {
          return [[assert.type.string], [assert.genericType(List, String)]];
        }});
      Object.defineProperty(WebDriverExtension.prototype.timeEnd, "parameters", {get: function() {
          return [[], [assert.type.boolean]];
        }});
    }
  };
});

//# sourceMappingURL=benchpress/src/web_driver_extension.map

//# sourceMappingURL=../../benchpress/src/web_driver_extension.js.map