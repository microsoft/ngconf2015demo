System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/collection", "./parser/context_with_variable_bindings", "./abstract_change_detector", "./change_detection_util", "./proto_change_detector"], function($__export) {
  "use strict";
  var assert,
      isPresent,
      isBlank,
      BaseException,
      Type,
      List,
      ListWrapper,
      MapWrapper,
      StringMapWrapper,
      ContextWithVariableBindings,
      AbstractChangeDetector,
      ChangeDetectionUtil,
      ProtoRecord,
      RECORD_TYPE_SELF,
      RECORD_TYPE_PROPERTY,
      RECORD_TYPE_INVOKE_METHOD,
      RECORD_TYPE_CONST,
      RECORD_TYPE_INVOKE_CLOSURE,
      RECORD_TYPE_PRIMITIVE_OP,
      RECORD_TYPE_KEYED_ACCESS,
      RECORD_TYPE_INVOKE_FORMATTER,
      RECORD_TYPE_STRUCTURAL_CHECK,
      RECORD_TYPE_INTERPOLATE,
      ProtoChangeDetector,
      ABSTRACT_CHANGE_DETECTOR,
      UTIL,
      DISPATCHER_ACCESSOR,
      FORMATTERS_ACCESSOR,
      PROTOS_ACCESSOR,
      CHANGE_LOCAL,
      CHANGES_LOCAL,
      TEMP_LOCAL,
      ChangeDetectorJITGenerator;
  function typeTemplate(type, cons, detectChanges, setContext) {
    assert.argumentTypes(type, assert.type.string, cons, assert.type.string, detectChanges, assert.type.string, setContext, assert.type.string);
    return assert.returnType((("\n" + cons + "\n" + detectChanges + "\n" + setContext + ";\n\nreturn function(dispatcher, formatters) {\n  return new " + type + "(dispatcher, formatters, protos);\n}\n")), assert.type.string);
  }
  function constructorTemplate(type, fieldsDefinitions) {
    assert.argumentTypes(type, assert.type.string, fieldsDefinitions, assert.type.string);
    return assert.returnType((("\nvar " + type + " = function " + type + "(dispatcher, formatters, protos) {\n" + ABSTRACT_CHANGE_DETECTOR + ".call(this);\n" + DISPATCHER_ACCESSOR + " = dispatcher;\n" + FORMATTERS_ACCESSOR + " = formatters;\n" + PROTOS_ACCESSOR + " = protos;\n" + fieldsDefinitions + "\n}\n\n" + type + ".prototype = Object.create(" + ABSTRACT_CHANGE_DETECTOR + ".prototype);\n")), assert.type.string);
  }
  function setContextTemplate(type) {
    assert.argumentTypes(type, assert.type.string);
    return assert.returnType((("\n" + type + ".prototype.setContext = function(context) {\n  this.context = context;\n}\n")), assert.type.string);
  }
  function detectChangesTemplate(type, body) {
    assert.argumentTypes(type, assert.type.string, body, assert.type.string);
    return assert.returnType((("\n" + type + ".prototype.detectChangesInRecords = function(throwOnChange) {\n  " + body + "\n}\n")), assert.type.string);
  }
  function bodyTemplate(localDefinitions, changeDefinitions, records) {
    assert.argumentTypes(localDefinitions, assert.type.string, changeDefinitions, assert.type.string, records, assert.type.string);
    return assert.returnType((("\n" + localDefinitions + "\n" + changeDefinitions + "\nvar " + TEMP_LOCAL + ";\nvar " + CHANGE_LOCAL + ";\nvar " + CHANGES_LOCAL + " = null;\n\ncontext = this.context;\n" + records + "\n")), assert.type.string);
  }
  function notifyTemplate(index) {
    assert.argumentTypes(index, assert.type.number);
    return assert.returnType((("\nif (" + CHANGES_LOCAL + " && " + CHANGES_LOCAL + ".length > 0) {\n  if(throwOnChange) " + UTIL + ".throwOnChange(" + PROTOS_ACCESSOR + "[" + index + "], " + CHANGES_LOCAL + "[0]);\n  " + DISPATCHER_ACCESSOR + ".onRecordChange(" + PROTOS_ACCESSOR + "[" + index + "].directiveMemento, " + CHANGES_LOCAL + ");\n  " + CHANGES_LOCAL + " = null;\n}\n")), assert.type.string);
  }
  function structuralCheckTemplate(selfIndex, field, context, notify) {
    assert.argumentTypes(selfIndex, assert.type.number, field, assert.type.string, context, assert.type.string, notify, assert.type.string);
    return assert.returnType((("\n" + CHANGE_LOCAL + " = " + UTIL + ".structuralCheck(" + field + ", " + context + ");\nif (" + CHANGE_LOCAL + ") {\n  " + CHANGES_LOCAL + " = " + UTIL + ".addRecord(" + CHANGES_LOCAL + ",\n    " + UTIL + ".changeRecord(" + PROTOS_ACCESSOR + "[" + selfIndex + "].bindingMemento, " + CHANGE_LOCAL + "));\n  " + field + " = " + CHANGE_LOCAL + ".currentValue;\n}\n" + notify + "\n")), assert.type.string);
  }
  function referenceCheckTemplate(assignment, newValue, oldValue, change, addRecord, notify) {
    return ("\n" + assignment + "\nif (" + newValue + " !== " + oldValue + " || (" + newValue + " !== " + newValue + ") && (" + oldValue + " !== " + oldValue + ")) {\n  " + change + " = true;\n  " + addRecord + "\n  " + oldValue + " = " + newValue + ";\n}\n" + notify + "\n");
  }
  function assignmentTemplate(field, value) {
    assert.argumentTypes(field, assert.type.string, value, assert.type.string);
    return (field + " = " + value + ";");
  }
  function propertyReadTemplate(name, context, newValue) {
    assert.argumentTypes(name, assert.type.string, context, assert.type.string, newValue, assert.type.string);
    return ("\n" + TEMP_LOCAL + " = " + UTIL + ".findContext(\"" + name + "\", " + context + ");\nif (" + TEMP_LOCAL + " instanceof ContextWithVariableBindings) {\n  " + newValue + " = " + TEMP_LOCAL + ".get('" + name + "');\n} else {\n  " + newValue + " = " + TEMP_LOCAL + "." + name + ";\n}\n");
  }
  function localDefinitionsTemplate(names) {
    return assert.returnType((names.map((function(n) {
      return ("var " + n + ";");
    })).join("\n")), assert.type.string);
  }
  function changeDefinitionsTemplate(names) {
    return assert.returnType((names.map((function(n) {
      return ("var " + n + " = false;");
    })).join("\n")), assert.type.string);
  }
  function fieldDefinitionsTemplate(names) {
    return assert.returnType((names.map((function(n) {
      return (n + " = " + UTIL + ".unitialized();");
    })).join("\n")), assert.type.string);
  }
  function ifChangedGuardTemplate(changeNames, body) {
    assert.argumentTypes(changeNames, List, body, assert.type.string);
    var cond = changeNames.join(" || ");
    return assert.returnType((("\nif (" + cond + ") {\n  " + body + "\n}\n")), assert.type.string);
  }
  function addSimpleChangeRecordTemplate(protoIndex, oldValue, newValue) {
    assert.argumentTypes(protoIndex, assert.type.number, oldValue, assert.type.string, newValue, assert.type.string);
    return (CHANGES_LOCAL + " = " + UTIL + ".addRecord(" + CHANGES_LOCAL + ",\n    " + UTIL + ".simpleChangeRecord(" + PROTOS_ACCESSOR + "[" + protoIndex + "].bindingMemento, " + oldValue + ", " + newValue + "));");
  }
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      BaseException = $__m.BaseException;
      Type = $__m.Type;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      ContextWithVariableBindings = $__m.ContextWithVariableBindings;
    }, function($__m) {
      AbstractChangeDetector = $__m.AbstractChangeDetector;
    }, function($__m) {
      ChangeDetectionUtil = $__m.ChangeDetectionUtil;
    }, function($__m) {
      ProtoRecord = $__m.ProtoRecord;
      RECORD_TYPE_SELF = $__m.RECORD_TYPE_SELF;
      RECORD_TYPE_PROPERTY = $__m.RECORD_TYPE_PROPERTY;
      RECORD_TYPE_INVOKE_METHOD = $__m.RECORD_TYPE_INVOKE_METHOD;
      RECORD_TYPE_CONST = $__m.RECORD_TYPE_CONST;
      RECORD_TYPE_INVOKE_CLOSURE = $__m.RECORD_TYPE_INVOKE_CLOSURE;
      RECORD_TYPE_PRIMITIVE_OP = $__m.RECORD_TYPE_PRIMITIVE_OP;
      RECORD_TYPE_KEYED_ACCESS = $__m.RECORD_TYPE_KEYED_ACCESS;
      RECORD_TYPE_INVOKE_FORMATTER = $__m.RECORD_TYPE_INVOKE_FORMATTER;
      RECORD_TYPE_STRUCTURAL_CHECK = $__m.RECORD_TYPE_STRUCTURAL_CHECK;
      RECORD_TYPE_INTERPOLATE = $__m.RECORD_TYPE_INTERPOLATE;
      ProtoChangeDetector = $__m.ProtoChangeDetector;
    }],
    execute: function() {
      ABSTRACT_CHANGE_DETECTOR = "AbstractChangeDetector";
      UTIL = "ChangeDetectionUtil";
      DISPATCHER_ACCESSOR = "this.dispatcher";
      FORMATTERS_ACCESSOR = "this.formatters";
      PROTOS_ACCESSOR = "this.protos";
      CHANGE_LOCAL = "change";
      CHANGES_LOCAL = "changes";
      TEMP_LOCAL = "temp";
      Object.defineProperty(typeTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string], [assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(constructorTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(setContextTemplate, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(detectChangesTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(bodyTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(notifyTemplate, "parameters", {get: function() {
          return [[assert.type.number]];
        }});
      Object.defineProperty(structuralCheckTemplate, "parameters", {get: function() {
          return [[assert.type.number], [assert.type.string], [assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(assignmentTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(propertyReadTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(localDefinitionsTemplate, "parameters", {get: function() {
          return [[List]];
        }});
      Object.defineProperty(changeDefinitionsTemplate, "parameters", {get: function() {
          return [[List]];
        }});
      Object.defineProperty(fieldDefinitionsTemplate, "parameters", {get: function() {
          return [[List]];
        }});
      Object.defineProperty(ifChangedGuardTemplate, "parameters", {get: function() {
          return [[List], [assert.type.string]];
        }});
      Object.defineProperty(addSimpleChangeRecordTemplate, "parameters", {get: function() {
          return [[assert.type.number], [assert.type.string], [assert.type.string]];
        }});
      ChangeDetectorJITGenerator = $__export("ChangeDetectorJITGenerator", (function() {
        var ChangeDetectorJITGenerator = function ChangeDetectorJITGenerator(typeName, records) {
          assert.argumentTypes(typeName, assert.type.string, records, assert.genericType(List, ProtoRecord));
          this.typeName = typeName;
          this.records = records;
          this.localNames = this.getLocalNames(records);
          this.changeNames = this.getChangeNames(this.localNames);
          this.fieldNames = this.getFieldNames(this.localNames);
        };
        return ($traceurRuntime.createClass)(ChangeDetectorJITGenerator, {
          getLocalNames: function(records) {
            assert.argumentTypes(records, assert.genericType(List, ProtoRecord));
            var index = 0;
            var names = records.map((function(r) {
              var sanitizedName = r.name.replace(new RegExp("\\W", "g"), '');
              return ("" + sanitizedName + index++);
            }));
            return assert.returnType((["context"].concat(names)), assert.genericType(List, String));
          },
          getChangeNames: function(localNames) {
            return assert.returnType((localNames.map((function(n) {
              return ("change_" + n);
            }))), assert.genericType(List, String));
          },
          getFieldNames: function(localNames) {
            return assert.returnType((localNames.map((function(n) {
              return ("this." + n);
            }))), assert.genericType(List, String));
          },
          generate: function() {
            var text = typeTemplate(this.typeName, this.genConstructor(), this.genDetectChanges(), this.genSetContext());
            return assert.returnType((new Function('AbstractChangeDetector', 'ChangeDetectionUtil', 'ContextWithVariableBindings', 'protos', text)(AbstractChangeDetector, ChangeDetectionUtil, ContextWithVariableBindings, this.records)), Function);
          },
          genConstructor: function() {
            return assert.returnType((constructorTemplate(this.typeName, fieldDefinitionsTemplate(this.fieldNames))), assert.type.string);
          },
          genSetContext: function() {
            return assert.returnType((setContextTemplate(this.typeName)), assert.type.string);
          },
          genDetectChanges: function() {
            var body = this.genBody();
            return assert.returnType((detectChangesTemplate(this.typeName, body)), assert.type.string);
          },
          genBody: function() {
            var $__0 = this;
            var rec = this.records.map((function(r) {
              return $__0.genRecord(r);
            })).join("\n");
            return assert.returnType((bodyTemplate(this.genLocalDefinitions(), this.genChangeDefinitions(), rec)), assert.type.string);
          },
          genLocalDefinitions: function() {
            return assert.returnType((localDefinitionsTemplate(this.localNames)), assert.type.string);
          },
          genChangeDefinitions: function() {
            return assert.returnType((changeDefinitionsTemplate(this.changeNames)), assert.type.string);
          },
          genRecord: function(r) {
            assert.argumentTypes(r, ProtoRecord);
            if (r.mode == RECORD_TYPE_STRUCTURAL_CHECK) {
              return assert.returnType((this.getStructuralCheck(r)), assert.type.string);
            } else {
              return assert.returnType((this.genReferenceCheck(r)), assert.type.string);
            }
          },
          getStructuralCheck: function(r) {
            assert.argumentTypes(r, ProtoRecord);
            var field = this.fieldNames[r.selfIndex];
            var context = this.localNames[r.contextIndex];
            return assert.returnType((structuralCheckTemplate(r.selfIndex - 1, field, context, this.genNotify(r))), assert.type.string);
          },
          genReferenceCheck: function(r) {
            assert.argumentTypes(r, ProtoRecord);
            var newValue = this.localNames[r.selfIndex];
            var oldValue = this.fieldNames[r.selfIndex];
            var change = this.changeNames[r.selfIndex];
            var assignment = this.genUpdateCurrentValue(r);
            var addRecord = addSimpleChangeRecordTemplate(r.selfIndex - 1, oldValue, newValue);
            var notify = this.genNotify(r);
            var check = referenceCheckTemplate(assignment, newValue, oldValue, change, r.lastInBinding ? addRecord : '', notify);
            ;
            if (r.isPureFunction()) {
              return assert.returnType((this.ifChangedGuard(r, check)), assert.type.string);
            } else {
              return assert.returnType((check), assert.type.string);
            }
          },
          genUpdateCurrentValue: function(r) {
            assert.argumentTypes(r, ProtoRecord);
            var context = this.localNames[r.contextIndex];
            var newValue = this.localNames[r.selfIndex];
            var args = this.genArgs(r);
            switch (r.mode) {
              case RECORD_TYPE_SELF:
                return assert.returnType((assignmentTemplate(newValue, context)), assert.type.string);
              case RECORD_TYPE_CONST:
                return assert.returnType(((newValue + " = " + this.genLiteral(r.funcOrValue))), assert.type.string);
              case RECORD_TYPE_PROPERTY:
                if (r.contextIndex == 0) {
                  return assert.returnType((propertyReadTemplate(r.name, context, newValue)), assert.type.string);
                } else {
                  return assert.returnType((assignmentTemplate(newValue, (context + "." + r.name))), assert.type.string);
                }
              case RECORD_TYPE_INVOKE_METHOD:
                return assert.returnType((assignmentTemplate(newValue, (context + "." + r.name + "(" + args + ")"))), assert.type.string);
              case RECORD_TYPE_INVOKE_CLOSURE:
                return assert.returnType((assignmentTemplate(newValue, (context + "(" + args + ")"))), assert.type.string);
              case RECORD_TYPE_PRIMITIVE_OP:
                return assert.returnType((assignmentTemplate(newValue, (UTIL + "." + r.name + "(" + args + ")"))), assert.type.string);
              case RECORD_TYPE_INTERPOLATE:
                return assert.returnType((assignmentTemplate(newValue, this.genInterpolation(r))), assert.type.string);
              case RECORD_TYPE_INVOKE_FORMATTER:
                return assert.returnType((assignmentTemplate(newValue, (FORMATTERS_ACCESSOR + ".get(\"" + r.name + "\")(" + args + ")"))), assert.type.string);
              case RECORD_TYPE_KEYED_ACCESS:
                var key = this.localNames[r.args[0]];
                return assert.returnType((assignmentTemplate(newValue, (context + "[" + key + "]"))), assert.type.string);
              default:
                throw new BaseException(("Unknown operation " + r.mode));
            }
          },
          ifChangedGuard: function(r, body) {
            var $__0 = this;
            return assert.returnType((ifChangedGuardTemplate(r.args.map((function(a) {
              return $__0.changeNames[a];
            })), body)), assert.type.string);
          },
          genInterpolation: function(r) {
            assert.argumentTypes(r, ProtoRecord);
            var res = "";
            for (var i = 0; i < r.args.length; ++i) {
              res += this.genLiteral(r.fixedArgs[i]);
              res += " + ";
              res += this.localNames[r.args[i]];
              res += " + ";
            }
            res += this.genLiteral(r.fixedArgs[r.args.length]);
            return assert.returnType((res), assert.type.string);
          },
          genLiteral: function(value) {
            return assert.returnType((JSON.stringify(value)), assert.type.string);
          },
          genNotify: function(r) {
            return assert.returnType((r.lastInDirective ? notifyTemplate(r.selfIndex - 1) : ''), assert.type.string);
          },
          genArgs: function(r) {
            var $__0 = this;
            return assert.returnType((r.args.map((function(arg) {
              return $__0.localNames[arg];
            })).join(", ")), assert.type.string);
          }
        }, {});
      }()));
      Object.defineProperty(ChangeDetectorJITGenerator, "parameters", {get: function() {
          return [[assert.type.string], [assert.genericType(List, ProtoRecord)]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.getLocalNames, "parameters", {get: function() {
          return [[assert.genericType(List, ProtoRecord)]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.getChangeNames, "parameters", {get: function() {
          return [[assert.genericType(List, String)]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.getFieldNames, "parameters", {get: function() {
          return [[assert.genericType(List, String)]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.genRecord, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.getStructuralCheck, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.genReferenceCheck, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.genUpdateCurrentValue, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.ifChangedGuard, "parameters", {get: function() {
          return [[ProtoRecord], [assert.type.string]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.genInterpolation, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.genArgs, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/change_detection/change_detection_jit_generator.map

//# sourceMappingURL=../../../angular2/src/change_detection/change_detection_jit_generator.js.map