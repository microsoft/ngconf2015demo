System.register(["angular2/test_lib", "angular2/src/facade/collection", "angular2/src/facade/async", "benchpress/benchpress"], function($__export) {
  "use strict";
  var ddescribe,
      describe,
      it,
      iit,
      xit,
      expect,
      beforeEach,
      afterEach,
      List,
      ListWrapper,
      StringMap,
      PromiseWrapper,
      Promise,
      Metric,
      MultiMetric,
      bind,
      Injector,
      MockMetric;
  function main() {
    function createMetric(ids) {
      return new Injector([ListWrapper.map(ids, (function(id) {
        return bind(id).toValue(new MockMetric(id));
      })), MultiMetric.createBindings(ids)]).asyncGet(MultiMetric);
    }
    describe('multi metric', (function() {
      it('should merge descriptions', (function(done) {
        createMetric(['m1', 'm2']).then((function(m) {
          expect(m.describe()).toEqual({
            'm1': 'describe',
            'm2': 'describe'
          });
          done();
        }));
      }));
      it('should merge all beginMeasure calls', (function(done) {
        createMetric(['m1', 'm2']).then((function(m) {
          return m.beginMeasure();
        })).then((function(values) {
          expect(values).toEqual(['m1_beginMeasure', 'm2_beginMeasure']);
          done();
        }));
      }));
      [false, true].forEach((function(restartFlag) {
        it(("should merge all endMeasure calls for restart=" + restartFlag), (function(done) {
          createMetric(['m1', 'm2']).then((function(m) {
            return m.endMeasure(restartFlag);
          })).then((function(values) {
            expect(values).toEqual({
              'm1': {'restart': restartFlag},
              'm2': {'restart': restartFlag}
            });
            done();
          }));
        }));
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
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
      StringMap = $__m.StringMap;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
      Promise = $__m.Promise;
    }, function($__m) {
      Metric = $__m.Metric;
      MultiMetric = $__m.MultiMetric;
      bind = $__m.bind;
      Injector = $__m.Injector;
    }],
    execute: function() {
      MockMetric = (function($__super) {
        var MockMetric = function MockMetric(id) {
          $traceurRuntime.superConstructor(MockMetric).call(this);
          this._id = id;
        };
        return ($traceurRuntime.createClass)(MockMetric, {
          beginMeasure: function() {
            return PromiseWrapper.resolve((this._id + "_beginMeasure"));
          },
          endMeasure: function(restart) {
            var result = {};
            result[this._id] = {'restart': restart};
            return PromiseWrapper.resolve(result);
          },
          describe: function() {
            var result = {};
            result[this._id] = 'describe';
            return result;
          }
        }, {}, $__super);
      }(Metric));
      Object.defineProperty(MockMetric.prototype.endMeasure, "parameters", {get: function() {
          return [[assert.type.boolean]];
        }});
    }
  };
});

//# sourceMappingURL=benchpress/test/metric/multi_metric_spec.map

//# sourceMappingURL=../../../benchpress/test/metric/multi_metric_spec.js.map