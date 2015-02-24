System.register([], function($__export) {
  "use strict";
  var perfUtil;
  return {
    setters: [],
    execute: function() {
      perfUtil = require('angular2/e2e_test/perf_util');
      describe('ng1.x tree benchmark', function() {
        var URL = 'benchmarks_external/src/tree/tree_benchmark.html';
        afterEach(perfUtil.verifyNoBrowserErrors);
        it('should log the stats', function(done) {
          perfUtil.runClickBenchmark({
            url: URL,
            buttons: ['#destroyDom', '#createDom'],
            id: 'ng1.tree',
            params: [{
              name: 'depth',
              value: 9,
              scale: 'log2'
            }]
          }).then(done, done.fail);
        });
      });
    }
  };
});

//# sourceMappingURL=benchmarks_external/e2e_test/tree_perf.map

//# sourceMappingURL=../../benchmarks_external/e2e_test/tree_perf.js.map