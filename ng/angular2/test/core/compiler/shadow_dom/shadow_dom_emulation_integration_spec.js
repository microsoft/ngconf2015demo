System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/facade/dom", "angular2/src/facade/collection", "angular2/src/facade/lang", "angular2/di", "angular2/change_detection", "angular2/src/core/compiler/compiler", "angular2/src/core/life_cycle/life_cycle", "angular2/src/core/compiler/directive_metadata_reader", "angular2/src/core/compiler/shadow_dom_strategy", "angular2/src/core/compiler/template_loader", "angular2/src/core/compiler/template_resolver", "angular2/src/core/annotations/annotations", "angular2/src/core/annotations/template", "angular2/src/core/compiler/view_container"], function($__export) {
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
      StringMapWrapper,
      MapWrapper,
      List,
      isPresent,
      Type,
      Injector,
      Lexer,
      Parser,
      ChangeDetector,
      dynamicChangeDetection,
      Compiler,
      CompilerCache,
      LifeCycle,
      DirectiveMetadataReader,
      ShadowDomStrategy,
      NativeShadowDomStrategy,
      EmulatedShadowDomStrategy,
      TemplateLoader,
      TemplateResolver,
      Decorator,
      Component,
      Viewport,
      Template,
      ViewContainer,
      TestDirectiveMetadataReader,
      ManualViewportDirective,
      AutoViewportDirective,
      Simple,
      MultipleContentTagsComponent,
      ConditionalContentComponent,
      OuterWithIndirectNestedComponent,
      OuterComponent,
      InnerComponent,
      InnerInnerComponent,
      MyComp,
      FakeTemplateResolver;
  function main() {
    describe('integration tests', function() {
      StringMapWrapper.forEach({
        "native": new NativeShadowDomStrategy(),
        "emulated": new EmulatedShadowDomStrategy()
      }, (function(strategy, name) {
        describe((name + " shadow dom strategy"), (function() {
          var compiler,
              tplResolver;
          beforeEach((function() {
            tplResolver = new FakeTemplateResolver();
            compiler = new Compiler(dynamicChangeDetection, new TemplateLoader(null), new DirectiveMetadataReader(), new Parser(new Lexer()), new CompilerCache(), strategy, tplResolver);
          }));
          function compile(template, directives, assertions) {
            assert.argumentTypes(template, assert.type.any, directives, assert.genericType(List, Type), assertions, assert.type.any);
            tplResolver.setTemplate(MyComp, new Template({
              inline: template,
              directives: directives
            }));
            compiler.compile(MyComp).then(createView).then((function(view) {
              var lc = new LifeCycle(view.changeDetector, false);
              assertions(view, lc);
            }));
          }
          Object.defineProperty(compile, "parameters", {get: function() {
              return [[], [assert.genericType(List, Type)], []];
            }});
          it('should support multiple content tags', (function(done) {
            var temp = '<multiple-content-tags>' + '<div>B</div>' + '<div>C</div>' + '<div class="left">A</div>' + '</multiple-content-tags>';
            compile(temp, [MultipleContentTagsComponent], (function(view, lc) {
              expect(view.nodes).toHaveText('(A, BC)');
              done();
            }));
          }));
          it('should redistribute only direct children', (function(done) {
            var temp = '<multiple-content-tags>' + '<div>B<div class="left">A</div></div>' + '<div>C</div>' + '</multiple-content-tags>';
            compile(temp, [MultipleContentTagsComponent], (function(view, lc) {
              expect(view.nodes).toHaveText('(, BAC)');
              done();
            }));
          }));
          it("should redistribute direct child viewcontainers when the light dom changes", (function(done) {
            var temp = '<multiple-content-tags>' + '<div><div template="manual" class="left">A</div></div>' + '<div>B</div>' + '</multiple-content-tags>';
            compile(temp, [MultipleContentTagsComponent, ManualViewportDirective], (function(view, lc) {
              var dir = view.elementInjectors[1].get(ManualViewportDirective);
              expect(view.nodes).toHaveText('(, B)');
              dir.show();
              lc.tick();
              expect(view.nodes).toHaveText('(, AB)');
              dir.hide();
              lc.tick();
              expect(view.nodes).toHaveText('(, B)');
              done();
            }));
          }));
          it("should redistribute when the light dom changes", (function(done) {
            var temp = '<multiple-content-tags>' + '<div template="manual" class="left">A</div>' + '<div>B</div>' + '</multiple-content-tags>';
            compile(temp, [MultipleContentTagsComponent, ManualViewportDirective], (function(view, lc) {
              var dir = view.elementInjectors[1].get(ManualViewportDirective);
              expect(view.nodes).toHaveText('(, B)');
              dir.show();
              lc.tick();
              expect(view.nodes).toHaveText('(A, B)');
              dir.hide();
              lc.tick();
              expect(view.nodes).toHaveText('(, B)');
              done();
            }));
          }));
          it("should support nested components", (function(done) {
            var temp = '<outer-with-indirect-nested>' + '<div>A</div>' + '<div>B</div>' + '</outer-with-indirect-nested>';
            compile(temp, [OuterWithIndirectNestedComponent], (function(view, lc) {
              expect(view.nodes).toHaveText('OUTER(SIMPLE(AB))');
              done();
            }));
          }));
          it("should support nesting with content being direct child of a nested component", (function(done) {
            var temp = '<outer>' + '<div template="manual" class="left">A</div>' + '<div>B</div>' + '<div>C</div>' + '</outer>';
            compile(temp, [OuterComponent, ManualViewportDirective], (function(view, lc) {
              var dir = view.elementInjectors[1].get(ManualViewportDirective);
              expect(view.nodes).toHaveText('OUTER(INNER(INNERINNER(,BC)))');
              dir.show();
              lc.tick();
              expect(view.nodes).toHaveText('OUTER(INNER(INNERINNER(A,BC)))');
              done();
            }));
          }));
        }));
      }));
    });
  }
  function createView(pv) {
    var view = pv.instantiate(null, null);
    view.hydrate(new Injector([]), null, {});
    return view;
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
      StringMapWrapper = $__m.StringMapWrapper;
      MapWrapper = $__m.MapWrapper;
      List = $__m.List;
    }, function($__m) {
      isPresent = $__m.isPresent;
      Type = $__m.Type;
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
      LifeCycle = $__m.LifeCycle;
    }, function($__m) {
      DirectiveMetadataReader = $__m.DirectiveMetadataReader;
    }, function($__m) {
      ShadowDomStrategy = $__m.ShadowDomStrategy;
      NativeShadowDomStrategy = $__m.NativeShadowDomStrategy;
      EmulatedShadowDomStrategy = $__m.EmulatedShadowDomStrategy;
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
      ViewContainer = $__m.ViewContainer;
    }],
    execute: function() {
      TestDirectiveMetadataReader = (function($__super) {
        var TestDirectiveMetadataReader = function TestDirectiveMetadataReader(shadowDomStrategy) {
          $traceurRuntime.superConstructor(TestDirectiveMetadataReader).call(this);
          this.shadowDomStrategy = shadowDomStrategy;
        };
        return ($traceurRuntime.createClass)(TestDirectiveMetadataReader, {parseShadowDomStrategy: function(annotation) {
            assert.argumentTypes(annotation, Component);
            return assert.returnType((this.shadowDomStrategy), ShadowDomStrategy);
          }}, {}, $__super);
      }(DirectiveMetadataReader));
      Object.defineProperty(TestDirectiveMetadataReader.prototype.parseShadowDomStrategy, "parameters", {get: function() {
          return [[Component]];
        }});
      ManualViewportDirective = (function() {
        var ManualViewportDirective = function ManualViewportDirective(viewContainer) {
          assert.argumentTypes(viewContainer, ViewContainer);
          this.viewContainer = viewContainer;
        };
        return ($traceurRuntime.createClass)(ManualViewportDirective, {
          show: function() {
            this.viewContainer.create();
          },
          hide: function() {
            this.viewContainer.remove(0);
          }
        }, {});
      }());
      Object.defineProperty(ManualViewportDirective, "annotations", {get: function() {
          return [new Viewport({selector: '[manual]'})];
        }});
      Object.defineProperty(ManualViewportDirective, "parameters", {get: function() {
          return [[ViewContainer]];
        }});
      AutoViewportDirective = (function() {
        var AutoViewportDirective = function AutoViewportDirective(viewContainer) {
          assert.argumentTypes(viewContainer, ViewContainer);
          this.viewContainer = viewContainer;
        };
        return ($traceurRuntime.createClass)(AutoViewportDirective, {set auto(newValue) {
            assert.argumentTypes(newValue, assert.type.boolean);
            if (newValue) {
              this.viewContainer.create();
            } else {
              this.viewContainer.remove(0);
            }
          }}, {});
      }());
      Object.defineProperty(AutoViewportDirective, "annotations", {get: function() {
          return [new Viewport({
            selector: '[auto]',
            bind: {'auto': 'auto'}
          })];
        }});
      Object.defineProperty(AutoViewportDirective, "parameters", {get: function() {
          return [[ViewContainer]];
        }});
      Object.defineProperty(Object.getOwnPropertyDescriptor(AutoViewportDirective.prototype, "auto").set, "parameters", {get: function() {
          return [[assert.type.boolean]];
        }});
      Simple = (function() {
        var Simple = function Simple() {};
        return ($traceurRuntime.createClass)(Simple, {}, {});
      }());
      Object.defineProperty(Simple, "annotations", {get: function() {
          return [new Component({selector: 'simple'}), new Template({inline: 'SIMPLE(<content></content>)'})];
        }});
      MultipleContentTagsComponent = (function() {
        var MultipleContentTagsComponent = function MultipleContentTagsComponent() {};
        return ($traceurRuntime.createClass)(MultipleContentTagsComponent, {}, {});
      }());
      Object.defineProperty(MultipleContentTagsComponent, "annotations", {get: function() {
          return [new Component({selector: 'multiple-content-tags'}), new Template({inline: '(<content select=".left"></content>, <content></content>)'})];
        }});
      ConditionalContentComponent = (function() {
        var ConditionalContentComponent = function ConditionalContentComponent() {
          this.cond = false;
        };
        return ($traceurRuntime.createClass)(ConditionalContentComponent, {
          showLeft: function() {
            this.cond = true;
          },
          hideLeft: function() {
            this.cond = false;
          }
        }, {});
      }());
      Object.defineProperty(ConditionalContentComponent, "annotations", {get: function() {
          return [new Component({selector: 'conditional-content'}), new Template({
            inline: '<div>(<div template="auto: cond"><content select=".left"></content></div>, <content></content>)</div>',
            directives: [AutoViewportDirective]
          })];
        }});
      OuterWithIndirectNestedComponent = (function() {
        var OuterWithIndirectNestedComponent = function OuterWithIndirectNestedComponent() {};
        return ($traceurRuntime.createClass)(OuterWithIndirectNestedComponent, {}, {});
      }());
      Object.defineProperty(OuterWithIndirectNestedComponent, "annotations", {get: function() {
          return [new Component({selector: 'outer-with-indirect-nested'}), new Template({
            inline: 'OUTER(<simple><div><content></content></div></simple>)',
            directives: [Simple]
          })];
        }});
      OuterComponent = (function() {
        var OuterComponent = function OuterComponent() {};
        return ($traceurRuntime.createClass)(OuterComponent, {}, {});
      }());
      Object.defineProperty(OuterComponent, "annotations", {get: function() {
          return [new Component({selector: 'outer'}), new Template({
            inline: 'OUTER(<inner><content></content></inner>)',
            directives: [InnerComponent]
          })];
        }});
      InnerComponent = (function() {
        var InnerComponent = function InnerComponent() {};
        return ($traceurRuntime.createClass)(InnerComponent, {}, {});
      }());
      Object.defineProperty(InnerComponent, "annotations", {get: function() {
          return [new Component({selector: 'inner'}), new Template({
            inline: 'INNER(<innerinner><content></content></innerinner>)',
            directives: [InnerInnerComponent]
          })];
        }});
      InnerInnerComponent = (function() {
        var InnerInnerComponent = function InnerInnerComponent() {};
        return ($traceurRuntime.createClass)(InnerInnerComponent, {}, {});
      }());
      Object.defineProperty(InnerInnerComponent, "annotations", {get: function() {
          return [new Component({selector: 'innerinner'}), new Template({inline: 'INNERINNER(<content select=".left"></content>,<content></content>)'})];
        }});
      MyComp = (function() {
        var MyComp = function MyComp() {};
        return ($traceurRuntime.createClass)(MyComp, {}, {});
      }());
      Object.defineProperty(MyComp, "annotations", {get: function() {
          return [new Component({selector: 'my-comp'}), new Template({directives: [MultipleContentTagsComponent, ManualViewportDirective, ConditionalContentComponent, OuterWithIndirectNestedComponent, OuterComponent]})];
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

//# sourceMappingURL=angular2/test/core/compiler/shadow_dom/shadow_dom_emulation_integration_spec.map

//# sourceMappingURL=../../../../../angular2/test/core/compiler/shadow_dom/shadow_dom_emulation_integration_spec.js.map