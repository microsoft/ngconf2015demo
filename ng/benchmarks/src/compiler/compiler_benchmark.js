System.register(["rtts_assert/rtts_assert", "angular2/src/facade/dom", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/core/compiler/directive_metadata", "angular2/src/core/compiler/shadow_dom_strategy", "angular2/change_detection", "angular2/src/core/compiler/compiler", "angular2/src/core/compiler/directive_metadata_reader", "angular2/src/core/annotations/annotations", "angular2/src/core/annotations/template", "angular2/src/core/compiler/template_loader", "angular2/src/core/compiler/template_resolver", "angular2/src/reflection/reflection", "angular2/src/test_lib/benchmark_util"], function($__export) {
  "use strict";
  var assert,
      DOM,
      document,
      isBlank,
      Type,
      MapWrapper,
      DirectiveMetadata,
      NativeShadowDomStrategy,
      Parser,
      Lexer,
      ProtoRecordRange,
      dynamicChangeDetection,
      Compiler,
      CompilerCache,
      DirectiveMetadataReader,
      Component,
      Decorator,
      Template,
      TemplateLoader,
      TemplateResolver,
      reflector,
      getIntParameter,
      bindAction,
      Dir0,
      Dir1,
      Dir2,
      Dir3,
      Dir4,
      BenchmarkComponent,
      FakeTemplateResolver;
  function setupReflector() {
    reflector.registerType(BenchmarkComponent, {
      "factory": (function() {
        return new BenchmarkComponent();
      }),
      "parameters": [],
      "annotations": [new Component()]
    });
    reflector.registerType(Dir0, {
      "factory": (function() {
        return new Dir0();
      }),
      "parameters": [],
      "annotations": [new Decorator({
        selector: '[dir0]',
        bind: {'attr0': 'prop'}
      })]
    });
    reflector.registerType(Dir1, {
      "factory": (function(dir0) {
        return new Dir1(dir0);
      }),
      "parameters": [[Dir0]],
      "annotations": [new Decorator({
        selector: '[dir1]',
        bind: {'attr1': 'prop'}
      })]
    });
    reflector.registerType(Dir2, {
      "factory": (function(dir1) {
        return new Dir2(dir1);
      }),
      "parameters": [[Dir1]],
      "annotations": [new Decorator({
        selector: '[dir2]',
        bind: {'attr2': 'prop'}
      })]
    });
    reflector.registerType(Dir3, {
      "factory": (function(dir2) {
        return new Dir3(dir2);
      }),
      "parameters": [[Dir2]],
      "annotations": [new Decorator({
        selector: '[dir3]',
        bind: {'attr3': 'prop'}
      })]
    });
    reflector.registerType(Dir4, {
      "factory": (function(dir3) {
        return new Dir4(dir3);
      }),
      "parameters": [[Dir3]],
      "annotations": [new Decorator({
        selector: '[dir4]',
        bind: {'attr4': 'prop'}
      })]
    });
    reflector.registerGetters({
      "inter0": (function(a) {
        return a.inter0;
      }),
      "inter1": (function(a) {
        return a.inter1;
      }),
      "inter2": (function(a) {
        return a.inter2;
      }),
      "inter3": (function(a) {
        return a.inter3;
      }),
      "inter4": (function(a) {
        return a.inter4;
      }),
      "value0": (function(a) {
        return a.value0;
      }),
      "value1": (function(a) {
        return a.value1;
      }),
      "value2": (function(a) {
        return a.value2;
      }),
      "value3": (function(a) {
        return a.value3;
      }),
      "value4": (function(a) {
        return a.value4;
      }),
      "prop": (function(a) {
        return a.prop;
      })
    });
    reflector.registerSetters({
      "inter0": (function(a, v) {
        return a.inter0 = v;
      }),
      "inter1": (function(a, v) {
        return a.inter1 = v;
      }),
      "inter2": (function(a, v) {
        return a.inter2 = v;
      }),
      "inter3": (function(a, v) {
        return a.inter3 = v;
      }),
      "inter4": (function(a, v) {
        return a.inter4 = v;
      }),
      "value0": (function(a, v) {
        return a.value0 = v;
      }),
      "value1": (function(a, v) {
        return a.value1 = v;
      }),
      "value2": (function(a, v) {
        return a.value2 = v;
      }),
      "value3": (function(a, v) {
        return a.value3 = v;
      }),
      "value4": (function(a, v) {
        return a.value4 = v;
      }),
      "prop": (function(a, v) {
        return a.prop = v;
      })
    });
  }
  function main() {
    var count = getIntParameter('elements');
    setupReflector();
    var reader = new DirectiveMetadataReader();
    var cache = new CompilerCache();
    var templateResolver = new FakeTemplateResolver();
    var compiler = new Compiler(dynamicChangeDetection, new TemplateLoader(null), reader, new Parser(new Lexer()), cache, new NativeShadowDomStrategy(), templateResolver);
    var templateNoBindings = createTemplateHtml('templateNoBindings', count);
    var templateWithBindings = createTemplateHtml('templateWithBindings', count);
    function compileNoBindings() {
      templateResolver.setTemplateHtml(templateNoBindings);
      cache.clear();
      compiler.compile(BenchmarkComponent);
    }
    function compileWithBindings() {
      templateResolver.setTemplateHtml(templateWithBindings);
      cache.clear();
      compiler.compile(BenchmarkComponent);
    }
    bindAction('#compileNoBindings', compileNoBindings);
    bindAction('#compileWithBindings', compileWithBindings);
  }
  function createTemplateHtml(templateId, repeatCount) {
    var template = DOM.querySelectorAll(document, ("#" + templateId))[0];
    var content = DOM.getInnerHTML(template);
    var result = '';
    for (var i = 0; i < repeatCount; i++) {
      result += content;
    }
    return result;
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      DOM = $__m.DOM;
      document = $__m.document;
    }, function($__m) {
      isBlank = $__m.isBlank;
      Type = $__m.Type;
    }, function($__m) {
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      DirectiveMetadata = $__m.DirectiveMetadata;
    }, function($__m) {
      NativeShadowDomStrategy = $__m.NativeShadowDomStrategy;
    }, function($__m) {
      Parser = $__m.Parser;
      Lexer = $__m.Lexer;
      ProtoRecordRange = $__m.ProtoRecordRange;
      dynamicChangeDetection = $__m.dynamicChangeDetection;
    }, function($__m) {
      Compiler = $__m.Compiler;
      CompilerCache = $__m.CompilerCache;
    }, function($__m) {
      DirectiveMetadataReader = $__m.DirectiveMetadataReader;
    }, function($__m) {
      Component = $__m.Component;
      Decorator = $__m.Decorator;
    }, function($__m) {
      Template = $__m.Template;
    }, function($__m) {
      TemplateLoader = $__m.TemplateLoader;
    }, function($__m) {
      TemplateResolver = $__m.TemplateResolver;
    }, function($__m) {
      reflector = $__m.reflector;
    }, function($__m) {
      getIntParameter = $__m.getIntParameter;
      bindAction = $__m.bindAction;
    }],
    execute: function() {
      Dir0 = (function() {
        var Dir0 = function Dir0() {};
        return ($traceurRuntime.createClass)(Dir0, {}, {});
      }());
      Object.defineProperty(Dir0, "annotations", {get: function() {
          return [new Decorator({
            selector: '[dir0]',
            bind: {'attr0': 'prop'}
          })];
        }});
      Dir1 = (function() {
        var Dir1 = function Dir1(dir0) {
          assert.argumentTypes(dir0, Dir0);
        };
        return ($traceurRuntime.createClass)(Dir1, {}, {});
      }());
      Object.defineProperty(Dir1, "annotations", {get: function() {
          return [new Decorator({
            selector: '[dir1]',
            bind: {'attr1': 'prop'}
          })];
        }});
      Object.defineProperty(Dir1, "parameters", {get: function() {
          return [[Dir0]];
        }});
      Dir2 = (function() {
        var Dir2 = function Dir2(dir1) {
          assert.argumentTypes(dir1, Dir1);
        };
        return ($traceurRuntime.createClass)(Dir2, {}, {});
      }());
      Object.defineProperty(Dir2, "annotations", {get: function() {
          return [new Decorator({
            selector: '[dir2]',
            bind: {'attr2': 'prop'}
          })];
        }});
      Object.defineProperty(Dir2, "parameters", {get: function() {
          return [[Dir1]];
        }});
      Dir3 = (function() {
        var Dir3 = function Dir3(dir2) {
          assert.argumentTypes(dir2, Dir2);
        };
        return ($traceurRuntime.createClass)(Dir3, {}, {});
      }());
      Object.defineProperty(Dir3, "annotations", {get: function() {
          return [new Decorator({
            selector: '[dir3]',
            bind: {'attr3': 'prop'}
          })];
        }});
      Object.defineProperty(Dir3, "parameters", {get: function() {
          return [[Dir2]];
        }});
      Dir4 = (function() {
        var Dir4 = function Dir4(dir3) {
          assert.argumentTypes(dir3, Dir3);
        };
        return ($traceurRuntime.createClass)(Dir4, {}, {});
      }());
      Object.defineProperty(Dir4, "annotations", {get: function() {
          return [new Decorator({
            selector: '[dir4]',
            bind: {'attr4': 'prop'}
          })];
        }});
      Object.defineProperty(Dir4, "parameters", {get: function() {
          return [[Dir3]];
        }});
      BenchmarkComponent = (function() {
        var BenchmarkComponent = function BenchmarkComponent() {};
        return ($traceurRuntime.createClass)(BenchmarkComponent, {}, {});
      }());
      Object.defineProperty(BenchmarkComponent, "annotations", {get: function() {
          return [new Component()];
        }});
      FakeTemplateResolver = (function($__super) {
        var FakeTemplateResolver = function FakeTemplateResolver() {
          $traceurRuntime.superConstructor(FakeTemplateResolver).call(this);
        };
        return ($traceurRuntime.createClass)(FakeTemplateResolver, {
          setTemplateHtml: function(html) {
            assert.argumentTypes(html, assert.type.string);
            this._template = new Template({
              inline: html,
              directives: [Dir0, Dir1, Dir2, Dir3, Dir4]
            });
          },
          resolve: function(component) {
            assert.argumentTypes(component, Type);
            return assert.returnType((this._template), Template);
          }
        }, {}, $__super);
      }(TemplateResolver));
      Object.defineProperty(FakeTemplateResolver.prototype.setTemplateHtml, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(FakeTemplateResolver.prototype.resolve, "parameters", {get: function() {
          return [[Type]];
        }});
    }
  };
});

//# sourceMappingURL=benchmarks/src/compiler/compiler_benchmark.map

//# sourceMappingURL=../../../benchmarks/src/compiler/compiler_benchmark.js.map