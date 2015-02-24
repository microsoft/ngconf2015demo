System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/facade/dom", "angular2/src/facade/collection", "angular2/src/facade/lang", "angular2/di", "angular2/change_detection", "angular2/src/core/compiler/compiler", "angular2/src/core/compiler/directive_metadata_reader", "angular2/src/core/compiler/shadow_dom_strategy", "angular2/src/core/compiler/template_loader", "angular2/src/core/compiler/template_resolver", "angular2/src/core/compiler/binding_propagation_config", "angular2/src/core/annotations/annotations", "angular2/src/core/annotations/template", "angular2/src/core/compiler/view_container"], function($__export) {
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
      ChangeDetector,
      dynamicChangeDetection,
      Compiler,
      CompilerCache,
      DirectiveMetadataReader,
      NativeShadowDomStrategy,
      TemplateLoader,
      TemplateResolver,
      BindingPropagationConfig,
      Decorator,
      Component,
      Viewport,
      Template,
      ViewContainer,
      MyDir,
      PushBasedComp,
      MyComp,
      ChildComp,
      SomeViewport,
      MyService,
      FakeTemplateResolver;
  function main() {
    describe('integration tests', function() {
      var compiler,
          tplResolver;
      beforeEach((function() {
        tplResolver = new FakeTemplateResolver();
        compiler = new Compiler(dynamicChangeDetection, new TemplateLoader(null), new DirectiveMetadataReader(), new Parser(new Lexer()), new CompilerCache(), new NativeShadowDomStrategy(), tplResolver);
      }));
      describe('react to record changes', function() {
        var view,
            ctx,
            cd;
        function createView(pv) {
          ctx = new MyComp();
          view = pv.instantiate(null, null);
          view.hydrate(new Injector([]), null, ctx);
          cd = view.changeDetector;
        }
        it('should consume text node changes', (function(done) {
          tplResolver.setTemplate(MyComp, new Template({inline: '<div>{{ctxProp}}</div>'}));
          compiler.compile(MyComp).then((function(pv) {
            createView(pv);
            ctx.ctxProp = 'Hello World!';
            cd.detectChanges();
            expect(DOM.getInnerHTML(view.nodes[0])).toEqual('Hello World!');
            done();
          }));
        }));
        it('should consume element binding changes', (function(done) {
          tplResolver.setTemplate(MyComp, new Template({inline: '<div [id]="ctxProp"></div>'}));
          compiler.compile(MyComp).then((function(pv) {
            createView(pv);
            ctx.ctxProp = 'Hello World!';
            cd.detectChanges();
            expect(view.nodes[0].id).toEqual('Hello World!');
            done();
          }));
        }));
        it('should consume binding to aria-* attributes', (function(done) {
          tplResolver.setTemplate(MyComp, new Template({inline: '<div [aria-label]="ctxProp"></div>'}));
          compiler.compile(MyComp).then((function(pv) {
            createView(pv);
            ctx.ctxProp = 'Initial aria label';
            cd.detectChanges();
            expect(DOM.getAttribute(view.nodes[0], 'aria-label')).toEqual('Initial aria label');
            ctx.ctxProp = 'Changed aria label';
            cd.detectChanges();
            expect(DOM.getAttribute(view.nodes[0], 'aria-label')).toEqual('Changed aria label');
            done();
          }));
        }));
        it('should consume directive watch expression change.', (function(done) {
          var tpl = '<div>' + '<div my-dir [elprop]="ctxProp"></div>' + '<div my-dir elprop="Hi there!"></div>' + '<div my-dir elprop="Hi {{\'there!\'}}"></div>' + '<div my-dir elprop="One more {{ctxProp}}"></div>' + '</div>';
          tplResolver.setTemplate(MyComp, new Template({
            inline: tpl,
            directives: [MyDir]
          }));
          compiler.compile(MyComp).then((function(pv) {
            createView(pv);
            ctx.ctxProp = 'Hello World!';
            cd.detectChanges();
            expect(view.elementInjectors[0].get(MyDir).dirProp).toEqual('Hello World!');
            expect(view.elementInjectors[1].get(MyDir).dirProp).toEqual('Hi there!');
            expect(view.elementInjectors[2].get(MyDir).dirProp).toEqual('Hi there!');
            expect(view.elementInjectors[3].get(MyDir).dirProp).toEqual('One more Hello World!');
            done();
          }));
        }));
        it('should support nested components.', (function(done) {
          tplResolver.setTemplate(MyComp, new Template({
            inline: '<child-cmp></child-cmp>',
            directives: [ChildComp]
          }));
          compiler.compile(MyComp).then((function(pv) {
            createView(pv);
            cd.detectChanges();
            expect(view.nodes[0].shadowRoot.childNodes[0].nodeValue).toEqual('hello');
            done();
          }));
        }));
        it('should support different directive types on a single node', (function(done) {
          tplResolver.setTemplate(MyComp, new Template({
            inline: '<child-cmp my-dir [elprop]="ctxProp"></child-cmp>',
            directives: [MyDir, ChildComp]
          }));
          compiler.compile(MyComp).then((function(pv) {
            createView(pv);
            ctx.ctxProp = 'Hello World!';
            cd.detectChanges();
            var elInj = view.elementInjectors[0];
            expect(elInj.get(MyDir).dirProp).toEqual('Hello World!');
            expect(elInj.get(ChildComp).dirProp).toEqual(null);
            done();
          }));
        }));
        it('should support template directives via `<template>` elements.', (function(done) {
          tplResolver.setTemplate(MyComp, new Template({
            inline: '<div><template some-viewport var-greeting="some-tmpl"><copy-me>{{greeting}}</copy-me></template></div>',
            directives: [SomeViewport]
          }));
          compiler.compile(MyComp).then((function(pv) {
            createView(pv);
            cd.detectChanges();
            var childNodesOfWrapper = view.nodes[0].childNodes;
            expect(childNodesOfWrapper.length).toBe(3);
            expect(childNodesOfWrapper[1].childNodes[0].nodeValue).toEqual('hello');
            expect(childNodesOfWrapper[2].childNodes[0].nodeValue).toEqual('again');
            done();
          }));
        }));
        it('should support template directives via `template` attribute.', (function(done) {
          tplResolver.setTemplate(MyComp, new Template({
            inline: '<div><copy-me template="some-viewport: var greeting=some-tmpl">{{greeting}}</copy-me></div>',
            directives: [SomeViewport]
          }));
          compiler.compile(MyComp).then((function(pv) {
            createView(pv);
            cd.detectChanges();
            var childNodesOfWrapper = view.nodes[0].childNodes;
            expect(childNodesOfWrapper.length).toBe(3);
            expect(childNodesOfWrapper[1].childNodes[0].nodeValue).toEqual('hello');
            expect(childNodesOfWrapper[2].childNodes[0].nodeValue).toEqual('again');
            done();
          }));
        }));
        it('should assign the component instance to a var-', (function(done) {
          tplResolver.setTemplate(MyComp, new Template({
            inline: '<p><child-cmp var-alice></child-cmp></p>',
            directives: [ChildComp]
          }));
          compiler.compile(MyComp).then((function(pv) {
            createView(pv);
            expect(view.contextWithLocals).not.toBe(null);
            expect(view.contextWithLocals.get('alice')).toBeAnInstanceOf(ChildComp);
            done();
          }));
        }));
        it('should assign two component instances each with a var-', (function(done) {
          tplResolver.setTemplate(MyComp, new Template({
            inline: '<p><child-cmp var-alice></child-cmp><child-cmp var-bob></p>',
            directives: [ChildComp]
          }));
          compiler.compile(MyComp).then((function(pv) {
            createView(pv);
            expect(view.contextWithLocals).not.toBe(null);
            expect(view.contextWithLocals.get('alice')).toBeAnInstanceOf(ChildComp);
            expect(view.contextWithLocals.get('bob')).toBeAnInstanceOf(ChildComp);
            expect(view.contextWithLocals.get('alice')).not.toBe(view.contextWithLocals.get('bob'));
            done();
          }));
        }));
        it('should assign the component instance to a var- with shorthand syntax', (function(done) {
          tplResolver.setTemplate(MyComp, new Template({
            inline: '<child-cmp #alice></child-cmp>',
            directives: [ChildComp]
          }));
          compiler.compile(MyComp).then((function(pv) {
            createView(pv);
            expect(view.contextWithLocals).not.toBe(null);
            expect(view.contextWithLocals.get('alice')).toBeAnInstanceOf(ChildComp);
            done();
          }));
        }));
        it('should assign the element instance to a user-defined variable', (function(done) {
          tplResolver.setTemplate(MyComp, new Template({inline: '<p><div var-alice><i>Hello</i></div></p>'}));
          compiler.compile(MyComp).then((function(pv) {
            createView(pv);
            expect(view.contextWithLocals).not.toBe(null);
            var value = view.contextWithLocals.get('alice');
            expect(value).not.toBe(null);
            expect(value.tagName).toEqual('DIV');
            done();
          }));
        }));
        it('should provide binding configuration config to the component', (function(done) {
          tplResolver.setTemplate(MyComp, new Template({
            inline: '<push-cmp #cmp></push-cmp>',
            directives: [[[PushBasedComp]]]
          }));
          compiler.compile(MyComp).then((function(pv) {
            createView(pv);
            var cmp = view.contextWithLocals.get('cmp');
            cd.detectChanges();
            expect(cmp.numberOfChecks).toEqual(1);
            cd.detectChanges();
            expect(cmp.numberOfChecks).toEqual(1);
            cmp.propagate();
            cd.detectChanges();
            expect(cmp.numberOfChecks).toEqual(2);
            done();
          }));
        }));
      });
    });
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
      BindingPropagationConfig = $__m.BindingPropagationConfig;
    }, function($__m) {
      Decorator = $__m.Decorator;
      Component = $__m.Component;
      Viewport = $__m.Viewport;
    }, function($__m) {
      Template = $__m.Template;
    }, function($__m) {
      ViewContainer = $__m.ViewContainer;
    }],
    execute: function() {
      MyDir = (function() {
        var MyDir = function MyDir() {
          this.dirProp = '';
        };
        return ($traceurRuntime.createClass)(MyDir, {}, {});
      }());
      Object.defineProperty(MyDir, "annotations", {get: function() {
          return [new Decorator({
            selector: '[my-dir]',
            bind: {'elprop': 'dirProp'}
          })];
        }});
      PushBasedComp = (function() {
        var PushBasedComp = function PushBasedComp(bpc) {
          assert.argumentTypes(bpc, BindingPropagationConfig);
          this.numberOfChecks = 0;
          this.bpc = bpc;
          bpc.shouldBePropagated();
        };
        return ($traceurRuntime.createClass)(PushBasedComp, {
          get field() {
            this.numberOfChecks++;
            return "fixed";
          },
          propagate: function() {
            this.bpc.shouldBePropagatedFromRoot();
          }
        }, {});
      }());
      Object.defineProperty(PushBasedComp, "annotations", {get: function() {
          return [new Component({selector: 'push-cmp'}), new Template({inline: '{{field}}'})];
        }});
      Object.defineProperty(PushBasedComp, "parameters", {get: function() {
          return [[BindingPropagationConfig]];
        }});
      MyComp = (function() {
        var MyComp = function MyComp() {
          this.ctxProp = 'initial value';
        };
        return ($traceurRuntime.createClass)(MyComp, {}, {});
      }());
      Object.defineProperty(MyComp, "annotations", {get: function() {
          return [new Component()];
        }});
      ChildComp = (function() {
        var ChildComp = function ChildComp(service) {
          assert.argumentTypes(service, MyService);
          this.ctxProp = service.greeting;
          this.dirProp = null;
        };
        return ($traceurRuntime.createClass)(ChildComp, {}, {});
      }());
      Object.defineProperty(ChildComp, "annotations", {get: function() {
          return [new Component({
            selector: 'child-cmp',
            componentServices: [MyService]
          }), new Template({
            directives: [MyDir],
            inline: '{{ctxProp}}'
          })];
        }});
      Object.defineProperty(ChildComp, "parameters", {get: function() {
          return [[MyService]];
        }});
      SomeViewport = (function() {
        var SomeViewport = function SomeViewport(container) {
          assert.argumentTypes(container, ViewContainer);
          container.create().setLocal('some-tmpl', 'hello');
          container.create().setLocal('some-tmpl', 'again');
        };
        return ($traceurRuntime.createClass)(SomeViewport, {}, {});
      }());
      Object.defineProperty(SomeViewport, "annotations", {get: function() {
          return [new Viewport({selector: '[some-viewport]'})];
        }});
      Object.defineProperty(SomeViewport, "parameters", {get: function() {
          return [[ViewContainer]];
        }});
      MyService = (function() {
        var MyService = function MyService() {
          this.greeting = 'hello';
        };
        return ($traceurRuntime.createClass)(MyService, {}, {});
      }());
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

//# sourceMappingURL=angular2/test/core/compiler/integration_spec.map

//# sourceMappingURL=../../../../angular2/test/core/compiler/integration_spec.js.map