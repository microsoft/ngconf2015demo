System.register(["angular2/test_lib", "angular2/src/facade/lang", "angular2/src/facade/collection", "benchpress/benchpress"], function($__export) {
  "use strict";
  var describe,
      ddescribe,
      it,
      iit,
      xit,
      expect,
      beforeEach,
      afterEach,
      isBlank,
      isPresent,
      Date,
      DateWrapper,
      List,
      ListWrapper,
      SampleState,
      Reporter,
      bind,
      Injector,
      ConsoleReporter,
      SampleDescription,
      MeasureValues;
  function main() {
    describe('console reporter', (function() {
      var reporter;
      var log;
      function createReporter($__0) {
        var $__1 = $__0,
            columnWidth = $__1.columnWidth,
            sampleId = $__1.sampleId,
            descriptions = $__1.descriptions,
            metrics = $__1.metrics;
        log = [];
        if (isBlank(descriptions)) {
          descriptions = [];
        }
        if (isBlank(sampleId)) {
          sampleId = 'null';
        }
        var bindings = [ConsoleReporter.BINDINGS, bind(SampleDescription).toValue(new SampleDescription(sampleId, descriptions, metrics)), bind(ConsoleReporter.PRINT).toValue((function(line) {
          return ListWrapper.push(log, line);
        }))];
        if (isPresent(columnWidth)) {
          ListWrapper.push(bindings, bind(ConsoleReporter.COLUMN_WIDTH).toValue(columnWidth));
        }
        reporter = new Injector(bindings).get(Reporter);
      }
      it('should print the sample id, description and table header', (function() {
        createReporter({
          columnWidth: 8,
          sampleId: 'someSample',
          descriptions: [{
            'a': 1,
            'b': 2
          }],
          metrics: {
            'm1': 'some desc',
            'm2': 'some other desc'
          }
        });
        expect(log).toEqual(['BENCHMARK someSample', 'Description:', '- a: 1', '- b: 2', 'Metrics:', '- m1: some desc', '- m2: some other desc', '', '      m1 |       m2', '-------- | --------']);
      }));
      it('should print a table row', (function() {
        createReporter({
          columnWidth: 8,
          metrics: {
            'a': '',
            'b': ''
          }
        });
        log = [];
        reporter.reportMeasureValues(mv(0, 0, {
          'a': 1.23,
          'b': 2
        }));
        expect(log).toEqual(['    1.23 |     2.00']);
      }));
      it('should print the table footer and stats when there is a valid sample', (function() {
        createReporter({
          columnWidth: 8,
          metrics: {
            'a': '',
            'b': ''
          }
        });
        log = [];
        reporter.reportSample([], [mv(0, 0, {
          'a': 3,
          'b': 6
        }), mv(1, 1, {
          'a': 5,
          'b': 9
        })]);
        expect(log).toEqual(['======== | ========', '4.00±25% | 7.50±20%']);
      }));
    }));
  }
  function mv(runIndex, time, values) {
    return new MeasureValues(runIndex, DateWrapper.fromMillis(time), values);
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      describe = $__m.describe;
      ddescribe = $__m.ddescribe;
      it = $__m.it;
      iit = $__m.iit;
      xit = $__m.xit;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
      afterEach = $__m.afterEach;
    }, function($__m) {
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
      Date = $__m.Date;
      DateWrapper = $__m.DateWrapper;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      SampleState = $__m.SampleState;
      Reporter = $__m.Reporter;
      bind = $__m.bind;
      Injector = $__m.Injector;
      ConsoleReporter = $__m.ConsoleReporter;
      SampleDescription = $__m.SampleDescription;
      MeasureValues = $__m.MeasureValues;
    }],
    execute: function() {
    }
  };
});

//# sourceMappingURL=benchpress/test/reporter/console_reporter_spec.map

//# sourceMappingURL=../../../benchpress/test/reporter/console_reporter_spec.js.map