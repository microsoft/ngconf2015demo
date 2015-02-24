System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/core/compiler/element_injector", "angular2/src/core/annotations/visibility", "angular2/src/core/annotations/events", "angular2/src/core/annotations/annotations", "angular2/di", "angular2/src/core/compiler/view", "angular2/src/core/compiler/view_container", "angular2/src/core/dom/element", "angular2/src/core/compiler/shadow_dom_emulation/light_dom", "angular2/src/core/compiler/binding_propagation_config"], function($__export) {
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
      SpyObject,
      proxy,
      isBlank,
      isPresent,
      FIELD,
      IMPLEMENTS,
      ListWrapper,
      MapWrapper,
      List,
      ProtoElementInjector,
      PreBuiltObjects,
      DirectiveBinding,
      Parent,
      Ancestor,
      EventEmitter,
      onDestroy,
      Injector,
      Inject,
      bind,
      View,
      ViewContainer,
      NgElement,
      LightDom,
      SourceLightDom,
      DestinationLightDom,
      Directive,
      BindingPropagationConfig,
      DummyView,
      DummyLightDom,
      SimpleDirective,
      SomeOtherDirective,
      NeedsDirective,
      NeedDirectiveFromParent,
      NeedDirectiveFromAncestor,
      NeedsService,
      NeedsEventEmitter,
      A_Needs_B,
      B_Needs_A,
      NeedsView,
      DirectiveWithDestroy;
  function main() {
    var defaultPreBuiltObjects = new PreBuiltObjects(null, null, null, null, null);
    function humanize(tree, names) {
      var lookupName = (function(item) {
        return ListWrapper.last(ListWrapper.find(names, (function(pair) {
          return pair[0] === item;
        })));
      });
      if (tree.children.length == 0)
        return lookupName(tree);
      var children = tree.children.map((function(m) {
        return humanize(m, names);
      }));
      return [lookupName(tree), children];
    }
    Object.defineProperty(humanize, "parameters", {get: function() {
        return [[], [List]];
      }});
    function injector(bindings) {
      var lightDomAppInjector = arguments[1] !== (void 0) ? arguments[1] : null;
      var shadowDomAppInjector = arguments[2] !== (void 0) ? arguments[2] : null;
      var preBuiltObjects = arguments[3] !== (void 0) ? arguments[3] : null;
      if (isBlank(lightDomAppInjector))
        lightDomAppInjector = new Injector([]);
      var proto = new ProtoElementInjector(null, 0, bindings, isPresent(shadowDomAppInjector));
      var inj = proto.instantiate(null, null, null);
      var preBuilt = isPresent(preBuiltObjects) ? preBuiltObjects : defaultPreBuiltObjects;
      inj.instantiateDirectives(lightDomAppInjector, shadowDomAppInjector, preBuilt);
      return inj;
    }
    function parentChildInjectors(parentBindings, childBindings) {
      var parentPreBuildObjects = arguments[2] !== (void 0) ? arguments[2] : null;
      if (isBlank(parentPreBuildObjects))
        parentPreBuildObjects = defaultPreBuiltObjects;
      var inj = new Injector([]);
      var protoParent = new ProtoElementInjector(null, 0, parentBindings);
      var parent = protoParent.instantiate(null, null, null);
      parent.instantiateDirectives(inj, null, parentPreBuildObjects);
      var protoChild = new ProtoElementInjector(protoParent, 1, childBindings, false, 1);
      var child = protoChild.instantiate(parent, null, null);
      child.instantiateDirectives(inj, null, defaultPreBuiltObjects);
      return child;
    }
    function hostShadowInjectors(hostBindings, shadowBindings) {
      var hostPreBuildObjects = arguments[2] !== (void 0) ? arguments[2] : null;
      if (isBlank(hostPreBuildObjects))
        hostPreBuildObjects = defaultPreBuiltObjects;
      var inj = new Injector([]);
      var shadowInj = inj.createChild([]);
      var protoParent = new ProtoElementInjector(null, 0, hostBindings, true);
      var host = protoParent.instantiate(null, null, null);
      host.instantiateDirectives(inj, shadowInj, hostPreBuildObjects);
      var protoChild = new ProtoElementInjector(protoParent, 0, shadowBindings, false, 1);
      var shadow = protoChild.instantiate(null, host, null);
      shadow.instantiateDirectives(shadowInj, null, null);
      return shadow;
    }
    describe("ProtoElementInjector", (function() {
      describe("direct parent", (function() {
        it("should return parent proto injector when distance is 1", (function() {
          var distance = 1;
          var protoParent = new ProtoElementInjector(null, 0, []);
          var protoChild = new ProtoElementInjector(protoParent, 1, [], false, distance);
          expect(protoChild.directParent()).toEqual(protoParent);
        }));
        it("should return null otherwise", (function() {
          var distance = 2;
          var protoParent = new ProtoElementInjector(null, 0, []);
          var protoChild = new ProtoElementInjector(protoParent, 1, [], false, distance);
          expect(protoChild.directParent()).toEqual(null);
        }));
      }));
    }));
    describe("ElementInjector", function() {
      describe("instantiate", function() {
        it("should create an element injector", function() {
          var protoParent = new ProtoElementInjector(null, 0, []);
          var protoChild1 = new ProtoElementInjector(protoParent, 1, []);
          var protoChild2 = new ProtoElementInjector(protoParent, 2, []);
          var p = protoParent.instantiate(null, null, null);
          var c1 = protoChild1.instantiate(p, null, null);
          var c2 = protoChild2.instantiate(p, null, null);
          expect(humanize(p, [[p, 'parent'], [c1, 'child1'], [c2, 'child2']])).toEqual(["parent", ["child1", "child2"]]);
        });
        describe("direct parent", (function() {
          it("should return parent injector when distance is 1", (function() {
            var distance = 1;
            var protoParent = new ProtoElementInjector(null, 0, []);
            var protoChild = new ProtoElementInjector(protoParent, 1, [], false, distance);
            var p = protoParent.instantiate(null, null, null);
            var c = protoChild.instantiate(p, null, null);
            expect(c.directParent()).toEqual(p);
          }));
          it("should return null otherwise", (function() {
            var distance = 2;
            var protoParent = new ProtoElementInjector(null, 0, []);
            var protoChild = new ProtoElementInjector(protoParent, 1, [], false, distance);
            var p = protoParent.instantiate(null, null, null);
            var c = protoChild.instantiate(p, null, null);
            expect(c.directParent()).toEqual(null);
          }));
        }));
      });
      describe("hasBindings", function() {
        it("should be true when there are bindings", function() {
          var p = new ProtoElementInjector(null, 0, [SimpleDirective]);
          expect(p.hasBindings).toBeTruthy();
        });
        it("should be false otherwise", function() {
          var p = new ProtoElementInjector(null, 0, []);
          expect(p.hasBindings).toBeFalsy();
        });
      });
      describe("hasInstances", function() {
        it("should be false when no directives are instantiated", function() {
          expect(injector([]).hasInstances()).toBe(false);
        });
        it("should be true when directives are instantiated", function() {
          expect(injector([SimpleDirective]).hasInstances()).toBe(true);
        });
      });
      describe("instantiateDirectives", function() {
        it("should instantiate directives that have no dependencies", function() {
          var inj = injector([SimpleDirective]);
          expect(inj.get(SimpleDirective)).toBeAnInstanceOf(SimpleDirective);
        });
        it("should instantiate directives that depend on other directives", function() {
          var inj = injector([SimpleDirective, NeedsDirective]);
          var d = inj.get(NeedsDirective);
          expect(d).toBeAnInstanceOf(NeedsDirective);
          expect(d.dependency).toBeAnInstanceOf(SimpleDirective);
        });
        it("should instantiate directives that depend on app services", function() {
          var appInjector = new Injector([bind("service").toValue("service")]);
          var inj = injector([NeedsService], appInjector);
          var d = inj.get(NeedsService);
          expect(d).toBeAnInstanceOf(NeedsService);
          expect(d.service).toEqual("service");
        });
        it("should instantiate directives that depend on pre built objects", function() {
          var view = new DummyView();
          var inj = injector([NeedsView], null, null, new PreBuiltObjects(view, null, null, null, null));
          expect(inj.get(NeedsView).view).toBe(view);
        });
        it("should instantiate directives that depend on the containing component", function() {
          var shadow = hostShadowInjectors([SimpleDirective], [NeedsDirective]);
          var d = shadow.get(NeedsDirective);
          expect(d).toBeAnInstanceOf(NeedsDirective);
          expect(d.dependency).toBeAnInstanceOf(SimpleDirective);
        });
        it("should not instantiate directives that depend on other directives in the containing component's ElementInjector", (function() {
          expect((function() {
            hostShadowInjectors([SomeOtherDirective, SimpleDirective], [NeedsDirective]);
          })).toThrowError('No provider for SimpleDirective! (NeedsDirective -> SimpleDirective)');
        }));
        it("should instantiate component directives that depend on app services in the shadow app injector", (function() {
          var shadowAppInjector = new Injector([bind("service").toValue("service")]);
          var inj = injector([NeedsService], null, shadowAppInjector);
          var d = inj.get(NeedsService);
          expect(d).toBeAnInstanceOf(NeedsService);
          expect(d.service).toEqual("service");
        }));
        it("should not instantiate other directives that depend on app services in the shadow app injector", (function() {
          var shadowAppInjector = new Injector([bind("service").toValue("service")]);
          expect((function() {
            injector([SomeOtherDirective, NeedsService], null, shadowAppInjector);
          })).toThrowError('No provider for service! (NeedsService -> service)');
        }));
        it("should return app services", function() {
          var appInjector = new Injector([bind("service").toValue("service")]);
          var inj = injector([], appInjector);
          expect(inj.get('service')).toEqual('service');
        });
        it("should get directives from parent", function() {
          var child = parentChildInjectors([SimpleDirective], [NeedDirectiveFromParent]);
          var d = child.get(NeedDirectiveFromParent);
          expect(d).toBeAnInstanceOf(NeedDirectiveFromParent);
          expect(d.dependency).toBeAnInstanceOf(SimpleDirective);
        });
        it("should not return parent's directives on self", function() {
          expect((function() {
            injector([SimpleDirective, NeedDirectiveFromParent]);
          })).toThrowError();
        });
        it("should get directives from ancestor", function() {
          var child = parentChildInjectors([SimpleDirective], [NeedDirectiveFromAncestor]);
          var d = child.get(NeedDirectiveFromAncestor);
          expect(d).toBeAnInstanceOf(NeedDirectiveFromAncestor);
          expect(d.dependency).toBeAnInstanceOf(SimpleDirective);
        });
        it("should throw when no SimpleDirective found", function() {
          expect((function() {
            return injector([NeedDirectiveFromParent]);
          })).toThrowError('No provider for SimpleDirective! (NeedDirectiveFromParent -> SimpleDirective)');
        });
        it("should accept SimpleDirective bindings instead of SimpleDirective types", function() {
          var inj = injector([DirectiveBinding.createFromBinding(bind(SimpleDirective).toClass(SimpleDirective), null)]);
          expect(inj.get(SimpleDirective)).toBeAnInstanceOf(SimpleDirective);
        });
        it("should allow for direct access using getDirectiveAtIndex", function() {
          var inj = injector([DirectiveBinding.createFromBinding(bind(SimpleDirective).toClass(SimpleDirective), null)]);
          expect(inj.getDirectiveAtIndex(0)).toBeAnInstanceOf(SimpleDirective);
          expect((function() {
            return inj.getDirectiveAtIndex(-1);
          })).toThrowError('Index -1 is out-of-bounds.');
          expect((function() {
            return inj.getDirectiveAtIndex(10);
          })).toThrowError('Index 10 is out-of-bounds.');
        });
        it("should allow for direct access using getBindingAtIndex", function() {
          var inj = injector([DirectiveBinding.createFromBinding(bind(SimpleDirective).toClass(SimpleDirective), null)]);
          expect(inj.getDirectiveBindingAtIndex(0)).toBeAnInstanceOf(DirectiveBinding);
          expect((function() {
            return inj.getDirectiveBindingAtIndex(-1);
          })).toThrowError('Index -1 is out-of-bounds.');
          expect((function() {
            return inj.getDirectiveBindingAtIndex(10);
          })).toThrowError('Index 10 is out-of-bounds.');
        });
        it("should handle cyclic dependencies", function() {
          expect((function() {
            var bAneedsB = bind(A_Needs_B).toFactory((function(a) {
              return new A_Needs_B(a);
            }), [B_Needs_A]);
            var bBneedsA = bind(B_Needs_A).toFactory((function(a) {
              return new B_Needs_A(a);
            }), [A_Needs_B]);
            injector([DirectiveBinding.createFromBinding(bAneedsB, null), DirectiveBinding.createFromBinding(bBneedsA, null)]);
          })).toThrowError('Cannot instantiate cyclic dependency! ' + '(A_Needs_B -> B_Needs_A -> A_Needs_B)');
        });
        it("should call onDestroy on directives subscribed to this event", function() {
          var inj = injector([DirectiveBinding.createFromType(DirectiveWithDestroy, new Directive({lifecycle: [onDestroy]}))]);
          var destroy = inj.get(DirectiveWithDestroy);
          inj.clearDirectives();
          expect(destroy.onDestroyCounter).toBe(1);
        });
      });
      describe("pre built objects", function() {
        it("should return view", function() {
          var view = new DummyView();
          var inj = injector([], null, null, new PreBuiltObjects(view, null, null, null, null));
          expect(inj.get(View)).toEqual(view);
        });
        it("should return element", function() {
          var element = new NgElement(null);
          var inj = injector([], null, null, new PreBuiltObjects(null, element, null, null, null));
          expect(inj.get(NgElement)).toEqual(element);
        });
        it('should return viewContainer', function() {
          var viewContainer = new ViewContainer(null, null, null, null, null);
          var inj = injector([], null, null, new PreBuiltObjects(null, null, viewContainer, null, null));
          expect(inj.get(ViewContainer)).toEqual(viewContainer);
        });
        it('should return bindingPropagationConfig', function() {
          var config = new BindingPropagationConfig(null);
          var inj = injector([], null, null, new PreBuiltObjects(null, null, null, null, config));
          expect(inj.get(BindingPropagationConfig)).toEqual(config);
        });
        describe("light DOM", (function() {
          var lightDom,
              parentPreBuiltObjects;
          beforeEach((function() {
            lightDom = new DummyLightDom();
            parentPreBuiltObjects = new PreBuiltObjects(null, null, null, lightDom, null);
          }));
          it("should return destination light DOM from the parent's injector", function() {
            var child = parentChildInjectors([], [], parentPreBuiltObjects);
            expect(child.get(DestinationLightDom)).toEqual(lightDom);
          });
          it("should return null when parent's injector is a component boundary", function() {
            var child = hostShadowInjectors([], [], parentPreBuiltObjects);
            expect(child.get(DestinationLightDom)).toBeNull();
          });
          it("should return source light DOM from the closest component boundary", function() {
            var child = hostShadowInjectors([], [], parentPreBuiltObjects);
            expect(child.get(SourceLightDom)).toEqual(lightDom);
          });
        }));
      });
      describe('event emitters', (function() {
        it('should be injectable and callable', (function() {
          var inj = injector([NeedsEventEmitter]);
          inj.get(NeedsEventEmitter).click();
        }));
        it('should be queryable through hasEventEmitter', (function() {
          var inj = injector([NeedsEventEmitter]);
          expect(inj.hasEventEmitter('click')).toBe(true);
          expect(inj.hasEventEmitter('move')).toBe(false);
        }));
      }));
    });
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
      SpyObject = $__m.SpyObject;
      proxy = $__m.proxy;
    }, function($__m) {
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
      FIELD = $__m.FIELD;
      IMPLEMENTS = $__m.IMPLEMENTS;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
      List = $__m.List;
    }, function($__m) {
      ProtoElementInjector = $__m.ProtoElementInjector;
      PreBuiltObjects = $__m.PreBuiltObjects;
      DirectiveBinding = $__m.DirectiveBinding;
    }, function($__m) {
      Parent = $__m.Parent;
      Ancestor = $__m.Ancestor;
    }, function($__m) {
      EventEmitter = $__m.EventEmitter;
    }, function($__m) {
      onDestroy = $__m.onDestroy;
      Directive = $__m.Directive;
    }, function($__m) {
      Injector = $__m.Injector;
      Inject = $__m.Inject;
      bind = $__m.bind;
    }, function($__m) {
      View = $__m.View;
    }, function($__m) {
      ViewContainer = $__m.ViewContainer;
    }, function($__m) {
      NgElement = $__m.NgElement;
    }, function($__m) {
      LightDom = $__m.LightDom;
      SourceLightDom = $__m.SourceLightDom;
      DestinationLightDom = $__m.DestinationLightDom;
    }, function($__m) {
      BindingPropagationConfig = $__m.BindingPropagationConfig;
    }],
    execute: function() {
      DummyView = (function($__super) {
        var DummyView = function DummyView() {
          $traceurRuntime.superConstructor(DummyView).apply(this, arguments);
        };
        return ($traceurRuntime.createClass)(DummyView, {noSuchMethod: function(m) {
            $traceurRuntime.superGet(this, DummyView.prototype, "noSuchMethod").call(this, m);
          }}, {}, $__super);
      }(SpyObject));
      Object.defineProperty(DummyView, "annotations", {get: function() {
          return [new proxy, new IMPLEMENTS(View)];
        }});
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
      SimpleDirective = (function() {
        var SimpleDirective = function SimpleDirective() {};
        return ($traceurRuntime.createClass)(SimpleDirective, {}, {});
      }());
      SomeOtherDirective = (function() {
        var SomeOtherDirective = function SomeOtherDirective() {};
        return ($traceurRuntime.createClass)(SomeOtherDirective, {}, {});
      }());
      NeedsDirective = (function() {
        var NeedsDirective = function NeedsDirective(dependency) {
          assert.argumentTypes(dependency, SimpleDirective);
          this.dependency = dependency;
        };
        return ($traceurRuntime.createClass)(NeedsDirective, {}, {});
      }());
      Object.defineProperty(NeedsDirective, "parameters", {get: function() {
          return [[SimpleDirective]];
        }});
      NeedDirectiveFromParent = (function() {
        var NeedDirectiveFromParent = function NeedDirectiveFromParent(dependency) {
          assert.argumentTypes(dependency, SimpleDirective);
          this.dependency = dependency;
        };
        return ($traceurRuntime.createClass)(NeedDirectiveFromParent, {}, {});
      }());
      Object.defineProperty(NeedDirectiveFromParent, "parameters", {get: function() {
          return [[SimpleDirective, new Parent()]];
        }});
      NeedDirectiveFromAncestor = (function() {
        var NeedDirectiveFromAncestor = function NeedDirectiveFromAncestor(dependency) {
          assert.argumentTypes(dependency, SimpleDirective);
          this.dependency = dependency;
        };
        return ($traceurRuntime.createClass)(NeedDirectiveFromAncestor, {}, {});
      }());
      Object.defineProperty(NeedDirectiveFromAncestor, "parameters", {get: function() {
          return [[SimpleDirective, new Ancestor()]];
        }});
      NeedsService = (function() {
        var NeedsService = function NeedsService(service) {
          this.service = service;
        };
        return ($traceurRuntime.createClass)(NeedsService, {}, {});
      }());
      Object.defineProperty(NeedsService, "parameters", {get: function() {
          return [[new Inject("service")]];
        }});
      NeedsEventEmitter = (function() {
        var NeedsEventEmitter = function NeedsEventEmitter(clickEmitter) {
          assert.argumentTypes(clickEmitter, Function);
          this.clickEmitter = clickEmitter;
        };
        return ($traceurRuntime.createClass)(NeedsEventEmitter, {click: function() {
            this.clickEmitter(null);
          }}, {});
      }());
      Object.defineProperty(NeedsEventEmitter, "parameters", {get: function() {
          return [[Function, new EventEmitter('click')]];
        }});
      A_Needs_B = (function() {
        var A_Needs_B = function A_Needs_B(dep) {};
        return ($traceurRuntime.createClass)(A_Needs_B, {}, {});
      }());
      B_Needs_A = (function() {
        var B_Needs_A = function B_Needs_A(dep) {};
        return ($traceurRuntime.createClass)(B_Needs_A, {}, {});
      }());
      NeedsView = (function() {
        var NeedsView = function NeedsView(view) {
          this.view = view;
        };
        return ($traceurRuntime.createClass)(NeedsView, {}, {});
      }());
      Object.defineProperty(NeedsView, "parameters", {get: function() {
          return [[new Inject(View)]];
        }});
      DirectiveWithDestroy = (function() {
        var DirectiveWithDestroy = function DirectiveWithDestroy() {
          this.onDestroyCounter = 0;
        };
        return ($traceurRuntime.createClass)(DirectiveWithDestroy, {onDestroy: function() {
            this.onDestroyCounter++;
          }}, {});
      }());
    }
  };
});

//# sourceMappingURL=angular2/test/core/compiler/element_injector_spec.map

//# sourceMappingURL=../../../../angular2/test/core/compiler/element_injector_spec.js.map