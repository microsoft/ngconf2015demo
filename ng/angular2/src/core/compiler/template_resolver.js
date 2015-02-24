System.register(["rtts_assert/rtts_assert", "angular2/src/core/annotations/template", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/reflection/reflection"], function($__export) {
  "use strict";
  var assert,
      Template,
      Type,
      stringify,
      isBlank,
      BaseException,
      Map,
      MapWrapper,
      List,
      ListWrapper,
      reflector,
      TemplateResolver;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Template = $__m.Template;
    }, function($__m) {
      Type = $__m.Type;
      stringify = $__m.stringify;
      isBlank = $__m.isBlank;
      BaseException = $__m.BaseException;
    }, function($__m) {
      Map = $__m.Map;
      MapWrapper = $__m.MapWrapper;
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      reflector = $__m.reflector;
    }],
    execute: function() {
      TemplateResolver = $__export("TemplateResolver", (function() {
        var TemplateResolver = function TemplateResolver() {
          this._cache = MapWrapper.create();
        };
        return ($traceurRuntime.createClass)(TemplateResolver, {
          resolve: function(component) {
            assert.argumentTypes(component, Type);
            var template = MapWrapper.get(this._cache, component);
            if (isBlank(template)) {
              template = this._resolve(component);
              MapWrapper.set(this._cache, component, template);
            }
            return assert.returnType((template), Template);
          },
          _resolve: function(component) {
            assert.argumentTypes(component, Type);
            var annotations = reflector.annotations(component);
            for (var i = 0; i < annotations.length; i++) {
              var annotation = annotations[i];
              if (annotation instanceof Template) {
                return annotation;
              }
            }
            throw new BaseException(("No template found for " + stringify(component)));
          }
        }, {});
      }()));
      Object.defineProperty(TemplateResolver.prototype.resolve, "parameters", {get: function() {
          return [[Type]];
        }});
      Object.defineProperty(TemplateResolver.prototype._resolve, "parameters", {get: function() {
          return [[Type]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/core/compiler/template_resolver.map

//# sourceMappingURL=../../../../angular2/src/core/compiler/template_resolver.js.map