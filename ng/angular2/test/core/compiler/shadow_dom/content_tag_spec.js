System.register(["angular2/test_lib", "angular2/src/facade/lang", "angular2/src/facade/dom", "angular2/src/core/compiler/shadow_dom_emulation/content_tag", "angular2/src/core/dom/element", "angular2/src/core/compiler/shadow_dom_emulation/light_dom"], function($__export) {
  "use strict";
  var describe,
      beforeEach,
      it,
      expect,
      ddescribe,
      iit,
      SpyObject,
      el,
      proxy,
      IMPLEMENTS,
      DOM,
      Content,
      NgElement,
      LightDom,
      DummyLightDom,
      _script;
  function main() {
    describe('Content', function() {
      it("should insert the nodes", (function() {
        var parent = el("<div><content></content></div>");
        var content = DOM.firstChild(parent);
        var c = new Content(null, new NgElement(content));
        c.insert([el("<a></a>"), el("<b></b>")]);
        expect(DOM.getInnerHTML(parent)).toEqual((_script + "<a></a><b></b>" + _script));
      }));
      it("should remove the nodes from the previous insertion", (function() {
        var parent = el("<div><content></content></div>");
        var content = DOM.firstChild(parent);
        var c = new Content(null, new NgElement(content));
        c.insert([el("<a></a>")]);
        c.insert([el("<b></b>")]);
        expect(DOM.getInnerHTML(parent)).toEqual((_script + "<b></b>" + _script));
      }));
      it("should insert empty list", (function() {
        var parent = el("<div><content></content></div>");
        var content = DOM.firstChild(parent);
        var c = new Content(null, new NgElement(content));
        c.insert([el("<a></a>")]);
        c.insert([]);
        expect(DOM.getInnerHTML(parent)).toEqual(("" + _script + _script));
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
      proxy = $__m.proxy;
    }, function($__m) {
      IMPLEMENTS = $__m.IMPLEMENTS;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      Content = $__m.Content;
    }, function($__m) {
      NgElement = $__m.NgElement;
    }, function($__m) {
      LightDom = $__m.LightDom;
    }],
    execute: function() {
      DummyLightDom = (function($__super) {
        var DummyLightDom = function DummyLightDom() {
          $traceurRuntime.superConstructor(DummyLightDom).apply(this, arguments);
        };
        return ($traceurRuntime.createClass)(DummyLightDom, {noSuchMethod: function(m) {
            $traceurRuntime.superGet(this, DummyLightDom.prototype, "noSuchMethod").call(this, m);
          }}, {}, $__super);
      }(SpyObject));
      Object.defineProperty(DummyLightDom, "annotations", {get: function() {
          return [new proxy, new IMPLEMENTS(LightDom)];
        }});
      _script = "<script type=\"ng/content\"></script>";
    }
  };
});

//# sourceMappingURL=angular2/test/core/compiler/shadow_dom/content_tag_spec.map

//# sourceMappingURL=../../../../../angular2/test/core/compiler/shadow_dom/content_tag_spec.js.map