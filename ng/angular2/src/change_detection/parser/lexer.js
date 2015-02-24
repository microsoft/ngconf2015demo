System.register(["rtts_assert/rtts_assert", "angular2/src/facade/collection", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var assert,
      List,
      ListWrapper,
      SetWrapper,
      int,
      FIELD,
      NumberWrapper,
      StringJoiner,
      StringWrapper,
      TOKEN_TYPE_CHARACTER,
      TOKEN_TYPE_IDENTIFIER,
      TOKEN_TYPE_KEYWORD,
      TOKEN_TYPE_STRING,
      TOKEN_TYPE_OPERATOR,
      TOKEN_TYPE_NUMBER,
      Lexer,
      Token,
      EOF,
      $EOF,
      $TAB,
      $LF,
      $VTAB,
      $FF,
      $CR,
      $SPACE,
      $BANG,
      $DQ,
      $HASH,
      $$,
      $PERCENT,
      $AMPERSAND,
      $SQ,
      $LPAREN,
      $RPAREN,
      $STAR,
      $PLUS,
      $COMMA,
      $MINUS,
      $PERIOD,
      $SLASH,
      $COLON,
      $SEMICOLON,
      $LT,
      $EQ,
      $GT,
      $QUESTION,
      $0,
      $9,
      $A,
      $B,
      $C,
      $D,
      $E,
      $F,
      $G,
      $H,
      $I,
      $J,
      $K,
      $L,
      $M,
      $N,
      $O,
      $P,
      $Q,
      $R,
      $S,
      $T,
      $U,
      $V,
      $W,
      $X,
      $Y,
      $Z,
      $LBRACKET,
      $BACKSLASH,
      $RBRACKET,
      $CARET,
      $_,
      $a,
      $b,
      $c,
      $d,
      $e,
      $f,
      $g,
      $h,
      $i,
      $j,
      $k,
      $l,
      $m,
      $n,
      $o,
      $p,
      $q,
      $r,
      $s,
      $t,
      $u,
      $v,
      $w,
      $x,
      $y,
      $z,
      $LBRACE,
      $BAR,
      $RBRACE,
      $TILDE,
      $NBSP,
      ScannerError,
      _Scanner,
      OPERATORS,
      KEYWORDS;
  function newCharacterToken(index, code) {
    assert.argumentTypes(index, int, code, int);
    return assert.returnType((new Token(index, TOKEN_TYPE_CHARACTER, code, StringWrapper.fromCharCode(code))), Token);
  }
  function newIdentifierToken(index, text) {
    assert.argumentTypes(index, int, text, assert.type.string);
    return assert.returnType((new Token(index, TOKEN_TYPE_IDENTIFIER, 0, text)), Token);
  }
  function newKeywordToken(index, text) {
    assert.argumentTypes(index, int, text, assert.type.string);
    return assert.returnType((new Token(index, TOKEN_TYPE_KEYWORD, 0, text)), Token);
  }
  function newOperatorToken(index, text) {
    assert.argumentTypes(index, int, text, assert.type.string);
    return assert.returnType((new Token(index, TOKEN_TYPE_OPERATOR, 0, text)), Token);
  }
  function newStringToken(index, text) {
    assert.argumentTypes(index, int, text, assert.type.string);
    return assert.returnType((new Token(index, TOKEN_TYPE_STRING, 0, text)), Token);
  }
  function newNumberToken(index, n) {
    assert.argumentTypes(index, int, n, assert.type.number);
    return assert.returnType((new Token(index, TOKEN_TYPE_NUMBER, n, "")), Token);
  }
  function isWhitespace(code) {
    assert.argumentTypes(code, int);
    return assert.returnType(((code >= $TAB && code <= $SPACE) || (code == $NBSP)), assert.type.boolean);
  }
  function isIdentifierStart(code) {
    assert.argumentTypes(code, int);
    return assert.returnType((($a <= code && code <= $z) || ($A <= code && code <= $Z) || (code == $_) || (code == $$)), assert.type.boolean);
  }
  function isIdentifierPart(code) {
    assert.argumentTypes(code, int);
    return assert.returnType((($a <= code && code <= $z) || ($A <= code && code <= $Z) || ($0 <= code && code <= $9) || (code == $_) || (code == $$)), assert.type.boolean);
  }
  function isDigit(code) {
    assert.argumentTypes(code, int);
    return assert.returnType(($0 <= code && code <= $9), assert.type.boolean);
  }
  function isExponentStart(code) {
    assert.argumentTypes(code, int);
    return assert.returnType((code == $e || code == $E), assert.type.boolean);
  }
  function isExponentSign(code) {
    assert.argumentTypes(code, int);
    return assert.returnType((code == $MINUS || code == $PLUS), assert.type.boolean);
  }
  function unescape(code) {
    assert.argumentTypes(code, int);
    switch (code) {
      case $n:
        return assert.returnType(($LF), int);
      case $f:
        return assert.returnType(($FF), int);
      case $r:
        return assert.returnType(($CR), int);
      case $t:
        return assert.returnType(($TAB), int);
      case $v:
        return assert.returnType(($VTAB), int);
      default:
        return assert.returnType((code), int);
    }
  }
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
      SetWrapper = $__m.SetWrapper;
    }, function($__m) {
      int = $__m.int;
      FIELD = $__m.FIELD;
      NumberWrapper = $__m.NumberWrapper;
      StringJoiner = $__m.StringJoiner;
      StringWrapper = $__m.StringWrapper;
    }],
    execute: function() {
      TOKEN_TYPE_CHARACTER = $__export("TOKEN_TYPE_CHARACTER", 1);
      TOKEN_TYPE_IDENTIFIER = $__export("TOKEN_TYPE_IDENTIFIER", 2);
      TOKEN_TYPE_KEYWORD = $__export("TOKEN_TYPE_KEYWORD", 3);
      TOKEN_TYPE_STRING = $__export("TOKEN_TYPE_STRING", 4);
      TOKEN_TYPE_OPERATOR = $__export("TOKEN_TYPE_OPERATOR", 5);
      TOKEN_TYPE_NUMBER = $__export("TOKEN_TYPE_NUMBER", 6);
      Lexer = $__export("Lexer", (function() {
        var Lexer = function Lexer() {};
        return ($traceurRuntime.createClass)(Lexer, {tokenize: function(text) {
            assert.argumentTypes(text, assert.type.string);
            var scanner = new _Scanner(text);
            var tokens = [];
            var token = scanner.scanToken();
            while (token != null) {
              ListWrapper.push(tokens, token);
              token = scanner.scanToken();
            }
            return assert.returnType((tokens), List);
          }}, {});
      }()));
      Object.defineProperty(Lexer.prototype.tokenize, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Token = $__export("Token", (function() {
        var Token = function Token(index, type, numValue, strValue) {
          assert.argumentTypes(index, int, type, int, numValue, assert.type.number, strValue, assert.type.string);
          this.index = index;
          this.type = type;
          this._numValue = numValue;
          this._strValue = strValue;
        };
        return ($traceurRuntime.createClass)(Token, {
          isCharacter: function(code) {
            assert.argumentTypes(code, int);
            return assert.returnType(((this.type == TOKEN_TYPE_CHARACTER && this._numValue == code)), assert.type.boolean);
          },
          isNumber: function() {
            return assert.returnType(((this.type == TOKEN_TYPE_NUMBER)), assert.type.boolean);
          },
          isString: function() {
            return assert.returnType(((this.type == TOKEN_TYPE_STRING)), assert.type.boolean);
          },
          isOperator: function(operater) {
            assert.argumentTypes(operater, assert.type.string);
            return assert.returnType(((this.type == TOKEN_TYPE_OPERATOR && this._strValue == operater)), assert.type.boolean);
          },
          isIdentifier: function() {
            return assert.returnType(((this.type == TOKEN_TYPE_IDENTIFIER)), assert.type.boolean);
          },
          isKeyword: function() {
            return assert.returnType(((this.type == TOKEN_TYPE_KEYWORD)), assert.type.boolean);
          },
          isKeywordVar: function() {
            return assert.returnType(((this.type == TOKEN_TYPE_KEYWORD && this._strValue == "var")), assert.type.boolean);
          },
          isKeywordNull: function() {
            return assert.returnType(((this.type == TOKEN_TYPE_KEYWORD && this._strValue == "null")), assert.type.boolean);
          },
          isKeywordUndefined: function() {
            return assert.returnType(((this.type == TOKEN_TYPE_KEYWORD && this._strValue == "undefined")), assert.type.boolean);
          },
          isKeywordTrue: function() {
            return assert.returnType(((this.type == TOKEN_TYPE_KEYWORD && this._strValue == "true")), assert.type.boolean);
          },
          isKeywordFalse: function() {
            return assert.returnType(((this.type == TOKEN_TYPE_KEYWORD && this._strValue == "false")), assert.type.boolean);
          },
          toNumber: function() {
            return assert.returnType(((this.type == TOKEN_TYPE_NUMBER) ? this._numValue : -1), assert.type.number);
          },
          toString: function() {
            var type = assert.type(this.type, int);
            if (type >= TOKEN_TYPE_CHARACTER && type <= TOKEN_TYPE_STRING) {
              return assert.returnType((this._strValue), assert.type.string);
            } else if (type == TOKEN_TYPE_NUMBER) {
              return assert.returnType((this._numValue.toString()), assert.type.string);
            } else {
              return assert.returnType((null), assert.type.string);
            }
          }
        }, {});
      }()));
      Object.defineProperty(Token, "parameters", {get: function() {
          return [[int], [int], [assert.type.number], [assert.type.string]];
        }});
      Object.defineProperty(Token.prototype.isCharacter, "parameters", {get: function() {
          return [[int]];
        }});
      Object.defineProperty(Token.prototype.isOperator, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(newCharacterToken, "parameters", {get: function() {
          return [[int], [int]];
        }});
      Object.defineProperty(newIdentifierToken, "parameters", {get: function() {
          return [[int], [assert.type.string]];
        }});
      Object.defineProperty(newKeywordToken, "parameters", {get: function() {
          return [[int], [assert.type.string]];
        }});
      Object.defineProperty(newOperatorToken, "parameters", {get: function() {
          return [[int], [assert.type.string]];
        }});
      Object.defineProperty(newStringToken, "parameters", {get: function() {
          return [[int], [assert.type.string]];
        }});
      Object.defineProperty(newNumberToken, "parameters", {get: function() {
          return [[int], [assert.type.number]];
        }});
      EOF = $__export("EOF", assert.type(new Token(-1, 0, 0, ""), Token));
      $EOF = $__export("$EOF", 0);
      $TAB = $__export("$TAB", 9);
      $LF = $__export("$LF", 10);
      $VTAB = $__export("$VTAB", 11);
      $FF = $__export("$FF", 12);
      $CR = $__export("$CR", 13);
      $SPACE = $__export("$SPACE", 32);
      $BANG = $__export("$BANG", 33);
      $DQ = $__export("$DQ", 34);
      $HASH = $__export("$HASH", 35);
      $$ = $__export("$$", 36);
      $PERCENT = $__export("$PERCENT", 37);
      $AMPERSAND = $__export("$AMPERSAND", 38);
      $SQ = $__export("$SQ", 39);
      $LPAREN = $__export("$LPAREN", 40);
      $RPAREN = $__export("$RPAREN", 41);
      $STAR = $__export("$STAR", 42);
      $PLUS = $__export("$PLUS", 43);
      $COMMA = $__export("$COMMA", 44);
      $MINUS = $__export("$MINUS", 45);
      $PERIOD = $__export("$PERIOD", 46);
      $SLASH = $__export("$SLASH", 47);
      $COLON = $__export("$COLON", 58);
      $SEMICOLON = $__export("$SEMICOLON", 59);
      $LT = $__export("$LT", 60);
      $EQ = $__export("$EQ", 61);
      $GT = $__export("$GT", 62);
      $QUESTION = $__export("$QUESTION", 63);
      $0 = 48;
      $9 = 57;
      $A = 65, $B = 66, $C = 67, $D = 68, $E = 69, $F = 70, $G = 71, $H = 72, $I = 73, $J = 74, $K = 75, $L = 76, $M = 77, $N = 78, $O = 79, $P = 80, $Q = 81, $R = 82, $S = 83, $T = 84, $U = 85, $V = 86, $W = 87, $X = 88, $Y = 89, $Z = 90;
      $LBRACKET = $__export("$LBRACKET", 91);
      $BACKSLASH = $__export("$BACKSLASH", 92);
      $RBRACKET = $__export("$RBRACKET", 93);
      $CARET = 94;
      $_ = 95;
      $a = 97, $b = 98, $c = 99, $d = 100, $e = 101, $f = 102, $g = 103, $h = 104, $i = 105, $j = 106, $k = 107, $l = 108, $m = 109, $n = 110, $o = 111, $p = 112, $q = 113, $r = 114, $s = 115, $t = 116, $u = 117, $v = 118, $w = 119, $x = 120, $y = 121, $z = 122;
      $LBRACE = $__export("$LBRACE", 123);
      $BAR = $__export("$BAR", 124);
      $RBRACE = $__export("$RBRACE", 125);
      $TILDE = 126;
      $NBSP = 160;
      ScannerError = $__export("ScannerError", (function($__super) {
        var ScannerError = function ScannerError(message) {
          $traceurRuntime.superConstructor(ScannerError).call(this);
          this.message = message;
        };
        return ($traceurRuntime.createClass)(ScannerError, {toString: function() {
            return this.message;
          }}, {}, $__super);
      }(Error)));
      _Scanner = (function() {
        var _Scanner = function _Scanner(input) {
          assert.argumentTypes(input, assert.type.string);
          this.input = input;
          this.length = input.length;
          this.peek = 0;
          this.index = -1;
          this.advance();
        };
        return ($traceurRuntime.createClass)(_Scanner, {
          advance: function() {
            this.peek = ++this.index >= this.length ? $EOF : StringWrapper.charCodeAt(this.input, this.index);
          },
          scanToken: function() {
            var input = this.input,
                length = this.length,
                peek = this.peek,
                index = this.index;
            while (peek <= $SPACE) {
              if (++index >= length) {
                peek = $EOF;
                break;
              } else {
                peek = StringWrapper.charCodeAt(input, index);
              }
            }
            this.peek = peek;
            this.index = index;
            if (index >= length) {
              return assert.returnType((null), Token);
            }
            if (isIdentifierStart(peek))
              return assert.returnType((this.scanIdentifier()), Token);
            if (isDigit(peek))
              return assert.returnType((this.scanNumber(index)), Token);
            var start = assert.type(index, int);
            switch (peek) {
              case $PERIOD:
                this.advance();
                return assert.returnType((isDigit(this.peek) ? this.scanNumber(start) : newCharacterToken(start, $PERIOD)), Token);
              case $LPAREN:
              case $RPAREN:
              case $LBRACE:
              case $RBRACE:
              case $LBRACKET:
              case $RBRACKET:
              case $COMMA:
              case $COLON:
              case $SEMICOLON:
                return assert.returnType((this.scanCharacter(start, peek)), Token);
              case $SQ:
              case $DQ:
                return assert.returnType((this.scanString()), Token);
              case $HASH:
                return assert.returnType((this.scanOperator(start, StringWrapper.fromCharCode(peek))), Token);
              case $PLUS:
              case $MINUS:
              case $STAR:
              case $SLASH:
              case $PERCENT:
              case $CARET:
              case $QUESTION:
                return assert.returnType((this.scanOperator(start, StringWrapper.fromCharCode(peek))), Token);
              case $LT:
              case $GT:
              case $BANG:
              case $EQ:
                return assert.returnType((this.scanComplexOperator(start, $EQ, StringWrapper.fromCharCode(peek), '=')), Token);
              case $AMPERSAND:
                return assert.returnType((this.scanComplexOperator(start, $AMPERSAND, '&', '&')), Token);
              case $BAR:
                return assert.returnType((this.scanComplexOperator(start, $BAR, '|', '|')), Token);
              case $TILDE:
                return assert.returnType((this.scanComplexOperator(start, $SLASH, '~', '/')), Token);
              case $NBSP:
                while (isWhitespace(this.peek))
                  this.advance();
                return assert.returnType((this.scanToken()), Token);
            }
            this.error(("Unexpected character [" + StringWrapper.fromCharCode(peek) + "]"), 0);
            return assert.returnType((null), Token);
          },
          scanCharacter: function(start, code) {
            assert.argumentTypes(start, int, code, int);
            assert(this.peek == code);
            this.advance();
            return assert.returnType((newCharacterToken(start, code)), Token);
          },
          scanOperator: function(start, str) {
            assert.argumentTypes(start, int, str, assert.type.string);
            assert(this.peek == StringWrapper.charCodeAt(str, 0));
            assert(SetWrapper.has(OPERATORS, str));
            this.advance();
            return assert.returnType((newOperatorToken(start, str)), Token);
          },
          scanComplexOperator: function(start, code, one, two) {
            assert.argumentTypes(start, int, code, int, one, assert.type.string, two, assert.type.string);
            assert(this.peek == StringWrapper.charCodeAt(one, 0));
            this.advance();
            var str = assert.type(one, assert.type.string);
            if (this.peek == code) {
              this.advance();
              str += two;
            }
            assert(SetWrapper.has(OPERATORS, str));
            return assert.returnType((newOperatorToken(start, str)), Token);
          },
          scanIdentifier: function() {
            assert(isIdentifierStart(this.peek));
            var start = assert.type(this.index, int);
            this.advance();
            while (isIdentifierPart(this.peek))
              this.advance();
            var str = assert.type(this.input.substring(start, this.index), assert.type.string);
            if (SetWrapper.has(KEYWORDS, str)) {
              return assert.returnType((newKeywordToken(start, str)), Token);
            } else {
              return assert.returnType((newIdentifierToken(start, str)), Token);
            }
          },
          scanNumber: function(start) {
            assert.argumentTypes(start, int);
            assert(isDigit(this.peek));
            var simple = assert.type((this.index === start), assert.type.boolean);
            this.advance();
            while (true) {
              if (isDigit(this.peek)) {} else if (this.peek == $PERIOD) {
                simple = false;
              } else if (isExponentStart(this.peek)) {
                this.advance();
                if (isExponentSign(this.peek))
                  this.advance();
                if (!isDigit(this.peek))
                  this.error('Invalid exponent', -1);
                simple = false;
              } else {
                break;
              }
              this.advance();
            }
            var str = assert.type(this.input.substring(start, this.index), assert.type.string);
            var value = assert.type(simple ? NumberWrapper.parseIntAutoRadix(str) : NumberWrapper.parseFloat(str), assert.type.number);
            return assert.returnType((newNumberToken(start, value)), Token);
          },
          scanString: function() {
            assert(this.peek == $SQ || this.peek == $DQ);
            var start = assert.type(this.index, int);
            var quote = assert.type(this.peek, int);
            this.advance();
            var buffer;
            var marker = assert.type(this.index, int);
            var input = assert.type(this.input, assert.type.string);
            while (this.peek != quote) {
              if (this.peek == $BACKSLASH) {
                if (buffer == null)
                  buffer = new StringJoiner();
                buffer.add(input.substring(marker, this.index));
                this.advance();
                var unescapedCode = void 0;
                if (this.peek == $u) {
                  var hex = assert.type(input.substring(this.index + 1, this.index + 5), assert.type.string);
                  try {
                    unescapedCode = NumberWrapper.parseInt(hex, 16);
                  } catch (e) {
                    this.error(("Invalid unicode escape [\\u" + hex + "]"), 0);
                  }
                  for (var i = assert.type(0, int); i < 5; i++) {
                    this.advance();
                  }
                } else {
                  unescapedCode = unescape(this.peek);
                  this.advance();
                }
                buffer.add(StringWrapper.fromCharCode(unescapedCode));
                marker = this.index;
              } else if (this.peek == $EOF) {
                this.error('Unterminated quote', 0);
              } else {
                this.advance();
              }
            }
            var last = assert.type(input.substring(marker, this.index), assert.type.string);
            this.advance();
            var unescaped = assert.type(last, assert.type.string);
            if (buffer != null) {
              buffer.add(last);
              unescaped = buffer.toString();
            }
            return assert.returnType((newStringToken(start, unescaped)), Token);
          },
          error: function(message, offset) {
            assert.argumentTypes(message, assert.type.string, offset, int);
            var position = assert.type(this.index + offset, int);
            throw new ScannerError(("Lexer Error: " + message + " at column " + position + " in expression [" + this.input + "]"));
          }
        }, {});
      }());
      Object.defineProperty(_Scanner, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(_Scanner.prototype.scanCharacter, "parameters", {get: function() {
          return [[int], [int]];
        }});
      Object.defineProperty(_Scanner.prototype.scanOperator, "parameters", {get: function() {
          return [[int], [assert.type.string]];
        }});
      Object.defineProperty(_Scanner.prototype.scanComplexOperator, "parameters", {get: function() {
          return [[int], [int], [assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(_Scanner.prototype.scanNumber, "parameters", {get: function() {
          return [[int]];
        }});
      Object.defineProperty(_Scanner.prototype.error, "parameters", {get: function() {
          return [[assert.type.string], [int]];
        }});
      Object.defineProperty(isWhitespace, "parameters", {get: function() {
          return [[int]];
        }});
      Object.defineProperty(isIdentifierStart, "parameters", {get: function() {
          return [[int]];
        }});
      Object.defineProperty(isIdentifierPart, "parameters", {get: function() {
          return [[int]];
        }});
      Object.defineProperty(isDigit, "parameters", {get: function() {
          return [[int]];
        }});
      Object.defineProperty(isExponentStart, "parameters", {get: function() {
          return [[int]];
        }});
      Object.defineProperty(isExponentSign, "parameters", {get: function() {
          return [[int]];
        }});
      Object.defineProperty(unescape, "parameters", {get: function() {
          return [[int]];
        }});
      OPERATORS = SetWrapper.createFromList(['+', '-', '*', '/', '~/', '%', '^', '=', '==', '!=', '<', '>', '<=', '>=', '&&', '||', '&', '|', '!', '?', '#']);
      KEYWORDS = SetWrapper.createFromList(['var', 'null', 'undefined', 'true', 'false']);
    }
  };
});

//# sourceMappingURL=angular2/src/change_detection/parser/lexer.map

//# sourceMappingURL=../../../../angular2/src/change_detection/parser/lexer.js.map