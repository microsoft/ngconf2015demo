System.register(["rtts_assert/rtts_assert"], function($__export) {
  "use strict";
  var assert,
      _global,
      Type,
      Math,
      Date,
      assertionsEnabled_,
      int,
      FIELD,
      CONST,
      ABSTRACT,
      IMPLEMENTS,
      StringWrapper,
      StringJoiner,
      NumberParseError,
      NumberWrapper,
      RegExp,
      RegExpWrapper,
      RegExpMatcherWrapper,
      FunctionWrapper,
      BaseException,
      Json,
      DateWrapper;
  function isPresent(obj) {
    return assert.returnType((obj !== undefined && obj !== null), assert.type.boolean);
  }
  function isBlank(obj) {
    return assert.returnType((obj === undefined || obj === null), assert.type.boolean);
  }
  function isString(obj) {
    return assert.returnType((typeof obj === "string"), assert.type.boolean);
  }
  function stringify(token) {
    if (typeof token === 'string') {
      return assert.returnType((token), assert.type.string);
    }
    if (token === undefined || token === null) {
      return assert.returnType(('' + token), assert.type.string);
    }
    if (token.name) {
      return assert.returnType((token.name), assert.type.string);
    }
    return assert.returnType((token.toString()), assert.type.string);
  }
  function looseIdentical(a, b) {
    return assert.returnType((a === b || typeof a === "number" && typeof b === "number" && isNaN(a) && isNaN(b)), assert.type.boolean);
  }
  function getMapKey(value) {
    return value;
  }
  function normalizeBlank(obj) {
    return isBlank(obj) ? null : obj;
  }
  function isJsObject(o) {
    return assert.returnType((o !== null && (typeof o === "function" || typeof o === "object")), assert.type.boolean);
  }
  function assertionsEnabled() {
    return assert.returnType((assertionsEnabled_), assert.type.boolean);
  }
  function print(obj) {
    if (obj instanceof Error) {
      console.log(obj.stack);
    } else {
      console.log(obj);
    }
  }
  $__export("isPresent", isPresent);
  $__export("isBlank", isBlank);
  $__export("isString", isString);
  $__export("stringify", stringify);
  $__export("looseIdentical", looseIdentical);
  $__export("getMapKey", getMapKey);
  $__export("normalizeBlank", normalizeBlank);
  $__export("isJsObject", isJsObject);
  $__export("assertionsEnabled", assertionsEnabled);
  $__export("print", print);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }],
    execute: function() {
      _global = typeof window === 'undefined' ? global : window;
      $__export("global", _global);
      Type = $__export("Type", Function);
      Math = $__export("Math", _global.Math);
      Date = $__export("Date", _global.Date);
      assertionsEnabled_ = typeof assert !== 'undefined';
      if (assertionsEnabled_) {
        _global.assert = assert;
        $__export("int", int = assert.define('int', function(value) {
          return typeof value === 'number' && value % 1 === 0;
        }));
      } else {
        $__export("int", int = {});
        _global.assert = function() {};
      }
      $__export("int", int);
      FIELD = $__export("FIELD", (function() {
        var FIELD = function FIELD(definition) {
          this.definition = definition;
        };
        return ($traceurRuntime.createClass)(FIELD, {}, {});
      }()));
      CONST = $__export("CONST", (function() {
        var CONST = function CONST() {};
        return ($traceurRuntime.createClass)(CONST, {}, {});
      }()));
      ABSTRACT = $__export("ABSTRACT", (function() {
        var ABSTRACT = function ABSTRACT() {};
        return ($traceurRuntime.createClass)(ABSTRACT, {}, {});
      }()));
      IMPLEMENTS = $__export("IMPLEMENTS", (function() {
        var IMPLEMENTS = function IMPLEMENTS() {};
        return ($traceurRuntime.createClass)(IMPLEMENTS, {}, {});
      }()));
      StringWrapper = $__export("StringWrapper", (function() {
        var StringWrapper = function StringWrapper() {};
        return ($traceurRuntime.createClass)(StringWrapper, {}, {
          fromCharCode: function(code) {
            assert.argumentTypes(code, int);
            return assert.returnType((String.fromCharCode(code)), assert.type.string);
          },
          charCodeAt: function(s, index) {
            assert.argumentTypes(s, assert.type.string, index, int);
            return s.charCodeAt(index);
          },
          split: function(s, regExp) {
            assert.argumentTypes(s, assert.type.string, regExp, RegExp);
            return s.split(regExp.multiple);
          },
          equals: function(s, s2) {
            assert.argumentTypes(s, assert.type.string, s2, assert.type.string);
            return assert.returnType((s === s2), assert.type.boolean);
          },
          replaceAll: function(s, from, replace) {
            assert.argumentTypes(s, assert.type.string, from, RegExp, replace, assert.type.string);
            return assert.returnType((s.replace(from.multiple, replace)), assert.type.string);
          },
          startsWith: function(s, start) {
            assert.argumentTypes(s, assert.type.string, start, assert.type.string);
            return s.startsWith(start);
          },
          substring: function(s, start) {
            var end = arguments[2] !== (void 0) ? arguments[2] : null;
            assert.argumentTypes(s, assert.type.string, start, int, end, int);
            return s.substring(start, end === null ? undefined : end);
          },
          replaceAllMapped: function(s, from, cb) {
            assert.argumentTypes(s, assert.type.string, from, RegExp, cb, Function);
            return assert.returnType((s.replace(from.multiple, function() {
              for (var matches = [],
                  $__1 = 0; $__1 < arguments.length; $__1++)
                matches[$__1] = arguments[$__1];
              return cb(matches);
            })), assert.type.string);
          },
          contains: function(s, substr) {
            assert.argumentTypes(s, assert.type.string, substr, assert.type.string);
            return assert.returnType((s.indexOf(substr) != -1), assert.type.boolean);
          }
        });
      }()));
      Object.defineProperty(StringWrapper.fromCharCode, "parameters", {get: function() {
          return [[int]];
        }});
      Object.defineProperty(StringWrapper.charCodeAt, "parameters", {get: function() {
          return [[assert.type.string], [int]];
        }});
      Object.defineProperty(StringWrapper.split, "parameters", {get: function() {
          return [[assert.type.string], [RegExp]];
        }});
      Object.defineProperty(StringWrapper.equals, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(StringWrapper.replaceAll, "parameters", {get: function() {
          return [[assert.type.string], [RegExp], [assert.type.string]];
        }});
      Object.defineProperty(StringWrapper.startsWith, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(StringWrapper.substring, "parameters", {get: function() {
          return [[assert.type.string], [int], [int]];
        }});
      Object.defineProperty(StringWrapper.replaceAllMapped, "parameters", {get: function() {
          return [[assert.type.string], [RegExp], [Function]];
        }});
      Object.defineProperty(StringWrapper.contains, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      StringJoiner = $__export("StringJoiner", (function() {
        var StringJoiner = function StringJoiner() {
          this.parts = [];
        };
        return ($traceurRuntime.createClass)(StringJoiner, {
          add: function(part) {
            assert.argumentTypes(part, assert.type.string);
            this.parts.push(part);
          },
          toString: function() {
            return assert.returnType((this.parts.join("")), assert.type.string);
          }
        }, {});
      }()));
      Object.defineProperty(StringJoiner.prototype.add, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      NumberParseError = $__export("NumberParseError", (function($__super) {
        var NumberParseError = function NumberParseError(message) {
          $traceurRuntime.superConstructor(NumberParseError).call(this);
          this.message = message;
        };
        return ($traceurRuntime.createClass)(NumberParseError, {toString: function() {
            return this.message;
          }}, {}, $__super);
      }(Error)));
      NumberWrapper = $__export("NumberWrapper", (function() {
        var NumberWrapper = function NumberWrapper() {};
        return ($traceurRuntime.createClass)(NumberWrapper, {}, {
          parseIntAutoRadix: function(text) {
            assert.argumentTypes(text, assert.type.string);
            var result = assert.type(parseInt(text), int);
            if (isNaN(result)) {
              throw new NumberParseError("Invalid integer literal when parsing " + text);
            }
            return assert.returnType((result), int);
          },
          parseInt: function(text, radix) {
            assert.argumentTypes(text, assert.type.string, radix, int);
            if (radix == 10) {
              if (/^(\-|\+)?[0-9]+$/.test(text)) {
                return assert.returnType((parseInt(text, radix)), int);
              }
            } else if (radix == 16) {
              if (/^(\-|\+)?[0-9ABCDEFabcdef]+$/.test(text)) {
                return assert.returnType((parseInt(text, radix)), int);
              }
            } else {
              var result = assert.type(parseInt(text, radix), int);
              if (!isNaN(result)) {
                return assert.returnType((result), int);
              }
            }
            throw new NumberParseError("Invalid integer literal when parsing " + text + " in base " + radix);
          },
          parseFloat: function(text) {
            assert.argumentTypes(text, assert.type.string);
            return assert.returnType((parseFloat(text)), assert.type.number);
          },
          get NaN() {
            return assert.returnType((NaN), assert.type.number);
          },
          isNaN: function(value) {
            return assert.returnType((isNaN(value)), assert.type.boolean);
          },
          isInteger: function(value) {
            return assert.returnType((Number.isInteger(value)), assert.type.boolean);
          }
        });
      }()));
      Object.defineProperty(NumberWrapper.parseIntAutoRadix, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(NumberWrapper.parseInt, "parameters", {get: function() {
          return [[assert.type.string], [int]];
        }});
      Object.defineProperty(NumberWrapper.parseFloat, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      if (assertionsEnabled_) {
        RegExp = assert.define('RegExp', function(obj) {
          assert(obj).is(assert.structure({
            single: _global.RegExp,
            multiple: _global.RegExp
          }));
        });
      } else {
        RegExp = {};
      }
      RegExpWrapper = $__export("RegExpWrapper", (function() {
        var RegExpWrapper = function RegExpWrapper() {};
        return ($traceurRuntime.createClass)(RegExpWrapper, {}, {
          create: function(regExpStr) {
            var flags = arguments[1] !== (void 0) ? arguments[1] : '';
            assert.argumentTypes(regExpStr, assert.type.any, flags, assert.type.string);
            flags = flags.replace(/g/g, '');
            return assert.returnType(({
              multiple: new _global.RegExp(regExpStr, flags + 'g'),
              single: new _global.RegExp(regExpStr, flags)
            }), RegExp);
          },
          firstMatch: function(regExp, input) {
            return input.match(regExp.single);
          },
          matcher: function(regExp, input) {
            return {
              re: regExp.multiple,
              input: input
            };
          }
        });
      }()));
      Object.defineProperty(RegExpWrapper.create, "parameters", {get: function() {
          return [[], [assert.type.string]];
        }});
      RegExpMatcherWrapper = $__export("RegExpMatcherWrapper", (function() {
        var RegExpMatcherWrapper = function RegExpMatcherWrapper() {};
        return ($traceurRuntime.createClass)(RegExpMatcherWrapper, {}, {next: function(matcher) {
            return matcher.re.exec(matcher.input);
          }});
      }()));
      FunctionWrapper = $__export("FunctionWrapper", (function() {
        var FunctionWrapper = function FunctionWrapper() {};
        return ($traceurRuntime.createClass)(FunctionWrapper, {}, {apply: function(fn, posArgs) {
            assert.argumentTypes(fn, Function, posArgs, assert.type.any);
            return fn.apply(null, posArgs);
          }});
      }()));
      Object.defineProperty(FunctionWrapper.apply, "parameters", {get: function() {
          return [[Function], []];
        }});
      BaseException = $__export("BaseException", Error);
      Json = $__export("Json", _global.JSON);
      DateWrapper = $__export("DateWrapper", (function() {
        var DateWrapper = function DateWrapper() {};
        return ($traceurRuntime.createClass)(DateWrapper, {}, {
          fromMillis: function(ms) {
            return new Date(ms);
          },
          now: function() {
            return new Date();
          }
        });
      }()));
    }
  };
});

//# sourceMappingURL=angular2/src/facade/lang.map

//# sourceMappingURL=../../../angular2/src/facade/lang.js.map