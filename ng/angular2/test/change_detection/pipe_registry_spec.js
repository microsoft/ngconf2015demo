System.register(["angular2/test_lib", "angular2/src/change_detection/pipes/pipe_registry", "angular2/src/change_detection/pipes/pipe"], function($__export) {
  "use strict";
  var ddescribe,
      describe,
      it,
      iit,
      xit,
      expect,
      beforeEach,
      afterEach,
      PipeRegistry,
      Pipe,
      PipeFactory;
  function main() {
    describe("pipe registry", (function() {
      var firstPipe = new Pipe();
      var secondPipe = new Pipe();
      it("should return the first pipe supporting the data type", (function() {
        var r = new PipeRegistry({"type": [new PipeFactory(false, firstPipe), new PipeFactory(true, secondPipe)]});
        expect(r.get("type", "some object")).toBe(secondPipe);
      }));
      it("should throw when no matching type", (function() {
        var r = new PipeRegistry({});
        expect((function() {
          return r.get("unknown", "some object");
        })).toThrowError("Cannot find a pipe for type 'unknown' object 'some object'");
      }));
      it("should throw when no matching pipe", (function() {
        var r = new PipeRegistry({"type": []});
        expect((function() {
          return r.get("type", "some object");
        })).toThrowError("Cannot find a pipe for type 'type' object 'some object'");
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      ddescribe = $__m.ddescribe;
      describe = $__m.describe;
      it = $__m.it;
      iit = $__m.iit;
      xit = $__m.xit;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
      afterEach = $__m.afterEach;
    }, function($__m) {
      PipeRegistry = $__m.PipeRegistry;
    }, function($__m) {
      Pipe = $__m.Pipe;
    }],
    execute: function() {
      PipeFactory = (function() {
        var PipeFactory = function PipeFactory(shouldSupport, pipe) {
          this.shouldSupport = shouldSupport;
          this.pipe = pipe;
        };
        return ($traceurRuntime.createClass)(PipeFactory, {
          supports: function(obj) {
            return this.shouldSupport;
          },
          create: function() {
            return this.pipe;
          }
        }, {});
      }());
      Object.defineProperty(PipeFactory, "parameters", {get: function() {
          return [[assert.type.boolean], [assert.type.any]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/test/change_detection/pipe_registry_spec.map

//# sourceMappingURL=../../../angular2/test/change_detection/pipe_registry_spec.js.map