System.register(["angular2/test_lib", "angular2/src/core/compiler/selector", "angular2/src/facade/collection", "angular2/src/facade/dom"], function($__export) {
  "use strict";
  var describe,
      it,
      expect,
      beforeEach,
      ddescribe,
      iit,
      xit,
      el,
      SelectorMatcher,
      CssSelector,
      List,
      ListWrapper,
      MapWrapper,
      DOM;
  function main() {
    describe('SelectorMatcher', (function() {
      var matcher,
          matched,
          selectableCollector;
      function reset() {
        matched = ListWrapper.create();
      }
      beforeEach((function() {
        reset();
        selectableCollector = (function(selectable) {
          ListWrapper.push(matched, selectable);
        });
        matcher = new SelectorMatcher();
      }));
      it('should select by element name case insensitive', (function() {
        matcher.addSelectable(CssSelector.parse('someTag'), 1);
        matcher.match(CssSelector.parse('SOMEOTHERTAG'), selectableCollector);
        expect(matched).toEqual([]);
        matcher.match(CssSelector.parse('SOMETAG'), selectableCollector);
        expect(matched).toEqual([1]);
      }));
      it('should select by class name case insensitive', (function() {
        matcher.addSelectable(CssSelector.parse('.someClass'), 1);
        matcher.addSelectable(CssSelector.parse('.someClass.class2'), 2);
        matcher.match(CssSelector.parse('.SOMEOTHERCLASS'), selectableCollector);
        expect(matched).toEqual([]);
        matcher.match(CssSelector.parse('.SOMECLASS'), selectableCollector);
        expect(matched).toEqual([1]);
        reset();
        matcher.match(CssSelector.parse('.someClass.class2'), selectableCollector);
        expect(matched).toEqual([1, 2]);
      }));
      it('should select by attr name case insensitive independent of the value', (function() {
        matcher.addSelectable(CssSelector.parse('[someAttr]'), 1);
        matcher.addSelectable(CssSelector.parse('[someAttr][someAttr2]'), 2);
        matcher.match(CssSelector.parse('[SOMEOTHERATTR]'), selectableCollector);
        expect(matched).toEqual([]);
        matcher.match(CssSelector.parse('[SOMEATTR]'), selectableCollector);
        expect(matched).toEqual([1]);
        reset();
        matcher.match(CssSelector.parse('[SOMEATTR=someValue]'), selectableCollector);
        expect(matched).toEqual([1]);
        reset();
        matcher.match(CssSelector.parse('[someAttr][someAttr2]'), selectableCollector);
        expect(matched).toEqual([1, 2]);
      }));
      it('should select by attr name only once if the value is from the DOM', (function() {
        matcher.addSelectable(CssSelector.parse('[some-decor]'), 1);
        var elementSelector = new CssSelector();
        var element = el('<div attr></div>');
        var empty = element.getAttribute('attr');
        elementSelector.addAttribute('some-decor', empty);
        matcher.match(elementSelector, selectableCollector);
        expect(matched).toEqual([1]);
      }));
      it('should select by attr name and value case insensitive', (function() {
        matcher.addSelectable(CssSelector.parse('[someAttr=someValue]'), 1);
        matcher.match(CssSelector.parse('[SOMEATTR=SOMEOTHERATTR]'), selectableCollector);
        expect(matched).toEqual([]);
        matcher.match(CssSelector.parse('[SOMEATTR=SOMEVALUE]'), selectableCollector);
        expect(matched).toEqual([1]);
      }));
      it('should select by element name, class name and attribute name with value', (function() {
        matcher.addSelectable(CssSelector.parse('someTag.someClass[someAttr=someValue]'), 1);
        matcher.match(CssSelector.parse('someOtherTag.someOtherClass[someOtherAttr]'), selectableCollector);
        expect(matched).toEqual([]);
        matcher.match(CssSelector.parse('someTag.someOtherClass[someOtherAttr]'), selectableCollector);
        expect(matched).toEqual([]);
        matcher.match(CssSelector.parse('someTag.someClass[someOtherAttr]'), selectableCollector);
        expect(matched).toEqual([]);
        matcher.match(CssSelector.parse('someTag.someClass[someAttr]'), selectableCollector);
        expect(matched).toEqual([]);
        matcher.match(CssSelector.parse('someTag.someClass[someAttr=someValue]'), selectableCollector);
        expect(matched).toEqual([1]);
      }));
      it('should select independent of the order in the css selector', (function() {
        matcher.addSelectable(CssSelector.parse('[someAttr].someClass'), 1);
        matcher.addSelectable(CssSelector.parse('.someClass[someAttr]'), 2);
        matcher.addSelectable(CssSelector.parse('.class1.class2'), 3);
        matcher.addSelectable(CssSelector.parse('.class2.class1'), 4);
        matcher.match(CssSelector.parse('[someAttr].someClass'), selectableCollector);
        expect(matched).toEqual([1, 2]);
        reset();
        matcher.match(CssSelector.parse('.someClass[someAttr]'), selectableCollector);
        expect(matched).toEqual([1, 2]);
        reset();
        matcher.match(CssSelector.parse('.class1.class2'), selectableCollector);
        expect(matched).toEqual([3, 4]);
        reset();
        matcher.match(CssSelector.parse('.class2.class1'), selectableCollector);
        expect(matched).toEqual([4, 3]);
      }));
    }));
    describe('CssSelector.parse', (function() {
      it('should detect element names', (function() {
        var cssSelector = CssSelector.parse('sometag');
        expect(cssSelector.element).toEqual('sometag');
        expect(cssSelector.toString()).toEqual('sometag');
      }));
      it('should detect class names', (function() {
        var cssSelector = CssSelector.parse('.someClass');
        expect(cssSelector.classNames).toEqual(['someclass']);
        expect(cssSelector.toString()).toEqual('.someclass');
      }));
      it('should detect attr names', (function() {
        var cssSelector = CssSelector.parse('[attrname]');
        expect(cssSelector.attrs).toEqual(['attrname', '']);
        expect(cssSelector.toString()).toEqual('[attrname]');
      }));
      it('should detect attr values', (function() {
        var cssSelector = CssSelector.parse('[attrname=attrvalue]');
        expect(cssSelector.attrs).toEqual(['attrname', 'attrvalue']);
        expect(cssSelector.toString()).toEqual('[attrname=attrvalue]');
      }));
      it('should detect multiple parts', (function() {
        var cssSelector = CssSelector.parse('sometag[attrname=attrvalue].someclass');
        expect(cssSelector.element).toEqual('sometag');
        expect(cssSelector.attrs).toEqual(['attrname', 'attrvalue']);
        expect(cssSelector.classNames).toEqual(['someclass']);
        expect(cssSelector.toString()).toEqual('sometag.someclass[attrname=attrvalue]');
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      describe = $__m.describe;
      it = $__m.it;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
      ddescribe = $__m.ddescribe;
      iit = $__m.iit;
      xit = $__m.xit;
      el = $__m.el;
    }, function($__m) {
      SelectorMatcher = $__m.SelectorMatcher;
      CssSelector = $__m.CssSelector;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      DOM = $__m.DOM;
    }],
    execute: function() {
    }
  };
});

//# sourceMappingURL=angular2/test/core/compiler/selector_spec.map

//# sourceMappingURL=../../../../angular2/test/core/compiler/selector_spec.js.map