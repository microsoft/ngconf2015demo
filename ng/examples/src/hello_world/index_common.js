System.register(["rtts_assert/rtts_assert", "angular2/angular2"], function($__export) {
  "use strict";
  var assert,
      bootstrap,
      Component,
      Decorator,
      Template,
      NgElement,
      HelloCmp,
      RedDec,
      GreetingService;
  function main() {
    bootstrap(HelloCmp);
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      bootstrap = $__m.bootstrap;
      Component = $__m.Component;
      Decorator = $__m.Decorator;
      Template = $__m.Template;
      NgElement = $__m.NgElement;
    }],
    execute: function() {
      HelloCmp = (function() {
        var HelloCmp = function HelloCmp(service) {
          assert.argumentTypes(service, GreetingService);
          this.greeting = service.greeting;
        };
        return ($traceurRuntime.createClass)(HelloCmp, {changeGreeting: function() {
            this.greeting = 'howdy';
          }}, {});
      }());
      Object.defineProperty(HelloCmp, "annotations", {get: function() {
          return [new Component({
            selector: 'hello-app',
            componentServices: [GreetingService]
          }), new Template({
            inline: "<div class=\"greeting\">{{greeting}} <span red>world</span>!</div>\n           <button class=\"changeButton\" (click)=\"changeGreeting()\">change greeting</button>",
            directives: [RedDec]
          })];
        }});
      Object.defineProperty(HelloCmp, "parameters", {get: function() {
          return [[GreetingService]];
        }});
      RedDec = (function() {
        var RedDec = function RedDec(el) {
          assert.argumentTypes(el, NgElement);
          el.domElement.style.color = 'red';
        };
        return ($traceurRuntime.createClass)(RedDec, {}, {});
      }());
      Object.defineProperty(RedDec, "annotations", {get: function() {
          return [new Decorator({selector: '[red]'})];
        }});
      Object.defineProperty(RedDec, "parameters", {get: function() {
          return [[NgElement]];
        }});
      GreetingService = (function() {
        var GreetingService = function GreetingService() {
          this.greeting = 'hello';
        };
        return ($traceurRuntime.createClass)(GreetingService, {}, {});
      }());
    }
  };
});

//# sourceMappingURL=examples/src/hello_world/index_common.map

//# sourceMappingURL=../../../examples/src/hello_world/index_common.js.map