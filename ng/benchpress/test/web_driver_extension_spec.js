System.register(["angular2/test_lib", "angular2/src/facade/collection", "angular2/src/facade/lang", "benchpress/benchpress"], function($__export) {
  "use strict";
  var ddescribe,
      describe,
      it,
      iit,
      xit,
      expect,
      beforeEach,
      afterEach,
      StringMap,
      ListWrapper,
      isPresent,
      StringWrapper,
      isJsObject,
      WebDriverExtension,
      bind,
      Injector,
      Options,
      MockExtension;
  function main() {
    function createExtension(ids, caps) {
      return new Injector([ListWrapper.map(ids, (function(id) {
        return bind(id).toValue(new MockExtension(id));
      })), bind(Options.CAPABILITIES).toValue(caps), WebDriverExtension.bindTo(ids)]).asyncGet(WebDriverExtension);
    }
    describe('WebDriverExtension.bindTo', (function() {
      it('should bind the extension that matches the capabilities', (function(done) {
        createExtension(['m1', 'm2', 'm3'], {'browser': 'm2'}).then((function(m) {
          expect(m.id).toEqual('m2');
          done();
        }));
      }));
      if (isJsObject({})) {
        it('should throw if there is no match', (function(done) {
          createExtension(['m1'], {'browser': 'm2'}).then(null, (function(err) {
            expect(isPresent(err)).toBe(true);
            done();
          }));
        }));
      }
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
      StringMap = $__m.StringMap;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      isPresent = $__m.isPresent;
      StringWrapper = $__m.StringWrapper;
      isJsObject = $__m.isJsObject;
    }, function($__m) {
      WebDriverExtension = $__m.WebDriverExtension;
      bind = $__m.bind;
      Injector = $__m.Injector;
      Options = $__m.Options;
    }],
    execute: function() {
      MockExtension = (function($__super) {
        var MockExtension = function MockExtension(id) {
          $traceurRuntime.superConstructor(MockExtension).call(this);
          this.id = id;
        };
        return ($traceurRuntime.createClass)(MockExtension, {supports: function(capabilities) {
            return StringWrapper.equals(capabilities['browser'], this.id);
          }}, {}, $__super);
      }(WebDriverExtension));
      Object.defineProperty(MockExtension.prototype.supports, "parameters", {get: function() {
          return [[StringMap]];
        }});
    }
  };
});

//# sourceMappingURL=benchpress/test/web_driver_extension_spec.map

//# sourceMappingURL=../../benchpress/test/web_driver_extension_spec.js.map