System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/reflection/reflection", "./key", "./annotations", "./exceptions"], function($__export) {
  "use strict";
  var assert,
      FIELD,
      Type,
      isBlank,
      isPresent,
      List,
      MapWrapper,
      ListWrapper,
      reflector,
      Key,
      Inject,
      InjectLazy,
      InjectPromise,
      DependencyAnnotation,
      NoAnnotationError,
      Dependency,
      Binding,
      BindingBuilder;
  function bind(token) {
    return assert.returnType((new BindingBuilder(token)), BindingBuilder);
  }
  function _dependenciesFor(typeOrFunc) {
    var params = reflector.parameters(typeOrFunc);
    if (isBlank(params))
      return assert.returnType(([]), List);
    if (ListWrapper.any(params, (function(p) {
      return isBlank(p);
    })))
      throw new NoAnnotationError(typeOrFunc);
    return assert.returnType((ListWrapper.map(params, (function(p) {
      return _extractToken(typeOrFunc, p);
    }))), List);
  }
  function _extractToken(typeOrFunc, annotations) {
    var type;
    var depProps = [];
    for (var i = 0; i < annotations.length; ++i) {
      var paramAnnotation = annotations[i];
      if (paramAnnotation instanceof Type) {
        type = paramAnnotation;
      } else if (paramAnnotation instanceof Inject) {
        return _createDependency(paramAnnotation.token, false, false, []);
      } else if (paramAnnotation instanceof InjectPromise) {
        return _createDependency(paramAnnotation.token, true, false, []);
      } else if (paramAnnotation instanceof InjectLazy) {
        return _createDependency(paramAnnotation.token, false, true, []);
      } else if (paramAnnotation instanceof DependencyAnnotation) {
        ListWrapper.push(depProps, paramAnnotation);
      }
    }
    if (isPresent(type)) {
      return _createDependency(type, false, false, depProps);
    } else {
      throw new NoAnnotationError(typeOrFunc);
    }
  }
  function _createDependency(token, asPromise, lazy, depProps) {
    return assert.returnType((new Dependency(Key.get(token), asPromise, lazy, depProps)), Dependency);
  }
  $__export("bind", bind);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      FIELD = $__m.FIELD;
      Type = $__m.Type;
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
    }, function($__m) {
      List = $__m.List;
      MapWrapper = $__m.MapWrapper;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      reflector = $__m.reflector;
    }, function($__m) {
      Key = $__m.Key;
    }, function($__m) {
      Inject = $__m.Inject;
      InjectLazy = $__m.InjectLazy;
      InjectPromise = $__m.InjectPromise;
      DependencyAnnotation = $__m.DependencyAnnotation;
    }, function($__m) {
      NoAnnotationError = $__m.NoAnnotationError;
    }],
    execute: function() {
      Dependency = $__export("Dependency", (function() {
        var Dependency = function Dependency(key, asPromise, lazy, properties) {
          assert.argumentTypes(key, Key, asPromise, assert.type.boolean, lazy, assert.type.boolean, properties, List);
          this.key = key;
          this.asPromise = asPromise;
          this.lazy = lazy;
          this.properties = properties;
        };
        return ($traceurRuntime.createClass)(Dependency, {}, {});
      }()));
      Object.defineProperty(Dependency, "parameters", {get: function() {
          return [[Key], [assert.type.boolean], [assert.type.boolean], [List]];
        }});
      Binding = $__export("Binding", (function() {
        var Binding = function Binding(key, factory, dependencies, providedAsPromise) {
          assert.argumentTypes(key, Key, factory, Function, dependencies, List, providedAsPromise, assert.type.boolean);
          this.key = key;
          this.factory = factory;
          this.dependencies = dependencies;
          this.providedAsPromise = providedAsPromise;
        };
        return ($traceurRuntime.createClass)(Binding, {}, {});
      }()));
      Object.defineProperty(Binding, "parameters", {get: function() {
          return [[Key], [Function], [List], [assert.type.boolean]];
        }});
      BindingBuilder = $__export("BindingBuilder", (function() {
        var BindingBuilder = function BindingBuilder(token) {
          this.token = token;
        };
        return ($traceurRuntime.createClass)(BindingBuilder, {
          toClass: function(type) {
            assert.argumentTypes(type, Type);
            return assert.returnType((new Binding(Key.get(this.token), reflector.factory(type), _dependenciesFor(type), false)), Binding);
          },
          toValue: function(value) {
            return assert.returnType((new Binding(Key.get(this.token), (function() {
              return value;
            }), [], false)), Binding);
          },
          toFactory: function(factoryFunction) {
            var dependencies = arguments[1] !== (void 0) ? arguments[1] : null;
            assert.argumentTypes(factoryFunction, Function, dependencies, List);
            return assert.returnType((new Binding(Key.get(this.token), factoryFunction, this._constructDependencies(factoryFunction, dependencies), false)), Binding);
          },
          toAsyncFactory: function(factoryFunction) {
            var dependencies = arguments[1] !== (void 0) ? arguments[1] : null;
            assert.argumentTypes(factoryFunction, Function, dependencies, List);
            return assert.returnType((new Binding(Key.get(this.token), factoryFunction, this._constructDependencies(factoryFunction, dependencies), true)), Binding);
          },
          _constructDependencies: function(factoryFunction, dependencies) {
            return isBlank(dependencies) ? _dependenciesFor(factoryFunction) : ListWrapper.map(dependencies, (function(t) {
              return new Dependency(Key.get(t), false, false, []);
            }));
          }
        }, {});
      }()));
      Object.defineProperty(BindingBuilder.prototype.toClass, "parameters", {get: function() {
          return [[Type]];
        }});
      Object.defineProperty(BindingBuilder.prototype.toFactory, "parameters", {get: function() {
          return [[Function], [List]];
        }});
      Object.defineProperty(BindingBuilder.prototype.toAsyncFactory, "parameters", {get: function() {
          return [[Function], [List]];
        }});
      Object.defineProperty(BindingBuilder.prototype._constructDependencies, "parameters", {get: function() {
          return [[Function], [List]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/di/binding.map

//# sourceMappingURL=../../../angular2/src/di/binding.js.map