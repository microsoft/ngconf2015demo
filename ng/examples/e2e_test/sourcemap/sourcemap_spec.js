System.register([], function($__export) {
  "use strict";
  var fs,
      sourceMap;
  return {
    setters: [],
    execute: function() {
      fs = require('fs');
      sourceMap = require('source-map');
      describe('sourcemaps', function() {
        var URL = 'examples/src/sourcemap/index.html';
        it('should map sources', function() {
          browser.get(URL);
          browser.executeScript('1+1');
          browser.manage().logs().get('browser').then(function(logs) {
            var errorLine = null;
            var errorColumn = null;
            logs.forEach(function(log) {
              var match = /Test\.run\s+\(.+:(\d+):(\d+)/m.exec(log.message);
              if (match) {
                errorLine = parseInt(match[1]);
                errorColumn = parseInt(match[2]);
              }
            });
            expect(errorLine).not.toBeNull();
            expect(errorColumn).not.toBeNull();
            var sourceMapData = fs.readFileSync('dist/js/prod/es5/examples/src/sourcemap/index.js.map');
            var decoder = new sourceMap.SourceMapConsumer(JSON.parse(sourceMapData));
            var originalPosition = decoder.originalPositionFor({
              line: errorLine,
              column: errorColumn
            });
            var sourceCodeLines = fs.readFileSync('modules/examples/src/sourcemap/index.js', {encoding: 'UTF-8'}).split('\n');
            expect(sourceCodeLines[originalPosition.line - 1]).toMatch(/throw new BaseException\(\'Sourcemap test\'\)/);
          });
        });
      });
    }
  };
});

//# sourceMappingURL=examples/e2e_test/sourcemap/sourcemap_spec.map

//# sourceMappingURL=../../../examples/e2e_test/sourcemap/sourcemap_spec.js.map