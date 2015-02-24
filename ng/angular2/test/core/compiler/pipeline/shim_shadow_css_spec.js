System.register(["angular2/test_lib", "angular2/src/core/compiler/pipeline/compile_pipeline", "angular2/src/core/compiler/pipeline/shim_shadow_css", "angular2/src/core/compiler/shadow_dom_emulation/shim_component", "angular2/src/core/annotations/annotations", "angular2/src/core/compiler/directive_metadata", "angular2/src/core/compiler/shadow_dom_strategy", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var describe,
      beforeEach,
      expect,
      it,
      iit,
      ddescribe,
      el,
      CompilePipeline,
      ShimShadowCss,
      ShimComponent,
      Component,
      DirectiveMetadata,
      ShadowDomStrategy,
      Type,
      FakeStrategy,
      FakeShimComponent;
  function main() {
    describe('ShimShadowCss', (function() {
      function createPipeline(strategy, styleHost) {
        var component = new Component({selector: 'selector'});
        var meta = new DirectiveMetadata(null, component);
        var shimShadowCss = new ShimShadowCss(meta, strategy, styleHost);
        return new CompilePipeline([shimShadowCss]);
      }
      Object.defineProperty(createPipeline, "parameters", {get: function() {
          return [[ShadowDomStrategy], []];
        }});
      it('it should set ignoreBindings to true for style elements', (function() {
        var host = el('<div></div>');
        var pipeline = createPipeline(new FakeStrategy(false), host);
        var results = pipeline.process(el('<div><style></style></div>'));
        expect(results[0].ignoreBindings).toBe(false);
        expect(results[1].ignoreBindings).toBe(true);
      }));
      it('should not extract the styles when extractStyles() is false', (function() {
        var host = el('<div></div>');
        var pipeline = createPipeline(new FakeStrategy(false), host);
        var template = el('<style>.s{}</style>');
        pipeline.process(template);
        expect(template).toHaveText('.s{}');
      }));
      it('should move the styles to the host when extractStyles() is true', (function() {
        var host = el('<div></div>');
        var pipeline = createPipeline(new FakeStrategy(true), host);
        var template = el('<div><style>.s{}</style></div>');
        pipeline.process(template);
        expect(template).toHaveText('');
        expect(host).toHaveText('/* shim */.s{}');
      }));
      it('should preserve original content when moving styles', (function() {
        var host = el('<div>original content</div>');
        var pipeline = createPipeline(new FakeStrategy(true), host);
        var template = el('<div><style>.s{}</style></div>');
        pipeline.process(template);
        expect(template).toHaveText('');
        expect(host).toHaveText('/* shim */.s{}original content');
      }));
      it('should move the styles to the host in the original order', (function() {
        var host = el('<div></div>');
        var pipeline = createPipeline(new FakeStrategy(true), host);
        var template = el('<div><style>.s1{}</style><style>.s2{}</style></div>');
        pipeline.process(template);
        expect(host).toHaveText('/* shim */.s1{}/* shim */.s2{}');
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
      ShimShadowCss = $__m.ShimShadowCss;
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
    }],
    execute: function() {
      FakeStrategy = (function($__super) {
        var FakeStrategy = function FakeStrategy(extractStyles) {
          $traceurRuntime.superConstructor(FakeStrategy).call(this);
          this._extractStyles = extractStyles;
        };
        return ($traceurRuntime.createClass)(FakeStrategy, {
          extractStyles: function() {
            return this._extractStyles;
          },
          getShimComponent: function(component) {
            return new FakeShimComponent(component);
          }
        }, {}, $__super);
      }(ShadowDomStrategy));
      Object.defineProperty(FakeStrategy, "parameters", {get: function() {
          return [[assert.type.boolean]];
        }});
      Object.defineProperty(FakeStrategy.prototype.getShimComponent, "parameters", {get: function() {
          return [[Type]];
        }});
      FakeShimComponent = (function($__super) {
        var FakeShimComponent = function FakeShimComponent(component) {
          $traceurRuntime.superConstructor(FakeShimComponent).call(this, component);
        };
        return ($traceurRuntime.createClass)(FakeShimComponent, {shimCssText: function(cssText) {
            return '/* shim */' + cssText;
          }}, {}, $__super);
      }(ShimComponent));
      Object.defineProperty(FakeShimComponent, "parameters", {get: function() {
          return [[Type]];
        }});
      Object.defineProperty(FakeShimComponent.prototype.shimCssText, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/test/core/compiler/pipeline/shim_shadow_css_spec.map

//# sourceMappingURL=../../../../../angular2/test/core/compiler/pipeline/shim_shadow_css_spec.js.map