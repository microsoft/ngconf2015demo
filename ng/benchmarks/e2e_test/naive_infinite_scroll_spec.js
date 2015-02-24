System.register([], function($__export) {
  "use strict";
  var testUtil;
  return {
    setters: [],
    execute: function() {
      testUtil = require('angular2/e2e_test/test_util');
      describe('ng2 naive infinite scroll benchmark', function() {
        var URL = 'benchmarks/src/naive_infinite_scroll/index.html?appSize=3';
        afterEach(testUtil.verifyNoBrowserErrors);
        it('should not throw errors', function() {
          browser.get(URL);
          var expectedRowCount = 18;
          var expectedCellsPerRow = 11;
          var allScrollItems = 'scroll-app /deep/ #testArea /deep/ scroll-item';
          var cells = (allScrollItems + " /deep/ .row *");
          var stageButtons = (allScrollItems + " /deep/ .row stage-buttons /deep/ button");
          var count = function(selector) {
            return browser.executeScript(("return document.querySelectorAll(\"" + selector + "\").length;"));
          };
          var clickFirstOf = function(selector) {
            return browser.executeScript(("document.querySelector(\"" + selector + "\").click();"));
          };
          var firstTextOf = function(selector) {
            return browser.executeScript(("return document.querySelector(\"" + selector + "\").innerText;"));
          };
          count(allScrollItems).then(function(c) {
            expect(c).toBe(expectedRowCount);
          });
          count(cells).then(function(c) {
            expect(c).toBe(expectedRowCount * expectedCellsPerRow);
          });
          firstTextOf((stageButtons + ":enabled")).then(function(text) {
            expect(text).toBe('Pitched');
            clickFirstOf((stageButtons + ":enabled")).then(function() {
              firstTextOf((stageButtons + ":enabled")).then(function(text) {
                expect(text).toBe('Won');
              });
            });
          });
          browser.executeScript('document.querySelector("scroll-app /deep/ #reset-btn").click()');
          browser.executeScript('document.querySelector("scroll-app /deep/ #run-btn").click()');
          browser.wait((function() {
            return $('#done').getText().then(function() {
              return true;
            }, function() {
              return false;
            });
          }), 10000);
        });
      });
    }
  };
});

//# sourceMappingURL=benchmarks/e2e_test/naive_infinite_scroll_spec.map

//# sourceMappingURL=../../benchmarks/e2e_test/naive_infinite_scroll_spec.js.map