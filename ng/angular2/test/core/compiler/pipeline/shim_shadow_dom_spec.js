System.register(["angular2/test_lib", "angular2/src/core/compiler/pipeline/compile_pipeline", "angular2/src/core/compiler/pipeline/shim_shadow_dom", "angular2/src/core/compiler/pipeline/compile_element", "angular2/src/core/compiler/pipeline/compile_step", "angular2/src/core/compiler/pipeline/compile_control", "angular2/src/core/compiler/shadow_dom_emulation/shim_component", "angular2/src/core/annotations/annotations", "angular2/src/core/compiler/directive_metadata", "angular2/src/core/compiler/shadow_dom_strategy", "angular2/src/facade/lang", "angular2/src/facade/dom"], function($__export) {
  "use strict";
  var describe,
      beforeEach,
      expect,
      it,
      iit,
      ddescribe,
      el,
      CompilePipeline,
      ShimShadowDom,
      CompileElement,
      CompileStep,
      CompileControl,
      ShimComponent,
      Component,
      DirectiveMetadata,
      ShadowDomStrategy,
      Type,
      isBlank,
      DOM,
      Element,
      FakeStrategy,
      FakeShimComponent,
      MockStep,
      SomeComponent;
  function main() {
    describe('ShimShadowDom', (function() {
      function createPipeline(ignoreBindings) {
        var component = new Component({selector: 'selector'});
        var meta = new DirectiveMetadata(null, component);
        var shimShadowDom = new ShimShadowDom(meta, new FakeStrategy());
        return new CompilePipeline([new MockStep((function(parent, current, control) {
          current.ignoreBindings = ignoreBindings;
        })), new MockStep((function(parent, current, control) {
          var el = current.element;
          if (DOM.hasClass(el, 'host')) {
            current.componentDirective = new DirectiveMetadata(SomeComponent, null);
          }
        })), shimShadowDom]);
      }
      Object.defineProperty(createPipeline, "parameters", {get: function() {
          return [[assert.type.boolean]];
        }});
      it('should add the content attribute to content element', (function() {
        var pipeline = createPipeline(false);
        var results = pipeline.process(el('<div></div>'));
        expect(DOM.getAttribute(results[0].element, '_ngcontent')).toEqual('content');
        expect(isBlank(DOM.getAttribute(results[0].element, '_nghost'))).toBeTruthy();
      }));
      it('should add both the content and host attributes to host element', (function() {
        var pipeline = createPipeline(false);
        var results = pipeline.process(el('<div class="host"></div>'));
        expect(DOM.getAttribute(results[0].element, '_ngcontent')).toEqual('content');
        expect(DOM.getAttribute(results[0].element, '_nghost')).toEqual('host');
      }));
      it('should do nothing when ignoreBindings is true', (function() {
        var pipeline = createPipeline(true);
        var results = pipeline.process(el('<div class="host"></div>'));
        expect(isBlank(DOM.getAttribute(results[0].element, '_ngcontent'))).toBeTruthy();
        expect(isBlank(DOM.getAttribute(results[0].element, '_nghost'))).toBeTruthy();
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      describe = $__m.describe;
      beforeEach = $__m.beforeEach;
      expect = $__m.expect;
      it = $__m.it;
      iit = $__m.iit;
      ddescribe = $__m.ddescribe;
      el = $__m.el;
    }, function($__m) {
      CompilePipeline = $__m.CompilePipeline;
    }, function($__m) {
      ShimShadowDom = $__m.ShimShadowDom;
    }, function($__m) {
      CompileElement = $__m.CompileElement;
    }, function($__m) {
      CompileStep = $__m.CompileStep;
    }, function($__m) {
      CompileControl = $__m.CompileControl;
    }, function($__m) {
      ShimComponent = $__m.ShimComponent;
    }, function($__m) {
      Component = $__m.Component;
    }, function($__m) {
      DirectiveMetadata = $__m.DirectiveMetadata;
    }, function($__m) {
      ShadowDomStrategy = $__m.ShadowDomStrategy;
    }, function($__m) {
      Type = $__m.Type;
      isBlank = $__m.isBlank;
    }, function($__m) {
      DOM = $__m.DOM;
      Element = $__m.Element;
    }],
    execute: function() {
      FakeStrategy = (function($__super) {
        var FakeStrategy = function FakeStrategy() {
          $traceurRuntime.superConstructor(FakeStrategy).call(this);
        };
        return ($traceurRuntime.createClass)(FakeStrategy, {getShimComponent: function(component) {
            return new FakeShimComponent(component);
          }}, {}, $__super);
      }(ShadowDomStrategy));
      Object.defineProperty(FakeStrategy.prototype.getShimComponent, "parameters", {get: function() {
          return [[Type]];
        }});
      FakeShimComponent = (function($__super) {
        var FakeShimComponent = function FakeShimComponent(component) {
          $traceurRuntime.superConstructor(FakeShimComponent).call(this, component);
        };
        return ($traceurRuntime.createClass)(FakeShimComponent, {
          shimContentElement: function(element) {
            DOM.setAttribute(element, '_ngcontent', 'content');
          },
          shimHostElement: function(element) {
            DOM.setAttribute(element, '_nghost', 'host');
          }
        }, {}, $__super);
      }(ShimComponent));
      Object.defineProperty(FakeShimComponent, "parameters", {get: function() {
          return [[Type]];
        }});
      Object.defineProperty(FakeShimComponent.prototype.shimContentElement, "parameters", {get: function() {
          return [[Element]];
        }});
      Object.defineProperty(FakeShimComponent.prototype.shimHostElement, "parameters", {get: function() {
          return [[Element]];
        }});
      MockStep = (function($__super) {
        var MockStep = function MockStep(process) {
          $traceurRuntime.superConstructor(MockStep).call(this);
          this.processClosure = process;
        };
        return ($traceurRuntime.createClass)(MockStep, {process: function(parent, current, control) {
            this.processClosure(parent, current, control);
          }}, {}, $__super);
      }(CompileStep));
      Object.defineProperty(MockStep.prototype.process, "parameters", {get: function() {
          return [[CompileElement], [CompileElement], [CompileControl]];
        }});
      SomeComponent = (function() {
        var SomeComponent = function SomeComponent() {};
        return ($traceurRuntime.createClass)(SomeComponent, {}, {});
      }());
    }
  };
});

//# sourceMappingURL=angular2/test/core/compiler/pipeline/shim_shadow_dom_spec.map

//# sourceMappingURL=../../../../../angular2/test/core/compiler/pipeline/shim_shadow_dom_spec.js.map