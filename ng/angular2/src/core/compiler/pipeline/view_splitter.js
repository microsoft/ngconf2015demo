System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/dom", "angular2/src/facade/collection", "angular2/change_detection", "./compile_step", "./compile_element", "./compile_control", "angular2/src/change_detection/parser/lexer"], function($__export) {
  "use strict";
  var assert,
      isBlank,
      isPresent,
      BaseException,
      DOM,
      TemplateElement,
      MapWrapper,
      ListWrapper,
      Parser,
      CompileStep,
      CompileElement,
      CompileControl,
      StringWrapper,
      $BANG,
      ViewSplitter;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
      StringWrapper = $__m.StringWrapper;
    }, function($__m) {
      DOM = $__m.DOM;
      TemplateElement = $__m.TemplateElement;
    }, function($__m) {
      MapWrapper = $__m.MapWrapper;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      Parser = $__m.Parser;
    }, function($__m) {
      CompileStep = $__m.CompileStep;
    }, function($__m) {
      CompileElement = $__m.CompileElement;
    }, function($__m) {
      CompileControl = $__m.CompileControl;
    }, function($__m) {
      $BANG = $__m.$BANG;
    }],
    execute: function() {
      ViewSplitter = $__export("ViewSplitter", (function($__super) {
        var ViewSplitter = function ViewSplitter(parser, compilationUnit) {
          assert.argumentTypes(parser, Parser, compilationUnit, assert.type.any);
          $traceurRuntime.superConstructor(ViewSplitter).call(this);
          this._parser = parser;
          this._compilationUnit = compilationUnit;
        };
        return ($traceurRuntime.createClass)(ViewSplitter, {
          process: function(parent, current, control) {
            assert.argumentTypes(parent, CompileElement, current, CompileElement, control, CompileControl);
            if (isBlank(parent)) {
              current.isViewRoot = true;
            } else {
              if (current.element instanceof TemplateElement) {
                if (!current.isViewRoot) {
                  var viewRoot = new CompileElement(DOM.createTemplate(''));
                  var currentElement = assert.type(current.element, TemplateElement);
                  var viewRootElement = assert.type(viewRoot.element, TemplateElement);
                  this._moveChildNodes(currentElement.content, viewRootElement.content);
                  viewRoot.isViewRoot = true;
                  control.addChild(viewRoot);
                }
              } else {
                var attrs = current.attrs();
                var templateBindings = MapWrapper.get(attrs, 'template');
                var hasTemplateBinding = isPresent(templateBindings);
                MapWrapper.forEach(attrs, (function(attrValue, attrName) {
                  if (StringWrapper.charCodeAt(attrName, 0) == $BANG) {
                    var key = StringWrapper.substring(attrName, 1);
                    if (hasTemplateBinding) {
                      throw new BaseException("Only one template directive per element is allowed: " + (templateBindings + " and " + key + " cannot be used simultaneously!"));
                    } else {
                      templateBindings = (attrValue.length == 0) ? key : key + ' ' + attrValue;
                      hasTemplateBinding = true;
                    }
                  }
                }));
                if (hasTemplateBinding) {
                  var newParent = new CompileElement(DOM.createTemplate(''));
                  current.isViewRoot = true;
                  this._parseTemplateBindings(templateBindings, newParent);
                  this._addParentElement(current.element, newParent.element);
                  control.addParent(newParent);
                  current.element.remove();
                }
              }
            }
          },
          _moveChildNodes: function(source, target) {
            while (isPresent(source.firstChild)) {
              DOM.appendChild(target, source.firstChild);
            }
          },
          _addParentElement: function(currentElement, newParentElement) {
            DOM.insertBefore(currentElement, newParentElement);
            DOM.appendChild(newParentElement, currentElement);
          },
          _parseTemplateBindings: function(templateBindings, compileElement) {
            assert.argumentTypes(templateBindings, assert.type.string, compileElement, CompileElement);
            var bindings = this._parser.parseTemplateBindings(templateBindings, this._compilationUnit);
            for (var i = 0; i < bindings.length; i++) {
              var binding = bindings[i];
              if (binding.keyIsVar) {
                compileElement.addVariableBinding(binding.key, binding.name);
              } else if (isPresent(binding.expression)) {
                compileElement.addPropertyBinding(binding.key, binding.expression);
              } else {
                compileElement.element.setAttribute(binding.key, '');
              }
            }
          }
        }, {}, $__super);
      }(CompileStep)));
      Object.defineProperty(ViewSplitter, "parameters", {get: function() {
          return [[Parser], [assert.type.any]];
        }});
      Object.defineProperty(ViewSplitter.prototype.process, "parameters", {get: function() {
          return [[CompileElement], [CompileElement], [CompileControl]];
        }});
      Object.defineProperty(ViewSplitter.prototype._parseTemplateBindings, "parameters", {get: function() {
          return [[assert.type.string], [CompileElement]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/core/compiler/pipeline/view_splitter.map

//# sourceMappingURL=../../../../../angular2/src/core/compiler/pipeline/view_splitter.js.map