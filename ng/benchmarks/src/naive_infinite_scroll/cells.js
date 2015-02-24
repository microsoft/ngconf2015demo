System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/reflection/reflection", "angular2/src/test_lib/benchmark_util", "angular2/angular2", "angular2/src/facade/async", "angular2/src/facade/collection", "./common", "angular2/directives"], function($__export) {
  "use strict";
  var assert,
      int,
      reflector,
      getIntParameter,
      bindAction,
      bootstrap,
      Component,
      Viewport,
      Template,
      ViewContainer,
      Compiler,
      PromiseWrapper,
      ListWrapper,
      MapWrapper,
      Company,
      Opportunity,
      Offering,
      Account,
      CustomDate,
      STATUS_LIST,
      Foreach,
      HasStyle,
      CompanyNameComponent,
      OpportunityNameComponent,
      OfferingNameComponent,
      Stage,
      StageButtonsComponent,
      AccountCellComponent,
      FormattedCellComponent;
  function setupReflectorForCells() {
    reflector.registerType(CompanyNameComponent, {
      'factory': (function() {
        return new CompanyNameComponent();
      }),
      'parameters': [],
      'annotations': [new Component({
        selector: 'company-name',
        bind: {
          'cell-width': 'width',
          'company': 'company'
        }
      }), new Template({
        directives: [],
        inline: "<div [style]=\"style\">{{company.name}}</div>"
      })]
    });
    reflector.registerType(OpportunityNameComponent, {
      'factory': (function() {
        return new OpportunityNameComponent();
      }),
      'parameters': [],
      'annotations': [new Component({
        selector: 'opportunity-name',
        bind: {
          'cell-width': 'width',
          'opportunity': 'opportunity'
        }
      }), new Template({
        directives: [],
        inline: "<div [style]=\"style\">{{opportunity.name}}</div>"
      })]
    });
    reflector.registerType(OfferingNameComponent, {
      'factory': (function() {
        return new OfferingNameComponent();
      }),
      'parameters': [],
      'annotations': [new Component({
        selector: 'offering-name',
        bind: {
          'cell-width': 'width',
          'offering': 'offering'
        }
      }), new Template({
        directives: [],
        inline: "<div [style]=\"style\">{{offering.name}}</div>"
      })]
    });
    reflector.registerType(StageButtonsComponent, {
      'factory': (function() {
        return new StageButtonsComponent();
      }),
      'parameters': [],
      'annotations': [new Component({
        selector: 'stage-buttons',
        bind: {
          'cell-width': 'width',
          'offering': 'offering'
        }
      }), new Template({
        directives: [Foreach],
        inline: "\n            <div [style]=\"style\">\n                <button template=\"foreach #stage in stages\"\n                        [disabled]=\"stage.isDisabled\"\n                        [style]=\"stage.style\"\n                        on-click=\"setStage(stage)\">\n                  {{stage.name}}\n                </button>\n            </div>"
      })]
    });
    reflector.registerType(AccountCellComponent, {
      'factory': (function() {
        return new AccountCellComponent();
      }),
      'parameters': [],
      'annotations': [new Component({
        selector: 'account-cell',
        bind: {
          'cell-width': 'width',
          'account': 'account'
        }
      }), new Template({
        directives: [],
        inline: "\n            <div [style]=\"style\">\n              <a href=\"/account/{{account.accountId}}\">\n                {{account.accountId}}\n              </a>\n            </div>"
      })]
    });
    reflector.registerType(FormattedCellComponent, {
      'factory': (function() {
        return new FormattedCellComponent();
      }),
      'parameters': [],
      'annotations': [new Component({
        selector: 'formatted-cell',
        bind: {
          'cell-width': 'width',
          'value': 'value'
        }
      }), new Template({
        directives: [],
        inline: "<div [style]=\"style\">{{formattedValue}}</div>"
      })]
    });
  }
  $__export("setupReflectorForCells", setupReflectorForCells);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      int = $__m.int;
    }, function($__m) {
      reflector = $__m.reflector;
    }, function($__m) {
      getIntParameter = $__m.getIntParameter;
      bindAction = $__m.bindAction;
    }, function($__m) {
      bootstrap = $__m.bootstrap;
      Component = $__m.Component;
      Viewport = $__m.Viewport;
      Template = $__m.Template;
      ViewContainer = $__m.ViewContainer;
      Compiler = $__m.Compiler;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      Company = $__m.Company;
      Opportunity = $__m.Opportunity;
      Offering = $__m.Offering;
      Account = $__m.Account;
      CustomDate = $__m.CustomDate;
      STATUS_LIST = $__m.STATUS_LIST;
    }, function($__m) {
      Foreach = $__m.Foreach;
    }],
    execute: function() {
      HasStyle = $__export("HasStyle", (function() {
        var HasStyle = function HasStyle() {
          this.style = MapWrapper.create();
        };
        return ($traceurRuntime.createClass)(HasStyle, {set width(w) {
            MapWrapper.set(this.style, 'width', w);
          }}, {});
      }()));
      CompanyNameComponent = $__export("CompanyNameComponent", (function($__super) {
        var CompanyNameComponent = function CompanyNameComponent() {
          $traceurRuntime.superConstructor(CompanyNameComponent).apply(this, arguments);
        };
        return ($traceurRuntime.createClass)(CompanyNameComponent, {}, {}, $__super);
      }(HasStyle)));
      OpportunityNameComponent = $__export("OpportunityNameComponent", (function($__super) {
        var OpportunityNameComponent = function OpportunityNameComponent() {
          $traceurRuntime.superConstructor(OpportunityNameComponent).apply(this, arguments);
        };
        return ($traceurRuntime.createClass)(OpportunityNameComponent, {}, {}, $__super);
      }(HasStyle)));
      OfferingNameComponent = $__export("OfferingNameComponent", (function($__super) {
        var OfferingNameComponent = function OfferingNameComponent() {
          $traceurRuntime.superConstructor(OfferingNameComponent).apply(this, arguments);
        };
        return ($traceurRuntime.createClass)(OfferingNameComponent, {}, {}, $__super);
      }(HasStyle)));
      Stage = $__export("Stage", (function() {
        var Stage = function Stage() {};
        return ($traceurRuntime.createClass)(Stage, {}, {});
      }()));
      StageButtonsComponent = $__export("StageButtonsComponent", (function($__super) {
        var StageButtonsComponent = function StageButtonsComponent() {
          $traceurRuntime.superConstructor(StageButtonsComponent).apply(this, arguments);
        };
        return ($traceurRuntime.createClass)(StageButtonsComponent, {
          get offering() {
            return assert.returnType((this._offering), Offering);
          },
          set offering(offering) {
            assert.argumentTypes(offering, Offering);
            this._offering = offering;
            this._computeStageButtons();
          },
          setStage: function(stage) {
            assert.argumentTypes(stage, Stage);
            this._offering.status = stage.name;
            this._computeStageButtons();
          },
          _computeStageButtons: function() {
            var $__0 = this;
            var disabled = true;
            this.stages = ListWrapper.clone(STATUS_LIST.map((function(status) {
              var isCurrent = $__0._offering.status == status;
              var stage = new Stage();
              stage.name = status;
              stage.isDisabled = disabled;
              var stageStyle = MapWrapper.create();
              MapWrapper.set(stageStyle, 'background-color', disabled ? '#DDD' : isCurrent ? '#DDF' : '#FDD');
              stage.style = stageStyle;
              if (isCurrent) {
                disabled = false;
              }
              return stage;
            })));
          }
        }, {}, $__super);
      }(HasStyle)));
      Object.defineProperty(Object.getOwnPropertyDescriptor(StageButtonsComponent.prototype, "offering").set, "parameters", {get: function() {
          return [[Offering]];
        }});
      Object.defineProperty(StageButtonsComponent.prototype.setStage, "parameters", {get: function() {
          return [[Stage]];
        }});
      AccountCellComponent = $__export("AccountCellComponent", (function($__super) {
        var AccountCellComponent = function AccountCellComponent() {
          $traceurRuntime.superConstructor(AccountCellComponent).apply(this, arguments);
        };
        return ($traceurRuntime.createClass)(AccountCellComponent, {}, {}, $__super);
      }(HasStyle)));
      FormattedCellComponent = $__export("FormattedCellComponent", (function($__super) {
        var FormattedCellComponent = function FormattedCellComponent() {
          $traceurRuntime.superConstructor(FormattedCellComponent).apply(this, arguments);
        };
        return ($traceurRuntime.createClass)(FormattedCellComponent, {set value(value) {
            if (value instanceof CustomDate) {
              this.formattedValue = (value.month + "/" + value.day + "/" + value.year);
            } else {
              this.formattedValue = value.toString();
            }
          }}, {}, $__super);
      }(HasStyle)));
    }
  };
});

//# sourceMappingURL=benchmarks/src/naive_infinite_scroll/cells.map

//# sourceMappingURL=../../../benchmarks/src/naive_infinite_scroll/cells.js.map