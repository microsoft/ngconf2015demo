System.register(["angular2/src/test_lib/benchmark_util"], function($__export) {
  "use strict";
  var getIntParameter,
      bindAction;
  function main() {
    var ngEl = document.createElement('div');
    angular.bootstrap(ngEl, ['app']);
  }
  function loadTemplate(templateId, repeatCount) {
    var template = document.querySelectorAll(("#" + templateId))[0];
    var content = template.innerHTML;
    var result = '';
    for (var i = 0; i < repeatCount; i++) {
      result += content;
    }
    result = result.replace(/[\[\]]/g, '');
    var div = document.createElement('div');
    div.innerHTML = result;
    return div;
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      getIntParameter = $__m.getIntParameter;
      bindAction = $__m.bindAction;
    }],
    execute: function() {
      angular.module('app', []).directive('dir0', ['$parse', function($parse) {
        return {compile: function($element, $attrs) {
            var expr = $parse($attrs.attr0);
            return function($scope) {
              $scope.$watch(expr, angular.noop);
            };
          }};
      }]).directive('dir1', ['$parse', function($parse) {
        return {compile: function($element, $attrs) {
            var expr = $parse($attrs.attr1);
            return function($scope) {
              $scope.$watch(expr, angular.noop);
            };
          }};
      }]).directive('dir2', ['$parse', function($parse) {
        return {compile: function($element, $attrs) {
            var expr = $parse($attrs.attr2);
            return function($scope) {
              $scope.$watch(expr, angular.noop);
            };
          }};
      }]).directive('dir3', ['$parse', function($parse) {
        return {compile: function($element, $attrs) {
            var expr = $parse($attrs.attr3);
            return function($scope) {
              $scope.$watch(expr, angular.noop);
            };
          }};
      }]).directive('dir4', ['$parse', function($parse) {
        return {compile: function($element, $attrs) {
            var expr = $parse($attrs.attr4);
            return function($scope) {
              $scope.$watch(expr, angular.noop);
            };
          }};
      }]).run(['$compile', function($compile) {
        var count = getIntParameter('elements');
        var templateNoBindings = loadTemplate('templateNoBindings', count);
        var templateWithBindings = loadTemplate('templateWithBindings', count);
        bindAction('#compileWithBindings', compileWithBindings);
        bindAction('#compileNoBindings', compileNoBindings);
        function compileNoBindings() {
          var cloned = templateNoBindings.cloneNode(true);
          $compile(cloned);
        }
        function compileWithBindings() {
          var cloned = templateWithBindings.cloneNode(true);
          $compile(cloned);
        }
      }]);
    }
  };
});

//# sourceMappingURL=benchmarks_external/src/compiler/compiler_benchmark.map

//# sourceMappingURL=../../../benchmarks_external/src/compiler/compiler_benchmark.js.map