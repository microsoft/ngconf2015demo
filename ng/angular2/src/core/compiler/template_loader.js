System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/dom", "angular2/src/facade/collection", "./xhr/xhr", "angular2/src/core/annotations/template"], function($__export) {
  "use strict";
  var assert,
      isBlank,
      isPresent,
      BaseException,
      stringify,
      DOM,
      Element,
      StringMapWrapper,
      XHR,
      Template,
      TemplateLoader;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
      stringify = $__m.stringify;
    }, function($__m) {
      DOM = $__m.DOM;
      Element = $__m.Element;
    }, function($__m) {
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      XHR = $__m.XHR;
    }, function($__m) {
      Template = $__m.Template;
    }],
    execute: function() {
      TemplateLoader = $__export("TemplateLoader", (function() {
        var TemplateLoader = function TemplateLoader(xhr) {
          assert.argumentTypes(xhr, XHR);
          this._xhr = xhr;
          this._cache = StringMapWrapper.create();
        };
        return ($traceurRuntime.createClass)(TemplateLoader, {load: function(template) {
            assert.argumentTypes(template, Template);
            if (isPresent(template.inline)) {
              return DOM.createTemplate(template.inline);
            }
            if (isPresent(template.url)) {
              var url = template.url;
              var promise = StringMapWrapper.get(this._cache, url);
              if (isBlank(promise)) {
                promise = this._xhr.get(url).then(function(html) {
                  var template = DOM.createTemplate(html);
                  return template;
                });
                StringMapWrapper.set(this._cache, url, promise);
              }
              return promise;
            }
            throw new BaseException("Templates should have either their url or inline property set");
          }}, {});
      }()));
      Object.defineProperty(TemplateLoader, "parameters", {get: function() {
          return [[XHR]];
        }});
      Object.defineProperty(TemplateLoader.prototype.load, "parameters", {get: function() {
          return [[Template]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/core/compiler/template_loader.map

//# sourceMappingURL=../../../../angular2/src/core/compiler/template_loader.js.map