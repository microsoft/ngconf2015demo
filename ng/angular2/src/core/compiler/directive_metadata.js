System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/core/annotations/annotations"], function($__export) {
  "use strict";
  var assert,
      Type,
      Directive,
      DirectiveMetadata;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Type = $__m.Type;
    }, function($__m) {
      Directive = $__m.Directive;
    }],
    execute: function() {
      DirectiveMetadata = $__export("DirectiveMetadata", (function() {
        var DirectiveMetadata = function DirectiveMetadata(type, annotation) {
          assert.argumentTypes(type, Type, annotation, Directive);
          this.annotation = annotation;
          this.type = type;
        };
        return ($traceurRuntime.createClass)(DirectiveMetadata, {}, {});
      }()));
      Object.defineProperty(DirectiveMetadata, "parameters", {get: function() {
          return [[Type], [Directive]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/core/compiler/directive_metadata.map

//# sourceMappingURL=../../../../angular2/src/core/compiler/directive_metadata.js.map