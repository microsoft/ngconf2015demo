System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/facade/dom", "angular2/src/facade/collection", "angular2/src/facade/lang", "angular2/di", "angular2/change_detection", "angular2/src/core/compiler/compiler", "angular2/src/core/compiler/directive_metadata_reader", "angular2/src/core/compiler/shadow_dom_strategy", "angular2/src/core/annotations/annotations", "angular2/src/core/annotations/template", "angular2/core", "angular2/src/core/compiler/template_resolver", "angular2/src/directives/switch"], function($__export) {
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
      DOM,
      Map,
      MapWrapper,
      Type,
      isPresent,
      Injector,
      Lexer,
      Parser,
      dynamicChangeDetection,
      Compiler,
      CompilerCache,
      DirectiveMetadataReader,
      NativeShadowDomStrategy,
      Component,
      Template,
      TemplateLoader,
      TemplateResolver,
      Switch,
      SwitchWhen,
      SwitchDefault,
      TestComponent,
      FakeTemplateResolver;
  function main() {
    describe('switch', (function() {
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
          directives: [Switch, SwitchWhen, SwitchDefault]
        });
        tplResolver.setTemplate(TestComponent, template);
        return compiler.compile(TestComponent);
      }
      describe('switch value changes', (function() {
        it('should switch amongst when values', (function(done) {
          var template = '<div>' + '<ul [switch]="switchValue">' + '<template [switch-when]="\'a\'"><li>when a</li></template>' + '<template [switch-when]="\'b\'"><li>when b</li></template>' + '</ul></div>';
          compileWithTemplate(template).then((function(pv) {
            createView(pv);
            cd.detectChanges();
            expect(DOM.getText(view.nodes[0])).toEqual('');
            component.switchValue = 'a';
            cd.detectChanges();
            expect(DOM.getText(view.nodes[0])).toEqual('when a');
            component.switchValue = 'b';
            cd.detectChanges();
            expect(DOM.getText(view.nodes[0])).toEqual('when b');
            done();
          }));
        }));
        it('should switch amongst when values with fallback to default', (function(done) {
          var template = '<div>' + '<ul [switch]="switchValue">' + '<li template="switch-when \'a\'">when a</li>' + '<li template="switch-default">when default</li>' + '</ul></div>';
          compileWithTemplate(template).then((function(pv) {
            createView(pv);
            cd.detectChanges();
            expect(DOM.getText(view.nodes[0])).toEqual('when default');
            component.switchValue = 'a';
            cd.detectChanges();
            expect(DOM.getText(view.nodes[0])).toEqual('when a');
            component.switchValue = 'b';
            cd.detectChanges();
            expect(DOM.getText(view.nodes[0])).toEqual('when default');
            done();
          }));
        }));
        it('should support multiple whens with the same value', (function(done) {
          var template = '<div>' + '<ul [switch]="switchValue">' + '<template [switch-when]="\'a\'"><li>when a1;</li></template>' + '<template [switch-when]="\'b\'"><li>when b1;</li></template>' + '<template [switch-when]="\'a\'"><li>when a2;</li></template>' + '<template [switch-when]="\'b\'"><li>when b2;</li></template>' + '<template [switch-default]><li>when default1;</li></template>' + '<template [switch-default]><li>when default2;</li></template>' + '</ul></div>';
          compileWithTemplate(template).then((function(pv) {
            createView(pv);
            cd.detectChanges();
            expect(DOM.getText(view.nodes[0])).toEqual('when default1;when default2;');
            component.switchValue = 'a';
            cd.detectChanges();
            expect(DOM.getText(view.nodes[0])).toEqual('when a1;when a2;');
            component.switchValue = 'b';
            cd.detectChanges();
            expect(DOM.getText(view.nodes[0])).toEqual('when b1;when b2;');
            done();
          }));
        }));
      }));
      describe('when values changes', (function() {
        it('should switch amongst when values', (function(done) {
          var template = '<div>' + '<ul [switch]="switchValue">' + '<template [switch-when]="when1"><li>when 1;</li></template>' + '<template [switch-when]="when2"><li>when 2;</li></template>' + '<template [switch-default]><li>when default;</li></template>' + '</ul></div>';
          compileWithTemplate(template).then((function(pv) {
            createView(pv);
            component.when1 = 'a';
            component.when2 = 'b';
            component.switchValue = 'a';
            cd.detectChanges();
            expect(DOM.getText(view.nodes[0])).toEqual('when 1;');
            component.switchValue = 'b';
            cd.detectChanges();
            expect(DOM.getText(view.nodes[0])).toEqual('when 2;');
            component.switchValue = 'c';
            cd.detectChanges();
            expect(DOM.getText(view.nodes[0])).toEqual('when default;');
            component.when1 = 'c';
            cd.detectChanges();
            expect(DOM.getText(view.nodes[0])).toEqual('when 1;');
            component.when1 = 'd';
            cd.detectChanges();
            expect(DOM.getText(view.nodes[0])).toEqual('when default;');
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
      describe = $__m.describe;
      xit = $__m.xit;
      it = $__m.it;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
      ddescribe = $__m.ddescribe;
      iit = $__m.iit;
      el = $__m.el;
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
      dynamicChangeDetection = $__m.dynamicChangeDetection;
    }, function($__m) {
      Compiler = $__m.Compiler;
      CompilerCache = $__m.CompilerCache;
    }, function($__m) {
      DirectiveMetadataReader = $__m.DirectiveMetadataReader;
    }, function($__m) {
      NativeShadowDomStrategy = $__m.NativeShadowDomStrategy;
    }, function($__m) {
      Component = $__m.Component;
    }, function($__m) {
      Template = $__m.Template;
    }, function($__m) {
      TemplateLoader = $__m.TemplateLoader;
    }, function($__m) {
      TemplateResolver = $__m.TemplateResolver;
    }, function($__m) {
      Switch = $__m.Switch;
      SwitchWhen = $__m.SwitchWhen;
      SwitchDefault = $__m.SwitchDefault;
    }],
    execute: function() {
      TestComponent = (function() {
        var TestComponent = function TestComponent() {
          this.switchValue = null;
          this.when1 = null;
          this.when2 = null;
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

//# sourceMappingURL=angular2/test/directives/switch_spec.map

//# sourceMappingURL=../../../angular2/test/directives/switch_spec.js.map