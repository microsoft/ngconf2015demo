System.register(["angular2/src/facade/lang", "angular2/src/facade/dom", "angular2/src/facade/collection", "angular2/change_detection", "angular2/angular2", "angular2/src/reflection/reflection", "angular2/src/core/compiler/compiler", "angular2/src/core/compiler/directive_metadata_reader", "angular2/src/core/compiler/shadow_dom_strategy", "angular2/src/core/compiler/template_loader", "angular2/src/core/compiler/template_resolver", "angular2/src/core/life_cycle/life_cycle", "angular2/src/core/compiler/xhr/xhr", "angular2/src/core/compiler/xhr/xhr_impl", "angular2/directives", "./app", "./scroll_area", "./scroll_item", "./cells"], function($__export) {
  "use strict";
  var int,
      isBlank,
      Element,
      MapWrapper,
      Parser,
      Lexer,
      ChangeDetector,
      ChangeDetection,
      bootstrap,
      Component,
      Viewport,
      Template,
      ViewContainer,
      Compiler,
      onChange,
      reflector,
      CompilerCache,
      DirectiveMetadataReader,
      ShadowDomStrategy,
      NativeShadowDomStrategy,
      TemplateLoader,
      TemplateResolver,
      LifeCycle,
      XHR,
      XHRImpl,
      If,
      Foreach,
      App,
      setupReflectorForApp,
      ScrollAreaComponent,
      setupReflectorForScrollArea,
      ScrollItemComponent,
      setupReflectorForScrollItem,
      CompanyNameComponent,
      OpportunityNameComponent,
      OfferingNameComponent,
      AccountCellComponent,
      StageButtonsComponent,
      FormattedCellComponent,
      setupReflectorForCells;
  function main() {
    setupReflector();
    bootstrap(App);
  }
  function setupReflector() {
    setupReflectorForAngular();
    setupReflectorForApp();
    setupReflectorForScrollArea();
    setupReflectorForScrollItem();
    setupReflectorForCells();
    var evt = "$event";
    reflector.registerGetters({
      'scrollAreas': (function(o) {
        return o.scrollAreas;
      }),
      'length': (function(o) {
        return o.length;
      }),
      'iterable': (function(o) {
        return o.iterable;
      }),
      'scrollArea': (function(o) {
        return o.scrollArea;
      }),
      'item': (function(o) {
        return o.item;
      }),
      'visibleItems': (function(o) {
        return o.visibleItems;
      }),
      'condition': (function(o) {
        return o.condition;
      }),
      'width': (function(o) {
        return o.width;
      }),
      'value': (function(o) {
        return o.value;
      }),
      'href': (function(o) {
        return o.href;
      }),
      'company': (function(o) {
        return o.company;
      }),
      'formattedValue': (function(o) {
        return o.formattedValue;
      }),
      'name': (function(o) {
        return o.name;
      }),
      'style': (function(o) {
        return o.style;
      }),
      'offering': (function(o) {
        return o.offering;
      }),
      'account': (function(o) {
        return o.account;
      }),
      'accountId': (function(o) {
        return o.accountId;
      }),
      'companyNameWidth': (function(o) {
        return o.companyNameWidth;
      }),
      'opportunityNameWidth': (function(o) {
        return o.opportunityNameWidth;
      }),
      'offeringNameWidth': (function(o) {
        return o.offeringNameWidth;
      }),
      'accountCellWidth': (function(o) {
        return o.accountCellWidth;
      }),
      'basePointsWidth': (function(o) {
        return o.basePointsWidth;
      }),
      'scrollDivStyle': (function(o) {
        return o.scrollDivStyle;
      }),
      'paddingStyle': (function(o) {
        return o.paddingStyle;
      }),
      'innerStyle': (function(o) {
        return o.innerStyle;
      }),
      'opportunity': (function(o) {
        return o.opportunity;
      }),
      'itemStyle': (function(o) {
        return o.itemStyle;
      }),
      'dueDateWidth': (function(o) {
        return o.dueDateWidth;
      }),
      'basePoints': (function(o) {
        return o.basePoints;
      }),
      'kickerPoints': (function(o) {
        return o.kickerPoints;
      }),
      'kickerPointsWidth': (function(o) {
        return o.kickerPointsWidth;
      }),
      'bundles': (function(o) {
        return o.bundles;
      }),
      'stageButtonsWidth': (function(o) {
        return o.stageButtonsWidth;
      }),
      'bundlesWidth': (function(o) {
        return o.bundlesWidth;
      }),
      'disabled': (function(o) {
        return o.disabled;
      }),
      'isDisabled': (function(o) {
        return o.isDisabled;
      }),
      'dueDate': (function(o) {
        return o.dueDate;
      }),
      'endDate': (function(o) {
        return o.endDate;
      }),
      'aatStatus': (function(o) {
        return o.aatStatus;
      }),
      'stage': (function(o) {
        return o.stage;
      }),
      'stages': (function(o) {
        return o.stages;
      }),
      'aatStatusWidth': (function(o) {
        return o.aatStatusWidth;
      }),
      'endDateWidth': (function(o) {
        return o.endDateWidth;
      }),
      evt: (function(o) {
        return null;
      })
    });
    reflector.registerSetters({
      'scrollAreas': (function(o, v) {
        return o.scrollAreas = v;
      }),
      'length': (function(o, v) {
        return o.length = v;
      }),
      'condition': (function(o, v) {
        return o.condition = v;
      }),
      'scrollArea': (function(o, v) {
        return o.scrollArea = v;
      }),
      'item': (function(o, v) {
        return o.item = v;
      }),
      'visibleItems': (function(o, v) {
        return o.visibleItems = v;
      }),
      'iterable': (function(o, v) {
        return o.iterable = v;
      }),
      'width': (function(o, v) {
        return o.width = v;
      }),
      'value': (function(o, v) {
        return o.value = v;
      }),
      'company': (function(o, v) {
        return o.company = v;
      }),
      'name': (function(o, v) {
        return o.name = v;
      }),
      'offering': (function(o, v) {
        return o.offering = v;
      }),
      'account': (function(o, v) {
        return o.account = v;
      }),
      'accountId': (function(o, v) {
        return o.accountId = v;
      }),
      'formattedValue': (function(o, v) {
        return o.formattedValue = v;
      }),
      'stage': (function(o, v) {
        return o.stage = v;
      }),
      'stages': (function(o, v) {
        return o.stages = v;
      }),
      'disabled': (function(o, v) {
        return o.disabled = v;
      }),
      'isDisabled': (function(o, v) {
        return o.isDisabled = v;
      }),
      'href': (function(o, v) {
        return o.href = v;
      }),
      'companyNameWidth': (function(o, v) {
        return o.companyNameWidth = v;
      }),
      'opportunityNameWidth': (function(o, v) {
        return o.opportunityNameWidth = v;
      }),
      'offeringNameWidth': (function(o, v) {
        return o.offeringNameWidth = v;
      }),
      'accountCellWidth': (function(o, v) {
        return o.accountCellWidth = v;
      }),
      'basePointsWidth': (function(o, v) {
        return o.basePointsWidth = v;
      }),
      'scrollDivStyle': (function(o, v) {
        return o.scrollDivStyle = v;
      }),
      'paddingStyle': (function(o, v) {
        return o.paddingStyle = v;
      }),
      'innerStyle': (function(o, v) {
        return o.innerStyle = v;
      }),
      'opportunity': (function(o, v) {
        return o.opportunity = v;
      }),
      'itemStyle': (function(o, v) {
        return o.itemStyle = v;
      }),
      'basePoints': (function(o, v) {
        return o.basePoints = v;
      }),
      'kickerPoints': (function(o, v) {
        return o.kickerPoints = v;
      }),
      'kickerPointsWidth': (function(o, v) {
        return o.kickerPointsWidth = v;
      }),
      'stageButtonsWidth': (function(o, v) {
        return o.stageButtonsWidth = v;
      }),
      'dueDate': (function(o, v) {
        return o.dueDate = v;
      }),
      'dueDateWidth': (function(o, v) {
        return o.dueDateWidth = v;
      }),
      'endDate': (function(o, v) {
        return o.endDate = v;
      }),
      'endDateWidth': (function(o, v) {
        return o.endDate = v;
      }),
      'aatStatus': (function(o, v) {
        return o.aatStatus = v;
      }),
      'aatStatusWidth': (function(o, v) {
        return o.aatStatusWidth = v;
      }),
      'bundles': (function(o, v) {
        return o.bundles = v;
      }),
      'bundlesWidth': (function(o, v) {
        return o.bundlesWidth = v;
      }),
      evt: (function(o, v) {
        return null;
      }),
      'style': (function(o, m) {
        MapWrapper.forEach(m, function(v, k) {
          o.style.setProperty(k, v);
        });
      })
    });
    reflector.registerMethods({
      'onScroll': (function(o, args) {
        o.onScroll(args[0]);
      }),
      'setStage': (function(o, args) {
        return o.setStage(args[0]);
      })
    });
  }
  function setupReflectorForAngular() {
    reflector.registerType(If, {
      'factory': (function(vp) {
        return new If(vp);
      }),
      'parameters': [[ViewContainer]],
      'annotations': [new Viewport({
        selector: '[if]',
        bind: {'if': 'condition'}
      })]
    });
    reflector.registerType(Foreach, {
      'factory': (function(vp) {
        return new Foreach(vp);
      }),
      'parameters': [[ViewContainer]],
      'annotations': [new Viewport({
        selector: '[foreach]',
        lifecycle: [onChange],
        bind: {'in': 'iterable[]'}
      })]
    });
    reflector.registerType(Compiler, {
      "factory": (function(changeDetection, templateLoader, reader, parser, compilerCache, shadowDomStrategy, resolver) {
        return new Compiler(changeDetection, templateLoader, reader, parser, compilerCache, shadowDomStrategy, resolver);
      }),
      "parameters": [[ChangeDetection], [TemplateLoader], [DirectiveMetadataReader], [Parser], [CompilerCache], [ShadowDomStrategy], [TemplateResolver]],
      "annotations": []
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
      "factory": (function(xhr) {
        return new TemplateLoader(xhr);
      }),
      "parameters": [[XHR]],
      "annotations": []
    });
    reflector.registerType(TemplateResolver, {
      "factory": (function() {
        return new TemplateResolver();
      }),
      "parameters": [],
      "annotations": []
    });
    reflector.registerType(XHR, {
      "factory": (function() {
        return new XHRImpl();
      }),
      "parameters": [],
      "annotations": []
    });
    reflector.registerType(DirectiveMetadataReader, {
      'factory': (function() {
        return new DirectiveMetadataReader();
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
    reflector.registerType(ShadowDomStrategy, {
      "factory": (function() {
        return new NativeShadowDomStrategy();
      }),
      "parameters": [],
      "annotations": []
    });
  }
  $__export("main", main);
  $__export("setupReflector", setupReflector);
  $__export("setupReflectorForAngular", setupReflectorForAngular);
  return {
    setters: [function($__m) {
      int = $__m.int;
      isBlank = $__m.isBlank;
    }, function($__m) {
      Element = $__m.Element;
    }, function($__m) {
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      Parser = $__m.Parser;
      Lexer = $__m.Lexer;
      ChangeDetector = $__m.ChangeDetector;
      ChangeDetection = $__m.ChangeDetection;
    }, function($__m) {
      bootstrap = $__m.bootstrap;
      Component = $__m.Component;
      Viewport = $__m.Viewport;
      Template = $__m.Template;
      ViewContainer = $__m.ViewContainer;
      Compiler = $__m.Compiler;
      onChange = $__m.onChange;
    }, function($__m) {
      reflector = $__m.reflector;
    }, function($__m) {
      CompilerCache = $__m.CompilerCache;
    }, function($__m) {
      DirectiveMetadataReader = $__m.DirectiveMetadataReader;
    }, function($__m) {
      ShadowDomStrategy = $__m.ShadowDomStrategy;
      NativeShadowDomStrategy = $__m.NativeShadowDomStrategy;
    }, function($__m) {
      TemplateLoader = $__m.TemplateLoader;
    }, function($__m) {
      TemplateResolver = $__m.TemplateResolver;
    }, function($__m) {
      LifeCycle = $__m.LifeCycle;
    }, function($__m) {
      XHR = $__m.XHR;
    }, function($__m) {
      XHRImpl = $__m.XHRImpl;
    }, function($__m) {
      If = $__m.If;
      Foreach = $__m.Foreach;
    }, function($__m) {
      App = $__m.App;
      setupReflectorForApp = $__m.setupReflectorForApp;
    }, function($__m) {
      ScrollAreaComponent = $__m.ScrollAreaComponent;
      setupReflectorForScrollArea = $__m.setupReflectorForScrollArea;
    }, function($__m) {
      ScrollItemComponent = $__m.ScrollItemComponent;
      setupReflectorForScrollItem = $__m.setupReflectorForScrollItem;
    }, function($__m) {
      CompanyNameComponent = $__m.CompanyNameComponent;
      OpportunityNameComponent = $__m.OpportunityNameComponent;
      OfferingNameComponent = $__m.OfferingNameComponent;
      AccountCellComponent = $__m.AccountCellComponent;
      StageButtonsComponent = $__m.StageButtonsComponent;
      FormattedCellComponent = $__m.FormattedCellComponent;
      setupReflectorForCells = $__m.setupReflectorForCells;
    }],
    execute: function() {
    }
  };
});

//# sourceMappingURL=benchmarks/src/naive_infinite_scroll/index.map

//# sourceMappingURL=../../../benchmarks/src/naive_infinite_scroll/index.js.map