System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/core/compiler/pipeline/property_binding_parser", "angular2/src/core/compiler/pipeline/compile_pipeline", "angular2/src/facade/collection", "angular2/src/core/compiler/pipeline/compile_element", "angular2/src/core/compiler/pipeline/compile_step", "angular2/src/core/compiler/pipeline/compile_control", "angular2/change_detection"], function($__export) {
  "use strict";
  var assert,
      describe,
      beforeEach,
      it,
      expect,
      iit,
      ddescribe,
      el,
      PropertyBindingParser,
      CompilePipeline,
      MapWrapper,
      CompileElement,
      CompileStep,
      CompileControl,
      Lexer,
      Parser,
      MockStep;
  function main() {
    describe('PropertyBindingParser', (function() {
      function createPipeline() {
        var ignoreBindings = arguments[0] !== (void 0) ? arguments[0] : false;
        return new CompilePipeline([new MockStep((function(parent, current, control) {
          current.ignoreBindings = ignoreBindings;
        })), new PropertyBindingParser(new Parser(new Lexer()), null)]);
      }
      it('should not parse bindings when ignoreBindings is true', (function() {
        var results = createPipeline(true).process(el('<div [a]="b"></div>'));
        expect(results[0].propertyBindings).toBe(null);
      }));
      it('should detect [] syntax', (function() {
        var results = createPipeline().process(el('<div [a]="b"></div>'));
        expect(MapWrapper.get(results[0].propertyBindings, 'a').source).toEqual('b');
      }));
      it('should detect bind- syntax', (function() {
        var results = createPipeline().process(el('<div bind-a="b"></div>'));
        expect(MapWrapper.get(results[0].propertyBindings, 'a').source).toEqual('b');
      }));
      it('should detect interpolation syntax', (function() {
        var results = createPipeline().process(el('<div a="{{b}}"></div>'));
        expect(MapWrapper.get(results[0].propertyBindings, 'a').source).toEqual('{{b}}');
      }));
      it('should detect var- syntax', (function() {
        var results = createPipeline().process(el('<template var-a="b"></template>'));
        expect(MapWrapper.get(results[0].variableBindings, 'b')).toEqual('a');
      }));
      it('should store variable binding for a non-template element', (function() {
        var results = createPipeline().process(el('<p var-george="washington"></p>'));
        expect(MapWrapper.get(results[0].variableBindings, 'washington')).toEqual('george');
      }));
      it('should store variable binding for a non-template element using shorthand syntax', (function() {
        var results = createPipeline().process(el('<p #george="washington"></p>'));
        expect(MapWrapper.get(results[0].variableBindings, 'washington')).toEqual('george');
      }));
      it('should store a variable binding with an implicit value', (function() {
        var results = createPipeline().process(el('<p var-george></p>'));
        expect(MapWrapper.get(results[0].variableBindings, '\$implicit')).toEqual('george');
      }));
      it('should store a variable binding with an implicit value using shorthand syntax', (function() {
        var results = createPipeline().process(el('<p #george></p>'));
        expect(MapWrapper.get(results[0].variableBindings, '\$implicit')).toEqual('george');
      }));
      it('should detect () syntax', (function() {
        var results = createPipeline().process(el('<div (click)="b()"></div>'));
        expect(MapWrapper.get(results[0].eventBindings, 'click').source).toEqual('b()');
        results = createPipeline().process(el('<div (click[])="b()"></div>'));
        expect(MapWrapper.get(results[0].eventBindings, 'click[]').source).toEqual('b()');
      }));
      it('should detect on- syntax', (function() {
        var results = createPipeline().process(el('<div on-click="b()"></div>'));
        expect(MapWrapper.get(results[0].eventBindings, 'click').source).toEqual('b()');
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
      PropertyBindingParser = $__m.PropertyBindingParser;
    }, function($__m) {
      CompilePipeline = $__m.CompilePipeline;
    }, function($__m) {
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      CompileElement = $__m.CompileElement;
    }, function($__m) {
      CompileStep = $__m.CompileStep;
    }, function($__m) {
      CompileControl = $__m.CompileControl;
    }, function($__m) {
      Lexer = $__m.Lexer;
      Parser = $__m.Parser;
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

//# sourceMappingURL=angular2/test/core/compiler/pipeline/property_binding_parser_spec.map

//# sourceMappingURL=../../../../../angular2/test/core/compiler/pipeline/property_binding_parser_spec.js.map