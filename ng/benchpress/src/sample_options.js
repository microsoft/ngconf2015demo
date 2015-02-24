System.register(["angular2/di"], function($__export) {
  "use strict";
  var bind,
      OpaqueToken,
      Options,
      _SAMPLE_ID,
      _DEFAULT_DESCRIPTION,
      _SAMPLE_DESCRIPTION,
      _FORCE_GC,
      _PREPARE,
      _EXECUTE;
  return {
    setters: [function($__m) {
      bind = $__m.bind;
      OpaqueToken = $__m.OpaqueToken;
    }],
    execute: function() {
      Options = $__export("Options", (function() {
        var Options = function Options() {};
        return ($traceurRuntime.createClass)(Options, {}, {
          get SAMPLE_ID() {
            return _SAMPLE_ID;
          },
          get DEFAULT_DESCRIPTION() {
            return _DEFAULT_DESCRIPTION;
          },
          get SAMPLE_DESCRIPTION() {
            return _SAMPLE_DESCRIPTION;
          },
          get FORCE_GC() {
            return _FORCE_GC;
          },
          get PREPARE() {
            return _PREPARE;
          },
          get EXECUTE() {
            return _EXECUTE;
          }
        });
      }()));
      _SAMPLE_ID = new OpaqueToken('SampleDescription.sampleId');
      _DEFAULT_DESCRIPTION = new OpaqueToken('SampleDescription.defaultDescription');
      _SAMPLE_DESCRIPTION = new OpaqueToken('SampleDescription.sampleDescription');
      _FORCE_GC = new OpaqueToken('Sampler.forceGc');
      _PREPARE = new OpaqueToken('Sampler.prepare');
      _EXECUTE = new OpaqueToken('Sampler.execute');
    }
  };
});

//# sourceMappingURL=benchpress/src/sample_options.map

//# sourceMappingURL=../../benchpress/src/sample_options.js.map