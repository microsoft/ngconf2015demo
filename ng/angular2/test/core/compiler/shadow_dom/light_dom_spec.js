System.register(["angular2/test_lib", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/facade/dom", "angular2/src/core/compiler/shadow_dom_emulation/content_tag", "angular2/src/core/compiler/shadow_dom_emulation/light_dom", "angular2/src/core/compiler/view", "angular2/src/core/compiler/view_container", "angular2/src/core/compiler/element_injector"], function($__export) {
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
      isBlank,
      ListWrapper,
      MapWrapper,
      DOM,
      Content,
      LightDom,
      View,
      ViewContainer,
      ElementInjector,
      FakeElementInjector,
      FakeView,
      FakeViewContainer,
      FakeContentTag;
  function main() {
    describe('LightDom', function() {
      var lightDomView;
      beforeEach((function() {
        lightDomView = new FakeView([]);
      }));
      describe("contentTags", (function() {
        it("should collect content tags from element injectors", (function() {
          var tag = new FakeContentTag();
          var shadowDomView = new FakeView([new FakeElementInjector(tag)]);
          var lightDom = new LightDom(lightDomView, shadowDomView, el("<div></div>"));
          expect(lightDom.contentTags()).toEqual([tag]);
        }));
        it("should collect content tags from ViewContainers", (function() {
          var tag = new FakeContentTag();
          var vp = new FakeViewContainer(null, [new FakeView([new FakeElementInjector(tag, null)])]);
          var shadowDomView = new FakeView([new FakeElementInjector(null, vp)]);
          var lightDom = new LightDom(lightDomView, shadowDomView, el("<div></div>"));
          expect(lightDom.contentTags()).toEqual([tag]);
        }));
      }));
      describe("expanded roots", (function() {
        it("should contain root nodes", (function() {
          var lightDomEl = el("<div><a></a></div>");
          var lightDom = new LightDom(lightDomView, new FakeView(), lightDomEl);
          expect(toHtml(lightDom.expandedDomNodes())).toEqual(["<a></a>"]);
        }));
        it("should include ViewContainer nodes", (function() {
          var lightDomEl = el("<div><template></template></div>");
          var lightDomView = new FakeView([new FakeElementInjector(null, new FakeViewContainer([el("<a></a>")]), DOM.firstChild(lightDomEl))]);
          var lightDom = new LightDom(lightDomView, new FakeView(), lightDomEl);
          expect(toHtml(lightDom.expandedDomNodes())).toEqual(["<a></a>"]);
        }));
        it("should include content nodes", (function() {
          var lightDomEl = el("<div><content></content></div>");
          var lightDomView = new FakeView([new FakeElementInjector(new FakeContentTag(null, [el("<a></a>")]), null, DOM.firstChild(lightDomEl))]);
          var lightDom = new LightDom(lightDomView, new FakeView(), lightDomEl);
          expect(toHtml(lightDom.expandedDomNodes())).toEqual(["<a></a>"]);
        }));
      }));
      describe("redistribute", (function() {
        it("should redistribute nodes between content tags with select property set", (function() {
          var contentA = new FakeContentTag("a");
          var contentB = new FakeContentTag("b");
          var lightDomEl = el("<div><a>1</a><b>2</b><a>3</a></div>");
          var lightDom = new LightDom(lightDomView, new FakeView([new FakeElementInjector(contentA, null), new FakeElementInjector(contentB, null)]), lightDomEl);
          lightDom.redistribute();
          expect(toHtml(contentA.nodes())).toEqual(["<a>1</a>", "<a>3</a>"]);
          expect(toHtml(contentB.nodes())).toEqual(["<b>2</b>"]);
        }));
        it("should support wildcard content tags", (function() {
          var wildcard = new FakeContentTag(null);
          var contentB = new FakeContentTag("b");
          var lightDomEl = el("<div><a>1</a><b>2</b><a>3</a></div>");
          var lightDom = new LightDom(lightDomView, new FakeView([new FakeElementInjector(wildcard, null), new FakeElementInjector(contentB, null)]), lightDomEl);
          lightDom.redistribute();
          expect(toHtml(wildcard.nodes())).toEqual(["<a>1</a>", "<b>2</b>", "<a>3</a>"]);
          expect(toHtml(contentB.nodes())).toEqual([]);
        }));
      }));
    });
  }
  function toHtml(nodes) {
    if (isBlank(nodes))
      return [];
    return ListWrapper.map(nodes, DOM.getOuterHTML);
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
      isBlank = $__m.isBlank;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      Content = $__m.Content;
    }, function($__m) {
      LightDom = $__m.LightDom;
    }, function($__m) {
      View = $__m.View;
    }, function($__m) {
      ViewContainer = $__m.ViewContainer;
    }, function($__m) {
      ElementInjector = $__m.ElementInjector;
    }],
    execute: function() {
      FakeElementInjector = (function() {
        var FakeElementInjector = function FakeElementInjector() {
          var content = arguments[0] !== (void 0) ? arguments[0] : null;
          var viewContainer = arguments[1] !== (void 0) ? arguments[1] : null;
          var element = arguments[2] !== (void 0) ? arguments[2] : null;
          this.content = content;
          this.viewContainer = viewContainer;
          this.element = element;
        };
        return ($traceurRuntime.createClass)(FakeElementInjector, {
          hasDirective: function(type) {
            return this.content != null;
          },
          hasPreBuiltObject: function(type) {
            return this.viewContainer != null;
          },
          forElement: function(n) {
            return this.element == n;
          },
          get: function(t) {
            if (t === Content)
              return this.content;
            if (t === ViewContainer)
              return this.viewContainer;
            return null;
          },
          noSuchMethod: function(i) {
            $traceurRuntime.superGet(this, FakeElementInjector.prototype, "noSuchMethod").call(this, i);
          }
        }, {});
      }());
      Object.defineProperty(FakeElementInjector, "annotations", {get: function() {
          return [new proxy, new IMPLEMENTS(ElementInjector)];
        }});
      FakeView = (function() {
        var FakeView = function FakeView() {
          var elementInjectors = arguments[0] !== (void 0) ? arguments[0] : null;
          this.elementInjectors = elementInjectors;
        };
        return ($traceurRuntime.createClass)(FakeView, {noSuchMethod: function(i) {
            $traceurRuntime.superGet(this, FakeView.prototype, "noSuchMethod").call(this, i);
          }}, {});
      }());
      Object.defineProperty(FakeView, "annotations", {get: function() {
          return [new proxy, new IMPLEMENTS(View)];
        }});
      FakeViewContainer = (function() {
        var FakeViewContainer = function FakeViewContainer() {
          var nodes = arguments[0] !== (void 0) ? arguments[0] : null;
          var views = arguments[1] !== (void 0) ? arguments[1] : null;
          this._nodes = nodes;
          this._contentTagContainers = views;
        };
        return ($traceurRuntime.createClass)(FakeViewContainer, {
          nodes: function() {
            return this._nodes;
          },
          contentTagContainers: function() {
            return this._contentTagContainers;
          },
          noSuchMethod: function(i) {
            $traceurRuntime.superGet(this, FakeViewContainer.prototype, "noSuchMethod").call(this, i);
          }
        }, {});
      }());
      Object.defineProperty(FakeViewContainer, "annotations", {get: function() {
          return [new proxy, new IMPLEMENTS(ViewContainer)];
        }});
      FakeContentTag = (function() {
        var FakeContentTag = function FakeContentTag() {
          var select = arguments[0] !== (void 0) ? arguments[0] : null;
          var nodes = arguments[1] !== (void 0) ? arguments[1] : null;
          this.select = select;
          this._nodes = nodes;
        };
        return ($traceurRuntime.createClass)(FakeContentTag, {
          insert: function(nodes) {
            this._nodes = ListWrapper.clone(nodes);
          },
          nodes: function() {
            return this._nodes;
          },
          noSuchMethod: function(i) {
            $traceurRuntime.superGet(this, FakeContentTag.prototype, "noSuchMethod").call(this, i);
          }
        }, {});
      }());
      Object.defineProperty(FakeContentTag, "annotations", {get: function() {
          return [new proxy, new IMPLEMENTS(Content)];
        }});
    }
  };
});

//# sourceMappingURL=angular2/test/core/compiler/shadow_dom/light_dom_spec.map

//# sourceMappingURL=../../../../../angular2/test/core/compiler/shadow_dom/light_dom_spec.js.map