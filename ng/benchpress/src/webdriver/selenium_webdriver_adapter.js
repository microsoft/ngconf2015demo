System.register(["rtts_assert/rtts_assert", "angular2/src/facade/async", "angular2/di", "../web_driver_adapter", "selenium-webdriver"], function($__export) {
  "use strict";
  var assert,
      Promise,
      PromiseWrapper,
      bind,
      WebDriverAdapter,
      webdriver,
      SeleniumWebDriverAdapter;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Promise = $__m.Promise;
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      bind = $__m.bind;
    }, function($__m) {
      WebDriverAdapter = $__m.WebDriverAdapter;
    }, function($__m) {
      webdriver = $__m.default;
    }],
    execute: function() {
      SeleniumWebDriverAdapter = $__export("SeleniumWebDriverAdapter", (function($__super) {
        var SeleniumWebDriverAdapter = function SeleniumWebDriverAdapter(driver) {
          $traceurRuntime.superConstructor(SeleniumWebDriverAdapter).call(this);
          this._driver = driver;
        };
        return ($traceurRuntime.createClass)(SeleniumWebDriverAdapter, {
          _convertPromise: function(thenable) {
            var completer = PromiseWrapper.completer();
            thenable.then(completer.complete, completer.reject);
            return completer.promise;
          },
          waitFor: function(callback) {
            return assert.returnType((this._convertPromise(this._driver.controlFlow().execute(callback))), Promise);
          },
          executeScript: function(script) {
            assert.argumentTypes(script, assert.type.string);
            return assert.returnType((this._convertPromise(this._driver.executeScript(script))), Promise);
          },
          capabilities: function() {
            return assert.returnType((this._convertPromise(this._driver.getCapabilities())), Promise);
          },
          logs: function(type) {
            assert.argumentTypes(type, assert.type.string);
            return assert.returnType((this._convertPromise(this._driver.schedule(new webdriver.Command(webdriver.CommandName.GET_LOG).setParameter('type', type), 'WebDriver.manage().logs().get(' + type + ')').then((function(logs) {
              return [].slice.call(logs);
            })))), Promise);
          }
        }, {}, $__super);
      }(WebDriverAdapter)));
      Object.defineProperty(SeleniumWebDriverAdapter.prototype.executeScript, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(SeleniumWebDriverAdapter.prototype.logs, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
    }
  };
});

//# sourceMappingURL=benchpress/src/webdriver/selenium_webdriver_adapter.map

//# sourceMappingURL=../../../benchpress/src/webdriver/selenium_webdriver_adapter.js.map