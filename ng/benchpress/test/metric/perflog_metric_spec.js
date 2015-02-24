System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/facade/collection", "angular2/src/facade/async", "benchpress/benchpress"], function($__export) {
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
      List,
      ListWrapper,
      PromiseWrapper,
      Promise,
      Metric,
      PerflogMetric,
      WebDriverExtension,
      bind,
      Injector,
      MockDriverExtension;
  function main() {
    var commandLog;
    function createMetric(perfLogs) {
      commandLog = [];
      return new Injector([PerflogMetric.BINDINGS, bind(PerflogMetric.SET_TIMEOUT).toValue((function(fn, millis) {
        ListWrapper.push(commandLog, ['setTimeout', millis]);
        fn();
      })), bind(WebDriverExtension).toValue(new MockDriverExtension(perfLogs, commandLog))]).get(Metric);
    }
    describe('perflog metric', (function() {
      it('should describe itself', (function() {
        expect(createMetric([[]]).describe()['script']).toBe('script execution time in ms');
      }));
      describe('beginMeasure', (function() {
        it('should mark the timeline', (function(done) {
          var metric = createMetric([[]]);
          metric.beginMeasure().then((function(_) {
            expect(commandLog).toEqual([['timeBegin', 'benchpress0']]);
            done();
          }));
        }));
      }));
      describe('endMeasure', (function() {
        it('should mark and aggregate events in between the marks', (function(done) {
          var events = [[markStartEvent('benchpress0'), startEvent('script', 4), endEvent('script', 6), markEndEvent('benchpress0')]];
          var metric = createMetric(events);
          metric.beginMeasure().then((function(_) {
            return metric.endMeasure(false);
          })).then((function(data) {
            expect(commandLog).toEqual([['timeBegin', 'benchpress0'], ['timeEnd', 'benchpress0', null], 'readPerfLog']);
            expect(data['script']).toBe(2);
            done();
          }));
        }));
        it('should restart timing', (function(done) {
          var events = [[markStartEvent('benchpress0'), markEndEvent('benchpress0'), markStartEvent('benchpress1')], [markEndEvent('benchpress1')]];
          var metric = createMetric(events);
          metric.beginMeasure().then((function(_) {
            return metric.endMeasure(true);
          })).then((function(_) {
            return metric.endMeasure(true);
          })).then((function(_) {
            expect(commandLog).toEqual([['timeBegin', 'benchpress0'], ['timeEnd', 'benchpress0', 'benchpress1'], 'readPerfLog', ['timeEnd', 'benchpress1', 'benchpress2'], 'readPerfLog']);
            done();
          }));
        }));
        it('should loop and aggregate until the end mark is present', (function(done) {
          var events = [[markStartEvent('benchpress0'), startEvent('script', 1)], [endEvent('script', 2)], [startEvent('script', 3), endEvent('script', 5), markEndEvent('benchpress0')]];
          var metric = createMetric(events);
          metric.beginMeasure().then((function(_) {
            return metric.endMeasure(false);
          })).then((function(data) {
            expect(commandLog).toEqual([['timeBegin', 'benchpress0'], ['timeEnd', 'benchpress0', null], 'readPerfLog', ['setTimeout', 100], 'readPerfLog', ['setTimeout', 100], 'readPerfLog']);
            expect(data['script']).toBe(3);
            done();
          }));
        }));
        it('should store events after the end mark for the next call', (function(done) {
          var events = [[markStartEvent('benchpress0'), markEndEvent('benchpress0'), markStartEvent('benchpress1'), startEvent('script', 1), endEvent('script', 2)], [startEvent('script', 3), endEvent('script', 5), markEndEvent('benchpress1')]];
          var metric = createMetric(events);
          metric.beginMeasure().then((function(_) {
            return metric.endMeasure(true);
          })).then((function(data) {
            expect(data['script']).toBe(0);
            return metric.endMeasure(true);
          })).then((function(data) {
            expect(commandLog).toEqual([['timeBegin', 'benchpress0'], ['timeEnd', 'benchpress0', 'benchpress1'], 'readPerfLog', ['timeEnd', 'benchpress1', 'benchpress2'], 'readPerfLog']);
            expect(data['script']).toBe(3);
            done();
          }));
        }));
      }));
      describe('aggregation', (function() {
        function aggregate(events) {
          ListWrapper.insert(events, 0, markStartEvent('benchpress0'));
          ListWrapper.push(events, markEndEvent('benchpress0'));
          var metric = createMetric([events]);
          return metric.beginMeasure().then((function(_) {
            return metric.endMeasure(false);
          }));
        }
        it('should report a single interval', (function(done) {
          aggregate([startEvent('script', 0), endEvent('script', 5)]).then((function(data) {
            expect(data['script']).toBe(5);
            done();
          }));
        }));
        it('should sum up multiple intervals', (function(done) {
          aggregate([startEvent('script', 0), endEvent('script', 5), startEvent('script', 10), endEvent('script', 17)]).then((function(data) {
            expect(data['script']).toBe(12);
            done();
          }));
        }));
        it('should ignore not started intervals', (function(done) {
          aggregate([endEvent('script', 10)]).then((function(data) {
            expect(data['script']).toBe(0);
            done();
          }));
        }));
        it('should ignore not ended intervals', (function(done) {
          aggregate([startEvent('script', 10)]).then((function(data) {
            expect(data['script']).toBe(0);
            done();
          }));
        }));
        ['script', 'gcTime', 'render'].forEach((function(metricName) {
          it(("should support " + metricName + " metric"), (function(done) {
            aggregate([startEvent(metricName, 0), endEvent(metricName, 5)]).then((function(data) {
              expect(data[metricName]).toBe(5);
              done();
            }));
          }));
        }));
        it('should support gcAmount metric', (function(done) {
          aggregate([startEvent('gc', 0), endEvent('gc', 5, {'amount': 10})]).then((function(data) {
            expect(data['gcAmount']).toBe(10);
            done();
          }));
        }));
        it('should subtract gcTime in script from script time', (function(done) {
          aggregate([startEvent('script', 0), startEvent('gc', 1), endEvent('gc', 4, {'amount': 10}), endEvent('script', 5)]).then((function(data) {
            expect(data['script']).toBe(2);
            done();
          }));
        }));
        describe('gcTimeInScript / gcAmountInScript', (function() {
          it('should use gc during script execution', (function(done) {
            aggregate([startEvent('script', 0), startEvent('gc', 1), endEvent('gc', 4, {'amount': 10}), endEvent('script', 5)]).then((function(data) {
              expect(data['gcTimeInScript']).toBe(3);
              expect(data['gcAmountInScript']).toBe(10);
              done();
            }));
          }));
          it('should ignore gc outside of script execution', (function(done) {
            aggregate([startEvent('gc', 1), endEvent('gc', 4, {'amount': 10}), startEvent('script', 0), endEvent('script', 5)]).then((function(data) {
              expect(data['gcTimeInScript']).toBe(0);
              expect(data['gcAmountInScript']).toBe(0);
              done();
            }));
          }));
        }));
      }));
    }));
  }
  function markStartEvent(type) {
    return {
      'name': type,
      'ph': 'b'
    };
  }
  function markEndEvent(type) {
    return {
      'name': type,
      'ph': 'e'
    };
  }
  function startEvent(type, time) {
    return {
      'name': type,
      'ts': time,
      'ph': 'B'
    };
  }
  function endEvent(type, time) {
    var args = arguments[2] !== (void 0) ? arguments[2] : null;
    return {
      'name': type,
      'ts': time,
      'ph': 'E',
      'args': args
    };
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
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
      Promise = $__m.Promise;
    }, function($__m) {
      Metric = $__m.Metric;
      PerflogMetric = $__m.PerflogMetric;
      WebDriverExtension = $__m.WebDriverExtension;
      bind = $__m.bind;
      Injector = $__m.Injector;
    }],
    execute: function() {
      MockDriverExtension = (function($__super) {
        var MockDriverExtension = function MockDriverExtension(perfLogs, commandLog) {
          $traceurRuntime.superConstructor(MockDriverExtension).call(this);
          this._perfLogs = perfLogs;
          this._commandLog = commandLog;
        };
        return ($traceurRuntime.createClass)(MockDriverExtension, {
          timeBegin: function(name) {
            ListWrapper.push(this._commandLog, ['timeBegin', name]);
            return assert.returnType((PromiseWrapper.resolve(null)), Promise);
          },
          timeEnd: function(name, restartName) {
            ListWrapper.push(this._commandLog, ['timeEnd', name, restartName]);
            return assert.returnType((PromiseWrapper.resolve(null)), Promise);
          },
          readPerfLog: function() {
            ListWrapper.push(this._commandLog, 'readPerfLog');
            if (this._perfLogs.length > 0) {
              var next = this._perfLogs[0];
              ListWrapper.removeAt(this._perfLogs, 0);
              return assert.returnType((PromiseWrapper.resolve(next)), Promise);
            } else {
              return assert.returnType((PromiseWrapper.resolve([])), Promise);
            }
          }
        }, {}, $__super);
      }(WebDriverExtension));
    }
  };
});

//# sourceMappingURL=benchpress/test/metric/perflog_metric_spec.map

//# sourceMappingURL=../../../benchpress/test/metric/perflog_metric_spec.js.map