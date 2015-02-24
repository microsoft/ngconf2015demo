System.register(["rtts_assert/rtts_assert", "angular2/di", "angular2/src/facade/collection", "angular2/src/facade/lang", "../web_driver_extension", "../web_driver_adapter", "angular2/src/facade/async"], function($__export) {
  "use strict";
  var assert,
      bind,
      ListWrapper,
      Json,
      isPresent,
      isBlank,
      RegExpWrapper,
      StringWrapper,
      WebDriverExtension,
      WebDriverAdapter,
      Promise,
      BEGIN_MARK_RE,
      END_MARK_RE,
      ChromeDriverExtension,
      _BINDINGS;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      bind = $__m.bind;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      Json = $__m.Json;
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      RegExpWrapper = $__m.RegExpWrapper;
      StringWrapper = $__m.StringWrapper;
    }, function($__m) {
      WebDriverExtension = $__m.WebDriverExtension;
    }, function($__m) {
      WebDriverAdapter = $__m.WebDriverAdapter;
    }, function($__m) {
      Promise = $__m.Promise;
    }],
    execute: function() {
      BEGIN_MARK_RE = RegExpWrapper.create('begin_(.*)');
      END_MARK_RE = RegExpWrapper.create('end_(.*)');
      ChromeDriverExtension = $__export("ChromeDriverExtension", (function($__super) {
        var ChromeDriverExtension = function ChromeDriverExtension(driver) {
          assert.argumentTypes(driver, WebDriverAdapter);
          $traceurRuntime.superConstructor(ChromeDriverExtension).call(this);
          this._driver = driver;
        };
        return ($traceurRuntime.createClass)(ChromeDriverExtension, {
          gc: function() {
            return this._driver.executeScript('window.gc()');
          },
          timeBegin: function(name) {
            assert.argumentTypes(name, assert.type.string);
            return assert.returnType((this._driver.executeScript(("console.timeStamp('begin_" + name + "');"))), Promise);
          },
          timeEnd: function(name) {
            var restartName = arguments[1] !== (void 0) ? arguments[1] : null;
            assert.argumentTypes(name, assert.type.string, restartName, assert.type.string);
            var script = ("console.timeStamp('end_" + name + "');");
            if (isPresent(restartName)) {
              script += ("console.timeStamp('begin_" + restartName + "');");
            }
            return assert.returnType((this._driver.executeScript(script)), Promise);
          },
          readPerfLog: function() {
            var $__0 = this;
            return this._driver.executeScript('1+1').then((function(_) {
              return $__0._driver.logs('performance');
            })).then((function(entries) {
              var records = [];
              ListWrapper.forEach(entries, function(entry) {
                var message = Json.parse(entry['message'])['message'];
                if (StringWrapper.equals(message['method'], 'Timeline.eventRecorded')) {
                  ListWrapper.push(records, message['params']['record']);
                }
              });
              return $__0._convertPerfRecordsToEvents(records);
            }));
          },
          _convertPerfRecordsToEvents: function(records) {
            var events = arguments[1] !== (void 0) ? arguments[1] : null;
            var $__0 = this;
            if (isBlank(events)) {
              events = [];
            }
            records.forEach((function(record) {
              var endEvent = null;
              var type = record['type'];
              var data = record['data'];
              var startTime = record['startTime'];
              var endTime = record['endTime'];
              if (StringWrapper.equals(type, 'FunctionCall') && (isBlank(data) || !StringWrapper.equals(data['scriptName'], 'InjectedScript'))) {
                ListWrapper.push(events, {
                  'name': 'script',
                  'ts': startTime,
                  'ph': 'B'
                });
                endEvent = {
                  'name': 'script',
                  'ts': endTime,
                  'ph': 'E',
                  'args': null
                };
              } else if (StringWrapper.equals(type, 'TimeStamp')) {
                var name = data['message'];
                var ph;
                var match = RegExpWrapper.firstMatch(BEGIN_MARK_RE, name);
                if (isPresent(match)) {
                  ph = 'b';
                } else {
                  match = RegExpWrapper.firstMatch(END_MARK_RE, name);
                  if (isPresent(match)) {
                    ph = 'e';
                  }
                }
                if (isPresent(ph)) {
                  ListWrapper.push(events, {
                    'name': match[1],
                    'ph': ph
                  });
                }
              } else if (StringWrapper.equals(type, 'RecalculateStyles') || StringWrapper.equals(type, 'Layout') || StringWrapper.equals(type, 'UpdateLayerTree') || StringWrapper.equals(type, 'Paint') || StringWrapper.equals(type, 'Rasterize') || StringWrapper.equals(type, 'CompositeLayers')) {
                ListWrapper.push(events, {
                  'name': 'render',
                  'ts': startTime,
                  'ph': 'B'
                });
                endEvent = {
                  'name': 'render',
                  'ts': endTime,
                  'ph': 'E',
                  'args': null
                };
              } else if (StringWrapper.equals(type, 'GCEvent')) {
                ListWrapper.push(events, {
                  'name': 'gc',
                  'ts': startTime,
                  'ph': 'B'
                });
                endEvent = {
                  'name': 'gc',
                  'ts': endTime,
                  'ph': 'E',
                  'args': {'amount': data['usedHeapSizeDelta']}
                };
              }
              if (isPresent(record['children'])) {
                $__0._convertPerfRecordsToEvents(record['children'], events);
              }
              if (isPresent(endEvent)) {
                ListWrapper.push(events, endEvent);
              }
            }));
            return events;
          }
        }, {get BINDINGS() {
            return _BINDINGS;
          }}, $__super);
      }(WebDriverExtension)));
      Object.defineProperty(ChromeDriverExtension, "parameters", {get: function() {
          return [[WebDriverAdapter]];
        }});
      Object.defineProperty(ChromeDriverExtension.prototype.timeBegin, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(ChromeDriverExtension.prototype.timeEnd, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      _BINDINGS = [bind(WebDriverExtension).toFactory((function(driver) {
        return new ChromeDriverExtension(driver);
      }), [WebDriverAdapter])];
    }
  };
});

//# sourceMappingURL=benchpress/src/webdriver/chrome_driver_extension.map

//# sourceMappingURL=../../../benchpress/src/webdriver/chrome_driver_extension.js.map