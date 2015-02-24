System.register(["angular2/test_lib", "angular2/src/core/compiler/shadow_dom_emulation/shadow_css", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var describe,
      beforeEach,
      it,
      expect,
      ddescribe,
      iit,
      SpyObject,
      el,
      ShadowCss,
      RegExpWrapper,
      StringWrapper;
  function main() {
    describe('ShadowCss', function() {
      function s(css, contentAttr) {
        var hostAttr = arguments[2] !== (void 0) ? arguments[2] : '';
        var shadowCss = new ShadowCss();
        var shim = shadowCss.shimCssText(css, contentAttr, hostAttr);
        var nlRegexp = RegExpWrapper.create('\\n');
        return StringWrapper.replaceAll(shim, nlRegexp, '');
      }
      Object.defineProperty(s, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string], [assert.type.string]];
        }});
      it('should handle empty string', (function() {
        expect(s('', 'a')).toEqual('');
      }));
      it('should add an attribute to every rule', (function() {
        var css = 'one {color: red;}two {color: red;}';
        var expected = 'one[a] {color: red;}two[a] {color: red;}';
        expect(s(css, 'a')).toEqual(expected);
      }));
      it('should hanlde invalid css', (function() {
        var css = 'one {color: red;}garbage';
        var expected = 'one[a] {color: red;}';
        expect(s(css, 'a')).toEqual(expected);
      }));
      it('should add an attribute to every selector', (function() {
        var css = 'one, two {color: red;}';
        var expected = 'one[a], two[a] {color: red;}';
        expect(s(css, 'a')).toEqual(expected);
      }));
      it('should handle media rules', (function() {
        var css = '@media screen and (max-width: 800px) {div {font-size: 50px;}}';
        var expected = '@media screen and (max-width: 800px) {div[a] {font-size: 50px;}}';
        expect(s(css, 'a')).toEqual(expected);
      }));
      it('should handle media rules with simple rules', (function() {
        var css = '@media screen and (max-width: 800px) {div {font-size: 50px;}} div {}';
        var expected = '@media screen and (max-width: 800px) {div[a] {font-size: 50px;}}div[a] {}';
        expect(s(css, 'a')).toEqual(expected);
      }));
      it('should handle complicated selectors', (function() {
        expect(s('one::before {}', 'a')).toEqual('one[a]::before {}');
        expect(s('one two {}', 'a')).toEqual('one[a] two[a] {}');
        expect(s('one>two {}', 'a')).toEqual('one[a] > two[a] {}');
        expect(s('one+two {}', 'a')).toEqual('one[a] + two[a] {}');
        expect(s('one~two {}', 'a')).toEqual('one[a] ~ two[a] {}');
        expect(s('.one.two > three {}', 'a')).toEqual('.one.two[a] > three[a] {}');
        expect(s('one[attr="value"] {}', 'a')).toEqual('one[attr="value"][a] {}');
        expect(s('one[attr=value] {}', 'a')).toEqual('one[attr="value"][a] {}');
        expect(s('one[attr^="value"] {}', 'a')).toEqual('one[attr^="value"][a] {}');
        expect(s('one[attr$="value"] {}', 'a')).toEqual('one[attr$="value"][a] {}');
        expect(s('one[attr*="value"] {}', 'a')).toEqual('one[attr*="value"][a] {}');
        expect(s('one[attr|="value"] {}', 'a')).toEqual('one[attr|="value"][a] {}');
        expect(s('one[attr] {}', 'a')).toEqual('one[attr][a] {}');
        expect(s('[is="one"] {}', 'a')).toEqual('[is="one"][a] {}');
      }));
      it('should handle :host', (function() {
        expect(s(':host {}', 'a', 'a-host')).toEqual('[a-host] {}');
        expect(s(':host(.x,.y) {}', 'a', 'a-host')).toEqual('[a-host].x, [a-host].y {}');
        expect(s(':host(.x,.y) > .z {}', 'a', 'a-host')).toEqual('[a-host].x > .z, [a-host].y > .z {}');
      }));
      it('should handle :host-context', (function() {
        expect(s(':host-context(.x) {}', 'a', 'a-host')).toEqual('[a-host].x, .x [a-host] {}');
        expect(s(':host-context(.x) > .y {}', 'a', 'a-host')).toEqual('[a-host].x > .y, .x [a-host] > .y {}');
      }));
      it('should support polyfill-next-selector', (function() {
        var css = s("polyfill-next-selector {content: 'x > y'} z {}", 'a');
        expect(css).toEqual('x[a] > y[a] {}');
        css = s('polyfill-next-selector {content: "x > y"} z {}', 'a');
        expect(css).toEqual('x[a] > y[a] {}');
      }));
      it('should support polyfill-unscoped-rule', (function() {
        var css = s("polyfill-unscoped-rule {content: '#menu > .bar';background: blue;}", 'a');
        expect(StringWrapper.contains(css, '#menu > .bar {;background: blue;}')).toBeTruthy();
        css = s('polyfill-unscoped-rule {content: "#menu > .bar";background: blue;}', 'a');
        expect(StringWrapper.contains(css, '#menu > .bar {;background: blue;}')).toBeTruthy();
      }));
      it('should support polyfill-rule', (function() {
        var css = s("polyfill-rule {content: ':host.foo .bar';background: blue;}", 'a', 'a-host');
        expect(css).toEqual('[a-host].foo .bar {background: blue;}');
        css = s('polyfill-rule {content: ":host.foo .bar";background: blue;}', 'a', 'a-host');
        expect(css).toEqual('[a-host].foo .bar {background: blue;}');
      }));
      it('should handle ::shadow', (function() {
        var css = s('x::shadow > y {}', 'a');
        expect(css).toEqual('x[a] > y[a] {}');
      }));
      it('should handle /deep/', (function() {
        var css = s('x /deep/ y {}', 'a');
        expect(css).toEqual('x[a] y[a] {}');
      }));
    });
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
      ShadowCss = $__m.ShadowCss;
    }, function($__m) {
      RegExpWrapper = $__m.RegExpWrapper;
      StringWrapper = $__m.StringWrapper;
    }],
    execute: function() {
    }
  };
});

//# sourceMappingURL=angular2/test/core/compiler/shadow_dom/shadow_css_spec.map

//# sourceMappingURL=../../../../../angular2/test/core/compiler/shadow_dom/shadow_css_spec.js.map