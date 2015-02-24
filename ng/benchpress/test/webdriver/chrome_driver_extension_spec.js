System.register(["angular2/test_lib", "angular2/src/facade/collection", "angular2/src/facade/async", "angular2/src/facade/lang", "benchpress/benchpress"], function($__export) {
  "use strict";
  var describe,
      it,
      iit,
      xit,
      expect,
      beforeEach,
      afterEach,
      ListWrapper,
      PromiseWrapper,
      Json,
      perfRecords,
      isBlank,
      WebDriverExtension,
      ChromeDriverExtension,
      WebDriverAdapter,
      Injector,
      bind,
      MockDriverAdapter;
  function main() {
    describe('chrome driver extension', (function() {
      var log;
      var extension;
      function createExtension() {
        var perfRecords = arguments[0] !== (void 0) ? arguments[0] : null;
        if (isBlank(perfRecords)) {
          perfRecords = [];
        }
        log = [];
        extension = new Injector([ChromeDriverExtension.BINDINGS, bind(WebDriverAdapter).toValue(new MockDriverAdapter(log, perfRecords))]).get(WebDriverExtension);
        return extension;
      }
      it('should force gc via window.gc()', (function(done) {
        createExtension().gc().then((function(_) {
          expect(log).toEqual([['executeScript', 'window.gc()']]);
          done();
        }));
      }));
      it('should mark the timeline via console.timeStamp()', (function(done) {
        createExtension().timeBegin('someName').then((function(_) {
          expect(log).toEqual([['executeScript', "console.timeStamp('begin_someName');"]]);
          done();
        }));
      }));
      it('should mark the timeline via console.timeEnd()', (function(done) {
        createExtension().timeEnd('someName').then((function(_) {
          expect(log).toEqual([['executeScript', "console.timeStamp('end_someName');"]]);
          done();
        }));
      }));
      it('should mark the timeline via console.time() and console.timeEnd()', (function(done) {
        createExtension().timeEnd('name1', 'name2').then((function(_) {
          expect(log).toEqual([['executeScript', "console.timeStamp('end_name1');console.timeStamp('begin_name2');"]]);
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
            expect(events).toEqual([startEvent('script', 1), endEvent('script', 5)]);
            done();
          }));
        }));
        it('should ignore FunctionCalls from webdriver', (function(done) {
          createExtension([internalScriptRecord(1, 5)]).readPerfLog().then((function(events) {
            expect(events).toEqual([]);
            done();
          }));
        }));
        it('should report begin timestamps', (function(done) {
          createExtension([timeStampRecord('begin_someName')]).readPerfLog().then((function(events) {
            expect(events).toEqual([markStartEvent('someName')]);
            done();
          }));
        }));
        it('should report end timestamps', (function(done) {
          createExtension([timeStampRecord('end_someName')]).readPerfLog().then((function(events) {
            expect(events).toEqual([markEndEvent('someName')]);
            done();
          }));
        }));
        it('should report gc', (function(done) {
          createExtension([gcRecord(1, 3, 21)]).readPerfLog().then((function(events) {
            expect(events).toEqual([startEvent('gc', 1), endEvent('gc', 3, {'amount': 21})]);
            done();
          }));
        }));
        ['RecalculateStyles', 'Layout', 'UpdateLayerTree', 'Paint', 'Rasterize', 'CompositeLayers'].forEach((function(recordType) {
          it(("should report " + recordType), (function(done) {
            createExtension([durationRecord(recordType, 0, 1)]).readPerfLog().then((function(events) {
              expect(events).toEqual([startEvent('render', 0), endEvent('render', 1)]);
              done();
            }));
          }));
        }));
        it('should walk children', (function(done) {
          createExtension([durationRecord('FunctionCall', 1, 5, [timeStampRecord('begin_someName')])]).readPerfLog().then((function(events) {
            expect(events).toEqual([startEvent('script', 1), markStartEvent('someName'), endEvent('script', 5)]);
            done();
          }));
        }));
      }));
    }));
  }
  function timeStampRecord(name) {
    return {
      'type': 'TimeStamp',
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
      describe = $__m.describe;
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
      perfRecords = $__m.perfRecords;
      isBlank = $__m.isBlank;
    }, function($__m) {
      WebDriverExtension = $__m.WebDriverExtension;
      ChromeDriverExtension = $__m.ChromeDriverExtension;
      WebDriverAdapter = $__m.WebDriverAdapter;
      Injector = $__m.Injector;
      bind = $__m.bind;
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

//# sourceMappingURL=benchpress/test/webdriver/chrome_driver_extension_spec.map

//# sourceMappingURL=../../../benchpress/test/webdriver/chrome_driver_extension_spec.js.map