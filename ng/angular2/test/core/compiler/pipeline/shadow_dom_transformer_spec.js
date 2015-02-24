System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/core/compiler/pipeline/compile_pipeline", "angular2/src/core/compiler/pipeline/shadow_dom_transformer", "angular2/src/core/annotations/annotations", "angular2/src/core/compiler/directive_metadata", "angular2/src/core/compiler/shadow_dom_strategy", "angular2/src/core/compiler/shadow_dom_emulation/shim_css", "angular2/src/facade/dom", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var assert,
      describe,
      beforeEach,
      expect,
      it,
      iit,
      ddescribe,
      el,
      CompilePipeline,
      ShadowDomTransformer,
      Component,
      DirectiveMetadata,
      ShadowDomStrategy,
      shimCssText,
      DOM,
      MapWrapper,
      FakeStrategy;
  function main() {
    describe('ShadowDomTransformer', (function() {
      function createPipeline(selector, strategy, styleHost) {
        assert.argumentTypes(selector, assert.type.any, strategy, ShadowDomStrategy, styleHost, assert.type.any);
        var component = new Component({selector: selector});
        var meta = new DirectiveMetadata(null, component);
        var transformer = new ShadowDomTransformer(meta, strategy, styleHost);
        transformer.clearCache();
        return new CompilePipeline([transformer]);
      }
      Object.defineProperty(createPipeline, "parameters", {get: function() {
          return [[], [ShadowDomStrategy], []];
        }});
      it('it should set ignoreBindings to true for style elements', (function() {
        var host = DOM.createElement('div');
        var pipeline = createPipeline('foo', new FakeStrategy(false, false), host);
        var results = pipeline.process(el('<div><style></style></div>'));
        expect(results[0].ignoreBindings).toBe(false);
        expect(results[1].ignoreBindings).toBe(true);
      }));
      describe('css', (function() {
        it('should not extract the styles when extractStyles() is false', (function() {
          var host = DOM.createElement('div');
          var pipeline = createPipeline('foo', new FakeStrategy(false, false), host);
          var template = el('<style>.s{}</style>');
          pipeline.process(template);
          expect(template).toHaveText('.s{}');
        }));
        it('should move the styles to the host when extractStyles() is true', (function() {
          var host = DOM.createElement('div');
          var pipeline = createPipeline('foo', new FakeStrategy(true, false), host);
          var template = el('<div><style>.s{}</style></div>');
          pipeline.process(template);
          expect(template).toHaveText('');
          expect(host).toHaveText('.s{}');
        }));
        it('should preserve original content when moving styles', (function() {
          var host = el('<div>original content</div>');
          var pipeline = createPipeline('foo', new FakeStrategy(true, false), host);
          var template = el('<div><style>.s{}</style></div>');
          pipeline.process(template);
          expect(template).toHaveText('');
          expect(host).toHaveText('.s{}original content');
        }));
        it('should move the styles to the host in the original order', (function() {
          var host = DOM.createElement('div');
          var pipeline = createPipeline('foo', new FakeStrategy(true, false), host);
          var template = el('<div><style>.s1{}</style><style>.s2{}</style></div>');
          pipeline.process(template);
          expect(host).toHaveText('.s1{}.s2{}');
        }));
        it('should shim the styles when shim() and extractStyles() are true', (function() {
          var host = DOM.createElement('div');
          var pipeline = createPipeline('foo', new FakeStrategy(true, true), host);
          var template = el('<div><style>.s1{}</style></div>');
          pipeline.process(template);
          expect(host).toHaveText(shimCssText('.s1{}', 'foo'));
        }));
        it('should deduplicate styles before moving them when shim() is false', (function() {
          var host = DOM.createElement('div');
          var pipeline = createPipeline('foo', new FakeStrategy(true, false), host);
          var template = el('<div><style>.s1{}</style><style>.s1{}</style><style>.s1{}</style></div>');
          pipeline.process(template);
          expect(host).toHaveText('.s1{}');
        }));
      }));
      describe('html', (function() {
        it('should add an attribute to all children when shim() is true', (function() {
          var host = DOM.createElement('div');
          var pipeline = createPipeline('foo', new FakeStrategy(false, true), host);
          var template = el('<div><span></span></div>');
          pipeline.process(template);
          expect(DOM.getOuterHTML(template)).toEqual('<div foo=""><span foo=""></span></div>');
        }));
        it('should not modify the template when shim() is false', (function() {
          var host = DOM.createElement('div');
          var pipeline = createPipeline('foo', new FakeStrategy(false, false), host);
          var template = el('<div><span></span></div>');
          pipeline.process(template);
          expect(DOM.getOuterHTML(template)).toEqual('<div><span></span></div>');
        }));
        it('should not throw with complex selectors', (function() {
          var host = DOM.createElement('div');
          var pipeline = createPipeline('foo[bar]', new FakeStrategy(false, true), host);
          var template = el('<div><span></span></div>');
          expect((function() {
            return pipeline.process(template);
          })).not.toThrow();
        }));
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
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
      ShadowDomTransformer = $__m.ShadowDomTransformer;
    }, function($__m) {
      Component = $__m.Component;
    }, function($__m) {
      DirectiveMetadata = $__m.DirectiveMetadata;
    }, function($__m) {
      ShadowDomStrategy = $__m.ShadowDomStrategy;
    }, function($__m) {
      shimCssText = $__m.shimCssText;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      MapWrapper = $__m.MapWrapper;
    }],
    execute: function() {
      FakeStrategy = (function($__super) {
        var FakeStrategy = function FakeStrategy(extractStyles, shim) {
          assert.argumentTypes(extractStyles, assert.type.boolean, shim, assert.type.boolean);
          $traceurRuntime.superConstructor(FakeStrategy).call(this);
          this._extractStyles = extractStyles;
          this._shim = shim;
        };
        return ($traceurRuntime.createClass)(FakeStrategy, {
          extractStyles: function() {
            return assert.returnType((this._extractStyles), assert.type.boolean);
          },
          shim: function() {
            return assert.returnType((this._shim), assert.type.boolean);
          }
        }, {}, $__super);
      }(ShadowDomStrategy));
      Object.defineProperty(FakeStrategy, "parameters", {get: function() {
          return [[assert.type.boolean], [assert.type.boolean]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/test/core/compiler/pipeline/shadow_dom_transformer_spec.map

//# sourceMappingURL=../../../../../angular2/test/core/compiler/pipeline/shadow_dom_transformer_spec.js.map