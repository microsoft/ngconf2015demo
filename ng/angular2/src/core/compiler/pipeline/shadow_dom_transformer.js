System.register(["rtts_assert/rtts_assert", "./compile_step", "./compile_element", "./compile_control", "angular2/src/core/compiler/directive_metadata", "angular2/src/core/compiler/shadow_dom_strategy", "angular2/src/core/compiler/shadow_dom_emulation/shim_css", "angular2/src/facade/dom", "angular2/src/facade/lang", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var assert,
      CompileStep,
      CompileElement,
      CompileControl,
      DirectiveMetadata,
      ShadowDomStrategy,
      shimCssText,
      DOM,
      Element,
      isPresent,
      isBlank,
      StringMapWrapper,
      _cssCache,
      ShadowDomTransformer;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      CompileStep = $__m.CompileStep;
    }, function($__m) {
      CompileElement = $__m.CompileElement;
    }, function($__m) {
      CompileControl = $__m.CompileControl;
    }, function($__m) {
      DirectiveMetadata = $__m.DirectiveMetadata;
    }, function($__m) {
      ShadowDomStrategy = $__m.ShadowDomStrategy;
    }, function($__m) {
      shimCssText = $__m.shimCssText;
    }, function($__m) {
      DOM = $__m.DOM;
      Element = $__m.Element;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
    }, function($__m) {
      StringMapWrapper = $__m.StringMapWrapper;
    }],
    execute: function() {
      _cssCache = StringMapWrapper.create();
      ShadowDomTransformer = $__export("ShadowDomTransformer", (function($__super) {
        var ShadowDomTransformer = function ShadowDomTransformer(cmpMetadata, strategy, styleHost) {
          assert.argumentTypes(cmpMetadata, DirectiveMetadata, strategy, ShadowDomStrategy, styleHost, Element);
          $traceurRuntime.superConstructor(ShadowDomTransformer).call(this);
          this._strategy = strategy;
          this._selector = cmpMetadata.annotation.selector;
          this._styleHost = styleHost;
          this._lastInsertedStyle = null;
        };
        return ($traceurRuntime.createClass)(ShadowDomTransformer, {
          process: function(parent, current, control) {
            assert.argumentTypes(parent, CompileElement, current, CompileElement, control, CompileControl);
            if (DOM.tagName(current.element) == 'STYLE') {
              current.ignoreBindings = true;
              if (this._strategy.extractStyles()) {
                DOM.remove(current.element);
                var css = DOM.getText(current.element);
                if (this._strategy.shim()) {
                  css = shimCssText(css, this._selector);
                  this._insertStyle(this._styleHost, css);
                } else {
                  var seen = isPresent(StringMapWrapper.get(_cssCache, css));
                  if (!seen) {
                    StringMapWrapper.set(_cssCache, css, true);
                    this._insertStyle(this._styleHost, css);
                  }
                }
              }
            } else {
              if (this._strategy.shim()) {
                try {
                  DOM.setAttribute(current.element, this._selector, '');
                } catch (e) {}
              }
            }
          },
          clearCache: function() {
            _cssCache = StringMapWrapper.create();
          },
          _insertStyle: function(el, css) {
            assert.argumentTypes(el, Element, css, assert.type.string);
            var style = DOM.createStyleElement(css);
            if (isBlank(this._lastInsertedStyle)) {
              var firstChild = DOM.firstChild(el);
              if (isPresent(firstChild)) {
                DOM.insertBefore(firstChild, style);
              } else {
                DOM.appendChild(el, style);
              }
            } else {
              DOM.insertAfter(this._lastInsertedStyle, style);
            }
            this._lastInsertedStyle = style;
          }
        }, {}, $__super);
      }(CompileStep)));
      Object.defineProperty(ShadowDomTransformer, "parameters", {get: function() {
          return [[DirectiveMetadata], [ShadowDomStrategy], [Element]];
        }});
      Object.defineProperty(ShadowDomTransformer.prototype.process, "parameters", {get: function() {
          return [[CompileElement], [CompileElement], [CompileControl]];
        }});
      Object.defineProperty(ShadowDomTransformer.prototype._insertStyle, "parameters", {get: function() {
          return [[Element], [assert.type.string]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/core/compiler/pipeline/shadow_dom_transformer.map

//# sourceMappingURL=../../../../../angular2/src/core/compiler/pipeline/shadow_dom_transformer.js.map