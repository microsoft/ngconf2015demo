System.register(["rtts_assert/rtts_assert", "angular2/src/facade/dom", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var assert,
      DOM,
      document,
      location,
      NumberWrapper,
      BaseException,
      isBlank;
  function getIntParameter(name) {
    assert.argumentTypes(name, assert.type.string);
    return NumberWrapper.parseInt(getStringParameter(name), 10);
  }
  function getStringParameter(name) {
    assert.argumentTypes(name, assert.type.string);
    var els = DOM.querySelectorAll(document, ("input[name=\"" + name + "\"]"));
    var value;
    var el;
    for (var i = 0; i < els.length; i++) {
      el = els[i];
      if ((el.type !== 'radio' && el.type !== 'checkbox') || el.checked) {
        value = el.value;
        break;
      }
    }
    if (isBlank(value)) {
      throw new BaseException(("Could not find and input field with name " + name));
    }
    return value;
  }
  function bindAction(selector, callback) {
    assert.argumentTypes(selector, assert.type.string, callback, Function);
    var el = DOM.querySelector(document, selector);
    DOM.on(el, 'click', function(_) {
      callback();
    });
  }
  $__export("getIntParameter", getIntParameter);
  $__export("getStringParameter", getStringParameter);
  $__export("bindAction", bindAction);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      DOM = $__m.DOM;
      document = $__m.document;
      location = $__m.location;
    }, function($__m) {
      NumberWrapper = $__m.NumberWrapper;
      BaseException = $__m.BaseException;
      isBlank = $__m.isBlank;
    }],
    execute: function() {
      Object.defineProperty(getIntParameter, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(getStringParameter, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(bindAction, "parameters", {get: function() {
          return [[assert.type.string], [Function]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/test_lib/benchmark_util.map

//# sourceMappingURL=../../../angular2/src/test_lib/benchmark_util.js.map