System.register([], function($__export) {
  "use strict";
  var webdriver;
  function clickAll(buttonSelectors) {
    buttonSelectors.forEach(function(selector) {
      $(selector).click();
    });
  }
  function verifyNoBrowserErrors() {
    browser.executeScript('1+1');
    browser.manage().logs().get('browser').then(function(browserLog) {
      var filteredLog = browserLog.filter(function(logEntry) {
        return logEntry.level.value > webdriver.logging.Level.WARNING.value;
      });
      expect(filteredLog.length).toEqual(0);
      if (filteredLog.length) {
        console.log('browser console errors: ' + require('util').inspect(filteredLog));
      }
    });
  }
  return {
    setters: [],
    execute: function() {
      webdriver = require('selenium-webdriver');
      module.exports = {
        verifyNoBrowserErrors: verifyNoBrowserErrors,
        clickAll: clickAll
      };
    }
  };
});

//# sourceMappingURL=angular2/e2e_test/test_util.map

//# sourceMappingURL=../../angular2/e2e_test/test_util.js.map