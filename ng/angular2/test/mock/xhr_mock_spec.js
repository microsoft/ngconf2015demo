System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/mock/xhr_mock", "angular2/src/facade/async", "angular2/src/facade/lang", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var assert,
      describe,
      beforeEach,
      it,
      expect,
      ddescribe,
      iit,
      el,
      IS_DARTIUM,
      XHRMock,
      PromiseWrapper,
      Promise,
      isPresent,
      ListWrapper;
  function main() {
    describe('XHRMock', (function() {
      var xhr;
      beforeEach((function() {
        xhr = new XHRMock();
      }));
      function expectResponse(request, url, response) {
        var done = arguments[3] !== (void 0) ? arguments[3] : null;
        assert.argumentTypes(request, Promise, url, assert.type.string, response, assert.type.string, done, assert.type.any);
        function onResponse(text) {
          assert.argumentTypes(text, assert.type.string);
          if (response === null) {
            throw ("Unexpected response " + url + " -> " + text);
          } else {
            expect(text).toEqual(response);
            if (isPresent(done))
              done();
          }
        }
        Object.defineProperty(onResponse, "parameters", {get: function() {
            return [[assert.type.string]];
          }});
        function onError(error) {
          assert.argumentTypes(error, assert.type.string);
          if (response !== null) {
            throw ("Unexpected error " + url);
          } else {
            expect(error).toEqual(("Failed to load " + url));
            if (isPresent(done))
              done();
          }
        }
        Object.defineProperty(onError, "parameters", {get: function() {
            return [[assert.type.string]];
          }});
        PromiseWrapper.then(request, onResponse, onError);
      }
      Object.defineProperty(expectResponse, "parameters", {get: function() {
          return [[Promise], [assert.type.string], [assert.type.string], []];
        }});
      it('should return a response from the definitions', (function(done) {
        var url = '/foo';
        var response = 'bar';
        xhr.when(url, response);
        expectResponse(xhr.get(url), url, response, done);
        xhr.flush();
      }));
      it('should return an error from the definitions', (function(done) {
        var url = '/foo';
        var response = null;
        xhr.when(url, response);
        expectResponse(xhr.get(url), url, response, done);
        xhr.flush();
      }));
      it('should return a response from the expectations', (function(done) {
        var url = '/foo';
        var response = 'bar';
        xhr.expect(url, response);
        expectResponse(xhr.get(url), url, response, done);
        xhr.flush();
      }));
      it('should return an error from the expectations', (function(done) {
        var url = '/foo';
        var response = null;
        xhr.expect(url, response);
        expectResponse(xhr.get(url), url, response, done);
        xhr.flush();
      }));
      it('should not reuse expectations', (function() {
        var url = '/foo';
        var response = 'bar';
        xhr.expect(url, response);
        xhr.get(url);
        xhr.get(url);
        expect((function() {
          xhr.flush();
        })).toThrowError('Unexpected request /foo');
      }));
      it('should return expectations before definitions', (function(done) {
        var url = '/foo';
        xhr.when(url, 'when');
        xhr.expect(url, 'expect');
        expectResponse(xhr.get(url), url, 'expect');
        expectResponse(xhr.get(url), url, 'when', done);
        xhr.flush();
      }));
      it('should throw when there is no definitions or expectations', (function() {
        xhr.get('/foo');
        expect((function() {
          xhr.flush();
        })).toThrowError('Unexpected request /foo');
      }));
      it('should throw when flush is called without any pending requests', (function() {
        expect((function() {
          xhr.flush();
        })).toThrowError('No pending requests to flush');
      }));
      it('should throw on unstatisfied expectations', (function() {
        xhr.expect('/foo', 'bar');
        xhr.when('/bar', 'foo');
        xhr.get('/bar');
        expect((function() {
          xhr.flush();
        })).toThrowError('Unsatisfied requests: /foo');
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      describe = $__m.describe;
      beforeEach = $__m.beforeEach;
      it = $__m.it;
      expect = $__m.expect;
      ddescribe = $__m.ddescribe;
      iit = $__m.iit;
      el = $__m.el;
      IS_DARTIUM = $__m.IS_DARTIUM;
    }, function($__m) {
      XHRMock = $__m.XHRMock;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
      Promise = $__m.Promise;
    }, function($__m) {
      isPresent = $__m.isPresent;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }],
    execute: function() {
    }
  };
});

//# sourceMappingURL=angular2/test/mock/xhr_mock_spec.map

//# sourceMappingURL=../../../angular2/test/mock/xhr_mock_spec.js.map