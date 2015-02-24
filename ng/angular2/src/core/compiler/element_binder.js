System.register(["rtts_assert/rtts_assert", "./element_injector", "./directive_metadata", "angular2/src/facade/collection", "./view"], function($__export) {
  "use strict";
  var assert,
      ProtoElementInjector,
      DirectiveMetadata,
      List,
      Map,
      ProtoView,
      ElementBinder;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      ProtoElementInjector = $__m.ProtoElementInjector;
    }, function($__m) {
      DirectiveMetadata = $__m.DirectiveMetadata;
    }, function($__m) {
      List = $__m.List;
      Map = $__m.Map;
    }, function($__m) {
      ProtoView = $__m.ProtoView;
    }],
    execute: function() {
      ElementBinder = $__export("ElementBinder", (function() {
        var ElementBinder = function ElementBinder(protoElementInjector, componentDirective, viewportDirective) {
          assert.argumentTypes(protoElementInjector, ProtoElementInjector, componentDirective, DirectiveMetadata, viewportDirective, DirectiveMetadata);
          this.protoElementInjector = protoElementInjector;
          this.componentDirective = componentDirective;
          this.viewportDirective = viewportDirective;
          this.events = null;
          this.textNodeIndices = null;
          this.hasElementPropertyBindings = false;
          this.nestedProtoView = null;
        };
        return ($traceurRuntime.createClass)(ElementBinder, {}, {});
      }()));
      Object.defineProperty(ElementBinder, "parameters", {get: function() {
          return [[ProtoElementInjector], [DirectiveMetadata], [DirectiveMetadata]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/core/compiler/element_binder.map

//# sourceMappingURL=../../../../angular2/src/core/compiler/element_binder.js.map