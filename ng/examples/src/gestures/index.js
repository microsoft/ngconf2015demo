System.register(["angular2/core", "angular2/src/reflection/reflection", "angular2/src/reflection/reflection_capabilities"], function($__export) {
  "use strict";
  var bootstrap,
      Component,
      Template,
      reflector,
      ReflectionCapabilities,
      GesturesCmp;
  function main() {
    reflector.reflectionCapabilities = new ReflectionCapabilities();
    bootstrap(GesturesCmp);
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      bootstrap = $__m.bootstrap;
      Component = $__m.Component;
      Template = $__m.Template;
    }, function($__m) {
      reflector = $__m.reflector;
    }, function($__m) {
      ReflectionCapabilities = $__m.ReflectionCapabilities;
    }],
    execute: function() {
      GesturesCmp = (function() {
        var GesturesCmp = function GesturesCmp() {
          this.swipeDirection = '-';
          this.pinchScale = 1;
          this.rotateAngle = 0;
        };
        return ($traceurRuntime.createClass)(GesturesCmp, {
          onSwipe: function(event) {
            this.swipeDirection = event.deltaX > 0 ? 'right' : 'left';
          },
          onPinch: function(event) {
            this.pinchScale = event.scale;
          },
          onRotate: function(event) {
            this.rotateAngle = event.rotation;
          }
        }, {});
      }());
      Object.defineProperty(GesturesCmp, "annotations", {get: function() {
          return [new Component({selector: 'gestures-app'}), new Template({url: 'template.html'})];
        }});
    }
  };
});

//# sourceMappingURL=examples/src/gestures/index.map

//# sourceMappingURL=../../../examples/src/gestures/index.js.map