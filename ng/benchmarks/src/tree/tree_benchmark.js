System.register(["rtts_assert/rtts_assert", "angular2/change_detection", "angular2/angular2", "angular2/src/core/compiler/compiler", "angular2/src/core/compiler/directive_metadata_reader", "angular2/src/core/compiler/template_loader", "angular2/src/core/compiler/template_resolver", "angular2/src/core/compiler/shadow_dom_strategy", "angular2/src/core/life_cycle/life_cycle", "angular2/src/reflection/reflection", "angular2/src/facade/dom", "angular2/src/facade/lang", "angular2/src/test_lib/benchmark_util", "angular2/src/core/compiler/xhr/xhr", "angular2/src/core/compiler/xhr/xhr_impl"], function($__export) {
  "use strict";
  var assert,
      Parser,
      Lexer,
      ChangeDetector,
      ChangeDetection,
      jitChangeDetection,
      bootstrap,
      Component,
      Viewport,
      Template,
      ViewContainer,
      Compiler,
      CompilerCache,
      DirectiveMetadataReader,
      TemplateLoader,
      TemplateResolver,
      ShadowDomStrategy,
      NativeShadowDomStrategy,
      LifeCycle,
      reflector,
      DOM,
      document,
      window,
      Element,
      gc,
      isPresent,
      getIntParameter,
      bindAction,
      XHR,
      XHRImpl,
      TreeNode,
      BASELINE_TREE_TEMPLATE,
      BASELINE_IF_TEMPLATE,
      BaseLineTreeComponent,
      BaseLineInterpolation,
      BaseLineIf,
      AppComponent,
      NgIf,
      TreeComponent;
  function setupReflector() {
    reflector.registerType(AppComponent, {
      'factory': (function() {
        return new AppComponent();
      }),
      'parameters': [],
      'annotations': [new Component({selector: 'app'}), new Template({
        directives: [TreeComponent],
        inline: "<tree [data]='initData'></tree>"
      })]
    });
    reflector.registerType(TreeComponent, {
      'factory': (function() {
        return new TreeComponent();
      }),
      'parameters': [],
      'annotations': [new Component({
        selector: 'tree',
        bind: {'data': 'data'}
      }), new Template({
        directives: [TreeComponent, NgIf],
        inline: "<span> {{data.value}} <span template='ng-if data.right != null'><tree [data]='data.right'></tree></span><span template='ng-if data.left != null'><tree [data]='data.left'></tree></span></span>"
      })]
    });
    reflector.registerType(NgIf, {
      'factory': (function(vp) {
        return new NgIf(vp);
      }),
      'parameters': [[ViewContainer]],
      'annotations': [new Viewport({
        selector: '[ng-if]',
        bind: {'ng-if': 'ngIf'}
      })]
    });
    reflector.registerType(Compiler, {
      'factory': (function(cd, templateLoader, reader, parser, compilerCache, strategy, resolver) {
        return new Compiler(cd, templateLoader, reader, parser, compilerCache, strategy, resolver);
      }),
      'parameters': [[ChangeDetection], [TemplateLoader], [DirectiveMetadataReader], [Parser], [CompilerCache], [ShadowDomStrategy], [TemplateResolver]],
      'annotations': []
    });
    reflector.registerType(CompilerCache, {
      'factory': (function() {
        return new CompilerCache();
      }),
      'parameters': [],
      'annotations': []
    });
    reflector.registerType(Parser, {
      'factory': (function(lexer) {
        return new Parser(lexer);
      }),
      'parameters': [[Lexer]],
      'annotations': []
    });
    reflector.registerType(TemplateLoader, {
      'factory': (function(xhr) {
        return new TemplateLoader(xhr);
      }),
      'parameters': [[XHR]],
      'annotations': []
    });
    reflector.registerType(TemplateResolver, {
      'factory': (function() {
        return new TemplateResolver();
      }),
      'parameters': [],
      'annotations': []
    });
    reflector.registerType(XHR, {
      'factory': (function() {
        return new XHRImpl();
      }),
      'parameters': [],
      'annotations': []
    });
    reflector.registerType(DirectiveMetadataReader, {
      'factory': (function() {
        return new DirectiveMetadataReader();
      }),
      'parameters': [],
      'annotations': []
    });
    reflector.registerType(ShadowDomStrategy, {
      'factory': (function() {
        return new NativeShadowDomStrategy();
      }),
      'parameters': [],
      'annotations': []
    });
    reflector.registerType(Lexer, {
      'factory': (function() {
        return new Lexer();
      }),
      'parameters': [],
      'annotations': []
    });
    reflector.registerType(LifeCycle, {
      "factory": (function(cd) {
        return new LifeCycle(cd);
      }),
      "parameters": [[ChangeDetector]],
      "annotations": []
    });
    reflector.registerGetters({
      'value': (function(a) {
        return a.value;
      }),
      'left': (function(a) {
        return a.left;
      }),
      'right': (function(a) {
        return a.right;
      }),
      'initData': (function(a) {
        return a.initData;
      }),
      'data': (function(a) {
        return a.data;
      })
    });
    reflector.registerSetters({
      'value': (function(a, v) {
        return a.value = v;
      }),
      'left': (function(a, v) {
        return a.left = v;
      }),
      'right': (function(a, v) {
        return a.right = v;
      }),
      'initData': (function(a, v) {
        return a.initData = v;
      }),
      'data': (function(a, v) {
        return a.data = v;
      }),
      'ngIf': (function(a, v) {
        return a.ngIf = v;
      })
    });
  }
  function main() {
    var maxDepth = getIntParameter('depth');
    setupReflector();
    var app;
    var lifeCycle;
    var baselineRootTreeComponent;
    var count = 0;
    function ng2DestroyDom() {
      app.initData = new TreeNode('', null, null);
      lifeCycle.tick();
    }
    function profile(create, destroy, name) {
      return function() {
        window.console.profile(name + ' w GC');
        var duration = 0;
        var count = 0;
        while (count++ < 150) {
          gc();
          var start = window.performance.now();
          create();
          duration += window.performance.now() - start;
          destroy();
        }
        window.console.profileEnd(name + ' w GC');
        window.console.log(("Iterations: " + count + "; time: " + duration / count + " ms / iteration"));
        window.console.profile(name + ' w/o GC');
        duration = 0;
        count = 0;
        while (count++ < 150) {
          var start = window.performance.now();
          create();
          duration += window.performance.now() - start;
          destroy();
        }
        window.console.profileEnd(name + ' w/o GC');
        window.console.log(("Iterations: " + count + "; time: " + duration / count + " ms / iteration"));
      };
    }
    function ng2CreateDom() {
      var values = count++ % 2 == 0 ? ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '*'] : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', '-'];
      app.initData = buildTree(maxDepth, values, 0);
      lifeCycle.tick();
    }
    function noop() {}
    function initNg2() {
      bootstrap(AppComponent).then((function(injector) {
        lifeCycle = injector.get(LifeCycle);
        app = injector.get(AppComponent);
        bindAction('#ng2DestroyDom', ng2DestroyDom);
        bindAction('#ng2CreateDom', ng2CreateDom);
        bindAction('#ng2UpdateDomProfile', profile(ng2CreateDom, noop, 'ng2-update'));
        bindAction('#ng2CreateDomProfile', profile(ng2CreateDom, ng2DestroyDom, 'ng2-create'));
      }));
    }
    function baselineDestroyDom() {
      baselineRootTreeComponent.update(new TreeNode('', null, null));
    }
    function baselineCreateDom() {
      var values = count++ % 2 == 0 ? ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '*'] : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', '-'];
      baselineRootTreeComponent.update(buildTree(maxDepth, values, 0));
    }
    function initBaseline() {
      var tree = DOM.createElement('tree');
      DOM.appendChild(DOM.querySelector(document, 'baseline'), tree);
      baselineRootTreeComponent = new BaseLineTreeComponent(tree);
      bindAction('#baselineDestroyDom', baselineDestroyDom);
      bindAction('#baselineCreateDom', baselineCreateDom);
      bindAction('#baselineUpdateDomProfile', profile(baselineCreateDom, noop, 'baseline-update'));
      bindAction('#baselineCreateDomProfile', profile(baselineCreateDom, baselineDestroyDom, 'baseline-create'));
    }
    initNg2();
    initBaseline();
  }
  function buildTree(maxDepth, values, curDepth) {
    if (maxDepth === curDepth)
      return new TreeNode('', null, null);
    return new TreeNode(values[curDepth], buildTree(maxDepth, values, curDepth + 1), buildTree(maxDepth, values, curDepth + 1));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Parser = $__m.Parser;
      Lexer = $__m.Lexer;
      ChangeDetector = $__m.ChangeDetector;
      ChangeDetection = $__m.ChangeDetection;
      jitChangeDetection = $__m.jitChangeDetection;
    }, function($__m) {
      bootstrap = $__m.bootstrap;
      Component = $__m.Component;
      Viewport = $__m.Viewport;
      Template = $__m.Template;
      ViewContainer = $__m.ViewContainer;
      Compiler = $__m.Compiler;
    }, function($__m) {
      CompilerCache = $__m.CompilerCache;
    }, function($__m) {
      DirectiveMetadataReader = $__m.DirectiveMetadataReader;
    }, function($__m) {
      TemplateLoader = $__m.TemplateLoader;
    }, function($__m) {
      TemplateResolver = $__m.TemplateResolver;
    }, function($__m) {
      ShadowDomStrategy = $__m.ShadowDomStrategy;
      NativeShadowDomStrategy = $__m.NativeShadowDomStrategy;
    }, function($__m) {
      LifeCycle = $__m.LifeCycle;
    }, function($__m) {
      reflector = $__m.reflector;
    }, function($__m) {
      DOM = $__m.DOM;
      document = $__m.document;
      window = $__m.window;
      Element = $__m.Element;
      gc = $__m.gc;
    }, function($__m) {
      isPresent = $__m.isPresent;
    }, function($__m) {
      getIntParameter = $__m.getIntParameter;
      bindAction = $__m.bindAction;
    }, function($__m) {
      XHR = $__m.XHR;
    }, function($__m) {
      XHRImpl = $__m.XHRImpl;
    }],
    execute: function() {
      TreeNode = (function() {
        var TreeNode = function TreeNode(value, left, right) {
          this.value = value;
          this.left = left;
          this.right = right;
        };
        return ($traceurRuntime.createClass)(TreeNode, {}, {});
      }());
      BASELINE_TREE_TEMPLATE = DOM.createTemplate('<span>_<template class="ng-binding"></template><template class="ng-binding"></template></span>');
      BASELINE_IF_TEMPLATE = DOM.createTemplate('<span template="ng-if"><tree></tree></span>');
      BaseLineTreeComponent = (function() {
        var BaseLineTreeComponent = function BaseLineTreeComponent(element) {
          this.element = element;
          var clone = DOM.clone(BASELINE_TREE_TEMPLATE.content.firstChild);
          var shadowRoot = this.element.createShadowRoot();
          DOM.appendChild(shadowRoot, clone);
          var child = clone.firstChild;
          this.value = new BaseLineInterpolation(child);
          child = DOM.nextSibling(child);
          this.left = new BaseLineIf(child);
          child = DOM.nextSibling(child);
          this.right = new BaseLineIf(child);
        };
        return ($traceurRuntime.createClass)(BaseLineTreeComponent, {update: function(value) {
            assert.argumentTypes(value, TreeNode);
            this.value.update(value.value);
            this.left.update(value.left);
            this.right.update(value.right);
          }}, {});
      }());
      Object.defineProperty(BaseLineTreeComponent.prototype.update, "parameters", {get: function() {
          return [[TreeNode]];
        }});
      BaseLineInterpolation = (function() {
        var BaseLineInterpolation = function BaseLineInterpolation(textNode) {
          this.value = null;
          this.textNode = textNode;
        };
        return ($traceurRuntime.createClass)(BaseLineInterpolation, {update: function(value) {
            assert.argumentTypes(value, assert.type.string);
            if (this.value !== value) {
              this.value = value;
              DOM.setText(this.textNode, value + ' ');
            }
          }}, {});
      }());
      Object.defineProperty(BaseLineInterpolation.prototype.update, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      BaseLineIf = (function() {
        var BaseLineIf = function BaseLineIf(anchor) {
          this.anchor = anchor;
          this.condition = false;
          this.component = null;
        };
        return ($traceurRuntime.createClass)(BaseLineIf, {update: function(value) {
            assert.argumentTypes(value, TreeNode);
            var newCondition = isPresent(value);
            if (this.condition !== newCondition) {
              this.condition = newCondition;
              if (isPresent(this.component)) {
                this.component.element.remove();
                this.component = null;
              }
              if (this.condition) {
                var element = DOM.firstChild(DOM.clone(BASELINE_IF_TEMPLATE).content);
                this.anchor.parentNode.insertBefore(element, DOM.nextSibling(this.anchor));
                this.component = new BaseLineTreeComponent(DOM.firstChild(element));
              }
            }
            if (isPresent(this.component)) {
              this.component.update(value);
            }
          }}, {});
      }());
      Object.defineProperty(BaseLineIf.prototype.update, "parameters", {get: function() {
          return [[TreeNode]];
        }});
      AppComponent = (function() {
        var AppComponent = function AppComponent() {
          this.initData = new TreeNode('', null, null);
        };
        return ($traceurRuntime.createClass)(AppComponent, {}, {});
      }());
      NgIf = (function() {
        var NgIf = function NgIf(viewContainer) {
          assert.argumentTypes(viewContainer, ViewContainer);
          this._viewContainer = viewContainer;
        };
        return ($traceurRuntime.createClass)(NgIf, {set ngIf(value) {
            assert.argumentTypes(value, assert.type.boolean);
            if (this._viewContainer.length > 0) {
              this._viewContainer.remove(0);
            }
            if (value) {
              this._viewContainer.create();
            }
          }}, {});
      }());
      Object.defineProperty(NgIf, "parameters", {get: function() {
          return [[ViewContainer]];
        }});
      Object.defineProperty(Object.getOwnPropertyDescriptor(NgIf.prototype, "ngIf").set, "parameters", {get: function() {
          return [[assert.type.boolean]];
        }});
      TreeComponent = (function() {
        var TreeComponent = function TreeComponent() {};
        return ($traceurRuntime.createClass)(TreeComponent, {}, {});
      }());
    }
  };
});

//# sourceMappingURL=benchmarks/src/tree/tree_benchmark.map

//# sourceMappingURL=../../../benchmarks/src/tree/tree_benchmark.js.map