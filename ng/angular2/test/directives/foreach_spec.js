System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/facade/dom", "angular2/src/facade/collection", "angular2/src/facade/lang", "angular2/di", "angular2/change_detection", "angular2/src/core/compiler/compiler", "angular2/src/core/compiler/directive_metadata_reader", "angular2/src/core/compiler/shadow_dom_strategy", "angular2/src/core/compiler/template_loader", "angular2/src/core/compiler/template_resolver", "angular2/src/core/annotations/annotations", "angular2/src/core/annotations/template", "angular2/src/directives/foreach"], function($__export) {
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
      ListWrapper,
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
      Decorator,
      Component,
      Viewport,
      Template,
      Foreach,
      Foo,
      TestComponent,
      FakeTemplateResolver;
  function main() {
    describe('foreach', (function() {
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
          directives: [Foreach]
        });
        tplResolver.setTemplate(TestComponent, template);
        return compiler.compile(TestComponent);
      }
      var TEMPLATE = '<div><copy-me template="foreach #item in items">{{item.toString()}};</copy-me></div>';
      it('should reflect initial elements', (function(done) {
        compileWithTemplate(TEMPLATE).then((function(pv) {
          createView(pv);
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('1;2;');
          done();
        }));
      }));
      it('should reflect added elements', (function(done) {
        compileWithTemplate(TEMPLATE).then((function(pv) {
          createView(pv);
          cd.detectChanges();
          ListWrapper.push(component.items, 3);
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('1;2;3;');
          done();
        }));
      }));
      it('should reflect removed elements', (function(done) {
        compileWithTemplate(TEMPLATE).then((function(pv) {
          createView(pv);
          cd.detectChanges();
          ListWrapper.removeAt(component.items, 1);
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('1;');
          done();
        }));
      }));
      it('should reflect moved elements', (function(done) {
        compileWithTemplate(TEMPLATE).then((function(pv) {
          createView(pv);
          cd.detectChanges();
          ListWrapper.removeAt(component.items, 0);
          ListWrapper.push(component.items, 1);
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('2;1;');
          done();
        }));
      }));
      it('should reflect a mix of all changes (additions/removals/moves)', (function(done) {
        compileWithTemplate(TEMPLATE).then((function(pv) {
          createView(pv);
          component.items = [0, 1, 2, 3, 4, 5];
          cd.detectChanges();
          component.items = [6, 2, 7, 0, 4, 8];
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('6;2;7;0;4;8;');
          done();
        }));
      }));
      it('should iterate over an array of objects', (function() {
        compileWithTemplate('<ul><li template="foreach #item in items">{{item["name"]}};</li></ul>').then((function(pv) {
          createView(pv);
          component.items = [{'name': 'misko'}, {'name': 'shyam'}];
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('misko;shyam;');
          ListWrapper.push(component.items, {'name': 'adam'});
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('misko;shyam;adam;');
          ListWrapper.removeAt(component.items, 2);
          ListWrapper.removeAt(component.items, 0);
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('shyam;');
        }));
      }));
      it('should gracefully handle nulls', (function(done) {
        compileWithTemplate('<ul><li template="foreach #item in null">{{item}};</li></ul>').then((function(pv) {
          createView(pv);
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('');
          done();
        }));
      }));
      it('should gracefully handle ref changing to null and back', (function(done) {
        compileWithTemplate(TEMPLATE).then((function(pv) {
          createView(pv);
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('1;2;');
          component.items = null;
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('');
          component.items = [1, 2, 3];
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('1;2;3;');
          done();
        }));
      }));
      it('should throw on ref changing to string', (function(done) {
        compileWithTemplate(TEMPLATE).then((function(pv) {
          createView(pv);
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('1;2;');
          component.items = 'whaaa';
          expect((function() {
            return cd.detectChanges();
          })).toThrowError();
          done();
        }));
      }));
      it('should works with duplicates', (function(done) {
        compileWithTemplate(TEMPLATE).then((function(pv) {
          createView(pv);
          var a = new Foo();
          component.items = [a, a];
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('foo;foo;');
          done();
        }));
      }));
      it('should repeat over nested arrays', (function(done) {
        compileWithTemplate('<div><div template="foreach #item in items">' + '<div template="foreach #subitem in item">' + '{{subitem}};' + '</div>|</div></div>').then((function(pv) {
          createView(pv);
          component.items = [['a', 'b'], ['c', 'd']];
          cd.detectChanges();
          cd.detectChanges();
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('a;b;|c;d;|');
          done();
        }));
      }));
      it('should display indices correctly', (function(done) {
        var INDEX_TEMPLATE = '<div><copy-me template="foreach: var item in items; var i=index">{{i.toString()}}</copy-me></div>';
        compileWithTemplate(INDEX_TEMPLATE).then((function(pv) {
          createView(pv);
          component.items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('0123456789');
          component.items = [1, 2, 6, 7, 4, 3, 5, 8, 9, 0];
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('0123456789');
          done();
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
      ListWrapper = $__m.ListWrapper;
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
      Decorator = $__m.Decorator;
      Component = $__m.Component;
      Viewport = $__m.Viewport;
    }, function($__m) {
      Template = $__m.Template;
    }, function($__m) {
      Foreach = $__m.Foreach;
    }],
    execute: function() {
      Foo = (function() {
        var Foo = function Foo() {};
        return ($traceurRuntime.createClass)(Foo, {toString: function() {
            return 'foo';
          }}, {});
      }());
      TestComponent = (function() {
        var TestComponent = function TestComponent() {
          this.items = [1, 2];
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

//# sourceMappingURL=angular2/test/directives/foreach_spec.map

//# sourceMappingURL=../../../angular2/test/directives/foreach_spec.js.map