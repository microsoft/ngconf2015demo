System.register(["angular2/src/core/compiler/selector", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/test_lib/benchmark_util"], function($__export) {
  "use strict";
  var SelectorMatcher,
      CssSelector,
      StringWrapper,
      Math,
      ListWrapper,
      getIntParameter,
      bindAction;
  function main() {
    var count = getIntParameter('selectors');
    var fixedMatcher;
    var fixedSelectorStrings = [];
    var fixedSelectors = [];
    for (var i = 0; i < count; i++) {
      ListWrapper.push(fixedSelectorStrings, randomSelector());
    }
    for (var i = 0; i < count; i++) {
      ListWrapper.push(fixedSelectors, CssSelector.parse(fixedSelectorStrings[i]));
    }
    fixedMatcher = new SelectorMatcher();
    for (var i = 0; i < count; i++) {
      fixedMatcher.addSelectable(fixedSelectors[i], i);
    }
    function parse() {
      var result = [];
      for (var i = 0; i < count; i++) {
        ListWrapper.push(result, CssSelector.parse(fixedSelectorStrings[i]));
      }
      return result;
    }
    function addSelectable() {
      var matcher = new SelectorMatcher();
      for (var i = 0; i < count; i++) {
        matcher.addSelectable(fixedSelectors[i], i);
      }
      return matcher;
    }
    function match() {
      var matchCount = 0;
      for (var i = 0; i < count; i++) {
        fixedMatcher.match(fixedSelectors[i], (function(selected) {
          matchCount += selected;
        }));
      }
      return matchCount;
    }
    bindAction('#parse', parse);
    bindAction('#addSelectable', addSelectable);
    bindAction('#match', match);
  }
  function randomSelector() {
    var res = randomStr(5);
    for (var i = 0; i < 3; i++) {
      res += '.' + randomStr(5);
    }
    for (var i = 0; i < 3; i++) {
      res += '[' + randomStr(3) + '=' + randomStr(6) + ']';
    }
    return res;
  }
  function randomStr(len) {
    var s = '';
    while (s.length < len) {
      s += randomChar();
    }
    return s;
  }
  function randomChar() {
    var n = randomNum(62);
    if (n < 10)
      return n.toString();
    if (n < 36)
      return StringWrapper.fromCharCode(n + 55);
    return StringWrapper.fromCharCode(n + 61);
  }
  function randomNum(max) {
    return Math.floor(Math.random() * max);
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      SelectorMatcher = $__m.SelectorMatcher;
      CssSelector = $__m.CssSelector;
    }, function($__m) {
      StringWrapper = $__m.StringWrapper;
      Math = $__m.Math;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      getIntParameter = $__m.getIntParameter;
      bindAction = $__m.bindAction;
    }],
    execute: function() {
    }
  };
});

//# sourceMappingURL=benchmarks/src/compiler/selector_benchmark.map

//# sourceMappingURL=../../../benchmarks/src/compiler/selector_benchmark.js.map