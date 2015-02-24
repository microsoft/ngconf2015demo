System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/collection", "./types"], function($__export) {
  "use strict";
  var assert,
      Type,
      isPresent,
      List,
      ListWrapper,
      GetterFn,
      SetterFn,
      MethodFn,
      ReflectionCapabilities;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Type = $__m.Type;
      isPresent = $__m.isPresent;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      GetterFn = $__m.GetterFn;
      SetterFn = $__m.SetterFn;
      MethodFn = $__m.MethodFn;
    }],
    execute: function() {
      ReflectionCapabilities = $__export("ReflectionCapabilities", (function() {
        var ReflectionCapabilities = function ReflectionCapabilities() {};
        return ($traceurRuntime.createClass)(ReflectionCapabilities, {
          factory: function(type) {
            assert.argumentTypes(type, Type);
            switch (type.length) {
              case 0:
                return assert.returnType((function() {
                  return new type();
                }), Function);
              case 1:
                return assert.returnType((function(a1) {
                  return new type(a1);
                }), Function);
              case 2:
                return assert.returnType((function(a1, a2) {
                  return new type(a1, a2);
                }), Function);
              case 3:
                return assert.returnType((function(a1, a2, a3) {
                  return new type(a1, a2, a3);
                }), Function);
              case 4:
                return assert.returnType((function(a1, a2, a3, a4) {
                  return new type(a1, a2, a3, a4);
                }), Function);
              case 5:
                return assert.returnType((function(a1, a2, a3, a4, a5) {
                  return new type(a1, a2, a3, a4, a5);
                }), Function);
              case 6:
                return assert.returnType((function(a1, a2, a3, a4, a5, a6) {
                  return new type(a1, a2, a3, a4, a5, a6);
                }), Function);
              case 7:
                return assert.returnType((function(a1, a2, a3, a4, a5, a6, a7) {
                  return new type(a1, a2, a3, a4, a5, a6, a7);
                }), Function);
              case 8:
                return assert.returnType((function(a1, a2, a3, a4, a5, a6, a7, a8) {
                  return new type(a1, a2, a3, a4, a5, a6, a7, a8);
                }), Function);
              case 9:
                return assert.returnType((function(a1, a2, a3, a4, a5, a6, a7, a8, a9) {
                  return new type(a1, a2, a3, a4, a5, a6, a7, a8, a9);
                }), Function);
              case 10:
                return assert.returnType((function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
                  return new type(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);
                }), Function);
            }
            ;
            throw new Error("Factory cannot take more than 10 arguments");
          },
          parameters: function(typeOfFunc) {
            return assert.returnType((isPresent(typeOfFunc.parameters) ? typeOfFunc.parameters : ListWrapper.createFixedSize(typeOfFunc.length)), assert.genericType(List, List));
          },
          annotations: function(typeOfFunc) {
            return assert.returnType((isPresent(typeOfFunc.annotations) ? typeOfFunc.annotations : []), List);
          },
          getter: function(name) {
            assert.argumentTypes(name, assert.type.string);
            return assert.returnType((new Function('o', 'return o.' + name + ';')), GetterFn);
          },
          setter: function(name) {
            assert.argumentTypes(name, assert.type.string);
            return assert.returnType((new Function('o', 'v', 'return o.' + name + ' = v;')), SetterFn);
          },
          method: function(name) {
            assert.argumentTypes(name, assert.type.string);
            var method = ("o." + name);
            return assert.returnType((new Function('o', 'args', ("if (!" + method + ") throw new Error('\"" + name + "\" is undefined');") + ("return " + method + ".apply(o, args);"))), MethodFn);
          }
        }, {});
      }()));
      Object.defineProperty(ReflectionCapabilities.prototype.factory, "parameters", {get: function() {
          return [[Type]];
        }});
      Object.defineProperty(ReflectionCapabilities.prototype.getter, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(ReflectionCapabilities.prototype.setter, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(ReflectionCapabilities.prototype.method, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/reflection/reflection_capabilities.map

//# sourceMappingURL=../../../angular2/src/reflection/reflection_capabilities.js.map