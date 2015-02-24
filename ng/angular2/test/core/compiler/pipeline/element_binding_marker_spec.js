System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/facade/lang", "angular2/src/facade/dom", "angular2/src/facade/collection", "angular2/src/core/compiler/pipeline/element_binding_marker", "angular2/src/core/compiler/pipeline/compile_pipeline", "angular2/src/core/compiler/pipeline/compile_element", "angular2/src/core/compiler/pipeline/compile_step", "angular2/src/core/compiler/pipeline/compile_control", "angular2/src/core/compiler/directive_metadata_reader", "angular2/src/core/annotations/annotations"], function($__export) {
  "use strict";
  var assert,
      describe,
      beforeEach,
      it,
      expect,
      iit,
      ddescribe,
      el,
      isPresent,
      DOM,
      MapWrapper,
      ElementBindingMarker,
      CompilePipeline,
      CompileElement,
      CompileStep,
      CompileControl,
      DirectiveMetadataReader,
      Viewport,
      Decorator,
      Component,
      MockStep,
      SomeViewportDirective,
      SomeComponentDirective,
      SomeDecoratorDirective;
  function main() {
    describe('ElementBindingMarker', (function() {
      function createPipeline() {
        var $__1 = arguments[0] !== (void 0) ? arguments[0] : {},
            textNodeBindings = $__1.textNodeBindings,
            propertyBindings = $__1.propertyBindings,
            variableBindings = $__1.variableBindings,
            eventBindings = $__1.eventBindings,
            directives = $__1.directives,
            ignoreBindings = $__1.ignoreBindings;
        var reader = new DirectiveMetadataReader();
        return new CompilePipeline([new MockStep((function(parent, current, control) {
          if (isPresent(textNodeBindings)) {
            current.textNodeBindings = textNodeBindings;
          }
          if (isPresent(propertyBindings)) {
            current.propertyBindings = propertyBindings;
          }
          if (isPresent(variableBindings)) {
            current.variableBindings = variableBindings;
          }
          if (isPresent(eventBindings)) {
            current.eventBindings = eventBindings;
          }
          if (isPresent(ignoreBindings)) {
            current.ignoreBindings = ignoreBindings;
          }
          if (isPresent(directives)) {
            for (var i = 0; i < directives.length; i++) {
              current.addDirective(reader.read(directives[i]));
            }
          }
        })), new ElementBindingMarker()]);
      }
      it('should not mark empty elements', (function() {
        var results = createPipeline().process(el('<div></div>'));
        assertBinding(results[0], false);
      }));
      it('should not mark elements when ignoreBindings is true', (function() {
        var textNodeBindings = MapWrapper.create();
        MapWrapper.set(textNodeBindings, 0, 'expr');
        var results = createPipeline({
          textNodeBindings: textNodeBindings,
          ignoreBindings: true
        }).process(el('<div></div>'));
        assertBinding(results[0], false);
      }));
      it('should mark elements with text node bindings', (function() {
        var textNodeBindings = MapWrapper.create();
        MapWrapper.set(textNodeBindings, 0, 'expr');
        var results = createPipeline({textNodeBindings: textNodeBindings}).process(el('<div></div>'));
        assertBinding(results[0], true);
      }));
      it('should mark elements with property bindings', (function() {
        var propertyBindings = MapWrapper.createFromStringMap({'a': 'expr'});
        var results = createPipeline({propertyBindings: propertyBindings}).process(el('<div></div>'));
        assertBinding(results[0], true);
      }));
      it('should mark elements with variable bindings', (function() {
        var variableBindings = MapWrapper.createFromStringMap({'a': 'expr'});
        var results = createPipeline({variableBindings: variableBindings}).process(el('<div></div>'));
        assertBinding(results[0], true);
      }));
      it('should mark elements with event bindings', (function() {
        var eventBindings = MapWrapper.createFromStringMap({'click': 'expr'});
        var results = createPipeline({eventBindings: eventBindings}).process(el('<div></div>'));
        assertBinding(results[0], true);
      }));
      it('should mark elements with decorator directives', (function() {
        var results = createPipeline({directives: [SomeDecoratorDirective]}).process(el('<div></div>'));
        assertBinding(results[0], true);
      }));
      it('should mark elements with template directives', (function() {
        var results = createPipeline({directives: [SomeViewportDirective]}).process(el('<div></div>'));
        assertBinding(results[0], true);
      }));
      it('should mark elements with component directives', (function() {
        var results = createPipeline({directives: [SomeComponentDirective]}).process(el('<div></div>'));
        assertBinding(results[0], true);
      }));
    }));
  }
  function assertBinding(pipelineElement, shouldBePresent) {
    expect(pipelineElement.hasBindings).toBe(shouldBePresent);
    expect(DOM.hasClass(pipelineElement.element, 'ng-binding')).toBe(shouldBePresent);
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      describe = $__m.describe;
      beforeEach = $__m.beforeEach;
      it = $__m.it;
      expect = $__m.expect;
      iit = $__m.iit;
      ddescribe = $__m.ddescribe;
      el = $__m.el;
    }, function($__m) {
      isPresent = $__m.isPresent;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      ElementBindingMarker = $__m.ElementBindingMarker;
    }, function($__m) {
      CompilePipeline = $__m.CompilePipeline;
    }, function($__m) {
      CompileElement = $__m.CompileElement;
    }, function($__m) {
      CompileStep = $__m.CompileStep;
    }, function($__m) {
      CompileControl = $__m.CompileControl;
    }, function($__m) {
      DirectiveMetadataReader = $__m.DirectiveMetadataReader;
    }, function($__m) {
      Viewport = $__m.Viewport;
      Decorator = $__m.Decorator;
      Component = $__m.Component;
    }],
    execute: function() {
      MockStep = (function($__super) {
        var MockStep = function MockStep(process) {
          $traceurRuntime.superConstructor(MockStep).call(this);
          this.processClosure = process;
        };
        return ($traceurRuntime.createClass)(MockStep, {process: function(parent, current, control) {
            assert.argumentTypes(parent, CompileElement, current, CompileElement, control, CompileControl);
            this.processClosure(parent, current, control);
          }}, {}, $__super);
      }(CompileStep));
      Object.defineProperty(MockStep.prototype.process, "parameters", {get: function() {
          return [[CompileElement], [CompileElement], [CompileControl]];
        }});
      SomeViewportDirective = (function() {
        var SomeViewportDirective = function SomeViewportDirective() {};
        return ($traceurRuntime.createClass)(SomeViewportDirective, {}, {});
      }());
      Object.defineProperty(SomeViewportDirective, "annotations", {get: function() {
          return [new Viewport()];
        }});
      SomeComponentDirective = (function() {
        var SomeComponentDirective = function SomeComponentDirective() {};
        return ($traceurRuntime.createClass)(SomeComponentDirective, {}, {});
      }());
      Object.defineProperty(SomeComponentDirective, "annotations", {get: function() {
          return [new Component()];
        }});
      SomeDecoratorDirective = (function() {
        var SomeDecoratorDirective = function SomeDecoratorDirective() {};
        return ($traceurRuntime.createClass)(SomeDecoratorDirective, {}, {});
      }());
      Object.defineProperty(SomeDecoratorDirective, "annotations", {get: function() {
          return [new Decorator()];
        }});
    }
  };
});

//# sourceMappingURL=angular2/test/core/compiler/pipeline/element_binding_marker_spec.map

//# sourceMappingURL=../../../../../angular2/test/core/compiler/pipeline/element_binding_marker_spec.js.map