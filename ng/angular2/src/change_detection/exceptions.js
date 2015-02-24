System.register(["rtts_assert/rtts_assert", "./proto_change_detector"], function($__export) {
  "use strict";
  var assert,
      ProtoRecord,
      ExpressionChangedAfterItHasBeenChecked,
      ChangeDetectionError;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      ProtoRecord = $__m.ProtoRecord;
    }],
    execute: function() {
      ExpressionChangedAfterItHasBeenChecked = $__export("ExpressionChangedAfterItHasBeenChecked", (function($__super) {
        var ExpressionChangedAfterItHasBeenChecked = function ExpressionChangedAfterItHasBeenChecked(proto, change) {
          assert.argumentTypes(proto, ProtoRecord, change, assert.type.any);
          $traceurRuntime.superConstructor(ExpressionChangedAfterItHasBeenChecked).call(this);
          this.message = ("Expression '" + proto.expressionAsString + "' has changed after it was checked. ") + ("Previous value: '" + change.previousValue + "'. Current value: '" + change.currentValue + "'");
        };
        return ($traceurRuntime.createClass)(ExpressionChangedAfterItHasBeenChecked, {toString: function() {
            return assert.returnType((this.message), assert.type.string);
          }}, {}, $__super);
      }(Error)));
      Object.defineProperty(ExpressionChangedAfterItHasBeenChecked, "parameters", {get: function() {
          return [[ProtoRecord], [assert.type.any]];
        }});
      ChangeDetectionError = $__export("ChangeDetectionError", (function($__super) {
        var ChangeDetectionError = function ChangeDetectionError(proto, originalException) {
          assert.argumentTypes(proto, ProtoRecord, originalException, assert.type.any);
          $traceurRuntime.superConstructor(ChangeDetectionError).call(this);
          this.originalException = originalException;
          this.location = proto.expressionAsString;
          this.message = (this.originalException + " in [" + this.location + "]");
        };
        return ($traceurRuntime.createClass)(ChangeDetectionError, {toString: function() {
            return assert.returnType((this.message), assert.type.string);
          }}, {}, $__super);
      }(Error)));
      Object.defineProperty(ChangeDetectionError, "parameters", {get: function() {
          return [[ProtoRecord], [assert.type.any]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/change_detection/exceptions.map

//# sourceMappingURL=../../../angular2/src/change_detection/exceptions.js.map