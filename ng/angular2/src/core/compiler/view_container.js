System.register(["rtts_assert/rtts_assert", "./view", "angular2/src/facade/dom", "angular2/src/facade/collection", "angular2/src/facade/lang", "angular2/di", "angular2/src/core/compiler/element_injector", "angular2/src/core/events/event_manager"], function($__export) {
  "use strict";
  var assert,
      View,
      ProtoView,
      DOM,
      Node,
      Element,
      ListWrapper,
      MapWrapper,
      List,
      BaseException,
      Injector,
      ElementInjector,
      isPresent,
      isBlank,
      EventManager,
      ViewContainer;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      View = $__m.View;
      ProtoView = $__m.ProtoView;
    }, function($__m) {
      DOM = $__m.DOM;
      Node = $__m.Node;
      Element = $__m.Element;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
      List = $__m.List;
    }, function($__m) {
      BaseException = $__m.BaseException;
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
    }, function($__m) {
      Injector = $__m.Injector;
    }, function($__m) {
      ElementInjector = $__m.ElementInjector;
    }, function($__m) {
      EventManager = $__m.EventManager;
    }],
    execute: function() {
      ViewContainer = $__export("ViewContainer", (function() {
        var ViewContainer = function ViewContainer(parentView, templateElement, defaultProtoView, elementInjector, eventManager) {
          var lightDom = arguments[5] !== (void 0) ? arguments[5] : null;
          assert.argumentTypes(parentView, View, templateElement, Element, defaultProtoView, ProtoView, elementInjector, ElementInjector, eventManager, EventManager, lightDom, assert.type.any);
          this.parentView = parentView;
          this.templateElement = templateElement;
          this.defaultProtoView = defaultProtoView;
          this.elementInjector = elementInjector;
          this._lightDom = lightDom;
          this._views = [];
          this.appInjector = null;
          this.hostElementInjector = null;
          this._eventManager = eventManager;
        };
        return ($traceurRuntime.createClass)(ViewContainer, {
          hydrate: function(appInjector, hostElementInjector) {
            assert.argumentTypes(appInjector, Injector, hostElementInjector, ElementInjector);
            this.appInjector = appInjector;
            this.hostElementInjector = hostElementInjector;
          },
          dehydrate: function() {
            this.appInjector = null;
            this.hostElementInjector = null;
            this.clear();
          },
          clear: function() {
            for (var i = this._views.length - 1; i >= 0; i--) {
              this.remove(i);
            }
          },
          get: function(index) {
            assert.argumentTypes(index, assert.type.number);
            return assert.returnType((this._views[index]), View);
          },
          get length() {
            return this._views.length;
          },
          _siblingToInsertAfter: function(index) {
            assert.argumentTypes(index, assert.type.number);
            if (index == 0)
              return this.templateElement;
            return ListWrapper.last(this._views[index - 1].nodes);
          },
          hydrated: function() {
            return isPresent(this.appInjector);
          },
          create: function() {
            var atIndex = arguments[0] !== (void 0) ? arguments[0] : -1;
            if (!this.hydrated())
              throw new BaseException('Cannot create views on a dehydrated ViewContainer');
            var newView = this.defaultProtoView.instantiate(this.hostElementInjector, this._eventManager);
            newView.hydrate(this.appInjector, this.hostElementInjector, this.parentView.context);
            return assert.returnType((this.insert(newView, atIndex)), View);
          },
          insert: function(view) {
            var atIndex = arguments[1] !== (void 0) ? arguments[1] : -1;
            if (atIndex == -1)
              atIndex = this._views.length;
            ListWrapper.insert(this._views, atIndex, view);
            if (isBlank(this._lightDom)) {
              ViewContainer.moveViewNodesAfterSibling(this._siblingToInsertAfter(atIndex), view);
            } else {
              this._lightDom.redistribute();
            }
            this.parentView.changeDetector.addChild(view.changeDetector);
            this._linkElementInjectors(view);
            return assert.returnType((view), View);
          },
          remove: function() {
            var atIndex = arguments[0] !== (void 0) ? arguments[0] : -1;
            if (atIndex == -1)
              atIndex = this._views.length - 1;
            var view = this.detach(atIndex);
            view.dehydrate();
            this.defaultProtoView.returnToPool(view);
          },
          detach: function() {
            var atIndex = arguments[0] !== (void 0) ? arguments[0] : -1;
            if (atIndex == -1)
              atIndex = this._views.length - 1;
            var detachedView = this.get(atIndex);
            ListWrapper.removeAt(this._views, atIndex);
            if (isBlank(this._lightDom)) {
              ViewContainer.removeViewNodesFromParent(this.templateElement.parentNode, detachedView);
            } else {
              this._lightDom.redistribute();
            }
            detachedView.changeDetector.remove();
            this._unlinkElementInjectors(detachedView);
            return assert.returnType((detachedView), View);
          },
          contentTagContainers: function() {
            return this._views;
          },
          nodes: function() {
            var r = [];
            for (var i = 0; i < this._views.length; ++i) {
              r = ListWrapper.concat(r, this._views[i].nodes);
            }
            return assert.returnType((r), assert.genericType(List, Node));
          },
          _linkElementInjectors: function(view) {
            for (var i = 0; i < view.rootElementInjectors.length; ++i) {
              view.rootElementInjectors[i].parent = this.elementInjector;
            }
          },
          _unlinkElementInjectors: function(view) {
            for (var i = 0; i < view.rootElementInjectors.length; ++i) {
              view.rootElementInjectors[i].parent = null;
            }
          }
        }, {
          moveViewNodesAfterSibling: function(sibling, view) {
            for (var i = view.nodes.length - 1; i >= 0; --i) {
              DOM.insertAfter(sibling, view.nodes[i]);
            }
          },
          removeViewNodesFromParent: function(parent, view) {
            for (var i = view.nodes.length - 1; i >= 0; --i) {
              DOM.removeChild(parent, view.nodes[i]);
            }
          }
        });
      }()));
      Object.defineProperty(ViewContainer, "parameters", {get: function() {
          return [[View], [Element], [ProtoView], [ElementInjector], [EventManager], []];
        }});
      Object.defineProperty(ViewContainer.prototype.hydrate, "parameters", {get: function() {
          return [[Injector], [ElementInjector]];
        }});
      Object.defineProperty(ViewContainer.prototype.get, "parameters", {get: function() {
          return [[assert.type.number]];
        }});
      Object.defineProperty(ViewContainer.prototype._siblingToInsertAfter, "parameters", {get: function() {
          return [[assert.type.number]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/core/compiler/view_container.map

//# sourceMappingURL=../../../../angular2/src/core/compiler/view_container.js.map