System.register(["angular2/test_lib", "angular2/src/core/compiler/shadow_dom_emulation/shim_component", "angular2/src/core/compiler/shadow_dom_emulation/shadow_css", "angular2/src/facade/lang", "angular2/src/facade/dom"], function($__export) {
  "use strict";
  var describe,
      beforeEach,
      it,
      expect,
      ddescribe,
      iit,
      SpyObject,
      el,
      ShimNativeComponent,
      ShimEmulatedComponent,
      resetShimComponentCache,
      ShadowCss,
      Type,
      DOM,
      SomeComponent,
      SomeComponent2;
  function main() {
    describe('ShimComponent', (function() {
      describe('ShimNativeComponent', (function() {
        function createShim(component) {
          return new ShimNativeComponent(component);
        }
        Object.defineProperty(createShim, "parameters", {get: function() {
            return [[Type]];
          }});
        it('should not transform the CSS', (function() {
          var css = '.foo {color: blue;} :host{color: red;}';
          var shim = createShim(SomeComponent);
          var shimCss = shim.shimCssText(css);
          expect(css).toEqual(shimCss);
        }));
        it('should not transform content elements', (function() {
          var html = '<p>foo</p>';
          var element = el(html);
          var shim = createShim(SomeComponent);
          shim.shimContentElement(element);
          expect(DOM.getOuterHTML(element)).toEqual(html);
        }));
        it('should not transform host elements', (function() {
          var html = '<p>foo</p>';
          var element = el(html);
          var shim = createShim(SomeComponent);
          shim.shimHostElement(element);
          expect(DOM.getOuterHTML(element)).toEqual(html);
        }));
      }));
      describe('ShimEmulatedComponent', (function() {
        beforeEach((function() {
          resetShimComponentCache();
        }));
        function createShim(component) {
          return new ShimEmulatedComponent(component);
        }
        Object.defineProperty(createShim, "parameters", {get: function() {
            return [[Type]];
          }});
        it('should transform the CSS', (function() {
          var css = '.foo {color: blue;} :host{color: red;}';
          var shim = createShim(SomeComponent);
          var shimCss = shim.shimCssText(css);
          expect(shimCss).not.toEqual(css);
          var shadowCss = new ShadowCss();
          expect(shimCss).toEqual(shadowCss.shimCssText(css, '_ngcontent-0', '_nghost-0'));
        }));
        it('should transform content elements', (function() {
          var html = '<p>foo</p>';
          var element = el(html);
          var shim = createShim(SomeComponent);
          shim.shimContentElement(element);
          expect(DOM.getOuterHTML(element)).toEqual('<p _ngcontent-0="">foo</p>');
        }));
        it('should not transform host elements', (function() {
          var html = '<p>foo</p>';
          var element = el(html);
          var shim = createShim(SomeComponent);
          shim.shimHostElement(element);
          expect(DOM.getOuterHTML(element)).toEqual('<p _nghost-0="">foo</p>');
        }));
        it('should generate the same output for the same component', (function() {
          var html = '<p>foo</p>';
          var content1 = el(html);
          var host1 = el(html);
          var css = '.foo {color: blue;} :host{color: red;}';
          var shim1 = createShim(SomeComponent);
          shim1.shimContentElement(content1);
          shim1.shimHostElement(host1);
          var shimCss1 = shim1.shimCssText(css);
          var content2 = el(html);
          var host2 = el(html);
          var shim2 = createShim(SomeComponent);
          shim2.shimContentElement(content2);
          shim2.shimHostElement(host2);
          var shimCss2 = shim2.shimCssText(css);
          expect(DOM.getOuterHTML(content1)).toEqual(DOM.getOuterHTML(content2));
          expect(DOM.getOuterHTML(host1)).toEqual(DOM.getOuterHTML(host2));
          expect(shimCss1).toEqual(shimCss2);
        }));
        it('should generate different outputs for different components', (function() {
          var html = '<p>foo</p>';
          var content1 = el(html);
          var host1 = el(html);
          var css = '.foo {color: blue;} :host{color: red;}';
          var shim1 = createShim(SomeComponent);
          shim1.shimContentElement(content1);
          shim1.shimHostElement(host1);
          var shimCss1 = shim1.shimCssText(css);
          var content2 = el(html);
          var host2 = el(html);
          var shim2 = createShim(SomeComponent2);
          shim2.shimContentElement(content2);
          shim2.shimHostElement(host2);
          var shimCss2 = shim2.shimCssText(css);
          expect(DOM.getOuterHTML(content1)).not.toEqual(DOM.getOuterHTML(content2));
          expect(DOM.getOuterHTML(host1)).not.toEqual(DOM.getOuterHTML(host2));
          expect(shimCss1).not.toEqual(shimCss2);
        }));
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      describe = $__m.describe;
      beforeEach = $__m.beforeEach;
      it = $__m.it;
      expect = $__m.expect;
      ddescribe = $__m.ddescribe;
      iit = $__m.iit;
      SpyObject = $__m.SpyObject;
      el = $__m.el;
    }, function($__m) {
      ShimNativeComponent = $__m.ShimNativeComponent;
      ShimEmulatedComponent = $__m.ShimEmulatedComponent;
      resetShimComponentCache = $__m.resetShimComponentCache;
    }, function($__m) {
      ShadowCss = $__m.ShadowCss;
    }, function($__m) {
      Type = $__m.Type;
    }, function($__m) {
      DOM = $__m.DOM;
    }],
    execute: function() {
      SomeComponent = (function() {
        var SomeComponent = function SomeComponent() {};
        return ($traceurRuntime.createClass)(SomeComponent, {}, {});
      }());
      SomeComponent2 = (function() {
        var SomeComponent2 = function SomeComponent2() {};
        return ($traceurRuntime.createClass)(SomeComponent2, {}, {});
      }());
    }
  };
});

//# sourceMappingURL=angular2/test/core/compiler/shadow_dom/shim_component_spec.map

//# sourceMappingURL=../../../../../angular2/test/core/compiler/shadow_dom/shim_component_spec.js.map