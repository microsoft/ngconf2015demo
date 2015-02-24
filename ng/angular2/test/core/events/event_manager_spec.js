System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/core/events/event_manager", "angular2/src/core/zone/vm_turn_zone", "angular2/src/facade/collection", "angular2/src/facade/dom"], function($__export) {
  "use strict";
  var assert,
      describe,
      ddescribe,
      it,
      iit,
      xit,
      xdescribe,
      expect,
      beforeEach,
      el,
      EventManager,
      EventManagerPlugin,
      VmTurnZone,
      List,
      ListWrapper,
      Map,
      MapWrapper,
      DOM,
      Element,
      FakeEventManagerPlugin,
      FakeVmTurnZone;
  function main() {
    describe('EventManager', (function() {
      it('should delegate event bindings to plugins', (function() {
        var element = el('<div></div>');
        var handler = (function(e) {
          return e;
        });
        var plugin = new FakeEventManagerPlugin(['click']);
        var manager = new EventManager([plugin], new FakeVmTurnZone());
        manager.addEventListener(element, 'click', handler);
        expect(MapWrapper.get(plugin._eventHandlers, 'click')).toBe(handler);
      }));
      it('should delegate event bindings to the first plugin supporting the event', (function() {
        var element = el('<div></div>');
        var clickHandler = (function(e) {
          return e;
        });
        var dblClickHandler = (function(e) {
          return e;
        });
        var plugin1 = new FakeEventManagerPlugin(['dblclick']);
        var plugin2 = new FakeEventManagerPlugin(['click', 'dblclick']);
        var manager = new EventManager([plugin1, plugin2], new FakeVmTurnZone());
        manager.addEventListener(element, 'click', clickHandler);
        manager.addEventListener(element, 'dblclick', dblClickHandler);
        expect(MapWrapper.contains(plugin1._eventHandlers, 'click')).toBe(false);
        expect(MapWrapper.get(plugin2._eventHandlers, 'click')).toBe(clickHandler);
        expect(MapWrapper.contains(plugin2._eventHandlers, 'dblclick')).toBe(false);
        expect(MapWrapper.get(plugin1._eventHandlers, 'dblclick')).toBe(dblClickHandler);
      }));
      it('should fall back to native events when no plugin can handle the event', (function() {
        var element = el('<div></div>');
        var dispatchedEvent = DOM.createMouseEvent('click');
        var receivedEvent = null;
        var handler = (function(e) {
          receivedEvent = e;
        });
        var plugin = new FakeEventManagerPlugin(['dblclick']);
        var manager = new EventManager([plugin], new FakeVmTurnZone());
        manager.addEventListener(element, 'click', handler);
        DOM.dispatchEvent(element, dispatchedEvent);
        expect(receivedEvent).toBe(dispatchedEvent);
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      describe = $__m.describe;
      ddescribe = $__m.ddescribe;
      it = $__m.it;
      iit = $__m.iit;
      xit = $__m.xit;
      xdescribe = $__m.xdescribe;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
      el = $__m.el;
    }, function($__m) {
      EventManager = $__m.EventManager;
      EventManagerPlugin = $__m.EventManagerPlugin;
    }, function($__m) {
      VmTurnZone = $__m.VmTurnZone;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
      Map = $__m.Map;
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      DOM = $__m.DOM;
      Element = $__m.Element;
    }],
    execute: function() {
      FakeEventManagerPlugin = (function($__super) {
        var FakeEventManagerPlugin = function FakeEventManagerPlugin(supports) {
          assert.argumentTypes(supports, assert.genericType(List, assert.type.string));
          $traceurRuntime.superConstructor(FakeEventManagerPlugin).call(this);
          this._supports = supports;
          this._eventHandlers = MapWrapper.create();
        };
        return ($traceurRuntime.createClass)(FakeEventManagerPlugin, {
          supports: function(eventName) {
            assert.argumentTypes(eventName, assert.type.string);
            return assert.returnType((ListWrapper.contains(this._supports, eventName)), assert.type.boolean);
          },
          addEventListener: function(element, eventName, handler) {
            assert.argumentTypes(element, Element, eventName, assert.type.string, handler, Function);
            MapWrapper.set(this._eventHandlers, eventName, handler);
          }
        }, {}, $__super);
      }(EventManagerPlugin));
      Object.defineProperty(FakeEventManagerPlugin, "parameters", {get: function() {
          return [[assert.genericType(List, assert.type.string)]];
        }});
      Object.defineProperty(FakeEventManagerPlugin.prototype.supports, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(FakeEventManagerPlugin.prototype.addEventListener, "parameters", {get: function() {
          return [[Element], [assert.type.string], [Function]];
        }});
      FakeVmTurnZone = (function($__super) {
        var FakeVmTurnZone = function FakeVmTurnZone() {
          $traceurRuntime.superConstructor(FakeVmTurnZone).call(this, {enableLongStackTrace: false});
        };
        return ($traceurRuntime.createClass)(FakeVmTurnZone, {
          run: function(fn) {
            fn();
          },
          runOutsideAngular: function(fn) {
            fn();
          }
        }, {}, $__super);
      }(VmTurnZone));
    }
  };
});

//# sourceMappingURL=angular2/test/core/events/event_manager_spec.map

//# sourceMappingURL=../../../../angular2/test/core/events/event_manager_spec.js.map