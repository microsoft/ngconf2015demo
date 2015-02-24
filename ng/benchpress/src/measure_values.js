System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var assert,
      Date,
      MeasureValues;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Date = $__m.Date;
    }],
    execute: function() {
      MeasureValues = $__export("MeasureValues", (function() {
        var MeasureValues = function MeasureValues(runIndex, timeStamp, values) {
          assert.argumentTypes(runIndex, assert.type.number, timeStamp, Date, values, assert.type.any);
          this.timeStamp = timeStamp;
          this.runIndex = runIndex;
          this.values = values;
        };
        return ($traceurRuntime.createClass)(MeasureValues, {}, {});
      }()));
      Object.defineProperty(MeasureValues, "parameters", {get: function() {
          return [[assert.type.number], [Date], [assert.type.any]];
        }});
    }
  };
});

//# sourceMappingURL=benchpress/src/measure_values.map

//# sourceMappingURL=../../benchpress/src/measure_values.js.map