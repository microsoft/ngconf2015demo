System.register(["angular2/test_lib", "angular2/src/facade/collection", "angular2/src/facade/async", "angular2/src/facade/lang", "benchpress/benchpress"], function($__export) {
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
      DateWrapper,
      Reporter,
      MultiReporter,
      bind,
      Injector,
      MeasureValues,
      MockReporter;
  function main() {
    function createReporters(ids) {
      return new Injector([ListWrapper.map(ids, (function(id) {
        return bind(id).toValue(new MockReporter(id));
      })), MultiReporter.createBindings(ids)]).asyncGet(MultiReporter);
    }
    describe('multi reporter', (function() {
      it('should reportMeasureValues to all', (function(done) {
        var mv = new MeasureValues(0, DateWrapper.now(), {});
        createReporters(['m1', 'm2']).then((function(r) {
          return r.reportMeasureValues(mv);
        })).then((function(values) {
          expect(values).toEqual([{
            'id': 'm1',
            'values': mv
          }, {
            'id': 'm2',
            'values': mv
          }]);
          done();
        }));
      }));
      it('should reportSample to call', (function(done) {
        var completeSample = [new MeasureValues(0, DateWrapper.now(), {}), new MeasureValues(1, DateWrapper.now(), {})];
        var validSample = [completeSample[1]];
        createReporters(['m1', 'm2']).then((function(r) {
          return r.reportSample(completeSample, validSample);
        })).then((function(values) {
          expect(values).toEqual([{
            'id': 'm1',
            'completeSample': completeSample,
            'validSample': validSample
          }, {
            'id': 'm2',
            'completeSample': completeSample,
            'validSample': validSample
          }]);
          done();
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
      DateWrapper = $__m.DateWrapper;
    }, function($__m) {
      Reporter = $__m.Reporter;
      MultiReporter = $__m.MultiReporter;
      bind = $__m.bind;
      Injector = $__m.Injector;
      MeasureValues = $__m.MeasureValues;
    }],
    execute: function() {
      MockReporter = (function($__super) {
        var MockReporter = function MockReporter(id) {
          $traceurRuntime.superConstructor(MockReporter).call(this);
          this._id = id;
        };
        return ($traceurRuntime.createClass)(MockReporter, {
          reportMeasureValues: function(values) {
            return PromiseWrapper.resolve({
              'id': this._id,
              'values': values
            });
          },
          reportSample: function(completeSample, validSample) {
            return PromiseWrapper.resolve({
              'id': this._id,
              'completeSample': completeSample,
              'validSample': validSample
            });
          }
        }, {}, $__super);
      }(Reporter));
      Object.defineProperty(MockReporter.prototype.reportMeasureValues, "parameters", {get: function() {
          return [[MeasureValues]];
        }});
      Object.defineProperty(MockReporter.prototype.reportSample, "parameters", {get: function() {
          return [[assert.genericType(List, MeasureValues)], [assert.genericType(List, MeasureValues)]];
        }});
    }
  };
});

//# sourceMappingURL=benchpress/test/reporter/multi_reporter_spec.map

//# sourceMappingURL=../../../benchpress/test/reporter/multi_reporter_spec.js.map