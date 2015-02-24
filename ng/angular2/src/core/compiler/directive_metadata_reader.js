System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "../annotations/annotations", "./directive_metadata", "angular2/src/reflection/reflection"], function($__export) {
  "use strict";
  var assert,
      Type,
      isPresent,
      BaseException,
      stringify,
      Directive,
      DirectiveMetadata,
      reflector,
      DirectiveMetadataReader;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Type = $__m.Type;
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
      stringify = $__m.stringify;
    }, function($__m) {
      Directive = $__m.Directive;
    }, function($__m) {
      DirectiveMetadata = $__m.DirectiveMetadata;
    }, function($__m) {
      reflector = $__m.reflector;
    }],
    execute: function() {
      DirectiveMetadataReader = $__export("DirectiveMetadataReader", (function() {
        var DirectiveMetadataReader = function DirectiveMetadataReader() {};
        return ($traceurRuntime.createClass)(DirectiveMetadataReader, {read: function(type) {
            assert.argumentTypes(type, Type);
            var annotations = reflector.annotations(type);
            if (isPresent(annotations)) {
              for (var i = 0; i < annotations.length; i++) {
                var annotation = annotations[i];
                if (annotation instanceof Directive) {
                  return assert.returnType((new DirectiveMetadata(type, annotation)), DirectiveMetadata);
                }
              }
            }
            throw new BaseException(("No Directive annotation found on " + stringify(type)));
          }}, {});
      }()));
      Object.defineProperty(DirectiveMetadataReader.prototype.read, "parameters", {get: function() {
          return [[Type]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/core/compiler/directive_metadata_reader.map

//# sourceMappingURL=../../../../angular2/src/core/compiler/directive_metadata_reader.js.map