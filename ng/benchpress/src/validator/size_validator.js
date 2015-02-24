System.register(["rtts_assert/rtts_assert", "angular2/src/facade/collection", "angular2/di", "../validator"], function($__export) {
  "use strict";
  var assert,
      List,
      ListWrapper,
      bind,
      OpaqueToken,
      Validator,
      SizeValidator,
      _SAMPLE_SIZE,
      _BINDINGS;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      bind = $__m.bind;
      OpaqueToken = $__m.OpaqueToken;
    }, function($__m) {
      Validator = $__m.Validator;
    }],
    execute: function() {
      SizeValidator = $__export("SizeValidator", (function($__super) {
        var SizeValidator = function SizeValidator(size) {
          $traceurRuntime.superConstructor(SizeValidator).call(this);
          this._sampleSize = size;
        };
        return ($traceurRuntime.createClass)(SizeValidator, {
          describe: function() {
            return assert.returnType(({'sampleSize': this._sampleSize}), assert.type.any);
          },
          validate: function(completeSample) {
            assert.argumentTypes(completeSample, assert.genericType(List, assert.type.any));
            if (completeSample.length >= this._sampleSize) {
              return assert.returnType((ListWrapper.slice(completeSample, completeSample.length - this._sampleSize, completeSample.length)), assert.genericType(List, assert.type.any));
            } else {
              return assert.returnType((null), assert.genericType(List, assert.type.any));
            }
          }
        }, {
          get BINDINGS() {
            return _BINDINGS;
          },
          get SAMPLE_SIZE() {
            return _SAMPLE_SIZE;
          }
        }, $__super);
      }(Validator)));
      Object.defineProperty(SizeValidator.prototype.validate, "parameters", {get: function() {
          return [[assert.genericType(List, assert.type.any)]];
        }});
      _SAMPLE_SIZE = new OpaqueToken('SizeValidator.sampleSize');
      _BINDINGS = [bind(Validator).toFactory((function(size) {
        return new SizeValidator(size);
      }), [_SAMPLE_SIZE]), bind(_SAMPLE_SIZE).toValue(10)];
    }
  };
});

//# sourceMappingURL=benchpress/src/validator/size_validator.map

//# sourceMappingURL=../../../benchpress/src/validator/size_validator.js.map