System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/facade/lang", "angular2/change_detection", "angular2/src/core/compiler/element_binder", "angular2/src/core/compiler/pipeline/proto_view_builder", "angular2/src/core/compiler/pipeline/compile_pipeline", "angular2/src/core/compiler/pipeline/compile_element", "angular2/src/core/compiler/pipeline/compile_step", "angular2/src/core/compiler/pipeline/compile_control", "angular2/src/core/compiler/shadow_dom_strategy", "angular2/src/facade/dom", "angular2/src/facade/collection"], function($__export) {
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
      dynamicChangeDetection,
      ElementBinder,
      ProtoViewBuilder,
      CompilePipeline,
      CompileElement,
      CompileStep,
      CompileControl,
      NativeShadowDomStrategy,
      DOM,
      MapWrapper,
      MockStep;
  function main() {
    describe('ProtoViewBuilder', (function() {
      function createPipeline() {
        var variableBindings = arguments[0] !== (void 0) ? arguments[0] : null;
        return new CompilePipeline([new MockStep((function(parent, current, control) {
          if (isPresent(current.element.getAttribute('viewroot'))) {
            current.isViewRoot = true;
          }
          if (isPresent(current.element.getAttribute('var-binding'))) {
            current.variableBindings = MapWrapper.createFromStringMap(variableBindings);
          }
          current.inheritedElementBinder = new ElementBinder(null, null, null);
        })), new ProtoViewBuilder(dynamicChangeDetection, new NativeShadowDomStrategy())]);
      }
      it('should not create a ProtoView when the isViewRoot flag is not set', (function() {
        var results = createPipeline().process(el('<div></div>'));
        expect(results[0].inheritedProtoView).toBe(null);
      }));
      it('should create a ProtoView when the isViewRoot flag is set', (function() {
        var viewRootElement = el('<div viewroot></div>');
        var results = createPipeline().process(viewRootElement);
        expect(results[0].inheritedProtoView.element).toBe(viewRootElement);
      }));
      it('should inherit the ProtoView down to children that have no isViewRoot set', (function() {
        var viewRootElement = el('<div viewroot><span></span></div>');
        var results = createPipeline().process(viewRootElement);
        expect(results[0].inheritedProtoView.element).toBe(viewRootElement);
        expect(results[1].inheritedProtoView.element).toBe(viewRootElement);
      }));
      it('should save ProtoView into the elementBinder of parent element', (function() {
        var element = el('<div viewroot><template><a viewroot></a></template></div>');
        var results = createPipeline().process(element);
        expect(results[1].inheritedElementBinder.nestedProtoView).toBe(results[2].inheritedProtoView);
      }));
      it('should bind variables to the nested ProtoView', (function() {
        var element = el('<div viewroot><template var-binding><a viewroot></a></template></div>');
        var results = createPipeline({
          'var1': 'map1',
          'var2': 'map2'
        }).process(element);
        var npv = results[1].inheritedElementBinder.nestedProtoView;
        expect(npv.variableBindings).toEqual(MapWrapper.createFromStringMap({
          'var1': 'map1',
          'var2': 'map2'
        }));
      }));
      it('should mark variables in the proto view context locals', (function() {
        var element = el('<div viewroot><p var-binding></p></div>');
        var results = createPipeline({
          'var1': 'map1',
          'var2': 'map2'
        }).process(element);
        var protoView = results[0].inheritedProtoView;
        expect(protoView.protoContextLocals).toEqual(MapWrapper.createFromStringMap({
          'map2': null,
          'map1': null
        }));
      }));
      describe('errors', (function() {
        it('should not allow multiple nested ProtoViews for the same parent element', (function() {
          var element = el('<div viewroot><template><a viewroot></a><a viewroot></a></template></div>');
          expect((function() {
            createPipeline().process(element);
          })).toThrowError('Only one nested view per element is allowed');
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
    }, function($__m) {
      dynamicChangeDetection = $__m.dynamicChangeDetection;
    }, function($__m) {
      ElementBinder = $__m.ElementBinder;
    }, function($__m) {
      ProtoViewBuilder = $__m.ProtoViewBuilder;
    }, function($__m) {
      CompilePipeline = $__m.CompilePipeline;
    }, function($__m) {
      CompileElement = $__m.CompileElement;
    }, function($__m) {
      CompileStep = $__m.CompileStep;
    }, function($__m) {
      CompileControl = $__m.CompileControl;
    }, function($__m) {
      NativeShadowDomStrategy = $__m.NativeShadowDomStrategy;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      MapWrapper = $__m.MapWrapper;
    }],
    execute: function() {
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
    }
  };
});

//# sourceMappingURL=angular2/test/core/compiler/pipeline/proto_view_builder_spec.map

//# sourceMappingURL=../../../../../angular2/test/core/compiler/pipeline/proto_view_builder_spec.js.map