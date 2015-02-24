System.register(["angular2/test_lib", "angular2/src/core/compiler/view", "angular2/src/core/compiler/view_pool", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var describe,
      xit,
      it,
      expect,
      beforeEach,
      ddescribe,
      iit,
      el,
      proxy,
      View,
      ViewPool,
      IMPLEMENTS,
      FakeView;
  function main() {
    describe('ViewPool', (function() {
      var viewPool,
          capacity = 3;
      beforeEach((function() {
        viewPool = new ViewPool(capacity);
      }));
      it('should return null when there are no views', (function() {
        expect(viewPool.pop()).toBeNull();
        expect(viewPool.length()).toBe(0);
      }));
      it('should support storing and retrieving a view', (function() {
        var view = new FakeView();
        viewPool.push(view);
        expect(viewPool.length()).toBe(1);
        expect(viewPool.pop()).toBe(view);
        expect(viewPool.length()).toBe(0);
      }));
      it('should not store more views that its capacity', (function() {
        for (var i = 0; i < capacity * 2; i++)
          viewPool.push(new FakeView());
        expect(viewPool.length()).toBe(capacity);
        for (var i = 0; i < capacity; i++) {
          expect(viewPool.pop()).not.toBe(null);
        }
        expect(viewPool.pop()).toBeNull();
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      describe = $__m.describe;
      xit = $__m.xit;
      it = $__m.it;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
      ddescribe = $__m.ddescribe;
      iit = $__m.iit;
      el = $__m.el;
      proxy = $__m.proxy;
    }, function($__m) {
      View = $__m.View;
    }, function($__m) {
      ViewPool = $__m.ViewPool;
    }, function($__m) {
      IMPLEMENTS = $__m.IMPLEMENTS;
    }],
    execute: function() {
      FakeView = (function() {
        var FakeView = function FakeView() {};
        return ($traceurRuntime.createClass)(FakeView, {noSuchMethod: function(i) {
            $traceurRuntime.superGet(this, FakeView.prototype, "noSuchMethod").call(this, i);
          }}, {});
      }());
      Object.defineProperty(FakeView, "annotations", {get: function() {
          return [new proxy, new IMPLEMENTS(View)];
        }});
    }
  };
});

//# sourceMappingURL=angular2/test/core/compiler/view_pool_spec.map

//# sourceMappingURL=../../../../angular2/test/core/compiler/view_pool_spec.js.map