System.register(["angular2/test_lib", "angular2/src/core/compiler/template_loader", "angular2/src/core/annotations/template", "angular2/src/facade/async", "angular2/src/facade/lang", "angular2/src/mock/xhr_mock"], function($__export) {
  "use strict";
  var describe,
      it,
      expect,
      beforeEach,
      ddescribe,
      iit,
      xit,
      el,
      TemplateLoader,
      Template,
      PromiseWrapper,
      Type,
      stringify,
      isPresent,
      XHRMock,
      SomeComponent;
  function main() {
    describe('TemplateLoader', (function() {
      var loader,
          xhr;
      beforeEach((function() {
        xhr = new XHRMock();
        loader = new TemplateLoader(xhr);
      }));
      it('should load inline templates synchronously', (function() {
        var template = new Template({inline: 'inline template'});
        expect(loader.load(template).content).toHaveText('inline template');
      }));
      it('should load templates through XHR', (function(done) {
        xhr.expect('/foo', 'xhr template');
        var template = new Template({url: '/foo'});
        loader.load(template).then((function(el) {
          expect(el.content).toHaveText('xhr template');
          done();
        }));
        xhr.flush();
      }));
      it('should cache template loaded through XHR', (function(done) {
        var firstEl;
        xhr.expect('/foo', 'xhr template');
        var template = new Template({url: '/foo'});
        loader.load(template).then((function(el) {
          firstEl = el;
          return loader.load(template);
        })).then((function(el) {
          expect(el).toBe(firstEl);
          expect(el.content).toHaveText('xhr template');
          done();
        }));
        xhr.flush();
      }));
      it('should throw when no template is defined', (function() {
        var template = new Template({
          inline: null,
          url: null
        });
        expect((function() {
          return loader.load(template);
        })).toThrowError('Templates should have either their url or inline property set');
      }));
      it('should return a rejected Promise when xhr loading fails', (function(done) {
        xhr.expect('/foo', null);
        var template = new Template({url: '/foo'});
        PromiseWrapper.then(loader.load(template), function(_) {
          throw 'Unexpected response';
        }, function(error) {
          expect(error).toEqual('Failed to load /foo');
          done();
        });
        xhr.flush();
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      describe = $__m.describe;
      it = $__m.it;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
      ddescribe = $__m.ddescribe;
      iit = $__m.iit;
      xit = $__m.xit;
      el = $__m.el;
    }, function($__m) {
      TemplateLoader = $__m.TemplateLoader;
    }, function($__m) {
      Template = $__m.Template;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      Type = $__m.Type;
      stringify = $__m.stringify;
      isPresent = $__m.isPresent;
    }, function($__m) {
      XHRMock = $__m.XHRMock;
    }],
    execute: function() {
      SomeComponent = (function() {
        var SomeComponent = function SomeComponent() {};
        return ($traceurRuntime.createClass)(SomeComponent, {}, {});
      }());
    }
  };
});

//# sourceMappingURL=angular2/test/core/compiler/template_loader_spec.map

//# sourceMappingURL=../../../../angular2/test/core/compiler/template_loader_spec.js.map