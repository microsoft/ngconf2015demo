System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/change_detection", "angular2/src/core/compiler/compiler", "angular2/src/core/compiler/directive_metadata_reader", "angular2/src/core/compiler/shadow_dom_strategy", "angular2/src/core/compiler/template_loader", "angular2/src/core/compiler/template_resolver", "angular2/di", "angular2/src/facade/collection", "angular2/src/facade/lang", "angular2/core", "angular2/forms"], function($__export) {
  "use strict";
  var assert,
      ddescribe,
      describe,
      it,
      iit,
      xit,
      expect,
      beforeEach,
      afterEach,
      el,
      queryView,
      dispatchEvent,
      Lexer,
      Parser,
      ChangeDetector,
      dynamicChangeDetection,
      Compiler,
      CompilerCache,
      DirectiveMetadataReader,
      NativeShadowDomStrategy,
      TemplateLoader,
      TemplateResolver,
      Injector,
      Map,
      MapWrapper,
      Type,
      isPresent,
      Component,
      Decorator,
      Template,
      ControlGroupDirective,
      ControlNameDirective,
      ControlDirective,
      NewControlGroupDirective,
      Control,
      ControlGroup,
      ControlValueAccessor,
      MyComp,
      WrappedValueAccessor,
      WrappedValue,
      FakeTemplateResolver;
  function main() {
    function detectChanges(view) {
      view.changeDetector.detectChanges();
    }
    function compile(componentType, template, context, callback) {
      var tplResolver = new FakeTemplateResolver();
      var compiler = new Compiler(dynamicChangeDetection, new TemplateLoader(null), new DirectiveMetadataReader(), new Parser(new Lexer()), new CompilerCache(), new NativeShadowDomStrategy(), tplResolver);
      tplResolver.setTemplate(componentType, new Template({
        inline: template,
        directives: [ControlGroupDirective, ControlNameDirective, ControlDirective, NewControlGroupDirective, WrappedValue]
      }));
      compiler.compile(componentType).then((function(pv) {
        var view = pv.instantiate(null, null);
        view.hydrate(new Injector([]), null, context);
        detectChanges(view);
        callback(view);
      }));
    }
    describe("integration tests", (function() {
      it("should initialize DOM elements with the given form object", (function(done) {
        var ctx = new MyComp(new ControlGroup({"login": new Control("loginValue")}));
        var t = "<div [control-group]=\"form\">\n                <input type=\"text\" control-name=\"login\">\n              </div>";
        compile(MyComp, t, ctx, (function(view) {
          var input = queryView(view, "input");
          expect(input.value).toEqual("loginValue");
          done();
        }));
      }));
      it("should update the control group values on DOM change", (function(done) {
        var form = new ControlGroup({"login": new Control("oldValue")});
        var ctx = new MyComp(form);
        var t = "<div [control-group]=\"form\">\n                <input type=\"text\" control-name=\"login\">\n              </div>";
        compile(MyComp, t, ctx, (function(view) {
          var input = queryView(view, "input");
          input.value = "updatedValue";
          dispatchEvent(input, "change");
          expect(form.value).toEqual({"login": "updatedValue"});
          done();
        }));
      }));
      it("should update DOM elements when rebinding the control group", (function(done) {
        var form = new ControlGroup({"login": new Control("oldValue")});
        var ctx = new MyComp(form);
        var t = "<div [control-group]=\"form\">\n                <input type=\"text\" control-name=\"login\">\n              </div>";
        compile(MyComp, t, ctx, (function(view) {
          ctx.form = new ControlGroup({"login": new Control("newValue")});
          detectChanges(view);
          var input = queryView(view, "input");
          expect(input.value).toEqual("newValue");
          done();
        }));
      }));
      it("should update DOM element when rebinding the control name", (function(done) {
        var ctx = new MyComp(new ControlGroup({
          "one": new Control("one"),
          "two": new Control("two")
        }), "one");
        var t = "<div [control-group]=\"form\">\n                <input type=\"text\" [control-name]=\"name\">\n              </div>";
        compile(MyComp, t, ctx, (function(view) {
          var input = queryView(view, "input");
          expect(input.value).toEqual("one");
          ctx.name = "two";
          detectChanges(view);
          expect(input.value).toEqual("two");
          done();
        }));
      }));
      describe("different control types", (function() {
        it("should support type=checkbox", (function(done) {
          var ctx = new MyComp(new ControlGroup({"checkbox": new Control(true)}));
          var t = "<div [control-group]=\"form\">\n                  <input type=\"checkbox\" control-name=\"checkbox\">\n                </div>";
          compile(MyComp, t, ctx, (function(view) {
            var input = queryView(view, "input");
            expect(input.checked).toBe(true);
            input.checked = false;
            dispatchEvent(input, "change");
            expect(ctx.form.value).toEqual({"checkbox": false});
            done();
          }));
        }));
        it("should support custom value accessors", (function(done) {
          var ctx = new MyComp(new ControlGroup({"name": new Control("aa")}));
          var t = "<div [control-group]=\"form\">\n                  <input type=\"text\" control-name=\"name\" wrapped-value>\n                </div>";
          compile(MyComp, t, ctx, (function(view) {
            var input = queryView(view, "input");
            expect(input.value).toEqual("!aa!");
            input.value = "!bb!";
            dispatchEvent(input, "change");
            expect(ctx.form.value).toEqual({"name": "bb"});
            done();
          }));
        }));
      }));
      describe("declarative forms", (function() {
        it("should initialize dom elements", (function(done) {
          var t = "<div [new-control-group]=\"{'login': 'loginValue', 'password':'passValue'}\">\n                  <input type=\"text\" id=\"login\" control=\"login\">\n                  <input type=\"password\" id=\"password\" control=\"password\">\n                </div>";
          compile(MyComp, t, new MyComp(), (function(view) {
            var loginInput = queryView(view, "#login");
            expect(loginInput.value).toEqual("loginValue");
            var passInput = queryView(view, "#password");
            expect(passInput.value).toEqual("passValue");
            done();
          }));
        }));
        it("should update the control group values on DOM change", (function(done) {
          var t = "<div #form [new-control-group]=\"{'login': 'loginValue'}\">\n                  <input type=\"text\" control=\"login\">\n                </div>";
          compile(MyComp, t, new MyComp(), (function(view) {
            var input = queryView(view, "input");
            input.value = "updatedValue";
            dispatchEvent(input, "change");
            var form = view.contextWithLocals.get("form");
            expect(form.value).toEqual({'login': 'updatedValue'});
            done();
          }));
        }));
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      ddescribe = $__m.ddescribe;
      describe = $__m.describe;
      it = $__m.it;
      iit = $__m.iit;
      xit = $__m.xit;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
      afterEach = $__m.afterEach;
      el = $__m.el;
      queryView = $__m.queryView;
      dispatchEvent = $__m.dispatchEvent;
    }, function($__m) {
      Lexer = $__m.Lexer;
      Parser = $__m.Parser;
      ChangeDetector = $__m.ChangeDetector;
      dynamicChangeDetection = $__m.dynamicChangeDetection;
    }, function($__m) {
      Compiler = $__m.Compiler;
      CompilerCache = $__m.CompilerCache;
    }, function($__m) {
      DirectiveMetadataReader = $__m.DirectiveMetadataReader;
    }, function($__m) {
      NativeShadowDomStrategy = $__m.NativeShadowDomStrategy;
    }, function($__m) {
      TemplateLoader = $__m.TemplateLoader;
    }, function($__m) {
      TemplateResolver = $__m.TemplateResolver;
    }, function($__m) {
      Injector = $__m.Injector;
    }, function($__m) {
      Map = $__m.Map;
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      Type = $__m.Type;
      isPresent = $__m.isPresent;
    }, function($__m) {
      Component = $__m.Component;
      Decorator = $__m.Decorator;
      Template = $__m.Template;
    }, function($__m) {
      ControlGroupDirective = $__m.ControlGroupDirective;
      ControlNameDirective = $__m.ControlNameDirective;
      ControlDirective = $__m.ControlDirective;
      NewControlGroupDirective = $__m.NewControlGroupDirective;
      Control = $__m.Control;
      ControlGroup = $__m.ControlGroup;
      ControlValueAccessor = $__m.ControlValueAccessor;
    }],
    execute: function() {
      MyComp = (function() {
        var MyComp = function MyComp() {
          var form = arguments[0] !== (void 0) ? arguments[0] : null;
          var name = arguments[1] !== (void 0) ? arguments[1] : null;
          this.form = form;
          this.name = name;
        };
        return ($traceurRuntime.createClass)(MyComp, {}, {});
      }());
      Object.defineProperty(MyComp, "annotations", {get: function() {
          return [new Component({selector: "my-comp"})];
        }});
      WrappedValueAccessor = (function($__super) {
        var WrappedValueAccessor = function WrappedValueAccessor() {
          $traceurRuntime.superConstructor(WrappedValueAccessor).apply(this, arguments);
        };
        return ($traceurRuntime.createClass)(WrappedValueAccessor, {
          readValue: function(el) {
            return el.value.substring(1, el.value.length - 1);
          },
          writeValue: function(el, value) {
            el.value = ("!" + value + "!");
          }
        }, {}, $__super);
      }(ControlValueAccessor));
      WrappedValue = (function() {
        var WrappedValue = function WrappedValue(cd) {
          assert.argumentTypes(cd, ControlNameDirective);
          cd.valueAccessor = new WrappedValueAccessor();
        };
        return ($traceurRuntime.createClass)(WrappedValue, {}, {});
      }());
      Object.defineProperty(WrappedValue, "annotations", {get: function() {
          return [new Decorator({selector: '[wrapped-value]'})];
        }});
      Object.defineProperty(WrappedValue, "parameters", {get: function() {
          return [[ControlNameDirective]];
        }});
      FakeTemplateResolver = (function($__super) {
        var FakeTemplateResolver = function FakeTemplateResolver() {
          $traceurRuntime.superConstructor(FakeTemplateResolver).call(this);
          this._cmpTemplates = MapWrapper.create();
        };
        return ($traceurRuntime.createClass)(FakeTemplateResolver, {
          setTemplate: function(component, template) {
            assert.argumentTypes(component, Type, template, Template);
            MapWrapper.set(this._cmpTemplates, component, template);
          },
          resolve: function(component) {
            assert.argumentTypes(component, Type);
            var override = MapWrapper.get(this._cmpTemplates, component);
            if (isPresent(override)) {
              return assert.returnType((override), Template);
            }
            return assert.returnType(($traceurRuntime.superGet(this, FakeTemplateResolver.prototype, "resolve").call(this, component)), Template);
          }
        }, {}, $__super);
      }(TemplateResolver));
      Object.defineProperty(FakeTemplateResolver.prototype.setTemplate, "parameters", {get: function() {
          return [[Type], [Template]];
        }});
      Object.defineProperty(FakeTemplateResolver.prototype.resolve, "parameters", {get: function() {
          return [[Type]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/test/forms/integration_spec.map

//# sourceMappingURL=../../../angular2/test/forms/integration_spec.js.map