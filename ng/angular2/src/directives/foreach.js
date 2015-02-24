System.register(["rtts_assert/rtts_assert", "angular2/src/core/annotations/annotations", "angular2/src/core/compiler/interfaces", "angular2/src/core/compiler/view_container", "angular2/src/core/compiler/view", "angular2/src/facade/lang", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var assert,
      Viewport,
      onChange,
      OnChange,
      ViewContainer,
      View,
      isPresent,
      isBlank,
      ListWrapper,
      Foreach,
      RecordViewTuple;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Viewport = $__m.Viewport;
      onChange = $__m.onChange;
    }, function($__m) {
      OnChange = $__m.OnChange;
    }, function($__m) {
      ViewContainer = $__m.ViewContainer;
    }, function($__m) {
      View = $__m.View;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }],
    execute: function() {
      Foreach = $__export("Foreach", (function($__super) {
        var Foreach = function Foreach(viewContainer) {
          assert.argumentTypes(viewContainer, ViewContainer);
          $traceurRuntime.superConstructor(Foreach).call(this);
          this.viewContainer = viewContainer;
        };
        return ($traceurRuntime.createClass)(Foreach, {
          onChange: function(changes) {
            var iteratorChanges = changes['iterable'];
            if (isBlank(iteratorChanges) || isBlank(iteratorChanges.currentValue)) {
              this.viewContainer.clear();
              return ;
            }
            var recordViewTuples = [];
            iteratorChanges.currentValue.forEachRemovedItem((function(removedRecord) {
              return ListWrapper.push(recordViewTuples, new RecordViewTuple(removedRecord, null));
            }));
            iteratorChanges.currentValue.forEachMovedItem((function(movedRecord) {
              return ListWrapper.push(recordViewTuples, new RecordViewTuple(movedRecord, null));
            }));
            var insertTuples = Foreach.bulkRemove(recordViewTuples, this.viewContainer);
            iteratorChanges.currentValue.forEachAddedItem((function(addedRecord) {
              return ListWrapper.push(insertTuples, new RecordViewTuple(addedRecord, null));
            }));
            Foreach.bulkInsert(insertTuples, this.viewContainer);
            for (var i = 0; i < insertTuples.length; i++) {
              this.perViewChange(insertTuples[i].view, insertTuples[i].record);
            }
          },
          perViewChange: function(view, record) {
            view.setLocal('\$implicit', record.item);
            view.setLocal('index', record.currentIndex);
          }
        }, {
          bulkRemove: function(tuples, viewContainer) {
            tuples.sort((function(a, b) {
              return a.record.previousIndex - b.record.previousIndex;
            }));
            var movedTuples = [];
            for (var i = tuples.length - 1; i >= 0; i--) {
              var tuple = tuples[i];
              if (isPresent(tuple.record.currentIndex)) {
                tuple.view = viewContainer.detach(tuple.record.previousIndex);
                ListWrapper.push(movedTuples, tuple);
              } else {
                viewContainer.remove(tuple.record.previousIndex);
              }
            }
            return movedTuples;
          },
          bulkInsert: function(tuples, viewContainer) {
            tuples.sort((function(a, b) {
              return a.record.currentIndex - b.record.currentIndex;
            }));
            for (var i = 0; i < tuples.length; i++) {
              var tuple = tuples[i];
              if (isPresent(tuple.view)) {
                viewContainer.insert(tuple.view, tuple.record.currentIndex);
              } else {
                tuple.view = viewContainer.create(tuple.record.currentIndex);
              }
            }
            return tuples;
          }
        }, $__super);
      }(OnChange)));
      Object.defineProperty(Foreach, "annotations", {get: function() {
          return [new Viewport({
            selector: '[foreach][in]',
            lifecycle: [onChange],
            bind: {'in': 'iterable[]'}
          })];
        }});
      Object.defineProperty(Foreach, "parameters", {get: function() {
          return [[ViewContainer]];
        }});
      RecordViewTuple = (function() {
        var RecordViewTuple = function RecordViewTuple(record, view) {
          this.record = record;
          this.view = view;
        };
        return ($traceurRuntime.createClass)(RecordViewTuple, {}, {});
      }());
    }
  };
});

//# sourceMappingURL=angular2/src/directives/foreach.map

//# sourceMappingURL=../../../angular2/src/directives/foreach.js.map