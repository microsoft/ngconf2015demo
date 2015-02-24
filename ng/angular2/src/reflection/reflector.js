System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/collection", "./types"], function($__export) {
  "use strict";
  var assert,
      Type,
      isPresent,
      stringify,
      BaseException,
      List,
      ListWrapper,
      Map,
      MapWrapper,
      StringMapWrapper,
      SetterFn,
      GetterFn,
      MethodFn,
      Reflector;
  function _mergeMaps(target, config) {
    StringMapWrapper.forEach(config, (function(v, k) {
      return MapWrapper.set(target, k, v);
    }));
  }
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Type = $__m.Type;
      isPresent = $__m.isPresent;
      stringify = $__m.stringify;
      BaseException = $__m.BaseException;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
      Map = $__m.Map;
      MapWrapper = $__m.MapWrapper;
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      SetterFn = $__m.SetterFn;
      GetterFn = $__m.GetterFn;
      MethodFn = $__m.MethodFn;
      $__export("SetterFn", $__m.SetterFn);
      $__export("GetterFn", $__m.GetterFn);
      $__export("MethodFn", $__m.MethodFn);
    }],
    execute: function() {
      Reflector = $__export("Reflector", (function() {
        var Reflector = function Reflector(reflectionCapabilities) {
          this._typeInfo = MapWrapper.create();
          this._getters = MapWrapper.create();
          this._setters = MapWrapper.create();
          this._methods = MapWrapper.create();
          this.reflectionCapabilities = reflectionCapabilities;
        };
        return ($traceurRuntime.createClass)(Reflector, {
          registerType: function(type, typeInfo) {
            MapWrapper.set(this._typeInfo, type, typeInfo);
          },
          registerGetters: function(getters) {
            _mergeMaps(this._getters, getters);
          },
          registerSetters: function(setters) {
            _mergeMaps(this._setters, setters);
          },
          registerMethods: function(methods) {
            _mergeMaps(this._methods, methods);
          },
          factory: function(type) {
            assert.argumentTypes(type, Type);
            if (MapWrapper.contains(this._typeInfo, type)) {
              return assert.returnType((MapWrapper.get(this._typeInfo, type)["factory"]), Function);
            } else {
              return assert.returnType((this.reflectionCapabilities.factory(type)), Function);
            }
          },
          parameters: function(typeOfFunc) {
            if (MapWrapper.contains(this._typeInfo, typeOfFunc)) {
              return assert.returnType((MapWrapper.get(this._typeInfo, typeOfFunc)["parameters"]), List);
            } else {
              return assert.returnType((this.reflectionCapabilities.parameters(typeOfFunc)), List);
            }
          },
          annotations: function(typeOfFunc) {
            if (MapWrapper.contains(this._typeInfo, typeOfFunc)) {
              return assert.returnType((MapWrapper.get(this._typeInfo, typeOfFunc)["annotations"]), List);
            } else {
              return assert.returnType((this.reflectionCapabilities.annotations(typeOfFunc)), List);
            }
          },
          getter: function(name) {
            assert.argumentTypes(name, assert.type.string);
            if (MapWrapper.contains(this._getters, name)) {
              return assert.returnType((MapWrapper.get(this._getters, name)), GetterFn);
            } else {
              return assert.returnType((this.reflectionCapabilities.getter(name)), GetterFn);
            }
          },
          setter: function(name) {
            assert.argumentTypes(name, assert.type.string);
            if (MapWrapper.contains(this._setters, name)) {
              return assert.returnType((MapWrapper.get(this._setters, name)), SetterFn);
            } else {
              return assert.returnType((this.reflectionCapabilities.setter(name)), SetterFn);
            }
          },
          method: function(name) {
            assert.argumentTypes(name, assert.type.string);
            if (MapWrapper.contains(this._methods, name)) {
              return assert.returnType((MapWrapper.get(this._methods, name)), MethodFn);
            } else {
              return assert.returnType((this.reflectionCapabilities.method(name)), MethodFn);
            }
          }
        }, {});
      }()));
      Object.defineProperty(Reflector.prototype.factory, "parameters", {get: function() {
          return [[Type]];
        }});
      Object.defineProperty(Reflector.prototype.getter, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(Reflector.prototype.setter, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(Reflector.prototype.method, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(_mergeMaps, "parameters", {get: function() {
          return [[Map], []];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/reflection/reflector.map

//# sourceMappingURL=../../../angular2/src/reflection/reflector.js.map