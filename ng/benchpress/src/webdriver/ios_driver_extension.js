System.register(["angular2/di", "angular2/src/facade/collection", "angular2/src/facade/lang", "../web_driver_extension", "../web_driver_adapter", "angular2/src/facade/async"], function($__export) {
  "use strict";
  var bind,
      ListWrapper,
      StringMap,
      Json,
      isPresent,
      isBlank,
      RegExpWrapper,
      StringWrapper,
      WebDriverExtension,
      WebDriverAdapter,
      Promise,
      IOsDriverExtension,
      _BINDINGS;
  function createEvent(ph, name, time) {
    var args = arguments[3] !== (void 0) ? arguments[3] : null;
    var result = {
      'cat': 'timeline',
      'name': name,
      'ts': time,
      'ph': ph,
      'pid': 'pid0'
    };
    if (isPresent(args)) {
      result['args'] = args;
    }
    return result;
  }
  function createStartEvent(name, time) {
    var args = arguments[2] !== (void 0) ? arguments[2] : null;
    return createEvent('B', name, time, args);
  }
  function createEndEvent(name, time) {
    var args = arguments[2] !== (void 0) ? arguments[2] : null;
    return createEvent('E', name, time, args);
  }
  function createMarkStartEvent(name, time) {
    return createEvent('b', name, time);
  }
  function createMarkEndEvent(name, time) {
    return createEvent('e', name, time);
  }
  return {
    setters: [function($__m) {
      bind = $__m.bind;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      StringMap = $__m.StringMap;
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
      IOsDriverExtension = $__export("IOsDriverExtension", (function($__super) {
        var IOsDriverExtension = function IOsDriverExtension(driver) {
          $traceurRuntime.superConstructor(IOsDriverExtension).call(this);
          this._driver = driver;
        };
        return ($traceurRuntime.createClass)(IOsDriverExtension, {
          gc: function() {
            return this._driver.executeScript('window.gc()');
          },
          timeBegin: function(name) {
            return this._driver.executeScript(("console.time('" + name + "');"));
          },
          timeEnd: function(name) {
            var restartName = arguments[1] !== (void 0) ? arguments[1] : null;
            var script = ("console.timeEnd('" + name + "');");
            if (isPresent(restartName)) {
              script += ("console.time('" + restartName + "');");
            }
            return this._driver.executeScript(script);
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
                ListWrapper.push(events, createStartEvent('script', startTime));
                endEvent = createEndEvent('script', endTime);
              } else if (StringWrapper.equals(type, 'Time')) {
                ListWrapper.push(events, createMarkStartEvent(data['message'], startTime));
              } else if (StringWrapper.equals(type, 'TimeEnd')) {
                ListWrapper.push(events, createMarkEndEvent(data['message'], startTime));
              } else if (StringWrapper.equals(type, 'RecalculateStyles') || StringWrapper.equals(type, 'Layout') || StringWrapper.equals(type, 'UpdateLayerTree') || StringWrapper.equals(type, 'Paint') || StringWrapper.equals(type, 'Rasterize') || StringWrapper.equals(type, 'CompositeLayers')) {
                ListWrapper.push(events, createStartEvent('render', startTime));
                endEvent = createEndEvent('render', endTime);
              } else if (StringWrapper.equals(type, 'GCEvent')) {
                ListWrapper.push(events, createStartEvent('gc', startTime, {'usedHeapSize': 0}));
                endEvent = createEndEvent('gc', endTime, {'usedHeapSize': -data['usedHeapSizeDelta']});
              }
              if (isPresent(record['children'])) {
                $__0._convertPerfRecordsToEvents(record['children'], events);
              }
              if (isPresent(endEvent)) {
                ListWrapper.push(events, endEvent);
              }
            }));
            return events;
          },
          supports: function(capabilities) {
            return StringWrapper.equals(capabilities['browserName'].toLowerCase(), 'safari');
          }
        }, {get BINDINGS() {
            return _BINDINGS;
          }}, $__super);
      }(WebDriverExtension)));
      Object.defineProperty(IOsDriverExtension, "parameters", {get: function() {
          return [[WebDriverAdapter]];
        }});
      Object.defineProperty(IOsDriverExtension.prototype.timeBegin, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(IOsDriverExtension.prototype.timeEnd, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(IOsDriverExtension.prototype.supports, "parameters", {get: function() {
          return [[StringMap]];
        }});
      _BINDINGS = [bind(IOsDriverExtension).toFactory((function(driver) {
        return new IOsDriverExtension(driver);
      }), [WebDriverAdapter])];
    }
  };
});

//# sourceMappingURL=benchpress/src/webdriver/ios_driver_extension.map

//# sourceMappingURL=../../../benchpress/src/webdriver/ios_driver_extension.js.map