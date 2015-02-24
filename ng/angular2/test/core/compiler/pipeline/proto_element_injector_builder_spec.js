System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/facade/lang", "angular2/src/facade/dom", "angular2/src/facade/collection", "angular2/src/core/compiler/pipeline/proto_element_injector_builder", "angular2/src/core/compiler/pipeline/compile_pipeline", "angular2/src/core/compiler/pipeline/compile_element", "angular2/src/core/compiler/pipeline/compile_step", "angular2/src/core/compiler/pipeline/compile_control", "angular2/src/core/compiler/view", "angular2/src/core/compiler/directive_metadata_reader", "angular2/src/core/annotations/annotations", "angular2/src/core/compiler/element_injector"], function($__export) {
  "use strict";
  var assert,
      describe,
      beforeEach,
      it,
      expect,
      iit,
      ddescribe,
      el,
      isPresent,
      isBlank,
      DOM,
      List,
      ListWrapper,
      MapWrapper,
      ProtoElementInjectorBuilder,
      CompilePipeline,
      CompileElement,
      CompileStep,
      CompileControl,
      ProtoView,
      DirectiveMetadataReader,
      Viewport,
      Decorator,
      Component,
      ProtoElementInjector,
      TestableProtoElementInjectorBuilder,
      MockStep,
      SomeComponentService,
      SomeViewportDirective,
      SomeComponentDirective,
      SomeDecoratorDirective;
  function main() {
    describe('ProtoElementInjectorBuilder', (function() {
      var protoElementInjectorBuilder,
          protoView;
      beforeEach((function() {
        protoElementInjectorBuilder = new TestableProtoElementInjectorBuilder();
        protoView = new ProtoView(null, null, null);
      }));
      var ELEMENT_WITH_VAR = el('<div var-name></div>');
      var DIRECTIVE_ELEMENT_WITH_VAR = el('<div var-name directives></div>');
      function createPipeline() {
        var directives = arguments[0] !== (void 0) ? arguments[0] : null;
        if (isBlank(directives)) {
          directives = [];
        }
        var reader = new DirectiveMetadataReader();
        return new CompilePipeline([new MockStep((function(parent, current, control) {
          if (isPresent(current.element.getAttribute('viewroot'))) {
            current.isViewRoot = true;
          }
          if (isPresent(current.element.getAttribute('directives'))) {
            for (var i = 0; i < directives.length; i++) {
              var dirMetadata = reader.read(directives[i]);
              current.addDirective(dirMetadata);
            }
          }
          if (isPresent(current.element.getAttribute('var-name'))) {
            current.variableBindings = MapWrapper.create();
            MapWrapper.set(current.variableBindings, '\$implicit', 'name');
          }
          current.inheritedProtoView = protoView;
        })), protoElementInjectorBuilder]);
      }
      function getCreationArgs(protoElementInjector) {
        return protoElementInjectorBuilder.findArgsFor(protoElementInjector);
      }
      it('should not create a ProtoElementInjector for elements without directives or vars', (function() {
        var results = createPipeline().process(el('<div></div>'));
        expect(results[0].inheritedProtoElementInjector).toBe(null);
      }));
      it('should create a ProtoElementInjector for elements with a variable binding', (function() {
        var results = createPipeline().process(ELEMENT_WITH_VAR);
        expect(results[0].inheritedProtoElementInjector).toBeAnInstanceOf(ProtoElementInjector);
      }));
      it('should create a ProtoElementInjector for elements directives', (function() {
        var directives = [SomeComponentDirective, SomeViewportDirective, SomeDecoratorDirective];
        var results = createPipeline(directives).process(el('<div directives></div>'));
        var creationArgs = getCreationArgs(results[0].inheritedProtoElementInjector);
        var boundDirectives = creationArgs['bindings'].map((function(b) {
          return b.key.token;
        }));
        expect(boundDirectives).toEqual(directives);
      }));
      it('should flag the ProtoElementInjector for exporting the component instance when a' + 'component has a var- declaration', (function() {
        var results = createPipeline([SomeComponentDirective]).process(DIRECTIVE_ELEMENT_WITH_VAR);
        expect(results[0].inheritedProtoElementInjector.exportComponent).toBe(true);
        expect(results[0].inheritedProtoElementInjector.exportElement).toBe(false);
      }));
      it('should flag the ProtoElementInjector for exporting the element when a' + 'non-component element has a var- declaration', (function() {
        var results = createPipeline([SomeComponentDirective]).process(ELEMENT_WITH_VAR);
        expect(results[0].inheritedProtoElementInjector.exportComponent).toBe(false);
        expect(results[0].inheritedProtoElementInjector.exportElement).toBe(true);
      }));
      it('should mark ProtoElementInjector for elements with component directives and use the ' + 'ComponentDirective as first binding', (function() {
        var directives = [SomeDecoratorDirective, SomeComponentDirective];
        var results = createPipeline(directives).process(el('<div directives></div>'));
        var creationArgs = getCreationArgs(results[0].inheritedProtoElementInjector);
        expect(creationArgs['firstBindingIsComponent']).toBe(true);
        var boundDirectives = creationArgs['bindings'].map((function(b) {
          return b.key.token;
        }));
        expect(boundDirectives).toEqual([SomeComponentDirective, SomeDecoratorDirective]);
      }));
      it('should use the next ElementBinder index as index of the ProtoElementInjector', (function() {
        ListWrapper.push(protoView.elementBinders, null);
        ListWrapper.push(protoView.elementBinders, null);
        var directives = [SomeDecoratorDirective];
        var results = createPipeline(directives).process(el('<div directives></div>'));
        var creationArgs = getCreationArgs(results[0].inheritedProtoElementInjector);
        expect(creationArgs['index']).toBe(protoView.elementBinders.length);
      }));
      describe("inheritedProtoElementInjector", (function() {
        it('should inherit the ProtoElementInjector down to children without directives', (function() {
          var directives = [SomeDecoratorDirective];
          var results = createPipeline(directives).process(el('<div directives><span></span></div>'));
          expect(results[1].inheritedProtoElementInjector).toBe(results[0].inheritedProtoElementInjector);
        }));
        it('should use the ProtoElementInjector of the parent element as parent', (function() {
          var element = el('<div directives><span><a directives></a></span></div>');
          var directives = [SomeDecoratorDirective];
          var results = createPipeline(directives).process(element);
          expect(results[2].inheritedProtoElementInjector.parent).toBe(results[0].inheritedProtoElementInjector);
        }));
        it('should use a null parent for viewRoots', (function() {
          var element = el('<div directives><span viewroot directives></span></div>');
          var directives = [SomeDecoratorDirective];
          var results = createPipeline(directives).process(element);
          expect(results[1].inheritedProtoElementInjector.parent).toBe(null);
        }));
        it('should use a null parent if there is an intermediate viewRoot', (function() {
          var element = el('<div directives><span viewroot><a directives></a></span></div>');
          var directives = [SomeDecoratorDirective];
          var results = createPipeline(directives).process(element);
          expect(results[2].inheritedProtoElementInjector.parent).toBe(null);
        }));
      }));
      describe("distanceToParentInjector", (function() {
        it("should be 0 for root elements", (function() {
          var element = el('<div directives></div>');
          var directives = [SomeDecoratorDirective];
          var results = createPipeline(directives).process(element);
          expect(results[0].inheritedProtoElementInjector.distanceToParent).toBe(0);
        }));
        it("should be 1 when a parent element has an injector", (function() {
          var element = el('<div directives><span directives></span></div>');
          var directives = [SomeDecoratorDirective];
          var results = createPipeline(directives).process(element);
          expect(results[1].inheritedProtoElementInjector.distanceToParent).toBe(1);
        }));
        it("should add 1 for every element that does not have an injector", (function() {
          var element = el('<div directives><a><b><span directives></span></b></a></div>');
          var directives = [SomeDecoratorDirective];
          var results = createPipeline(directives).process(element);
          expect(results[3].inheritedProtoElementInjector.distanceToParent).toBe(3);
        }));
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      describe = $__m.describe;
      beforeEach = $__m.beforeEach;
      it = $__m.it;
      expect = $__m.expect;
      iit = $__m.iit;
      ddescribe = $__m.ddescribe;
      el = $__m.el;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      ProtoElementInjectorBuilder = $__m.ProtoElementInjectorBuilder;
    }, function($__m) {
      CompilePipeline = $__m.CompilePipeline;
    }, function($__m) {
      CompileElement = $__m.CompileElement;
    }, function($__m) {
      CompileStep = $__m.CompileStep;
    }, function($__m) {
      CompileControl = $__m.CompileControl;
    }, function($__m) {
      ProtoView = $__m.ProtoView;
    }, function($__m) {
      DirectiveMetadataReader = $__m.DirectiveMetadataReader;
    }, function($__m) {
      Viewport = $__m.Viewport;
      Decorator = $__m.Decorator;
      Component = $__m.Component;
    }, function($__m) {
      ProtoElementInjector = $__m.ProtoElementInjector;
    }],
    execute: function() {
      TestableProtoElementInjectorBuilder = (function($__super) {
        var TestableProtoElementInjectorBuilder = function TestableProtoElementInjectorBuilder() {
          $traceurRuntime.superConstructor(TestableProtoElementInjectorBuilder).call(this);
          this.debugObjects = [];
        };
        return ($traceurRuntime.createClass)(TestableProtoElementInjectorBuilder, {
          findArgsFor: function(protoElementInjector) {
            assert.argumentTypes(protoElementInjector, ProtoElementInjector);
            for (var i = 0; i < this.debugObjects.length; i += 2) {
              if (this.debugObjects[i] === protoElementInjector) {
                return this.debugObjects[i + 1];
              }
            }
            return null;
          },
          internalCreateProtoElementInjector: function(parent, index, bindings, firstBindingIsComponent, distance) {
            var result = new ProtoElementInjector(parent, index, bindings, firstBindingIsComponent, distance);
            ListWrapper.push(this.debugObjects, result);
            ListWrapper.push(this.debugObjects, {
              'parent': parent,
              'index': index,
              'bindings': bindings,
              'firstBindingIsComponent': firstBindingIsComponent
            });
            return result;
          }
        }, {}, $__super);
      }(ProtoElementInjectorBuilder));
      Object.defineProperty(TestableProtoElementInjectorBuilder.prototype.findArgsFor, "parameters", {get: function() {
          return [[ProtoElementInjector]];
        }});
      MockStep = (function($__super) {
        var MockStep = function MockStep(process) {
          $traceurRuntime.superConstructor(MockStep).call(this);
          this.processClosure = process;
        };
        return ($traceurRuntime.createClass)(MockStep, {process: function(parent, current, control) {
            assert.argumentTypes(parent, CompileElement, current, CompileElement, control, CompileControl);
            this.processClosure(parent, current, control);
          }}, {}, $__super);
      }(CompileStep));
      Object.defineProperty(MockStep.prototype.process, "parameters", {get: function() {
          return [[CompileElement], [CompileElement], [CompileControl]];
        }});
      SomeComponentService = (function() {
        var SomeComponentService = function SomeComponentService() {};
        return ($traceurRuntime.createClass)(SomeComponentService, {}, {});
      }());
      SomeViewportDirective = (function() {
        var SomeViewportDirective = function SomeViewportDirective() {};
        return ($traceurRuntime.createClass)(SomeViewportDirective, {}, {});
      }());
      Object.defineProperty(SomeViewportDirective, "annotations", {get: function() {
          return [new Viewport()];
        }});
      SomeComponentDirective = (function() {
        var SomeComponentDirective = function SomeComponentDirective() {};
        return ($traceurRuntime.createClass)(SomeComponentDirective, {}, {});
      }());
      Object.defineProperty(SomeComponentDirective, "annotations", {get: function() {
          return [new Component({componentServices: [SomeComponentService]})];
        }});
      SomeDecoratorDirective = (function() {
        var SomeDecoratorDirective = function SomeDecoratorDirective() {};
        return ($traceurRuntime.createClass)(SomeDecoratorDirective, {}, {});
      }());
      Object.defineProperty(SomeDecoratorDirective, "annotations", {get: function() {
          return [new Decorator()];
        }});
    }
  };
});

//# sourceMappingURL=angular2/test/core/compiler/pipeline/proto_element_injector_builder_spec.map

//# sourceMappingURL=../../../../../angular2/test/core/compiler/pipeline/proto_element_injector_builder_spec.js.map