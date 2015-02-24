System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var assert,
      StringWrapper,
      RegExpWrapper,
      isPresent,
      BaseException,
      int,
      List,
      ListWrapper,
      _HOST_RE,
      _HOST_TOKEN,
      _HOST_TOKEN_RE,
      _PAREN_SUFFIX,
      _COLON_HOST_RE,
      _POLYFILL_NON_STRICT,
      _POLYFILL_UNSCOPED_NEXT_SELECTOR,
      _POLYFILL_NEXT_SELECTOR,
      _CONTENT_RE,
      _COMBINATORS,
      _COLON_SELECTORS,
      _SELECTOR_SPLITS,
      _SIMPLE_SELECTORS,
      _IS_SELECTORS,
      _$EOF,
      _$LBRACE,
      _$RBRACE,
      _$TAB,
      _$SPACE,
      _$NBSP,
      CssShim,
      _Token,
      _EOF_TOKEN,
      _Lexer,
      _Parser,
      _Rule;
  function shimCssText(css, tag) {
    assert.argumentTypes(css, assert.type.string, tag, assert.type.string);
    return new CssShim(tag).shimCssText(css);
  }
  $__export("shimCssText", shimCssText);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      StringWrapper = $__m.StringWrapper;
      RegExpWrapper = $__m.RegExpWrapper;
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
      int = $__m.int;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
    }],
    execute: function() {
      Object.defineProperty(shimCssText, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      _HOST_RE = RegExpWrapper.create(':host', 'i');
      _HOST_TOKEN = '-host-element';
      _HOST_TOKEN_RE = RegExpWrapper.create('-host-element');
      _PAREN_SUFFIX = ')(?:\\((' + '(?:\\([^)(]*\\)|[^)(]*)+?' + ')\\))?([^,{]*)';
      _COLON_HOST_RE = RegExpWrapper.create(("(" + _HOST_TOKEN + _PAREN_SUFFIX), 'im');
      _POLYFILL_NON_STRICT = 'polyfill-non-strict';
      _POLYFILL_UNSCOPED_NEXT_SELECTOR = 'polyfill-unscoped-next-selector';
      _POLYFILL_NEXT_SELECTOR = 'polyfill-next-selector';
      _CONTENT_RE = RegExpWrapper.create('[^}]*content:[\\s]*[\'"](.*?)[\'"][;\\s]*[^}]*}', 'im');
      _COMBINATORS = [RegExpWrapper.create('/shadow/', 'i'), RegExpWrapper.create('/shadow-deep/', 'i'), RegExpWrapper.create('::shadow', 'i'), RegExpWrapper.create('/deep/', 'i')];
      _COLON_SELECTORS = RegExpWrapper.create('(' + _HOST_TOKEN + ')(\\(.*\\))?(.*)', 'i');
      _SELECTOR_SPLITS = [' ', '>', '+', '~'];
      _SIMPLE_SELECTORS = RegExpWrapper.create('([^:]*)(:*)(.*)', 'i');
      _IS_SELECTORS = RegExpWrapper.create('\\[is=[\'"]([^\\]]*)[\'"]\\]', 'i');
      _$EOF = 0;
      _$LBRACE = 123;
      _$RBRACE = 125;
      _$TAB = 9;
      _$SPACE = 32;
      _$NBSP = 160;
      CssShim = $__export("CssShim", (function() {
        var CssShim = function CssShim(tag) {
          assert.argumentTypes(tag, assert.type.string);
          this._tag = tag;
          this._attr = ("[" + tag + "]");
        };
        return ($traceurRuntime.createClass)(CssShim, {
          shimCssText: function(css) {
            assert.argumentTypes(css, assert.type.string);
            var preprocessed = this.convertColonHost(css);
            var rules = this.cssToRules(preprocessed);
            return assert.returnType((this.scopeRules(rules)), assert.type.string);
          },
          convertColonHost: function(css) {
            assert.argumentTypes(css, assert.type.string);
            css = StringWrapper.replaceAll(css, _HOST_RE, _HOST_TOKEN);
            var partReplacer = function(host, part, suffix) {
              part = StringWrapper.replaceAll(part, _HOST_TOKEN_RE, '');
              return ("" + host + part + suffix);
            };
            return assert.returnType((StringWrapper.replaceAllMapped(css, _COLON_HOST_RE, function(m) {
              var base = _HOST_TOKEN;
              var inParens = m[2];
              var rest = m[3];
              if (isPresent(inParens)) {
                var srcParts = inParens.split(',');
                var dstParts = [];
                for (var i = 0; i < srcParts.length; i++) {
                  var part = srcParts[i].trim();
                  if (part.length > 0) {
                    ListWrapper.push(dstParts, partReplacer(base, part, rest));
                  }
                }
                return ListWrapper.join(dstParts, ',');
              } else {
                return ("" + base + rest);
              }
            })), assert.type.string);
          },
          cssToRules: function(css) {
            assert.argumentTypes(css, assert.type.string);
            return assert.returnType((new _Parser(css).parse()), assert.genericType(List, _Rule));
          },
          scopeRules: function(rules) {
            assert.argumentTypes(rules, assert.genericType(List, _Rule));
            var scopedRules = [];
            var prevRule = null;
            for (var i = 0; i < rules.length; i++) {
              var rule = rules[i];
              if (isPresent(prevRule) && prevRule.selectorText == _POLYFILL_NON_STRICT) {
                ListWrapper.push(scopedRules, this.scopeNonStrictMode(rule));
              } else if (isPresent(prevRule) && prevRule.selectorText == _POLYFILL_UNSCOPED_NEXT_SELECTOR) {
                var content = this.extractContent(prevRule);
                var r = new _Rule(content, rule.body, null);
                ListWrapper.push(scopedRules, this.ruleToString(r));
              } else if (isPresent(prevRule) && prevRule.selectorText == _POLYFILL_NEXT_SELECTOR) {
                var content = this.extractContent(prevRule);
                var r = new _Rule(content, rule.body, null);
                ListWrapper.push(scopedRules, this.scopeStrictMode(r));
              } else if (rule.selectorText != _POLYFILL_NON_STRICT && rule.selectorText != _POLYFILL_UNSCOPED_NEXT_SELECTOR && rule.selectorText != _POLYFILL_NEXT_SELECTOR) {
                ListWrapper.push(scopedRules, this.scopeStrictMode(rule));
              }
              prevRule = rule;
            }
            return assert.returnType((ListWrapper.join(scopedRules, '\n')), assert.type.string);
          },
          extractContent: function(rule) {
            assert.argumentTypes(rule, _Rule);
            var match = RegExpWrapper.firstMatch(_CONTENT_RE, rule.body);
            return assert.returnType((isPresent(match) ? match[1] : ''), assert.type.string);
          },
          ruleToString: function(rule) {
            assert.argumentTypes(rule, _Rule);
            return assert.returnType(((rule.selectorText + " " + rule.body)), assert.type.string);
          },
          scopeStrictMode: function(rule) {
            assert.argumentTypes(rule, _Rule);
            if (rule.hasNestedRules()) {
              var selector = rule.selectorText;
              var rules = this.scopeRules(rule.rules);
              return assert.returnType(((selector + " {\n" + rules + "\n}")), assert.type.string);
            }
            var scopedSelector = this.scopeSelector(rule.selectorText, true);
            var scopedBody = rule.body;
            return assert.returnType(((scopedSelector + " " + scopedBody)), assert.type.string);
          },
          scopeNonStrictMode: function(rule) {
            assert.argumentTypes(rule, _Rule);
            var scopedSelector = this.scopeSelector(rule.selectorText, false);
            var scopedBody = rule.body;
            return assert.returnType(((scopedSelector + " " + scopedBody)), assert.type.string);
          },
          scopeSelector: function(selector, strict) {
            assert.argumentTypes(selector, assert.type.string, strict, assert.type.boolean);
            var parts = this.replaceCombinators(selector).split(',');
            var scopedParts = [];
            for (var i = 0; i < parts.length; i++) {
              var part = parts[i];
              var sel = this.scopeSimpleSelector(part.trim(), strict);
              ListWrapper.push(scopedParts, sel);
            }
            return ListWrapper.join(scopedParts, ', ');
          },
          replaceCombinators: function(selector) {
            assert.argumentTypes(selector, assert.type.string);
            for (var i = 0; i < _COMBINATORS.length; i++) {
              var combinator = _COMBINATORS[i];
              selector = StringWrapper.replaceAll(selector, combinator, '');
            }
            return assert.returnType((selector), assert.type.string);
          },
          scopeSimpleSelector: function(selector, strict) {
            assert.argumentTypes(selector, assert.type.string, strict, assert.type.boolean);
            if (StringWrapper.contains(selector, _HOST_TOKEN)) {
              return this.replaceColonSelectors(selector);
            } else if (strict) {
              return this.insertTagToEverySelectorPart(selector);
            } else {
              return (this._tag + " " + selector);
            }
          },
          replaceColonSelectors: function(css) {
            var $__0 = this;
            assert.argumentTypes(css, assert.type.string);
            return assert.returnType((StringWrapper.replaceAllMapped(css, _COLON_SELECTORS, (function(m) {
              var selectorInParens;
              if (isPresent(m[2])) {
                var len = selectorInParens.length;
                selectorInParens = StringWrapper.substring(selectorInParens, 1, len - 1);
              } else {
                selectorInParens = '';
              }
              var rest = m[3];
              return ("" + $__0._tag + selectorInParens + rest);
            }))), assert.type.string);
          },
          insertTagToEverySelectorPart: function(selector) {
            assert.argumentTypes(selector, assert.type.string);
            selector = this.handleIsSelector(selector);
            for (var i = 0; i < _SELECTOR_SPLITS.length; i++) {
              var split = _SELECTOR_SPLITS[i];
              var parts = selector.split(split);
              for (var j = 0; j < parts.length; j++) {
                parts[j] = this.insertAttrSuffixIntoSelectorPart(parts[j].trim());
              }
              selector = parts.join(split);
            }
            return assert.returnType((selector), assert.type.string);
          },
          insertAttrSuffixIntoSelectorPart: function(p) {
            assert.argumentTypes(p, assert.type.string);
            var shouldInsert = p.length > 0 && !ListWrapper.contains(_SELECTOR_SPLITS, p) && !StringWrapper.contains(p, this._attr);
            return assert.returnType((shouldInsert ? this.insertAttr(p) : p), assert.type.string);
          },
          insertAttr: function(selector) {
            var $__0 = this;
            assert.argumentTypes(selector, assert.type.string);
            return assert.returnType((StringWrapper.replaceAllMapped(selector, _SIMPLE_SELECTORS, (function(m) {
              var basePart = m[1];
              var colonPart = m[2];
              var rest = m[3];
              return (m[0].length > 0) ? ("" + basePart + $__0._attr + colonPart + rest) : '';
            }))), assert.type.string);
          },
          handleIsSelector: function(selector) {
            assert.argumentTypes(selector, assert.type.string);
            return StringWrapper.replaceAllMapped(selector, _IS_SELECTORS, function(m) {
              return m[1];
            });
          }
        }, {});
      }()));
      Object.defineProperty(CssShim, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(CssShim.prototype.shimCssText, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(CssShim.prototype.convertColonHost, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(CssShim.prototype.cssToRules, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(CssShim.prototype.scopeRules, "parameters", {get: function() {
          return [[assert.genericType(List, _Rule)]];
        }});
      Object.defineProperty(CssShim.prototype.extractContent, "parameters", {get: function() {
          return [[_Rule]];
        }});
      Object.defineProperty(CssShim.prototype.ruleToString, "parameters", {get: function() {
          return [[_Rule]];
        }});
      Object.defineProperty(CssShim.prototype.scopeStrictMode, "parameters", {get: function() {
          return [[_Rule]];
        }});
      Object.defineProperty(CssShim.prototype.scopeNonStrictMode, "parameters", {get: function() {
          return [[_Rule]];
        }});
      Object.defineProperty(CssShim.prototype.scopeSelector, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.boolean]];
        }});
      Object.defineProperty(CssShim.prototype.replaceCombinators, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(CssShim.prototype.scopeSimpleSelector, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.boolean]];
        }});
      Object.defineProperty(CssShim.prototype.replaceColonSelectors, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(CssShim.prototype.insertTagToEverySelectorPart, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(CssShim.prototype.insertAttrSuffixIntoSelectorPart, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(CssShim.prototype.insertAttr, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(CssShim.prototype.handleIsSelector, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      _Token = (function() {
        var _Token = function _Token(string, type) {
          assert.argumentTypes(string, assert.type.string, type, assert.type.string);
          this.string = string;
          this.type = type;
        };
        return ($traceurRuntime.createClass)(_Token, {}, {});
      }());
      Object.defineProperty(_Token, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      _EOF_TOKEN = new _Token(null, null);
      _Lexer = (function() {
        var _Lexer = function _Lexer(input) {
          assert.argumentTypes(input, assert.type.string);
          this.input = input;
          this.length = input.length;
          this.index = -1;
          this.advance();
        };
        return ($traceurRuntime.createClass)(_Lexer, {
          parse: function() {
            var tokens = [];
            var token = this.scanToken();
            while (token !== _EOF_TOKEN) {
              ListWrapper.push(tokens, token);
              token = this.scanToken();
            }
            return assert.returnType((tokens), assert.genericType(List, _Token));
          },
          scanToken: function() {
            this.skipWhitespace();
            if (this.peek === _$EOF)
              return assert.returnType((_EOF_TOKEN), _Token);
            if (this.isBodyEnd(this.peek)) {
              this.advance();
              return assert.returnType((new _Token('}', 'rparen')), _Token);
            }
            if (this.isMedia(this.peek))
              return assert.returnType((this.scanMedia()), _Token);
            if (this.isSelector(this.peek))
              return assert.returnType((this.scanSelector()), _Token);
            if (this.isBodyStart(this.peek))
              return assert.returnType((this.scanBody()), _Token);
            return assert.returnType((_EOF_TOKEN), _Token);
          },
          isSelector: function(v) {
            assert.argumentTypes(v, int);
            return assert.returnType((!this.isBodyStart(v) && v !== _$EOF), assert.type.boolean);
          },
          isBodyStart: function(v) {
            assert.argumentTypes(v, int);
            return assert.returnType((v === _$LBRACE), assert.type.boolean);
          },
          isBodyEnd: function(v) {
            assert.argumentTypes(v, int);
            return assert.returnType((v === _$RBRACE), assert.type.boolean);
          },
          isMedia: function(v) {
            assert.argumentTypes(v, int);
            return assert.returnType((v === 64), assert.type.boolean);
          },
          isWhitespace: function(v) {
            assert.argumentTypes(v, int);
            return assert.returnType(((v >= _$TAB && v <= _$SPACE) || (v == _$NBSP)), assert.type.boolean);
          },
          skipWhitespace: function() {
            while (this.isWhitespace(this.peek)) {
              if (++this.index >= this.length) {
                this.peek = _$EOF;
                return ;
              } else {
                this.peek = StringWrapper.charCodeAt(this.input, this.index);
              }
            }
          },
          scanSelector: function() {
            var start = this.index;
            this.advance();
            while (this.isSelector(this.peek)) {
              this.advance();
            }
            var selector = StringWrapper.substring(this.input, start, this.index);
            return assert.returnType((new _Token(selector.trim(), 'selector')), _Token);
          },
          scanBody: function() {
            var start = this.index;
            this.advance();
            while (!this.isBodyEnd(this.peek)) {
              this.advance();
            }
            this.advance();
            var body = StringWrapper.substring(this.input, start, this.index);
            return assert.returnType((new _Token(body, 'body')), _Token);
          },
          scanMedia: function() {
            var start = this.index;
            this.advance();
            while (!this.isBodyStart(this.peek)) {
              this.advance();
            }
            var media = StringWrapper.substring(this.input, start, this.index);
            this.advance();
            return assert.returnType((new _Token(media, 'media')), _Token);
          },
          advance: function() {
            this.index++;
            if (this.index >= this.length) {
              this.peek = _$EOF;
            } else {
              this.peek = StringWrapper.charCodeAt(this.input, this.index);
            }
          }
        }, {});
      }());
      Object.defineProperty(_Lexer, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(_Lexer.prototype.isSelector, "parameters", {get: function() {
          return [[int]];
        }});
      Object.defineProperty(_Lexer.prototype.isBodyStart, "parameters", {get: function() {
          return [[int]];
        }});
      Object.defineProperty(_Lexer.prototype.isBodyEnd, "parameters", {get: function() {
          return [[int]];
        }});
      Object.defineProperty(_Lexer.prototype.isMedia, "parameters", {get: function() {
          return [[int]];
        }});
      Object.defineProperty(_Lexer.prototype.isWhitespace, "parameters", {get: function() {
          return [[int]];
        }});
      _Parser = (function() {
        var _Parser = function _Parser(input) {
          assert.argumentTypes(input, assert.type.string);
          this.tokens = new _Lexer(input).parse();
          this.currentIndex = -1;
        };
        return ($traceurRuntime.createClass)(_Parser, {
          parse: function() {
            var rules = [];
            var rule;
            while (isPresent(rule = this.parseRule())) {
              ListWrapper.push(rules, rule);
            }
            return assert.returnType((rules), assert.genericType(List, _Rule));
          },
          parseRule: function() {
            try {
              if (this.getNext().type === 'media') {
                return assert.returnType((this.parseMedia()), _Rule);
              } else {
                return assert.returnType((this.parseCssRule()), _Rule);
              }
            } catch (e) {
              return assert.returnType((null), _Rule);
            }
          },
          parseMedia: function() {
            this.advance('media');
            var media = this.getCurrent().string;
            var rules = [];
            while (this.getNext().type !== 'rparen') {
              ListWrapper.push(rules, this.parseCssRule());
            }
            this.advance('rparen');
            return assert.returnType((new _Rule(media.trim(), null, rules)), _Rule);
          },
          parseCssRule: function() {
            this.advance('selector');
            var selector = this.getCurrent().string;
            this.advance('body');
            var body = this.getCurrent().string;
            return new _Rule(selector, body, null);
          },
          advance: function(expected) {
            assert.argumentTypes(expected, assert.type.string);
            this.currentIndex++;
            if (this.getCurrent().type !== expected) {
              throw new BaseException(("Unexpected token \"" + this.getCurrent().type + "\". Expected \"" + expected + "\""));
            }
          },
          getNext: function() {
            return assert.returnType((this.tokens[this.currentIndex + 1]), _Token);
          },
          getCurrent: function() {
            return assert.returnType((this.tokens[this.currentIndex]), _Token);
          }
        }, {});
      }());
      Object.defineProperty(_Parser, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(_Parser.prototype.advance, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      _Rule = $__export("_Rule", (function() {
        var _Rule = function _Rule(selectorText, body, rules) {
          assert.argumentTypes(selectorText, assert.type.string, body, assert.type.string, rules, assert.genericType(List, _Rule));
          this.selectorText = selectorText;
          this.body = body;
          this.rules = rules;
        };
        return ($traceurRuntime.createClass)(_Rule, {hasNestedRules: function() {
            return isPresent(this.rules);
          }}, {});
      }()));
      Object.defineProperty(_Rule, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string], [assert.genericType(List, _Rule)]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/core/compiler/shadow_dom_emulation/shim_css.map

//# sourceMappingURL=../../../../../angular2/src/core/compiler/shadow_dom_emulation/shim_css.js.map