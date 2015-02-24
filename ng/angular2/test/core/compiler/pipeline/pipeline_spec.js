System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/facade/collection", "angular2/src/facade/dom", "angular2/src/facade/lang", "angular2/src/core/compiler/pipeline/compile_pipeline", "angular2/src/core/compiler/pipeline/compile_element", "angular2/src/core/compiler/pipeline/compile_step", "angular2/src/core/compiler/pipeline/compile_control"], function($__export) {
  "use strict";
  var assert,
      describe,
      beforeEach,
      it,
      expect,
      iit,
      ddescribe,
      el,
      ListWrapper,
      List,
      MapWrapper,
      DOM,
      isPresent,
      NumberWrapper,
      StringWrapper,
      CompilePipeline,
      CompileElement,
      CompileStep,
      CompileControl,
      MockStep,
      IgnoreChildrenStep;
  function main() {
    describe('compile_pipeline', (function() {
      describe('children compilation', (function() {
        it('should walk the tree in depth first order including template contents', (function() {
          var element = el('<div id="1"><template id="2"><span id="3"></span></template></div>');
          var step0Log = [];
          var results = new CompilePipeline([createLoggerStep(step0Log)]).process(element);
          expect(step0Log).toEqual(['1', '1<2', '2<3']);
          expect(resultIdLog(results)).toEqual(['1', '2', '3']);
        }));
        it('should stop walking the tree when compileChildren is false', (function() {
          var element = el('<div id="1"><template id="2" ignore-children><span id="3"></span></template></div>');
          var step0Log = [];
          var pipeline = new CompilePipeline([new IgnoreChildrenStep(), createLoggerStep(step0Log)]);
          var results = pipeline.process(element);
          expect(step0Log).toEqual(['1', '1<2']);
          expect(resultIdLog(results)).toEqual(['1', '2']);
        }));
      }));
      describe('control.addParent', (function() {
        it('should report the new parent to the following processor and the result', (function() {
          var element = el('<div id="1"><span wrap0="1" id="2"><b id="3"></b></span></div>');
          var step0Log = [];
          var step1Log = [];
          var pipeline = new CompilePipeline([createWrapperStep('wrap0', step0Log), createLoggerStep(step1Log)]);
          var result = pipeline.process(element);
          expect(step0Log).toEqual(['1', '1<2', '2<3']);
          expect(step1Log).toEqual(['1', '1<wrap0#0', 'wrap0#0<2', '2<3']);
          expect(resultIdLog(result)).toEqual(['1', 'wrap0#0', '2', '3']);
        }));
        it('should allow to add a parent by multiple processors to the same element', (function() {
          var element = el('<div id="1"><span wrap0="1" wrap1="1" id="2"><b id="3"></b></span></div>');
          var step0Log = [];
          var step1Log = [];
          var step2Log = [];
          var pipeline = new CompilePipeline([createWrapperStep('wrap0', step0Log), createWrapperStep('wrap1', step1Log), createLoggerStep(step2Log)]);
          var result = pipeline.process(element);
          expect(step0Log).toEqual(['1', '1<2', '2<3']);
          expect(step1Log).toEqual(['1', '1<wrap0#0', 'wrap0#0<2', '2<3']);
          expect(step2Log).toEqual(['1', '1<wrap0#0', 'wrap0#0<wrap1#0', 'wrap1#0<2', '2<3']);
          expect(resultIdLog(result)).toEqual(['1', 'wrap0#0', 'wrap1#0', '2', '3']);
        }));
        it('should allow to add a parent by multiple processors to different elements', (function() {
          var element = el('<div id="1"><span wrap0="1" id="2"><b id="3" wrap1="1"></b></span></div>');
          var step0Log = [];
          var step1Log = [];
          var step2Log = [];
          var pipeline = new CompilePipeline([createWrapperStep('wrap0', step0Log), createWrapperStep('wrap1', step1Log), createLoggerStep(step2Log)]);
          var result = pipeline.process(element);
          expect(step0Log).toEqual(['1', '1<2', '2<3']);
          expect(step1Log).toEqual(['1', '1<wrap0#0', 'wrap0#0<2', '2<3']);
          expect(step2Log).toEqual(['1', '1<wrap0#0', 'wrap0#0<2', '2<wrap1#0', 'wrap1#0<3']);
          expect(resultIdLog(result)).toEqual(['1', 'wrap0#0', '2', 'wrap1#0', '3']);
        }));
        it('should allow to add multiple parents by the same processor', (function() {
          var element = el('<div id="1"><span wrap0="2" id="2"><b id="3"></b></span></div>');
          var step0Log = [];
          var step1Log = [];
          var pipeline = new CompilePipeline([createWrapperStep('wrap0', step0Log), createLoggerStep(step1Log)]);
          var result = pipeline.process(element);
          expect(step0Log).toEqual(['1', '1<2', '2<3']);
          expect(step1Log).toEqual(['1', '1<wrap0#0', 'wrap0#0<wrap0#1', 'wrap0#1<2', '2<3']);
          expect(resultIdLog(result)).toEqual(['1', 'wrap0#0', 'wrap0#1', '2', '3']);
        }));
      }));
      describe('control.addChild', (function() {
        it('should report the new child to all processors and the result', (function() {
          var element = el('<div id="1"><div id="2"></div></div>');
          var resultLog = [];
          var newChild = new CompileElement(el('<div id="3"></div>'));
          var pipeline = new CompilePipeline([new MockStep((function(parent, current, control) {
            if (StringWrapper.equals(current.element.id, '1')) {
              control.addChild(newChild);
            }
          })), createLoggerStep(resultLog)]);
          var result = pipeline.process(element);
          expect(result[2]).toBe(newChild);
          expect(resultLog).toEqual(['1', '1<2', '1<3']);
          expect(resultIdLog(result)).toEqual(['1', '2', '3']);
        }));
      }));
    }));
  }
  function logEntry(log, parent, current) {
    var parentId = '';
    if (isPresent(parent)) {
      parentId = parent.element.getAttribute('id') + '<';
    }
    ListWrapper.push(log, parentId + current.element.getAttribute('id'));
  }
  function createLoggerStep(log) {
    return new MockStep((function(parent, current, control) {
      logEntry(log, parent, current);
    }));
  }
  function createWrapperStep(wrapperId, log) {
    var nextElementId = 0;
    return new MockStep((function(parent, current, control) {
      var parentCountStr = current.element.getAttribute(wrapperId);
      if (isPresent(parentCountStr)) {
        var parentCount = NumberWrapper.parseInt(parentCountStr, 10);
        while (parentCount > 0) {
          control.addParent(new CompileElement(el(("<a id=\"" + wrapperId + "#" + nextElementId++ + "\"></a>"))));
          parentCount--;
        }
      }
      logEntry(log, parent, current);
    }));
  }
  function resultIdLog(result) {
    var idLog = [];
    ListWrapper.forEach(result, (function(current) {
      logEntry(idLog, null, current);
    }));
    return idLog;
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
      ListWrapper = $__m.ListWrapper;
      List = $__m.List;
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      isPresent = $__m.isPresent;
      NumberWrapper = $__m.NumberWrapper;
      StringWrapper = $__m.StringWrapper;
    }, function($__m) {
      CompilePipeline = $__m.CompilePipeline;
    }, function($__m) {
      CompileElement = $__m.CompileElement;
    }, function($__m) {
      CompileStep = $__m.CompileStep;
    }, function($__m) {
      CompileControl = $__m.CompileControl;
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
      IgnoreChildrenStep = $__export("IgnoreChildrenStep", (function($__super) {
        var IgnoreChildrenStep = function IgnoreChildrenStep() {
          $traceurRuntime.superConstructor(IgnoreChildrenStep).apply(this, arguments);
        };
        return ($traceurRuntime.createClass)(IgnoreChildrenStep, {process: function(parent, current, control) {
            assert.argumentTypes(parent, CompileElement, current, CompileElement, control, CompileControl);
            var attributeMap = DOM.attributeMap(current.element);
            if (MapWrapper.contains(attributeMap, 'ignore-children')) {
              current.compileChildren = false;
            }
          }}, {}, $__super);
      }(CompileStep)));
      Object.defineProperty(IgnoreChildrenStep.prototype.process, "parameters", {get: function() {
          return [[CompileElement], [CompileElement], [CompileControl]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/test/core/compiler/pipeline/pipeline_spec.map

//# sourceMappingURL=../../../../../angular2/test/core/compiler/pipeline/pipeline_spec.js.map