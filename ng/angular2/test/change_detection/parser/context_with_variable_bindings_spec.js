System.register(["angular2/test_lib", "angular2/src/change_detection/parser/context_with_variable_bindings", "angular2/src/facade/lang", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var ddescribe,
      describe,
      it,
      xit,
      iit,
      expect,
      beforeEach,
      ContextWithVariableBindings,
      BaseException,
      isBlank,
      isPresent,
      MapWrapper,
      ListWrapper;
  function main() {
    describe('ContextWithVariableBindings', (function() {
      var locals;
      beforeEach((function() {
        locals = new ContextWithVariableBindings(null, MapWrapper.createFromPairs([['key', 'value'], ['nullKey', null]]));
      }));
      it('should support getting values', (function() {
        expect(locals.get('key')).toBe('value');
        var notPresentValue = locals.get('notPresent');
        expect(isPresent(notPresentValue)).toBe(false);
      }));
      it('should support checking if key is persent', (function() {
        expect(locals.hasBinding('key')).toBe(true);
        expect(locals.hasBinding('nullKey')).toBe(true);
        expect(locals.hasBinding('notPresent')).toBe(false);
      }));
      it('should support setting persent keys', (function() {
        locals.set('key', 'bar');
        expect(locals.get('key')).toBe('bar');
      }));
      it('should not support setting keys that are not present already', (function() {
        expect((function() {
          return locals.set('notPresent', 'bar');
        })).toThrowError();
      }));
      it('should clearValues', (function() {
        locals.clearValues();
        expect(locals.get('key')).toBe(null);
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      ddescribe = $__m.ddescribe;
      describe = $__m.describe;
      it = $__m.it;
      xit = $__m.xit;
      iit = $__m.iit;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
    }, function($__m) {
      ContextWithVariableBindings = $__m.ContextWithVariableBindings;
    }, function($__m) {
      BaseException = $__m.BaseException;
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
    }, function($__m) {
      MapWrapper = $__m.MapWrapper;
      ListWrapper = $__m.ListWrapper;
    }],
    execute: function() {
    }
  };
});

//# sourceMappingURL=angular2/test/change_detection/parser/context_with_variable_bindings_spec.map

//# sourceMappingURL=../../../../angular2/test/change_detection/parser/context_with_variable_bindings_spec.js.map