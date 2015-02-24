System.register(["angular2/src/facade/collection", "angular2/di", "./sampler", "./validator", "./metric", "./sample_options"], function($__export) {
  "use strict";
  var StringMapWrapper,
      ListWrapper,
      bind,
      OpaqueToken,
      Sampler,
      Validator,
      Metric,
      Options,
      SampleDescription,
      _BINDINGS;
  return {
    setters: [function($__m) {
      StringMapWrapper = $__m.StringMapWrapper;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      bind = $__m.bind;
      OpaqueToken = $__m.OpaqueToken;
    }, function($__m) {
      Sampler = $__m.Sampler;
    }, function($__m) {
      Validator = $__m.Validator;
    }, function($__m) {
      Metric = $__m.Metric;
    }, function($__m) {
      Options = $__m.Options;
    }],
    execute: function() {
      SampleDescription = $__export("SampleDescription", (function() {
        var SampleDescription = function SampleDescription(id, descriptions, metrics) {
          var $__0 = this;
          this.id = id;
          this.metrics = metrics;
          this.description = {};
          ListWrapper.forEach(descriptions, (function(description) {
            StringMapWrapper.forEach(description, (function(value, prop) {
              return $__0.description[prop] = value;
            }));
          }));
        };
        return ($traceurRuntime.createClass)(SampleDescription, {}, {get BINDINGS() {
            return _BINDINGS;
          }});
      }()));
      _BINDINGS = [bind(SampleDescription).toFactory((function(metric, id, forceGc, validator, defaultDesc, userDesc) {
        return new SampleDescription(id, [{'forceGc': forceGc}, validator.describe(), defaultDesc, userDesc], metric.describe());
      }), [Metric, Options.SAMPLE_ID, Options.FORCE_GC, Validator, Options.DEFAULT_DESCRIPTION, Options.SAMPLE_DESCRIPTION]), bind(Options.DEFAULT_DESCRIPTION).toValue({}), bind(Options.SAMPLE_DESCRIPTION).toValue({})];
    }
  };
});

//# sourceMappingURL=benchpress/src/sample_description.map

//# sourceMappingURL=../../benchpress/src/sample_description.js.map