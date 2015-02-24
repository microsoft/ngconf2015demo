System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/core/compiler/shadow_dom_emulation/shim_css", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var assert,
      describe,
      beforeEach,
      it,
      expect,
      ddescribe,
      iit,
      SpyObject,
      el,
      shimCssText,
      RegExpWrapper,
      StringWrapper;
  function main() {
    describe('shim css', function() {
      function s(css, tag) {
        assert.argumentTypes(css, assert.type.string, tag, assert.type.string);
        var shim = shimCssText(css, tag);
        var nlRegexp = RegExpWrapper.create('\\n');
        return StringWrapper.replaceAll(shim, nlRegexp, '');
      }
      Object.defineProperty(s, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
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
        expect(s('one>two {}', 'a')).toEqual('one[a]>two[a] {}');
        expect(s('one+two {}', 'a')).toEqual('one[a]+two[a] {}');
        expect(s('one~two {}', 'a')).toEqual('one[a]~two[a] {}');
        expect(s('.one.two > three {}', 'a')).toEqual('.one.two[a]>three[a] {}');
        expect(s('one[attr="value"] {}', 'a')).toEqual('one[attr="value"][a] {}');
        expect(s('one[attr=value] {}', 'a')).toEqual('one[attr=value][a] {}');
        expect(s('one[attr^="value"] {}', 'a')).toEqual('one[attr^="value"][a] {}');
        expect(s('one[attr\$="value"] {}', 'a')).toEqual('one[attr\$="value"][a] {}');
        expect(s('one[attr*="value"] {}', 'a')).toEqual('one[attr*="value"][a] {}');
        expect(s('one[attr|="value"] {}', 'a')).toEqual('one[attr|="value"][a] {}');
        expect(s('one[attr] {}', 'a')).toEqual('one[attr][a] {}');
        expect(s('[is="one"] {}', 'a')).toEqual('one[a] {}');
      }));
      it('should handle :host', (function() {
        expect(s(':host {}', 'a')).toEqual('a {}');
        expect(s(':host(.x,.y) {}', 'a')).toEqual('a.x, a.y {}');
      }));
      it('should support polyfill-next-selector', (function() {
        var css = s("polyfill-next-selector {content: 'x > y'} z {}", 'a');
        expect(css).toEqual('x[a]>y[a] {}');
        css = s('polyfill-next-selector {content: "x > y"} z {}', 'a');
        expect(css).toEqual('x[a]>y[a] {}');
      }));
      it('should support polyfill-unscoped-next-selector', (function() {
        var css = s("polyfill-unscoped-next-selector {content: 'x > y'} z {}", 'a');
        expect(css).toEqual('x > y {}');
        css = s('polyfill-unscoped-next-selector {content: "x > y"} z {}', 'a');
        expect(css).toEqual('x > y {}');
      }));
      it('should support polyfill-non-strict-next-selector', (function() {
        var css = s('polyfill-non-strict {} one, two {}', 'a');
        expect(css).toEqual('a one, a two {}');
      }));
      it('should handle ::shadow', (function() {
        var css = s('polyfill-non-strict {} x::shadow > y {}', 'a');
        expect(css).toEqual('a x > y {}');
      }));
      it('should handle /deep/', (function() {
        var css = s('polyfill-non-strict {} x /deep/ y {}', 'a');
        expect(css).toEqual('a x  y {}');
      }));
    });
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
      ddescribe = $__m.ddescribe;
      iit = $__m.iit;
      SpyObject = $__m.SpyObject;
      el = $__m.el;
    }, function($__m) {
      shimCssText = $__m.shimCssText;
    }, function($__m) {
      RegExpWrapper = $__m.RegExpWrapper;
      StringWrapper = $__m.StringWrapper;
    }],
    execute: function() {
    }
  };
});

//# sourceMappingURL=angular2/test/core/compiler/shadow_dom/shim_css_spec.map

//# sourceMappingURL=../../../../../angular2/test/core/compiler/shadow_dom/shim_css_spec.js.map