System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/facade/dom", "angular2/src/facade/collection", "angular2/src/facade/lang", "angular2/di", "angular2/change_detection", "angular2/src/core/compiler/compiler", "angular2/src/core/compiler/directive_metadata_reader", "angular2/src/core/compiler/shadow_dom_strategy", "angular2/src/core/compiler/template_loader", "angular2/src/core/compiler/template_resolver", "angular2/src/core/annotations/annotations", "angular2/src/core/annotations/template", "angular2/src/directives/if"], function($__export) {
  "use strict";
  var assert,
      describe,
      xit,
      it,
      expect,
      beforeEach,
      ddescribe,
      iit,
      el,
      IS_DARTIUM,
      DOM,
      Map,
      MapWrapper,
      Type,
      isPresent,
      Injector,
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
      Component,
      Template,
      If,
      TestComponent,
      FakeTemplateResolver;
  function main() {
    describe('if directive', (function() {
      var view,
          cd,
          compiler,
          component,
          tplResolver;
      beforeEach((function() {
        tplResolver = new FakeTemplateResolver();
        compiler = new Compiler(dynamicChangeDetection, new TemplateLoader(null), new DirectiveMetadataReader(), new Parser(new Lexer()), new CompilerCache(), new NativeShadowDomStrategy(), tplResolver);
      }));
      function createView(pv) {
        component = new TestComponent();
        view = pv.instantiate(null, null);
        view.hydrate(new Injector([]), null, component);
        cd = view.changeDetector;
      }
      function compileWithTemplate(html) {
        var template = new Template({
          inline: html,
          directives: [If]
        });
        tplResolver.setTemplate(TestComponent, template);
        return compiler.compile(TestComponent);
      }
      it('should work in a template attribute', (function(done) {
        compileWithTemplate('<div><copy-me template="if booleanCondition">hello</copy-me></div>').then((function(pv) {
          createView(pv);
          cd.detectChanges();
          expect(view.nodes[0].querySelectorAll('copy-me').length).toEqual(1);
          expect(DOM.getText(view.nodes[0])).toEqual('hello');
          done();
        }));
      }));
      it('should work in a template element', (function(done) {
        compileWithTemplate('<div><template [if]="booleanCondition"><copy-me>hello2</copy-me></template></div>').then((function(pv) {
          createView(pv);
          cd.detectChanges();
          expect(view.nodes[0].querySelectorAll('copy-me').length).toEqual(1);
          expect(DOM.getText(view.nodes[0])).toEqual('hello2');
          done();
        }));
      }));
      it('should toggle node when condition changes', (function(done) {
        compileWithTemplate('<div><copy-me template="if booleanCondition">hello</copy-me></div>').then((function(pv) {
          createView(pv);
          component.booleanCondition = false;
          cd.detectChanges();
          expect(view.nodes[0].querySelectorAll('copy-me').length).toEqual(0);
          expect(DOM.getText(view.nodes[0])).toEqual('');
          component.booleanCondition = true;
          cd.detectChanges();
          expect(view.nodes[0].querySelectorAll('copy-me').length).toEqual(1);
          expect(DOM.getText(view.nodes[0])).toEqual('hello');
          component.booleanCondition = false;
          cd.detectChanges();
          expect(view.nodes[0].querySelectorAll('copy-me').length).toEqual(0);
          expect(DOM.getText(view.nodes[0])).toEqual('');
          done();
        }));
      }));
      it('should update several nodes with if', (function(done) {
        var templateString = '<div>' + '<copy-me template="if numberCondition + 1 >= 2">helloNumber</copy-me>' + '<copy-me template="if stringCondition == \'foo\'">helloString</copy-me>' + '<copy-me template="if functionCondition(stringCondition, numberCondition)">helloFunction</copy-me>' + '</div>';
        compileWithTemplate(templateString).then((function(pv) {
          createView(pv);
          cd.detectChanges();
          expect(view.nodes[0].querySelectorAll('copy-me').length).toEqual(3);
          expect(DOM.getText(view.nodes[0])).toEqual('helloNumberhelloStringhelloFunction');
          component.numberCondition = 0;
          cd.detectChanges();
          expect(view.nodes[0].querySelectorAll('copy-me').length).toEqual(1);
          expect(DOM.getText(view.nodes[0])).toEqual('helloString');
          component.numberCondition = 1;
          component.stringCondition = "bar";
          cd.detectChanges();
          expect(view.nodes[0].querySelectorAll('copy-me').length).toEqual(1);
          expect(DOM.getText(view.nodes[0])).toEqual('helloNumber');
          done();
        }));
      }));
      if (!IS_DARTIUM) {
        it('should leave the element if the condition is a non-empty string (JS)', (function(done) {
          compileWithTemplate('<div><copy-me template="if stringCondition">hello</copy-me></div>').then((function(pv) {
            createView(pv);
            cd.detectChanges();
            expect(view.nodes[0].querySelectorAll('copy-me').length).toEqual(1);
            expect(DOM.getText(view.nodes[0])).toEqual('hello');
            done();
          }));
        }));
        it('should leave the element if the condition is an object (JS)', (function(done) {
          compileWithTemplate('<div><copy-me template="if objectCondition">hello</copy-me></div>').then((function(pv) {
            createView(pv);
            cd.detectChanges();
            expect(view.nodes[0].querySelectorAll('copy-me').length).toEqual(1);
            expect(DOM.getText(view.nodes[0])).toEqual('hello');
            done();
          }));
        }));
        it('should remove the element if the condition is null (JS)', (function(done) {
          compileWithTemplate('<div><copy-me template="if nullCondition">hello</copy-me></div>').then((function(pv) {
            createView(pv);
            cd.detectChanges();
            expect(view.nodes[0].querySelectorAll('copy-me').length).toEqual(0);
            expect(DOM.getText(view.nodes[0])).toEqual('');
            done();
          }));
        }));
        it('should not add the element twice if the condition goes from true to true (JS)', (function(done) {
          compileWithTemplate('<div><copy-me template="if numberCondition">hello</copy-me></div>').then((function(pv) {
            createView(pv);
            cd.detectChanges();
            expect(view.nodes[0].querySelectorAll('copy-me').length).toEqual(1);
            expect(DOM.getText(view.nodes[0])).toEqual('hello');
            component.numberCondition = 2;
            cd.detectChanges();
            expect(view.nodes[0].querySelectorAll('copy-me').length).toEqual(1);
            expect(DOM.getText(view.nodes[0])).toEqual('hello');
            done();
          }));
        }));
        it('should not recreate the element if the condition goes from true to true (JS)', (function(done) {
          compileWithTemplate('<div><copy-me template="if numberCondition">hello</copy-me></div>').then((function(pv) {
            createView(pv);
            cd.detectChanges();
            DOM.addClass(view.nodes[0].childNodes[1], "foo");
            component.numberCondition = 2;
            cd.detectChanges();
            expect(DOM.hasClass(view.nodes[0].childNodes[1], "foo")).toBe(true);
            done();
          }));
        }));
      } else {
        it('should not create the element if the condition is not a boolean (DART)', (function(done) {
          compileWithTemplate('<div><copy-me template="if numberCondition">hello</copy-me></div>').then((function(pv) {
            createView(pv);
            expect(function() {
              cd.detectChanges();
            }).toThrowError();
            expect(view.nodes[0].querySelectorAll('copy-me').length).toEqual(0);
            expect(DOM.getText(view.nodes[0])).toEqual('');
            done();
          }));
        }));
      }
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      describe = $__m.describe;
      xit = $__m.xit;
      it = $__m.it;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
      ddescribe = $__m.ddescribe;
      iit = $__m.iit;
      el = $__m.el;
      IS_DARTIUM = $__m.IS_DARTIUM;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      Map = $__m.Map;
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      Type = $__m.Type;
      isPresent = $__m.isPresent;
    }, function($__m) {
      Injector = $__m.Injector;
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
      Component = $__m.Component;
    }, function($__m) {
      Template = $__m.Template;
    }, function($__m) {
      If = $__m.If;
    }],
    execute: function() {
      TestComponent = (function() {
        var TestComponent = function TestComponent() {
          this.booleanCondition = true;
          this.numberCondition = 1;
          this.stringCondition = "foo";
          this.functionCondition = function(s, n) {
            return s == "foo" && n == 1;
          };
          this.objectCondition = {};
          this.nullCondition = null;
        };
        return ($traceurRuntime.createClass)(TestComponent, {}, {});
      }());
      Object.defineProperty(TestComponent, "annotations", {get: function() {
          return [new Component({selector: 'test-cmp'})];
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

//# sourceMappingURL=angular2/test/directives/if_spec.map

//# sourceMappingURL=../../../angular2/test/directives/if_spec.js.map