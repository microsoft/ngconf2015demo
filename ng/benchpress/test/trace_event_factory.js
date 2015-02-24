System.register(["angular2/src/facade/lang"], function($__export) {
  "use strict";
  var isPresent,
      TraceEventFactory;
  return {
    setters: [function($__m) {
      isPresent = $__m.isPresent;
    }],
    execute: function() {
      TraceEventFactory = $__export("TraceEventFactory", (function() {
        var TraceEventFactory = function TraceEventFactory(cat, pid) {
          this._cat = cat;
          this._pid = pid;
        };
        return ($traceurRuntime.createClass)(TraceEventFactory, {
          create: function(ph, name, time) {
            var args = arguments[3] !== (void 0) ? arguments[3] : null;
            var res = {
              'name': name,
              'cat': this._cat,
              'ph': ph,
              'ts': time,
              'pid': this._pid
            };
            if (isPresent(args)) {
              res['args'] = args;
            }
            return res;
          },
          markStart: function(name, time) {
            return this.create('b', name, time);
          },
          markEnd: function(name, time) {
            return this.create('e', name, time);
          },
          start: function(name, time) {
            var args = arguments[2] !== (void 0) ? arguments[2] : null;
            return this.create('B', name, time, args);
          },
          end: function(name, time) {
            var args = arguments[2] !== (void 0) ? arguments[2] : null;
            return this.create('E', name, time, args);
          },
          complete: function(name, time, duration) {
            var args = arguments[3] !== (void 0) ? arguments[3] : null;
            var res = this.create('X', name, time, args);
            res['dur'] = duration;
            return res;
          }
        }, {});
      }()));
    }
  };
});

//# sourceMappingURL=benchpress/test/trace_event_factory.map

//# sourceMappingURL=../../benchpress/test/trace_event_factory.js.map