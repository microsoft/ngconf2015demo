System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/change_detection/parser/parser", "angular2/src/change_detection/parser/lexer", "./util", "angular2/change_detection", "angular2/src/change_detection/proto_change_detector"], function($__export) {
  "use strict";
  var assert,
      ddescribe,
      describe,
      it,
      iit,
      xit,
      expect,
      beforeEach,
      afterEach,
      IS_DARTIUM,
      isPresent,
      isBlank,
      isJsObject,
      BaseException,
      FunctionWrapper,
      List,
      ListWrapper,
      MapWrapper,
      StringMapWrapper,
      Parser,
      Lexer,
      arrayChangesAsString,
      kvChangesAsString,
      ChangeDispatcher,
      DynamicChangeDetector,
      ChangeDetectionError,
      ContextWithVariableBindings,
      CHECK_ALWAYS,
      CHECK_ONCE,
      CHECKED,
      DETACHED,
      JitProtoChangeDetector,
      DynamicProtoChangeDetector,
      TestRecord,
      Person,
      Address,
      Uninitialized,
      TestData,
      TestDispatcher;
  function main() {
    describe("change detection", (function() {
      StringMapWrapper.forEach({
        "dynamic": (function() {
          return new DynamicProtoChangeDetector();
        }),
        "JIT": (function() {
          return new JitProtoChangeDetector();
        })
      }, (function(createProtoChangeDetector, name) {
        if (name == "JIT" && IS_DARTIUM)
          return ;
        function ast(exp) {
          var location = arguments[1] !== (void 0) ? arguments[1] : 'location';
          assert.argumentTypes(exp, assert.type.string, location, assert.type.string);
          var parser = new Parser(new Lexer());
          return parser.parseBinding(exp, location);
        }
        Object.defineProperty(ast, "parameters", {get: function() {
            return [[assert.type.string], [assert.type.string]];
          }});
        function createChangeDetector(memo, exp) {
          var context = arguments[2] !== (void 0) ? arguments[2] : null;
          var formatters = arguments[3] !== (void 0) ? arguments[3] : null;
          var structural = arguments[4] !== (void 0) ? arguments[4] : false;
          assert.argumentTypes(memo, assert.type.string, exp, assert.type.string, context, assert.type.any, formatters, assert.type.any, structural, assert.type.any);
          var pcd = createProtoChangeDetector();
          pcd.addAst(ast(exp), memo, memo, structural);
          var dispatcher = new TestDispatcher();
          var cd = pcd.instantiate(dispatcher, formatters);
          cd.setContext(context);
          return {
            "changeDetector": cd,
            "dispatcher": dispatcher
          };
        }
        Object.defineProperty(createChangeDetector, "parameters", {get: function() {
            return [[assert.type.string], [assert.type.string], [], [], []];
          }});
        function executeWatch(memo, exp) {
          var context = arguments[2] !== (void 0) ? arguments[2] : null;
          var formatters = arguments[3] !== (void 0) ? arguments[3] : null;
          var content = arguments[4] !== (void 0) ? arguments[4] : false;
          assert.argumentTypes(memo, assert.type.string, exp, assert.type.string, context, assert.type.any, formatters, assert.type.any, content, assert.type.any);
          var res = createChangeDetector(memo, exp, context, formatters, content);
          res["changeDetector"].detectChanges();
          return res["dispatcher"].log;
        }
        Object.defineProperty(executeWatch, "parameters", {get: function() {
            return [[assert.type.string], [assert.type.string], [], [], []];
          }});
        describe((name + " change detection"), (function() {
          it('should do simple watching', (function() {
            var person = new Person("misko");
            var c = createChangeDetector('name', 'name', person);
            var cd = c["changeDetector"];
            var dispatcher = c["dispatcher"];
            cd.detectChanges();
            expect(dispatcher.log).toEqual(['name=misko']);
            dispatcher.clear();
            cd.detectChanges();
            expect(dispatcher.log).toEqual([]);
            dispatcher.clear();
            person.name = "Misko";
            cd.detectChanges();
            expect(dispatcher.log).toEqual(['name=Misko']);
          }));
          it('should report all changes on the first run including uninitialized values', (function() {
            expect(executeWatch('value', 'value', new Uninitialized())).toEqual(['value=null']);
          }));
          it('should report all changes on the first run including null values', (function() {
            var td = new TestData(null);
            expect(executeWatch('a', 'a', td)).toEqual(['a=null']);
          }));
          it("should support literals", (function() {
            expect(executeWatch('const', '10')).toEqual(['const=10']);
            expect(executeWatch('const', '"str"')).toEqual(['const=str']);
            expect(executeWatch('const', '"a\n\nb"')).toEqual(['const=a\n\nb']);
          }));
          it('simple chained property access', (function() {
            var address = new Address('Grenoble');
            var person = new Person('Victor', address);
            expect(executeWatch('address.city', 'address.city', person)).toEqual(['address.city=Grenoble']);
          }));
          it("should support method calls", (function() {
            var person = new Person('Victor');
            expect(executeWatch('m', 'sayHi("Jim")', person)).toEqual(['m=Hi, Jim']);
          }));
          it("should support function calls", (function() {
            var td = new TestData((function() {
              return (function(a) {
                return a;
              });
            }));
            expect(executeWatch('value', 'a()(99)', td)).toEqual(['value=99']);
          }));
          it("should support chained method calls", (function() {
            var person = new Person('Victor');
            var td = new TestData(person);
            expect(executeWatch('m', 'a.sayHi("Jim")', td)).toEqual(['m=Hi, Jim']);
          }));
          it("should support literal array", (function() {
            var c = createChangeDetector('array', '[1,2]');
            c["changeDetector"].detectChanges();
            expect(c["dispatcher"].loggedValues).toEqual([[[1, 2]]]);
            c = createChangeDetector('array', '[1,a]', new TestData(2));
            c["changeDetector"].detectChanges();
            expect(c["dispatcher"].loggedValues).toEqual([[[1, 2]]]);
          }));
          it("should support literal maps", (function() {
            var c = createChangeDetector('map', '{z:1}');
            c["changeDetector"].detectChanges();
            expect(c["dispatcher"].loggedValues[0][0]['z']).toEqual(1);
            c = createChangeDetector('map', '{z:a}', new TestData(1));
            c["changeDetector"].detectChanges();
            expect(c["dispatcher"].loggedValues[0][0]['z']).toEqual(1);
          }));
          it("should support binary operations", (function() {
            expect(executeWatch('exp', '10 + 2')).toEqual(['exp=12']);
            expect(executeWatch('exp', '10 - 2')).toEqual(['exp=8']);
            expect(executeWatch('exp', '10 * 2')).toEqual(['exp=20']);
            expect(executeWatch('exp', '10 / 2')).toEqual([("exp=" + 5.0)]);
            expect(executeWatch('exp', '11 % 2')).toEqual(['exp=1']);
            expect(executeWatch('exp', '1 == 1')).toEqual(['exp=true']);
            expect(executeWatch('exp', '1 != 1')).toEqual(['exp=false']);
            expect(executeWatch('exp', '1 < 2')).toEqual(['exp=true']);
            expect(executeWatch('exp', '2 < 1')).toEqual(['exp=false']);
            expect(executeWatch('exp', '2 > 1')).toEqual(['exp=true']);
            expect(executeWatch('exp', '2 < 1')).toEqual(['exp=false']);
            expect(executeWatch('exp', '1 <= 2')).toEqual(['exp=true']);
            expect(executeWatch('exp', '2 <= 2')).toEqual(['exp=true']);
            expect(executeWatch('exp', '2 <= 1')).toEqual(['exp=false']);
            expect(executeWatch('exp', '2 >= 1')).toEqual(['exp=true']);
            expect(executeWatch('exp', '2 >= 2')).toEqual(['exp=true']);
            expect(executeWatch('exp', '1 >= 2')).toEqual(['exp=false']);
            expect(executeWatch('exp', 'true && true')).toEqual(['exp=true']);
            expect(executeWatch('exp', 'true && false')).toEqual(['exp=false']);
            expect(executeWatch('exp', 'true || false')).toEqual(['exp=true']);
            expect(executeWatch('exp', 'false || false')).toEqual(['exp=false']);
          }));
          it("should support negate", (function() {
            expect(executeWatch('exp', '!true')).toEqual(['exp=false']);
            expect(executeWatch('exp', '!!true')).toEqual(['exp=true']);
          }));
          it("should support conditionals", (function() {
            expect(executeWatch('m', '1 < 2 ? 1 : 2')).toEqual(['m=1']);
            expect(executeWatch('m', '1 > 2 ? 1 : 2')).toEqual(['m=2']);
          }));
          describe("keyed access", (function() {
            it("should support accessing a list item", (function() {
              expect(executeWatch('array[0]', '["foo", "bar"][0]')).toEqual(['array[0]=foo']);
            }));
            it("should support accessing a map item", (function() {
              expect(executeWatch('map[foo]', '{"foo": "bar"}["foo"]')).toEqual(['map[foo]=bar']);
            }));
          }));
          it("should support formatters", (function() {
            var formatters = MapWrapper.createFromPairs([['uppercase', (function(v) {
              return v.toUpperCase();
            })], ['wrap', (function(v, before, after) {
              return ("" + before + v + after);
            })]]);
            expect(executeWatch('str', '"aBc" | uppercase', null, formatters)).toEqual(['str=ABC']);
            expect(executeWatch('str', '"b" | wrap:"a":"c"', null, formatters)).toEqual(['str=abc']);
          }));
          it("should support interpolation", (function() {
            var parser = new Parser(new Lexer());
            var pcd = createProtoChangeDetector();
            var ast = parser.parseInterpolation("B{{a}}A", "location");
            pcd.addAst(ast, "memo", "memo", false);
            var dispatcher = new TestDispatcher();
            var cd = pcd.instantiate(dispatcher, MapWrapper.create());
            cd.setContext(new TestData("value"));
            cd.detectChanges();
            expect(dispatcher.log).toEqual(["memo=BvalueA"]);
          }));
          describe("group changes", (function() {
            it("should notify the dispatcher when a group of records changes", (function() {
              var pcd = createProtoChangeDetector();
              pcd.addAst(ast("1 + 2"), "memo", "1");
              pcd.addAst(ast("10 + 20"), "memo", "1");
              pcd.addAst(ast("100 + 200"), "memo2", "2");
              var dispatcher = new TestDispatcher();
              var cd = pcd.instantiate(dispatcher, null);
              cd.detectChanges();
              expect(dispatcher.loggedValues).toEqual([[3, 30], [300]]);
            }));
            it("should notify the dispatcher before switching to the next group", (function() {
              var pcd = createProtoChangeDetector();
              pcd.addAst(ast("a()"), "a", "1");
              pcd.addAst(ast("b()"), "b", "2");
              pcd.addAst(ast("c()"), "c", "2");
              var dispatcher = new TestDispatcher();
              var cd = pcd.instantiate(dispatcher, null);
              var tr = new TestRecord();
              tr.a = (function() {
                dispatcher.logValue('InvokeA');
                return 'a';
              });
              tr.b = (function() {
                dispatcher.logValue('InvokeB');
                return 'b';
              });
              tr.c = (function() {
                dispatcher.logValue('InvokeC');
                return 'c';
              });
              cd.setContext(tr);
              cd.detectChanges();
              expect(dispatcher.loggedValues).toEqual(['InvokeA', ['a'], 'InvokeB', 'InvokeC', ['b', 'c']]);
            }));
          }));
          describe("enforce no new changes", (function() {
            it("should throw when a record gets changed after it has been checked", (function() {
              var pcd = createProtoChangeDetector();
              pcd.addAst(ast("a"), "a", 1);
              var dispatcher = new TestDispatcher();
              var cd = pcd.instantiate(dispatcher, null);
              cd.setContext(new TestData('value'));
              expect((function() {
                cd.checkNoChanges();
              })).toThrowError(new RegExp("Expression 'a in location' has changed after it was checked"));
            }));
          }));
          describe("error handling", (function() {
            xit("should wrap exceptions into ChangeDetectionError", (function() {
              var pcd = createProtoChangeDetector();
              pcd.addAst(ast('invalidProp', 'someComponent'), "a", 1);
              var cd = pcd.instantiate(new TestDispatcher(), null);
              cd.setContext(null);
              try {
                cd.detectChanges();
                throw new BaseException("fail");
              } catch (e) {
                expect(e).toBeAnInstanceOf(ChangeDetectionError);
                expect(e.location).toEqual("invalidProp in someComponent");
              }
            }));
          }));
          describe("collections", (function() {
            it("should not register a change when going from null to null", (function() {
              var context = new TestData(null);
              var c = createChangeDetector('a', 'a', context, null, true);
              var cd = c["changeDetector"];
              var dispatcher = c["dispatcher"];
              cd.detectChanges();
              expect(dispatcher.log).toEqual([]);
            }));
            it("should register changes when switching from null to collection and back", (function() {
              var context = new TestData(null);
              var c = createChangeDetector('a', 'a', context, null, true);
              var cd = c["changeDetector"];
              var dispatcher = c["dispatcher"];
              context.a = [0];
              cd.detectChanges();
              expect(dispatcher.log).toEqual(["a=" + arrayChangesAsString({
                collection: ['0[null->0]'],
                additions: ['0[null->0]']
              })]);
              dispatcher.clear();
              context.a = null;
              cd.detectChanges();
              expect(dispatcher.log).toEqual(['a=null']);
            }));
            describe("list", (function() {
              it("should support list changes", (function() {
                var context = new TestData([1, 2]);
                expect(executeWatch("a", "a", context, null, true)).toEqual(["a=" + arrayChangesAsString({
                  collection: ['1[null->0]', '2[null->1]'],
                  additions: ['1[null->0]', '2[null->1]']
                })]);
              }));
              it("should handle reference changes", (function() {
                var context = new TestData([1, 2]);
                var objs = createChangeDetector("a", "a", context, null, true);
                var cd = objs["changeDetector"];
                var dispatcher = objs["dispatcher"];
                cd.detectChanges();
                dispatcher.clear();
                context.a = [2, 1];
                cd.detectChanges();
                expect(dispatcher.log).toEqual(["a=" + arrayChangesAsString({
                  collection: ['2[1->0]', '1[0->1]'],
                  previous: ['1[0->1]', '2[1->0]'],
                  moves: ['2[1->0]', '1[0->1]']
                })]);
              }));
            }));
            describe("map", (function() {
              it("should support map changes", (function() {
                var map = MapWrapper.create();
                MapWrapper.set(map, "foo", "bar");
                var context = new TestData(map);
                expect(executeWatch("a", "a", context, null, true)).toEqual(["a=" + kvChangesAsString({
                  map: ['foo[null->bar]'],
                  additions: ['foo[null->bar]']
                })]);
              }));
              it("should handle reference changes", (function() {
                var map = MapWrapper.create();
                MapWrapper.set(map, "foo", "bar");
                var context = new TestData(map);
                var objs = createChangeDetector("a", "a", context, null, true);
                var cd = objs["changeDetector"];
                var dispatcher = objs["dispatcher"];
                cd.detectChanges();
                dispatcher.clear();
                context.a = MapWrapper.create();
                MapWrapper.set(context.a, "bar", "foo");
                cd.detectChanges();
                expect(dispatcher.log).toEqual(["a=" + kvChangesAsString({
                  map: ['bar[null->foo]'],
                  previous: ['foo[bar->null]'],
                  additions: ['bar[null->foo]'],
                  removals: ['foo[bar->null]']
                })]);
              }));
            }));
            if (!IS_DARTIUM) {
              describe("js objects", (function() {
                it("should support object changes", (function() {
                  var map = {"foo": "bar"};
                  var context = new TestData(map);
                  expect(executeWatch("a", "a", context, null, true)).toEqual(["a=" + kvChangesAsString({
                    map: ['foo[null->bar]'],
                    additions: ['foo[null->bar]']
                  })]);
                }));
              }));
            }
          }));
          describe("ContextWithVariableBindings", (function() {
            it('should read a field from ContextWithVariableBindings', (function() {
              var locals = new ContextWithVariableBindings(null, MapWrapper.createFromPairs([["key", "value"]]));
              expect(executeWatch('key', 'key', locals)).toEqual(['key=value']);
            }));
            it('should handle nested ContextWithVariableBindings', (function() {
              var nested = new ContextWithVariableBindings(null, MapWrapper.createFromPairs([["key", "value"]]));
              var locals = new ContextWithVariableBindings(nested, MapWrapper.create());
              expect(executeWatch('key', 'key', locals)).toEqual(['key=value']);
            }));
            it("should fall back to a regular field read when ContextWithVariableBindings " + "does not have the requested field", (function() {
              var locals = new ContextWithVariableBindings(new Person("Jim"), MapWrapper.createFromPairs([["key", "value"]]));
              expect(executeWatch('name', 'name', locals)).toEqual(['name=Jim']);
            }));
          }));
          describe("handle children", (function() {
            var parent,
                child;
            beforeEach((function() {
              var protoParent = createProtoChangeDetector();
              parent = protoParent.instantiate(null, null);
              var protoChild = createProtoChangeDetector();
              child = protoChild.instantiate(null, null);
            }));
            it("should add children", (function() {
              parent.addChild(child);
              expect(parent.children.length).toEqual(1);
              expect(parent.children[0]).toBe(child);
            }));
            it("should remove children", (function() {
              parent.addChild(child);
              parent.removeChild(child);
              expect(parent.children).toEqual([]);
            }));
          }));
        }));
        describe("optimizations", (function() {
          it("should not rerun formatters when args did not change", (function() {
            var count = 0;
            var formatters = MapWrapper.createFromPairs([['count', (function(v) {
              count++;
              "value";
            })]]);
            var c = createChangeDetector('a', 'a | count', new TestData(null), formatters);
            var cd = c["changeDetector"];
            cd.detectChanges();
            expect(count).toEqual(1);
            cd.detectChanges();
            expect(count).toEqual(1);
          }));
        }));
        describe("mode", (function() {
          it("should not check a detached change detector", (function() {
            var c = createChangeDetector('name', 'a', new TestData("value"));
            var cd = c["changeDetector"];
            var dispatcher = c["dispatcher"];
            cd.mode = DETACHED;
            cd.detectChanges();
            expect(dispatcher.log).toEqual([]);
          }));
          it("should not check a checked change detector", (function() {
            var c = createChangeDetector('name', 'a', new TestData("value"));
            var cd = c["changeDetector"];
            var dispatcher = c["dispatcher"];
            cd.mode = CHECKED;
            cd.detectChanges();
            expect(dispatcher.log).toEqual([]);
          }));
          it("should change CHECK_ONCE to CHECKED", (function() {
            var cd = createProtoChangeDetector().instantiate(null, null);
            cd.mode = CHECK_ONCE;
            cd.detectChanges();
            expect(cd.mode).toEqual(CHECKED);
          }));
          it("should not change the CHECK_ALWAYS", (function() {
            var cd = createProtoChangeDetector().instantiate(null, null);
            cd.mode = CHECK_ALWAYS;
            cd.detectChanges();
            expect(cd.mode).toEqual(CHECK_ALWAYS);
          }));
        }));
        describe("markPathToRootAsCheckOnce", (function() {
          function changeDetector(mode, parent) {
            var cd = createProtoChangeDetector().instantiate(null, null);
            cd.mode = mode;
            if (isPresent(parent))
              parent.addChild(cd);
            return cd;
          }
          it("should mark all checked detectors as CHECK_ONCE " + "until reaching a detached one", (function() {
            var root = changeDetector(CHECK_ALWAYS, null);
            var disabled = changeDetector(DETACHED, root);
            var parent = changeDetector(CHECKED, disabled);
            var checkAlwaysChild = changeDetector(CHECK_ALWAYS, parent);
            var checkOnceChild = changeDetector(CHECK_ONCE, checkAlwaysChild);
            var checkedChild = changeDetector(CHECKED, checkOnceChild);
            checkedChild.markPathToRootAsCheckOnce();
            expect(root.mode).toEqual(CHECK_ALWAYS);
            expect(disabled.mode).toEqual(DETACHED);
            expect(parent.mode).toEqual(CHECK_ONCE);
            expect(checkAlwaysChild.mode).toEqual(CHECK_ALWAYS);
            expect(checkOnceChild.mode).toEqual(CHECK_ONCE);
            expect(checkedChild.mode).toEqual(CHECK_ONCE);
          }));
        }));
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      ddescribe = $__m.ddescribe;
      describe = $__m.describe;
      it = $__m.it;
      iit = $__m.iit;
      xit = $__m.xit;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
      afterEach = $__m.afterEach;
      IS_DARTIUM = $__m.IS_DARTIUM;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      isJsObject = $__m.isJsObject;
      BaseException = $__m.BaseException;
      FunctionWrapper = $__m.FunctionWrapper;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      Parser = $__m.Parser;
    }, function($__m) {
      Lexer = $__m.Lexer;
    }, function($__m) {
      arrayChangesAsString = $__m.arrayChangesAsString;
      kvChangesAsString = $__m.kvChangesAsString;
    }, function($__m) {
      ChangeDispatcher = $__m.ChangeDispatcher;
      DynamicChangeDetector = $__m.DynamicChangeDetector;
      ChangeDetectionError = $__m.ChangeDetectionError;
      ContextWithVariableBindings = $__m.ContextWithVariableBindings;
      CHECK_ALWAYS = $__m.CHECK_ALWAYS;
      CHECK_ONCE = $__m.CHECK_ONCE;
      CHECKED = $__m.CHECKED;
      DETACHED = $__m.DETACHED;
    }, function($__m) {
      JitProtoChangeDetector = $__m.JitProtoChangeDetector;
      DynamicProtoChangeDetector = $__m.DynamicProtoChangeDetector;
    }],
    execute: function() {
      TestRecord = (function() {
        var TestRecord = function TestRecord() {};
        return ($traceurRuntime.createClass)(TestRecord, {}, {});
      }());
      Person = (function() {
        var Person = function Person(name) {
          var address = arguments[1] !== (void 0) ? arguments[1] : null;
          assert.argumentTypes(name, assert.type.string, address, Address);
          this.name = name;
          this.address = address;
        };
        return ($traceurRuntime.createClass)(Person, {
          sayHi: function(m) {
            return ("Hi, " + m);
          },
          toString: function() {
            var address = this.address == null ? '' : ' address=' + this.address.toString();
            return assert.returnType(('name=' + this.name + address), assert.type.string);
          }
        }, {});
      }());
      Object.defineProperty(Person, "parameters", {get: function() {
          return [[assert.type.string], [Address]];
        }});
      Address = (function() {
        var Address = function Address(city) {
          assert.argumentTypes(city, assert.type.string);
          this.city = city;
        };
        return ($traceurRuntime.createClass)(Address, {toString: function() {
            return assert.returnType((this.city), assert.type.string);
          }}, {});
      }());
      Object.defineProperty(Address, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Uninitialized = (function() {
        var Uninitialized = function Uninitialized() {};
        return ($traceurRuntime.createClass)(Uninitialized, {}, {});
      }());
      TestData = (function() {
        var TestData = function TestData(a) {
          this.a = a;
        };
        return ($traceurRuntime.createClass)(TestData, {}, {});
      }());
      TestDispatcher = (function($__super) {
        var TestDispatcher = function TestDispatcher() {
          $traceurRuntime.superConstructor(TestDispatcher).call(this);
          this.log = null;
          this.loggedValues = null;
          this.onChange = (function(_, __) {});
          this.clear();
        };
        return ($traceurRuntime.createClass)(TestDispatcher, {
          clear: function() {
            this.log = ListWrapper.create();
            this.loggedValues = ListWrapper.create();
          },
          logValue: function(value) {
            ListWrapper.push(this.loggedValues, value);
          },
          onRecordChange: function(group, updates) {
            var value = updates[0].change.currentValue;
            var memento = updates[0].bindingMemento;
            ListWrapper.push(this.log, memento + '=' + this._asString(value));
            var values = ListWrapper.map(updates, (function(r) {
              return r.change.currentValue;
            }));
            ListWrapper.push(this.loggedValues, values);
            this.onChange(group, updates);
          },
          _asString: function(value) {
            return (isBlank(value) ? 'null' : value.toString());
          }
        }, {}, $__super);
      }(ChangeDispatcher));
      Object.defineProperty(TestDispatcher.prototype.onRecordChange, "parameters", {get: function() {
          return [[], [List]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/test/change_detection/change_detection_spec.map

//# sourceMappingURL=../../../angular2/test/change_detection/change_detection_spec.js.map