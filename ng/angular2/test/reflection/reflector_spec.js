System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/reflection/reflection", "angular2/src/reflection/reflection_capabilities", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var assert,
      describe,
      it,
      iit,
      ddescribe,
      expect,
      beforeEach,
      Reflector,
      ReflectionCapabilities,
      CONST,
      Annotation,
      AType,
      ClassWithAnnotations,
      ClassWithoutAnnotations,
      TestObjWith11Args,
      TestObj;
  function testFunc(a, b) {
    assert.argumentTypes(a, AType, b, AType);
  }
  function main() {
    describe('Reflector', (function() {
      var reflector;
      beforeEach((function() {
        reflector = new Reflector(new ReflectionCapabilities());
      }));
      describe("factory", (function() {
        it("should create a factory for the given type", (function() {
          var obj = reflector.factory(TestObj)(1, 2);
          expect(obj.a).toEqual(1);
          expect(obj.b).toEqual(2);
        }));
        it("should throw when more than 10 arguments", (function() {
          expect((function() {
            return reflector.factory(TestObjWith11Args)(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
          })).toThrowError();
        }));
        it("should return a registered factory if available", (function() {
          reflector.registerType(TestObj, {"factory": (function() {
              return "fake";
            })});
          expect(reflector.factory(TestObj)()).toEqual("fake");
        }));
      }));
      describe("parameters", (function() {
        it("should return an array of parameters for a type", (function() {
          var p = reflector.parameters(ClassWithAnnotations);
          expect(p).toEqual([[AType, new Annotation('a')], [AType, new Annotation('b')]]);
        }));
        it("should return an array of parameters for a function", (function() {
          var p = reflector.parameters(testFunc);
          expect(p).toEqual([[AType, new Annotation('a')], [AType, new Annotation('b')]]);
        }));
        it("should work for a class without annotations", (function() {
          var p = reflector.parameters(ClassWithoutAnnotations);
          expect(p.length).toEqual(2);
        }));
        it("should return registered parameters if available", (function() {
          reflector.registerType(TestObj, {"parameters": [1, 2]});
          expect(reflector.parameters(TestObj)).toEqual([1, 2]);
        }));
      }));
      describe("annotations", (function() {
        it("should return an array of annotations for a type", (function() {
          var p = reflector.annotations(ClassWithAnnotations);
          expect(p).toEqual([new Annotation('class')]);
        }));
        it("should return an array of annotations for a function", (function() {
          var p = reflector.annotations(testFunc);
          expect(p).toEqual([new Annotation('func')]);
        }));
        it("should return registered annotations if available", (function() {
          reflector.registerType(TestObj, {"annotations": [1, 2]});
          expect(reflector.annotations(TestObj)).toEqual([1, 2]);
        }));
      }));
      describe("getter", (function() {
        it("returns a function reading a property", (function() {
          var getA = reflector.getter('a');
          expect(getA(new TestObj(1, 2))).toEqual(1);
        }));
        it("should return a registered getter if available", (function() {
          reflector.registerGetters({"abc": (function(obj) {
              return "fake";
            })});
          expect(reflector.getter("abc")("anything")).toEqual("fake");
        }));
      }));
      describe("setter", (function() {
        it("returns a function setting a property", (function() {
          var setA = reflector.setter('a');
          var obj = new TestObj(1, 2);
          setA(obj, 100);
          expect(obj.a).toEqual(100);
        }));
        it("should return a registered setter if available", (function() {
          var updateMe;
          reflector.registerSetters({"abc": (function(obj, value) {
              updateMe = value;
            })});
          reflector.setter("abc")("anything", "fake");
          expect(updateMe).toEqual("fake");
        }));
      }));
      describe("method", (function() {
        it("returns a function invoking a method", (function() {
          var func = reflector.method('identity');
          var obj = new TestObj(1, 2);
          expect(func(obj, ['value'])).toEqual('value');
        }));
        it("should return a registered method if available", (function() {
          reflector.registerMethods({"abc": (function(obj, args) {
              return args;
            })});
          expect(reflector.method("abc")("anything", ["fake"])).toEqual(['fake']);
        }));
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      describe = $__m.describe;
      it = $__m.it;
      iit = $__m.iit;
      ddescribe = $__m.ddescribe;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
    }, function($__m) {
      Reflector = $__m.Reflector;
    }, function($__m) {
      ReflectionCapabilities = $__m.ReflectionCapabilities;
    }, function($__m) {
      CONST = $__m.CONST;
    }],
    execute: function() {
      Annotation = (function() {
        var Annotation = function Annotation(value) {
          this.value = value;
        };
        return ($traceurRuntime.createClass)(Annotation, {}, {});
      }());
      Object.defineProperty(Annotation, "annotations", {get: function() {
          return [new CONST()];
        }});
      AType = (function() {
        var AType = function AType(value) {
          this.value = value;
        };
        return ($traceurRuntime.createClass)(AType, {}, {});
      }());
      ClassWithAnnotations = (function() {
        var ClassWithAnnotations = function ClassWithAnnotations(a, b) {
          assert.argumentTypes(a, AType, b, AType);
          this.a = a;
          this.b = b;
        };
        return ($traceurRuntime.createClass)(ClassWithAnnotations, {}, {});
      }());
      Object.defineProperty(ClassWithAnnotations, "annotations", {get: function() {
          return [new Annotation('class')];
        }});
      Object.defineProperty(ClassWithAnnotations, "parameters", {get: function() {
          return [[AType, new Annotation("a")], [AType, new Annotation("b")]];
        }});
      ClassWithoutAnnotations = (function() {
        var ClassWithoutAnnotations = function ClassWithoutAnnotations(a, b) {};
        return ($traceurRuntime.createClass)(ClassWithoutAnnotations, {}, {});
      }());
      TestObjWith11Args = (function() {
        var TestObjWith11Args = function TestObjWith11Args(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {};
        return ($traceurRuntime.createClass)(TestObjWith11Args, {}, {});
      }());
      Object.defineProperty(testFunc, "annotations", {get: function() {
          return [new Annotation('func')];
        }});
      Object.defineProperty(testFunc, "parameters", {get: function() {
          return [[AType, new Annotation("a")], [AType, new Annotation("b")]];
        }});
      TestObj = (function() {
        var TestObj = function TestObj(a, b) {
          this.a = a;
          this.b = b;
        };
        return ($traceurRuntime.createClass)(TestObj, {identity: function(arg) {
            return arg;
          }}, {});
      }());
    }
  };
});

//# sourceMappingURL=angular2/test/reflection/reflector_spec.map

//# sourceMappingURL=../../../angular2/test/reflection/reflector_spec.js.map