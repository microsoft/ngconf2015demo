System.register(["angular2/test_lib", "angular2/src/facade/collection", "angular2/src/facade/async", "angular2/src/facade/lang", "benchpress/benchpress", "../trace_event_factory"], function($__export) {
  "use strict";
  var describe,
      ddescribe,
      it,
      iit,
      xit,
      expect,
      beforeEach,
      afterEach,
      ListWrapper,
      PromiseWrapper,
      Json,
      isBlank,
      isPresent,
      WebDriverExtension,
      IOsDriverExtension,
      WebDriverAdapter,
      Injector,
      bind,
      TraceEventFactory,
      MockDriverAdapter;
  function main() {
    describe('ios driver extension', (function() {
      var log;
      var extension;
      var normEvents = new TraceEventFactory('timeline', 'pid0');
      function createExtension() {
        var perfRecords = arguments[0] !== (void 0) ? arguments[0] : null;
        if (isBlank(perfRecords)) {
          perfRecords = [];
        }
        log = [];
        extension = new Injector([IOsDriverExtension.BINDINGS, bind(WebDriverAdapter).toValue(new MockDriverAdapter(log, perfRecords))]).get(IOsDriverExtension);
        return extension;
      }
      it('should force gc via window.gc()', (function(done) {
        createExtension().gc().then((function(_) {
          expect(log).toEqual([['executeScript', 'window.gc()']]);
          done();
        }));
      }));
      it('should mark the timeline via console.time()', (function(done) {
        createExtension().timeBegin('someName').then((function(_) {
          expect(log).toEqual([['executeScript', "console.time('someName');"]]);
          done();
        }));
      }));
      it('should mark the timeline via console.timeEnd()', (function(done) {
        createExtension().timeEnd('someName').then((function(_) {
          expect(log).toEqual([['executeScript', "console.timeEnd('someName');"]]);
          done();
        }));
      }));
      it('should mark the timeline via console.time() and console.timeEnd()', (function(done) {
        createExtension().timeEnd('name1', 'name2').then((function(_) {
          expect(log).toEqual([['executeScript', "console.timeEnd('name1');console.time('name2');"]]);
          done();
        }));
      }));
      describe('readPerfLog', (function() {
        it('should execute a dummy script before reading them', (function(done) {
          createExtension([]).readPerfLog().then((function(_) {
            expect(log).toEqual([['executeScript', '1+1'], ['logs', 'performance']]);
            done();
          }));
        }));
        it('should report FunctionCall records as "script"', (function(done) {
          createExtension([durationRecord('FunctionCall', 1, 5)]).readPerfLog().then((function(events) {
            expect(events).toEqual([normEvents.start('script', 1), normEvents.end('script', 5)]);
            done();
          }));
        }));
        it('should ignore FunctionCalls from webdriver', (function(done) {
          createExtension([internalScriptRecord(1, 5)]).readPerfLog().then((function(events) {
            expect(events).toEqual([]);
            done();
          }));
        }));
        it('should report begin time', (function(done) {
          createExtension([timeBeginRecord('someName', 12)]).readPerfLog().then((function(events) {
            expect(events).toEqual([normEvents.markStart('someName', 12)]);
            done();
          }));
        }));
        it('should report end timestamps', (function(done) {
          createExtension([timeEndRecord('someName', 12)]).readPerfLog().then((function(events) {
            expect(events).toEqual([normEvents.markEnd('someName', 12)]);
            done();
          }));
        }));
        it('should report gc', (function(done) {
          createExtension([gcRecord(1, 3, 21)]).readPerfLog().then((function(events) {
            expect(events).toEqual([normEvents.start('gc', 1, {'usedHeapSize': 0}), normEvents.end('gc', 3, {'usedHeapSize': -21})]);
            done();
          }));
        }));
        ['RecalculateStyles', 'Layout', 'UpdateLayerTree', 'Paint', 'Rasterize', 'CompositeLayers'].forEach((function(recordType) {
          it(("should report " + recordType), (function(done) {
            createExtension([durationRecord(recordType, 0, 1)]).readPerfLog().then((function(events) {
              expect(events).toEqual([normEvents.start('render', 0), normEvents.end('render', 1)]);
              done();
            }));
          }));
        }));
        it('should walk children', (function(done) {
          createExtension([durationRecord('FunctionCall', 1, 5, [timeBeginRecord('someName', 2)])]).readPerfLog().then((function(events) {
            expect(events).toEqual([normEvents.start('script', 1), normEvents.markStart('someName', 2), normEvents.end('script', 5)]);
            done();
          }));
        }));
        it('should match safari browsers', (function() {
          expect(createExtension().supports({'browserName': 'safari'})).toBe(true);
          expect(createExtension().supports({'browserName': 'Safari'})).toBe(true);
        }));
      }));
    }));
  }
  function timeBeginRecord(name, time) {
    return {
      'type': 'Time',
      'startTime': time,
      'data': {'message': name}
    };
  }
  function timeEndRecord(name, time) {
    return {
      'type': 'TimeEnd',
      'startTime': time,
      'data': {'message': name}
    };
  }
  function durationRecord(type, startTime, endTime) {
    var children = arguments[3] !== (void 0) ? arguments[3] : null;
    if (isBlank(children)) {
      children = [];
    }
    return {
      'type': type,
      'startTime': startTime,
      'endTime': endTime,
      'children': children
    };
  }
  function internalScriptRecord(startTime, endTime) {
    return {
      'type': 'FunctionCall',
      'startTime': startTime,
      'endTime': endTime,
      'data': {'scriptName': 'InjectedScript'}
    };
  }
  function gcRecord(startTime, endTime, gcAmount) {
    return {
      'type': 'GCEvent',
      'startTime': startTime,
      'endTime': endTime,
      'data': {'usedHeapSizeDelta': gcAmount}
    };
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      describe = $__m.describe;
      ddescribe = $__m.ddescribe;
      it = $__m.it;
      iit = $__m.iit;
      xit = $__m.xit;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
      afterEach = $__m.afterEach;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      Json = $__m.Json;
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
    }, function($__m) {
      WebDriverExtension = $__m.WebDriverExtension;
      IOsDriverExtension = $__m.IOsDriverExtension;
      WebDriverAdapter = $__m.WebDriverAdapter;
      Injector = $__m.Injector;
      bind = $__m.bind;
    }, function($__m) {
      TraceEventFactory = $__m.TraceEventFactory;
    }],
    execute: function() {
      MockDriverAdapter = (function($__super) {
        var MockDriverAdapter = function MockDriverAdapter(log, perfRecords) {
          $traceurRuntime.superConstructor(MockDriverAdapter).call(this);
          this._log = log;
          this._perfRecords = perfRecords;
        };
        return ($traceurRuntime.createClass)(MockDriverAdapter, {
          executeScript: function(script) {
            ListWrapper.push(this._log, ['executeScript', script]);
            return PromiseWrapper.resolve(null);
          },
          logs: function(type) {
            ListWrapper.push(this._log, ['logs', type]);
            if (type === 'performance') {
              return PromiseWrapper.resolve(this._perfRecords.map(function(record) {
                return {'message': Json.stringify({'message': {
                      'method': 'Timeline.eventRecorded',
                      'params': {'record': record}
                    }})};
              }));
            } else {
              return null;
            }
          }
        }, {}, $__super);
      }(WebDriverAdapter));
    }
  };
});

//# sourceMappingURL=benchpress/test/webdriver/ios_driver_extension_spec.map

//# sourceMappingURL=../../../benchpress/test/webdriver/ios_driver_extension_spec.js.map