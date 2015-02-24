System.register(["angular2/test_lib", "angular2/src/core/application", "angular2/src/core/annotations/annotations", "angular2/src/facade/dom", "angular2/src/facade/collection", "angular2/src/facade/async", "angular2/di", "angular2/src/core/annotations/template", "angular2/src/core/life_cycle/life_cycle"], function($__export) {
  "use strict";
  var describe,
      ddescribe,
      it,
      iit,
      xit,
      xdescribe,
      expect,
      beforeEach,
      bootstrap,
      appDocumentToken,
      appElementToken,
      Component,
      DOM,
      ListWrapper,
      PromiseWrapper,
      bind,
      Inject,
      Template,
      LifeCycle,
      HelloRootCmp,
      HelloRootCmp2,
      HelloRootCmp3,
      HelloRootCmp4;
  function main() {
    var fakeDoc,
        el,
        el2,
        testBindings;
    beforeEach((function() {
      fakeDoc = DOM.createHtmlDocument();
      el = DOM.createElement('hello-app', fakeDoc);
      el2 = DOM.createElement('hello-app-2', fakeDoc);
      DOM.appendChild(fakeDoc.body, el);
      DOM.appendChild(fakeDoc.body, el2);
      testBindings = [bind(appDocumentToken).toValue(fakeDoc)];
    }));
    describe('bootstrap factory method', (function() {
      it('should throw if no element is found', (function(done) {
        var injectorPromise = bootstrap(HelloRootCmp, [], (function(e, t) {
          throw e;
        }));
        PromiseWrapper.then(injectorPromise, null, (function(reason) {
          expect(reason.message).toContain('The app selector "hello-app" did not match any elements');
          done();
        }));
      }));
      it('should create an injector promise', (function() {
        var injectorPromise = bootstrap(HelloRootCmp, testBindings);
        expect(injectorPromise).not.toBe(null);
      }));
      it('should resolve an injector promise and contain bindings', (function(done) {
        var injectorPromise = bootstrap(HelloRootCmp, testBindings);
        injectorPromise.then((function(injector) {
          expect(injector.get(appElementToken)).toBe(el);
          done();
        }));
      }));
      it('should provide the application component in the injector', (function(done) {
        var injectorPromise = bootstrap(HelloRootCmp, testBindings);
        injectorPromise.then((function(injector) {
          expect(injector.get(HelloRootCmp)).toBeAnInstanceOf(HelloRootCmp);
          done();
        }));
      }));
      it('should display hello world', (function(done) {
        var injectorPromise = bootstrap(HelloRootCmp, testBindings);
        injectorPromise.then((function(injector) {
          expect(injector.get(appElementToken).shadowRoot.childNodes[0].nodeValue).toEqual('hello world!');
          done();
        }));
      }));
      it('should support multiple calls to bootstrap', (function(done) {
        var injectorPromise1 = bootstrap(HelloRootCmp, testBindings);
        var injectorPromise2 = bootstrap(HelloRootCmp2, testBindings);
        PromiseWrapper.all([injectorPromise1, injectorPromise2]).then((function(injectors) {
          expect(injectors[0].get(appElementToken).shadowRoot.childNodes[0].nodeValue).toEqual('hello world!');
          expect(injectors[1].get(appElementToken).shadowRoot.childNodes[0].nodeValue).toEqual('hello world, again!');
          done();
        }));
      }));
      it("should make the provided bindings available to the application component", (function(done) {
        var injectorPromise = bootstrap(HelloRootCmp3, [testBindings, bind("appBinding").toValue("BoundValue")]);
        injectorPromise.then((function(injector) {
          expect(injector.get(HelloRootCmp3).appBinding).toEqual("BoundValue");
          done();
        }));
      }));
      it("should avoid cyclic dependencies when root component requires Lifecycle through DI", (function(done) {
        var injectorPromise = bootstrap(HelloRootCmp4, testBindings);
        injectorPromise.then((function(injector) {
          expect(injector.get(HelloRootCmp4).lc).toBe(injector.get(LifeCycle));
          done();
        }));
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      describe = $__m.describe;
      ddescribe = $__m.ddescribe;
      it = $__m.it;
      iit = $__m.iit;
      xit = $__m.xit;
      xdescribe = $__m.xdescribe;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
    }, function($__m) {
      bootstrap = $__m.bootstrap;
      appDocumentToken = $__m.appDocumentToken;
      appElementToken = $__m.appElementToken;
    }, function($__m) {
      Component = $__m.Component;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      bind = $__m.bind;
      Inject = $__m.Inject;
    }, function($__m) {
      Template = $__m.Template;
    }, function($__m) {
      LifeCycle = $__m.LifeCycle;
    }],
    execute: function() {
      HelloRootCmp = (function() {
        var HelloRootCmp = function HelloRootCmp() {
          this.greeting = 'hello';
        };
        return ($traceurRuntime.createClass)(HelloRootCmp, {}, {});
      }());
      Object.defineProperty(HelloRootCmp, "annotations", {get: function() {
          return [new Component({selector: 'hello-app'}), new Template({inline: '{{greeting}} world!'})];
        }});
      HelloRootCmp2 = (function() {
        var HelloRootCmp2 = function HelloRootCmp2() {
          this.greeting = 'hello';
        };
        return ($traceurRuntime.createClass)(HelloRootCmp2, {}, {});
      }());
      Object.defineProperty(HelloRootCmp2, "annotations", {get: function() {
          return [new Component({selector: 'hello-app-2'}), new Template({inline: '{{greeting}} world, again!'})];
        }});
      HelloRootCmp3 = (function() {
        var HelloRootCmp3 = function HelloRootCmp3(appBinding) {
          this.appBinding = appBinding;
        };
        return ($traceurRuntime.createClass)(HelloRootCmp3, {}, {});
      }());
      Object.defineProperty(HelloRootCmp3, "annotations", {get: function() {
          return [new Component({selector: 'hello-app'}), new Template({inline: ''})];
        }});
      Object.defineProperty(HelloRootCmp3, "parameters", {get: function() {
          return [[new Inject("appBinding")]];
        }});
      HelloRootCmp4 = (function() {
        var HelloRootCmp4 = function HelloRootCmp4(lc) {
          this.lc = lc;
        };
        return ($traceurRuntime.createClass)(HelloRootCmp4, {}, {});
      }());
      Object.defineProperty(HelloRootCmp4, "annotations", {get: function() {
          return [new Component({selector: 'hello-app'}), new Template({inline: ''})];
        }});
      Object.defineProperty(HelloRootCmp4, "parameters", {get: function() {
          return [[new Inject(LifeCycle)]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/test/core/application_spec.map

//# sourceMappingURL=../../../angular2/test/core/application_spec.js.map