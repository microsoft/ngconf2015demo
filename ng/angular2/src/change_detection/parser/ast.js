System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/collection", "./context_with_variable_bindings"], function($__export) {
  "use strict";
  var assert,
      FIELD,
      autoConvertAdd,
      isBlank,
      isPresent,
      FunctionWrapper,
      BaseException,
      List,
      Map,
      ListWrapper,
      StringMapWrapper,
      ContextWithVariableBindings,
      AST,
      EmptyExpr,
      Structural,
      ImplicitReceiver,
      Chain,
      Conditional,
      AccessMember,
      KeyedAccess,
      Formatter,
      LiteralPrimitive,
      LiteralArray,
      LiteralMap,
      Interpolation,
      Binary,
      PrefixNot,
      Assignment,
      MethodCall,
      FunctionCall,
      ASTWithSource,
      TemplateBinding,
      AstVisitor,
      _evalListCache;
  function evalList(context, exps) {
    assert.argumentTypes(context, assert.type.any, exps, List);
    var length = exps.length;
    var result = _evalListCache[length];
    for (var i = 0; i < length; i++) {
      result[i] = exps[i].eval(context);
    }
    return result;
  }
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      FIELD = $__m.FIELD;
      autoConvertAdd = $__m.autoConvertAdd;
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
      FunctionWrapper = $__m.FunctionWrapper;
      BaseException = $__m.BaseException;
    }, function($__m) {
      List = $__m.List;
      Map = $__m.Map;
      ListWrapper = $__m.ListWrapper;
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      ContextWithVariableBindings = $__m.ContextWithVariableBindings;
    }],
    execute: function() {
      AST = $__export("AST", (function() {
        var AST = function AST() {};
        return ($traceurRuntime.createClass)(AST, {
          eval: function(context) {
            throw new BaseException("Not supported");
          },
          get isAssignable() {
            return false;
          },
          assign: function(context, value) {
            throw new BaseException("Not supported");
          },
          visit: function(visitor) {},
          toString: function() {
            return assert.returnType(("AST"), assert.type.string);
          }
        }, {});
      }()));
      EmptyExpr = $__export("EmptyExpr", (function($__super) {
        var EmptyExpr = function EmptyExpr() {
          $traceurRuntime.superConstructor(EmptyExpr).apply(this, arguments);
        };
        return ($traceurRuntime.createClass)(EmptyExpr, {
          eval: function(context) {
            return null;
          },
          visit: function(visitor) {}
        }, {}, $__super);
      }(AST)));
      Structural = $__export("Structural", (function($__super) {
        var Structural = function Structural(value) {
          assert.argumentTypes(value, AST);
          $traceurRuntime.superConstructor(Structural).call(this);
          this.value = value;
        };
        return ($traceurRuntime.createClass)(Structural, {
          eval: function(context) {
            return value.eval(context);
          },
          visit: function(visitor) {
            return visitor.visitStructural(this);
          }
        }, {}, $__super);
      }(AST)));
      Object.defineProperty(Structural, "parameters", {get: function() {
          return [[AST]];
        }});
      ImplicitReceiver = $__export("ImplicitReceiver", (function($__super) {
        var ImplicitReceiver = function ImplicitReceiver() {
          $traceurRuntime.superConstructor(ImplicitReceiver).apply(this, arguments);
        };
        return ($traceurRuntime.createClass)(ImplicitReceiver, {
          eval: function(context) {
            return context;
          },
          visit: function(visitor) {
            return visitor.visitImplicitReceiver(this);
          }
        }, {}, $__super);
      }(AST)));
      Chain = $__export("Chain", (function($__super) {
        var Chain = function Chain(expressions) {
          assert.argumentTypes(expressions, List);
          $traceurRuntime.superConstructor(Chain).call(this);
          this.expressions = expressions;
        };
        return ($traceurRuntime.createClass)(Chain, {
          eval: function(context) {
            var result;
            for (var i = 0; i < this.expressions.length; i++) {
              var last = this.expressions[i].eval(context);
              if (isPresent(last))
                result = last;
            }
            return result;
          },
          visit: function(visitor) {
            return visitor.visitChain(this);
          }
        }, {}, $__super);
      }(AST)));
      Object.defineProperty(Chain, "parameters", {get: function() {
          return [[List]];
        }});
      Conditional = $__export("Conditional", (function($__super) {
        var Conditional = function Conditional(condition, trueExp, falseExp) {
          assert.argumentTypes(condition, AST, trueExp, AST, falseExp, AST);
          $traceurRuntime.superConstructor(Conditional).call(this);
          this.condition = condition;
          this.trueExp = trueExp;
          this.falseExp = falseExp;
        };
        return ($traceurRuntime.createClass)(Conditional, {
          eval: function(context) {
            if (this.condition.eval(context)) {
              return this.trueExp.eval(context);
            } else {
              return this.falseExp.eval(context);
            }
          },
          visit: function(visitor) {
            return visitor.visitConditional(this);
          }
        }, {}, $__super);
      }(AST)));
      Object.defineProperty(Conditional, "parameters", {get: function() {
          return [[AST], [AST], [AST]];
        }});
      AccessMember = $__export("AccessMember", (function($__super) {
        var AccessMember = function AccessMember(receiver, name, getter, setter) {
          assert.argumentTypes(receiver, AST, name, assert.type.string, getter, Function, setter, Function);
          $traceurRuntime.superConstructor(AccessMember).call(this);
          this.receiver = receiver;
          this.name = name;
          this.getter = getter;
          this.setter = setter;
        };
        return ($traceurRuntime.createClass)(AccessMember, {
          eval: function(context) {
            var evaluatedContext = this.receiver.eval(context);
            while (evaluatedContext instanceof ContextWithVariableBindings) {
              if (evaluatedContext.hasBinding(this.name)) {
                return evaluatedContext.get(this.name);
              }
              evaluatedContext = evaluatedContext.parent;
            }
            return this.getter(evaluatedContext);
          },
          get isAssignable() {
            return true;
          },
          assign: function(context, value) {
            var evaluatedContext = this.receiver.eval(context);
            while (evaluatedContext instanceof ContextWithVariableBindings) {
              if (evaluatedContext.hasBinding(this.name)) {
                throw new BaseException(("Cannot reassign a variable binding " + this.name));
              }
              evaluatedContext = evaluatedContext.parent;
            }
            return this.setter(evaluatedContext, value);
          },
          visit: function(visitor) {
            return visitor.visitAccessMember(this);
          }
        }, {}, $__super);
      }(AST)));
      Object.defineProperty(AccessMember, "parameters", {get: function() {
          return [[AST], [assert.type.string], [Function], [Function]];
        }});
      KeyedAccess = $__export("KeyedAccess", (function($__super) {
        var KeyedAccess = function KeyedAccess(obj, key) {
          assert.argumentTypes(obj, AST, key, AST);
          $traceurRuntime.superConstructor(KeyedAccess).call(this);
          this.obj = obj;
          this.key = key;
        };
        return ($traceurRuntime.createClass)(KeyedAccess, {
          eval: function(context) {
            var obj = this.obj.eval(context);
            var key = this.key.eval(context);
            return obj[key];
          },
          get isAssignable() {
            return true;
          },
          assign: function(context, value) {
            var obj = this.obj.eval(context);
            var key = this.key.eval(context);
            obj[key] = value;
            return value;
          },
          visit: function(visitor) {
            return visitor.visitKeyedAccess(this);
          }
        }, {}, $__super);
      }(AST)));
      Object.defineProperty(KeyedAccess, "parameters", {get: function() {
          return [[AST], [AST]];
        }});
      Formatter = $__export("Formatter", (function($__super) {
        var Formatter = function Formatter(exp, name, args) {
          assert.argumentTypes(exp, AST, name, assert.type.string, args, List);
          $traceurRuntime.superConstructor(Formatter).call(this);
          this.exp = exp;
          this.name = name;
          this.args = args;
          this.allArgs = ListWrapper.concat([exp], args);
        };
        return ($traceurRuntime.createClass)(Formatter, {visit: function(visitor) {
            return visitor.visitFormatter(this);
          }}, {}, $__super);
      }(AST)));
      Object.defineProperty(Formatter, "parameters", {get: function() {
          return [[AST], [assert.type.string], [List]];
        }});
      LiteralPrimitive = $__export("LiteralPrimitive", (function($__super) {
        var LiteralPrimitive = function LiteralPrimitive(value) {
          $traceurRuntime.superConstructor(LiteralPrimitive).call(this);
          this.value = value;
        };
        return ($traceurRuntime.createClass)(LiteralPrimitive, {
          eval: function(context) {
            return this.value;
          },
          visit: function(visitor) {
            return visitor.visitLiteralPrimitive(this);
          }
        }, {}, $__super);
      }(AST)));
      LiteralArray = $__export("LiteralArray", (function($__super) {
        var LiteralArray = function LiteralArray(expressions) {
          assert.argumentTypes(expressions, List);
          $traceurRuntime.superConstructor(LiteralArray).call(this);
          this.expressions = expressions;
        };
        return ($traceurRuntime.createClass)(LiteralArray, {
          eval: function(context) {
            return ListWrapper.map(this.expressions, (function(e) {
              return e.eval(context);
            }));
          },
          visit: function(visitor) {
            return visitor.visitLiteralArray(this);
          }
        }, {}, $__super);
      }(AST)));
      Object.defineProperty(LiteralArray, "parameters", {get: function() {
          return [[List]];
        }});
      LiteralMap = $__export("LiteralMap", (function($__super) {
        var LiteralMap = function LiteralMap(keys, values) {
          assert.argumentTypes(keys, List, values, List);
          $traceurRuntime.superConstructor(LiteralMap).call(this);
          this.keys = keys;
          this.values = values;
        };
        return ($traceurRuntime.createClass)(LiteralMap, {
          eval: function(context) {
            var res = StringMapWrapper.create();
            for (var i = 0; i < this.keys.length; ++i) {
              StringMapWrapper.set(res, this.keys[i], this.values[i].eval(context));
            }
            return res;
          },
          visit: function(visitor) {
            return visitor.visitLiteralMap(this);
          }
        }, {}, $__super);
      }(AST)));
      Object.defineProperty(LiteralMap, "parameters", {get: function() {
          return [[List], [List]];
        }});
      Interpolation = $__export("Interpolation", (function($__super) {
        var Interpolation = function Interpolation(strings, expressions) {
          assert.argumentTypes(strings, List, expressions, List);
          $traceurRuntime.superConstructor(Interpolation).call(this);
          this.strings = strings;
          this.expressions = expressions;
        };
        return ($traceurRuntime.createClass)(Interpolation, {
          eval: function(context) {
            throw new BaseException("evaluating an Interpolation is not supported");
          },
          visit: function(visitor) {
            visitor.visitInterpolation(this);
          }
        }, {}, $__super);
      }(AST)));
      Object.defineProperty(Interpolation, "parameters", {get: function() {
          return [[List], [List]];
        }});
      Binary = $__export("Binary", (function($__super) {
        var Binary = function Binary(operation, left, right) {
          assert.argumentTypes(operation, assert.type.string, left, AST, right, AST);
          $traceurRuntime.superConstructor(Binary).call(this);
          this.operation = operation;
          this.left = left;
          this.right = right;
        };
        return ($traceurRuntime.createClass)(Binary, {
          eval: function(context) {
            var left = this.left.eval(context);
            switch (this.operation) {
              case '&&':
                return left && this.right.eval(context);
              case '||':
                return left || this.right.eval(context);
            }
            var right = this.right.eval(context);
            switch (this.operation) {
              case '+':
                return left + right;
              case '-':
                return left - right;
              case '*':
                return left * right;
              case '/':
                return left / right;
              case '%':
                return left % right;
              case '==':
                return left == right;
              case '!=':
                return left != right;
              case '<':
                return left < right;
              case '>':
                return left > right;
              case '<=':
                return left <= right;
              case '>=':
                return left >= right;
              case '^':
                return left ^ right;
              case '&':
                return left & right;
            }
            throw 'Internal error [$operation] not handled';
          },
          visit: function(visitor) {
            return visitor.visitBinary(this);
          }
        }, {}, $__super);
      }(AST)));
      Object.defineProperty(Binary, "parameters", {get: function() {
          return [[assert.type.string], [AST], [AST]];
        }});
      PrefixNot = $__export("PrefixNot", (function($__super) {
        var PrefixNot = function PrefixNot(expression) {
          assert.argumentTypes(expression, AST);
          $traceurRuntime.superConstructor(PrefixNot).call(this);
          this.expression = expression;
        };
        return ($traceurRuntime.createClass)(PrefixNot, {
          eval: function(context) {
            return !this.expression.eval(context);
          },
          visit: function(visitor) {
            return visitor.visitPrefixNot(this);
          }
        }, {}, $__super);
      }(AST)));
      Object.defineProperty(PrefixNot, "parameters", {get: function() {
          return [[AST]];
        }});
      Assignment = $__export("Assignment", (function($__super) {
        var Assignment = function Assignment(target, value) {
          assert.argumentTypes(target, AST, value, AST);
          $traceurRuntime.superConstructor(Assignment).call(this);
          this.target = target;
          this.value = value;
        };
        return ($traceurRuntime.createClass)(Assignment, {
          eval: function(context) {
            return this.target.assign(context, this.value.eval(context));
          },
          visit: function(visitor) {
            return visitor.visitAssignment(this);
          }
        }, {}, $__super);
      }(AST)));
      Object.defineProperty(Assignment, "parameters", {get: function() {
          return [[AST], [AST]];
        }});
      MethodCall = $__export("MethodCall", (function($__super) {
        var MethodCall = function MethodCall(receiver, name, fn, args) {
          assert.argumentTypes(receiver, AST, name, assert.type.string, fn, Function, args, List);
          $traceurRuntime.superConstructor(MethodCall).call(this);
          this.receiver = receiver;
          this.fn = fn;
          this.args = args;
          this.name = name;
        };
        return ($traceurRuntime.createClass)(MethodCall, {
          eval: function(context) {
            var evaluatedContext = this.receiver.eval(context);
            var evaluatedArgs = evalList(context, this.args);
            while (evaluatedContext instanceof ContextWithVariableBindings) {
              if (evaluatedContext.hasBinding(this.name)) {
                var fn = evaluatedContext.get(this.name);
                return FunctionWrapper.apply(fn, evaluatedArgs);
              }
              evaluatedContext = evaluatedContext.parent;
            }
            return this.fn(evaluatedContext, evaluatedArgs);
          },
          visit: function(visitor) {
            return visitor.visitMethodCall(this);
          }
        }, {}, $__super);
      }(AST)));
      Object.defineProperty(MethodCall, "parameters", {get: function() {
          return [[AST], [assert.type.string], [Function], [List]];
        }});
      FunctionCall = $__export("FunctionCall", (function($__super) {
        var FunctionCall = function FunctionCall(target, args) {
          assert.argumentTypes(target, AST, args, List);
          $traceurRuntime.superConstructor(FunctionCall).call(this);
          this.target = target;
          this.args = args;
        };
        return ($traceurRuntime.createClass)(FunctionCall, {
          eval: function(context) {
            var obj = this.target.eval(context);
            if (!(obj instanceof Function)) {
              throw new BaseException((obj + " is not a function"));
            }
            return FunctionWrapper.apply(obj, evalList(context, this.args));
          },
          visit: function(visitor) {
            return visitor.visitFunctionCall(this);
          }
        }, {}, $__super);
      }(AST)));
      Object.defineProperty(FunctionCall, "parameters", {get: function() {
          return [[AST], [List]];
        }});
      ASTWithSource = $__export("ASTWithSource", (function($__super) {
        var ASTWithSource = function ASTWithSource(ast, source, location) {
          assert.argumentTypes(ast, AST, source, assert.type.string, location, assert.type.string);
          $traceurRuntime.superConstructor(ASTWithSource).call(this);
          this.source = source;
          this.location = location;
          this.ast = ast;
        };
        return ($traceurRuntime.createClass)(ASTWithSource, {
          eval: function(context) {
            return this.ast.eval(context);
          },
          get isAssignable() {
            return this.ast.isAssignable;
          },
          assign: function(context, value) {
            return this.ast.assign(context, value);
          },
          visit: function(visitor) {
            return this.ast.visit(visitor);
          },
          toString: function() {
            return assert.returnType(((this.source + " in " + this.location)), assert.type.string);
          }
        }, {}, $__super);
      }(AST)));
      Object.defineProperty(ASTWithSource, "parameters", {get: function() {
          return [[AST], [assert.type.string], [assert.type.string]];
        }});
      TemplateBinding = $__export("TemplateBinding", (function() {
        var TemplateBinding = function TemplateBinding(key, keyIsVar, name, expression) {
          assert.argumentTypes(key, assert.type.string, keyIsVar, assert.type.boolean, name, assert.type.string, expression, ASTWithSource);
          $traceurRuntime.superConstructor(TemplateBinding).call(this);
          this.key = key;
          this.keyIsVar = keyIsVar;
          this.name = name;
          this.expression = expression;
        };
        return ($traceurRuntime.createClass)(TemplateBinding, {}, {});
      }()));
      Object.defineProperty(TemplateBinding, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.boolean], [assert.type.string], [ASTWithSource]];
        }});
      AstVisitor = $__export("AstVisitor", (function() {
        var AstVisitor = function AstVisitor() {};
        return ($traceurRuntime.createClass)(AstVisitor, {
          visitAccessMember: function(ast) {
            assert.argumentTypes(ast, AccessMember);
          },
          visitAssignment: function(ast) {
            assert.argumentTypes(ast, Assignment);
          },
          visitBinary: function(ast) {
            assert.argumentTypes(ast, Binary);
          },
          visitChain: function(ast) {
            assert.argumentTypes(ast, Chain);
          },
          visitStructural: function(ast) {
            assert.argumentTypes(ast, Structural);
          },
          visitConditional: function(ast) {
            assert.argumentTypes(ast, Conditional);
          },
          visitFormatter: function(ast) {
            assert.argumentTypes(ast, Formatter);
          },
          visitFunctionCall: function(ast) {
            assert.argumentTypes(ast, FunctionCall);
          },
          visitImplicitReceiver: function(ast) {
            assert.argumentTypes(ast, ImplicitReceiver);
          },
          visitKeyedAccess: function(ast) {
            assert.argumentTypes(ast, KeyedAccess);
          },
          visitLiteralArray: function(ast) {
            assert.argumentTypes(ast, LiteralArray);
          },
          visitLiteralMap: function(ast) {
            assert.argumentTypes(ast, LiteralMap);
          },
          visitLiteralPrimitive: function(ast) {
            assert.argumentTypes(ast, LiteralPrimitive);
          },
          visitMethodCall: function(ast) {
            assert.argumentTypes(ast, MethodCall);
          },
          visitPrefixNot: function(ast) {
            assert.argumentTypes(ast, PrefixNot);
          }
        }, {});
      }()));
      Object.defineProperty(AstVisitor.prototype.visitAccessMember, "parameters", {get: function() {
          return [[AccessMember]];
        }});
      Object.defineProperty(AstVisitor.prototype.visitAssignment, "parameters", {get: function() {
          return [[Assignment]];
        }});
      Object.defineProperty(AstVisitor.prototype.visitBinary, "parameters", {get: function() {
          return [[Binary]];
        }});
      Object.defineProperty(AstVisitor.prototype.visitChain, "parameters", {get: function() {
          return [[Chain]];
        }});
      Object.defineProperty(AstVisitor.prototype.visitStructural, "parameters", {get: function() {
          return [[Structural]];
        }});
      Object.defineProperty(AstVisitor.prototype.visitConditional, "parameters", {get: function() {
          return [[Conditional]];
        }});
      Object.defineProperty(AstVisitor.prototype.visitFormatter, "parameters", {get: function() {
          return [[Formatter]];
        }});
      Object.defineProperty(AstVisitor.prototype.visitFunctionCall, "parameters", {get: function() {
          return [[FunctionCall]];
        }});
      Object.defineProperty(AstVisitor.prototype.visitImplicitReceiver, "parameters", {get: function() {
          return [[ImplicitReceiver]];
        }});
      Object.defineProperty(AstVisitor.prototype.visitKeyedAccess, "parameters", {get: function() {
          return [[KeyedAccess]];
        }});
      Object.defineProperty(AstVisitor.prototype.visitLiteralArray, "parameters", {get: function() {
          return [[LiteralArray]];
        }});
      Object.defineProperty(AstVisitor.prototype.visitLiteralMap, "parameters", {get: function() {
          return [[LiteralMap]];
        }});
      Object.defineProperty(AstVisitor.prototype.visitLiteralPrimitive, "parameters", {get: function() {
          return [[LiteralPrimitive]];
        }});
      Object.defineProperty(AstVisitor.prototype.visitMethodCall, "parameters", {get: function() {
          return [[MethodCall]];
        }});
      Object.defineProperty(AstVisitor.prototype.visitPrefixNot, "parameters", {get: function() {
          return [[PrefixNot]];
        }});
      _evalListCache = [[], [0], [0, 0], [0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0, 0]];
      Object.defineProperty(evalList, "parameters", {get: function() {
          return [[], [List]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/change_detection/parser/ast.map

//# sourceMappingURL=../../../../angular2/src/change_detection/parser/ast.js.map