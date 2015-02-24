System.register(["angular2/src/facade/lang", "angular2/src/reflection/reflection", "angular2/src/test_lib/benchmark_util", "angular2/angular2", "angular2/src/facade/async", "angular2/src/facade/collection", "angular2/src/facade/dom", "angular2/src/facade/math", "./common", "./random_data", "./scroll_item", "angular2/directives"], function($__export) {
  "use strict";
  var int,
      FINAL,
      reflector,
      getIntParameter,
      bindAction,
      Component,
      Viewport,
      Template,
      ViewContainer,
      Compiler,
      PromiseWrapper,
      ListWrapper,
      MapWrapper,
      Element,
      Math,
      Offering,
      ITEMS,
      ITEM_HEIGHT,
      VISIBLE_ITEMS,
      VIEW_PORT_HEIGHT,
      ROW_WIDTH,
      HEIGHT,
      generateOfferings,
      ScrollItemComponent,
      Foreach,
      ScrollAreaComponent;
  function setupReflectorForScrollArea() {
    reflector.registerType(ScrollAreaComponent, {
      'factory': (function() {
        return new ScrollAreaComponent();
      }),
      'parameters': [],
      'annotations': [new Component({selector: 'scroll-area'}), new Template({
        directives: [ScrollItemComponent, Foreach],
        inline: "\n          <div>\n              <div id=\"scrollDiv\"\n                   [style]=\"scrollDivStyle\"\n                   on-scroll=\"onScroll($event)\">\n                  <div id=\"padding\"></div>\n                  <div id=\"inner\">\n                      <scroll-item\n                          template=\"foreach #item in visibleItems\"\n                          [offering]=\"item\">\n                      </scroll-item>\n                  </div>\n              </div>\n          </div>"
      })]
    });
  }
  $__export("setupReflectorForScrollArea", setupReflectorForScrollArea);
  return {
    setters: [function($__m) {
      int = $__m.int;
      FINAL = $__m.FINAL;
    }, function($__m) {
      reflector = $__m.reflector;
    }, function($__m) {
      getIntParameter = $__m.getIntParameter;
      bindAction = $__m.bindAction;
    }, function($__m) {
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
      Element = $__m.Element;
    }, function($__m) {
      Math = $__m.Math;
    }, function($__m) {
      Offering = $__m.Offering;
      ITEMS = $__m.ITEMS;
      ITEM_HEIGHT = $__m.ITEM_HEIGHT;
      VISIBLE_ITEMS = $__m.VISIBLE_ITEMS;
      VIEW_PORT_HEIGHT = $__m.VIEW_PORT_HEIGHT;
      ROW_WIDTH = $__m.ROW_WIDTH;
      HEIGHT = $__m.HEIGHT;
    }, function($__m) {
      generateOfferings = $__m.generateOfferings;
    }, function($__m) {
      ScrollItemComponent = $__m.ScrollItemComponent;
    }, function($__m) {
      Foreach = $__m.Foreach;
    }],
    execute: function() {
      ScrollAreaComponent = $__export("ScrollAreaComponent", (function() {
        var ScrollAreaComponent = function ScrollAreaComponent() {
          this._fullList = generateOfferings(ITEMS);
          this.visibleItems = [];
          this.scrollDivStyle = MapWrapper.createFromPairs([['height', (VIEW_PORT_HEIGHT + "px")], ['width', '1000px'], ['border', '1px solid #000'], ['overflow', 'scroll']]);
          this.onScroll(null);
        };
        return ($traceurRuntime.createClass)(ScrollAreaComponent, {onScroll: function(evt) {
            var scrollTop = 0;
            if (evt != null) {
              var scrollDiv = evt.target;
              if (this.paddingDiv == null) {
                this.paddingDiv = scrollDiv.querySelector('#padding');
              }
              if (this.innerDiv == null) {
                this.innerDiv = scrollDiv.querySelector('#inner');
                this.innerDiv.style.setProperty('width', (ROW_WIDTH + "px"));
              }
              scrollTop = scrollDiv.scrollTop;
            }
            var iStart = Math.floor(scrollTop / ITEM_HEIGHT);
            var iEnd = Math.min(iStart + VISIBLE_ITEMS + 1, this._fullList.length);
            var padding = iStart * ITEM_HEIGHT;
            if (this.innerDiv != null) {
              this.innerDiv.style.setProperty('height', ((HEIGHT - padding) + "px"));
            }
            if (this.paddingDiv != null) {
              this.paddingDiv.style.setProperty('height', (padding + "px"));
            }
            this.visibleItems = ListWrapper.slice(this._fullList, iStart, iEnd);
          }}, {});
      }()));
    }
  };
});

//# sourceMappingURL=benchmarks/src/naive_infinite_scroll/scroll_area.map

//# sourceMappingURL=../../../benchmarks/src/naive_infinite_scroll/scroll_area.js.map