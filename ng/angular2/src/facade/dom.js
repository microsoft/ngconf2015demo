System.register(["rtts_assert/rtts_assert", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var assert,
      List,
      MapWrapper,
      ListWrapper,
      window,
      DocumentFragment,
      Node,
      NodeList,
      Text,
      Element,
      TemplateElement,
      StyleElement,
      document,
      location,
      gc,
      DOM;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      List = $__m.List;
      MapWrapper = $__m.MapWrapper;
      ListWrapper = $__m.ListWrapper;
    }],
    execute: function() {
      window = $__export("window", frames.window);
      DocumentFragment = $__export("DocumentFragment", window.DocumentFragment);
      Node = $__export("Node", window.Node);
      NodeList = $__export("NodeList", window.NodeList);
      Text = $__export("Text", window.Text);
      Element = $__export("Element", window.HTMLElement);
      TemplateElement = $__export("TemplateElement", window.HTMLTemplateElement);
      StyleElement = $__export("StyleElement", window.HTMLStyleElement);
      document = $__export("document", window.document);
      location = $__export("location", window.location);
      gc = $__export("gc", window.gc ? (function() {
        return window.gc();
      }) : (function() {
        return null;
      }));
      DOM = $__export("DOM", (function() {
        var DOM = function DOM() {};
        return ($traceurRuntime.createClass)(DOM, {}, {
          query: function(selector) {
            return document.querySelector(selector);
          },
          querySelector: function(el, selector) {
            assert.argumentTypes(el, assert.type.any, selector, assert.type.string);
            return assert.returnType((el.querySelector(selector)), Node);
          },
          querySelectorAll: function(el, selector) {
            assert.argumentTypes(el, assert.type.any, selector, assert.type.string);
            return assert.returnType((el.querySelectorAll(selector)), NodeList);
          },
          on: function(el, evt, listener) {
            el.addEventListener(evt, listener, false);
          },
          dispatchEvent: function(el, evt) {
            el.dispatchEvent(evt);
          },
          createMouseEvent: function(eventType) {
            var evt = new MouseEvent(eventType);
            evt.initEvent(eventType, true, true);
            return evt;
          },
          createEvent: function(eventType) {
            return new Event(eventType, true);
          },
          getInnerHTML: function(el) {
            return el.innerHTML;
          },
          getOuterHTML: function(el) {
            return el.outerHTML;
          },
          firstChild: function(el) {
            return assert.returnType((el.firstChild), Node);
          },
          nextSibling: function(el) {
            return assert.returnType((el.nextSibling), Node);
          },
          parentElement: function(el) {
            return el.parentElement;
          },
          childNodes: function(el) {
            return assert.returnType((el.childNodes), NodeList);
          },
          childNodesAsList: function(el) {
            var childNodes = el.childNodes;
            var res = ListWrapper.createFixedSize(childNodes.length);
            for (var i = 0; i < childNodes.length; i++) {
              res[i] = childNodes[i];
            }
            return assert.returnType((res), List);
          },
          clearNodes: function(el) {
            el.innerHTML = "";
          },
          appendChild: function(el, node) {
            el.appendChild(node);
          },
          removeChild: function(el, node) {
            el.removeChild(node);
          },
          remove: function(el) {
            assert.argumentTypes(el, Element);
            var parent = el.parentNode;
            parent.removeChild(el);
            return assert.returnType((el), Element);
          },
          insertBefore: function(el, node) {
            el.parentNode.insertBefore(node, el);
          },
          insertAllBefore: function(el, nodes) {
            ListWrapper.forEach(nodes, (function(n) {
              el.parentNode.insertBefore(n, el);
            }));
          },
          insertAfter: function(el, node) {
            el.parentNode.insertBefore(node, el.nextSibling);
          },
          setInnerHTML: function(el, value) {
            el.innerHTML = value;
          },
          getText: function(el) {
            assert.argumentTypes(el, Element);
            return el.textContent;
          },
          setText: function(el, value) {
            assert.argumentTypes(el, assert.type.any, value, assert.type.string);
            el.textContent = value;
          },
          createTemplate: function(html) {
            var t = document.createElement('template');
            t.innerHTML = html;
            return t;
          },
          createElement: function(tagName) {
            var doc = arguments[1] !== (void 0) ? arguments[1] : document;
            return doc.createElement(tagName);
          },
          createScriptTag: function(attrName, attrValue) {
            var doc = arguments[2] !== (void 0) ? arguments[2] : document;
            assert.argumentTypes(attrName, assert.type.string, attrValue, assert.type.string, doc, assert.type.any);
            var el = doc.createElement("SCRIPT");
            el.setAttribute(attrName, attrValue);
            return el;
          },
          createStyleElement: function(css) {
            var doc = arguments[1] !== (void 0) ? arguments[1] : document;
            assert.argumentTypes(css, assert.type.string, doc, assert.type.any);
            var style = doc.createElement('STYLE');
            style.innerText = css;
            return assert.returnType((style), StyleElement);
          },
          clone: function(node) {
            assert.argumentTypes(node, Node);
            return node.cloneNode(true);
          },
          hasProperty: function(element, name) {
            assert.argumentTypes(element, Element, name, assert.type.string);
            return name in element;
          },
          getElementsByClassName: function(element, name) {
            assert.argumentTypes(element, Element, name, assert.type.string);
            return element.getElementsByClassName(name);
          },
          getElementsByTagName: function(element, name) {
            assert.argumentTypes(element, Element, name, assert.type.string);
            return element.getElementsByTagName(name);
          },
          classList: function(element) {
            assert.argumentTypes(element, Element);
            return assert.returnType((Array.prototype.slice.call(element.classList, 0)), List);
          },
          addClass: function(element, classname) {
            assert.argumentTypes(element, Element, classname, assert.type.string);
            element.classList.add(classname);
          },
          removeClass: function(element, classname) {
            assert.argumentTypes(element, Element, classname, assert.type.string);
            element.classList.remove(classname);
          },
          hasClass: function(element, classname) {
            assert.argumentTypes(element, Element, classname, assert.type.string);
            return element.classList.contains(classname);
          },
          setStyle: function(element, stylename, stylevalue) {
            assert.argumentTypes(element, Element, stylename, assert.type.string, stylevalue, assert.type.string);
            element.style[stylename] = stylevalue;
          },
          removeStyle: function(element, stylename) {
            assert.argumentTypes(element, Element, stylename, assert.type.string);
            element.style[stylename] = null;
          },
          getStyle: function(element, stylename) {
            assert.argumentTypes(element, Element, stylename, assert.type.string);
            return element.style[stylename];
          },
          tagName: function(element) {
            assert.argumentTypes(element, Element);
            return assert.returnType((element.tagName), assert.type.string);
          },
          attributeMap: function(element) {
            assert.argumentTypes(element, Element);
            var res = MapWrapper.create();
            var elAttrs = element.attributes;
            for (var i = 0; i < elAttrs.length; i++) {
              var attrib = elAttrs[i];
              MapWrapper.set(res, attrib.name, attrib.value);
            }
            return res;
          },
          getAttribute: function(element, attribute) {
            assert.argumentTypes(element, Element, attribute, assert.type.string);
            return element.getAttribute(attribute);
          },
          setAttribute: function(element, name, value) {
            assert.argumentTypes(element, Element, name, assert.type.string, value, assert.type.string);
            element.setAttribute(name, value);
          },
          removeAttribute: function(element, attribute) {
            assert.argumentTypes(element, Element, attribute, assert.type.string);
            return element.removeAttribute(attribute);
          },
          templateAwareRoot: function(el) {
            assert.argumentTypes(el, Element);
            return assert.returnType((el instanceof TemplateElement ? el.content : el), Node);
          },
          createHtmlDocument: function() {
            return document.implementation.createHTMLDocument();
          },
          defaultDoc: function() {
            return document;
          },
          elementMatches: function(n, selector) {
            assert.argumentTypes(n, assert.type.any, selector, assert.type.string);
            return assert.returnType((n instanceof Element && n.matches(selector)), assert.type.boolean);
          }
        });
      }()));
      Object.defineProperty(DOM.querySelector, "parameters", {get: function() {
          return [[], [assert.type.string]];
        }});
      Object.defineProperty(DOM.querySelectorAll, "parameters", {get: function() {
          return [[], [assert.type.string]];
        }});
      Object.defineProperty(DOM.remove, "parameters", {get: function() {
          return [[Element]];
        }});
      Object.defineProperty(DOM.getText, "parameters", {get: function() {
          return [[Element]];
        }});
      Object.defineProperty(DOM.setText, "parameters", {get: function() {
          return [[], [assert.type.string]];
        }});
      Object.defineProperty(DOM.createScriptTag, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string], []];
        }});
      Object.defineProperty(DOM.createStyleElement, "parameters", {get: function() {
          return [[assert.type.string], []];
        }});
      Object.defineProperty(DOM.clone, "parameters", {get: function() {
          return [[Node]];
        }});
      Object.defineProperty(DOM.hasProperty, "parameters", {get: function() {
          return [[Element], [assert.type.string]];
        }});
      Object.defineProperty(DOM.getElementsByClassName, "parameters", {get: function() {
          return [[Element], [assert.type.string]];
        }});
      Object.defineProperty(DOM.getElementsByTagName, "parameters", {get: function() {
          return [[Element], [assert.type.string]];
        }});
      Object.defineProperty(DOM.classList, "parameters", {get: function() {
          return [[Element]];
        }});
      Object.defineProperty(DOM.addClass, "parameters", {get: function() {
          return [[Element], [assert.type.string]];
        }});
      Object.defineProperty(DOM.removeClass, "parameters", {get: function() {
          return [[Element], [assert.type.string]];
        }});
      Object.defineProperty(DOM.hasClass, "parameters", {get: function() {
          return [[Element], [assert.type.string]];
        }});
      Object.defineProperty(DOM.setStyle, "parameters", {get: function() {
          return [[Element], [assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(DOM.removeStyle, "parameters", {get: function() {
          return [[Element], [assert.type.string]];
        }});
      Object.defineProperty(DOM.getStyle, "parameters", {get: function() {
          return [[Element], [assert.type.string]];
        }});
      Object.defineProperty(DOM.tagName, "parameters", {get: function() {
          return [[Element]];
        }});
      Object.defineProperty(DOM.attributeMap, "parameters", {get: function() {
          return [[Element]];
        }});
      Object.defineProperty(DOM.getAttribute, "parameters", {get: function() {
          return [[Element], [assert.type.string]];
        }});
      Object.defineProperty(DOM.setAttribute, "parameters", {get: function() {
          return [[Element], [assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(DOM.removeAttribute, "parameters", {get: function() {
          return [[Element], [assert.type.string]];
        }});
      Object.defineProperty(DOM.templateAwareRoot, "parameters", {get: function() {
          return [[Element]];
        }});
      Object.defineProperty(DOM.elementMatches, "parameters", {get: function() {
          return [[], [assert.type.string]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/facade/dom.map

//# sourceMappingURL=../../../angular2/src/facade/dom.js.map