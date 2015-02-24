System.register(["rtts_assert/rtts_assert", "angular2/src/facade/collection", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var assert,
      isListLikeIterable,
      iterateListLike,
      ListWrapper,
      MapWrapper,
      int,
      isBlank,
      isPresent,
      stringify,
      getMapKey,
      looseIdentical,
      ArrayChanges,
      CollectionChangeRecord,
      _DuplicateItemRecordList,
      _DuplicateMap;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      isListLikeIterable = $__m.isListLikeIterable;
      iterateListLike = $__m.iterateListLike;
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      int = $__m.int;
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
      stringify = $__m.stringify;
      getMapKey = $__m.getMapKey;
      looseIdentical = $__m.looseIdentical;
    }],
    execute: function() {
      ArrayChanges = $__export("ArrayChanges", (function() {
        var ArrayChanges = function ArrayChanges() {
          this._collection = null;
          this._length = null;
          this._linkedRecords = null;
          this._unlinkedRecords = null;
          this._previousItHead = null;
          this._itHead = null;
          this._itTail = null;
          this._additionsHead = null;
          this._additionsTail = null;
          this._movesHead = null;
          this._movesTail = null;
          this._removalsHead = null;
          this._removalsTail = null;
        };
        return ($traceurRuntime.createClass)(ArrayChanges, {
          supportsObj: function(obj) {
            return assert.returnType((ArrayChanges.supports(obj)), assert.type.boolean);
          },
          get collection() {
            return this._collection;
          },
          get length() {
            return assert.returnType((this._length), int);
          },
          forEachItem: function(fn) {
            assert.argumentTypes(fn, Function);
            var record;
            for (record = this._itHead; record !== null; record = record._next) {
              fn(record);
            }
          },
          forEachPreviousItem: function(fn) {
            assert.argumentTypes(fn, Function);
            var record;
            for (record = this._previousItHead; record !== null; record = record._nextPrevious) {
              fn(record);
            }
          },
          forEachAddedItem: function(fn) {
            assert.argumentTypes(fn, Function);
            var record;
            for (record = this._additionsHead; record !== null; record = record._nextAdded) {
              fn(record);
            }
          },
          forEachMovedItem: function(fn) {
            assert.argumentTypes(fn, Function);
            var record;
            for (record = this._movesHead; record !== null; record = record._nextMoved) {
              fn(record);
            }
          },
          forEachRemovedItem: function(fn) {
            assert.argumentTypes(fn, Function);
            var record;
            for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
              fn(record);
            }
          },
          check: function(collection) {
            var $__0 = this;
            this._reset();
            var record = assert.type(this._itHead, CollectionChangeRecord);
            var mayBeDirty = assert.type(false, assert.type.boolean);
            var index,
                item;
            if (ListWrapper.isList(collection)) {
              var list = collection;
              this._length = collection.length;
              for (index = 0; index < this._length; index++) {
                item = list[index];
                if (record === null || !looseIdentical(record.item, item)) {
                  record = this._mismatch(record, item, index);
                  mayBeDirty = true;
                } else if (mayBeDirty) {
                  record = this._verifyReinsertion(record, item, index);
                }
                record = record._next;
              }
            } else {
              index = 0;
              iterateListLike(collection, (function(item) {
                if (record === null || !looseIdentical(record.item, item)) {
                  record = $__0._mismatch(record, item, index);
                  mayBeDirty = true;
                } else if (mayBeDirty) {
                  record = $__0._verifyReinsertion(record, item, index);
                }
                record = record._next;
                index++;
              }));
              this._length = index;
            }
            this._truncate(record);
            this._collection = collection;
            return assert.returnType((this.isDirty), assert.type.boolean);
          },
          get isDirty() {
            return assert.returnType((this._additionsHead !== null || this._movesHead !== null || this._removalsHead !== null), assert.type.boolean);
          },
          _reset: function() {
            if (this.isDirty) {
              var record;
              var nextRecord;
              for (record = this._previousItHead = this._itHead; record !== null; record = record._next) {
                record._nextPrevious = record._next;
              }
              for (record = this._additionsHead; record !== null; record = record._nextAdded) {
                record.previousIndex = record.currentIndex;
              }
              this._additionsHead = this._additionsTail = null;
              for (record = this._movesHead; record !== null; record = nextRecord) {
                record.previousIndex = record.currentIndex;
                nextRecord = record._nextMoved;
              }
              this._movesHead = this._movesTail = null;
              this._removalsHead = this._removalsTail = null;
            }
          },
          _mismatch: function(record, item, index) {
            assert.argumentTypes(record, CollectionChangeRecord, item, assert.type.any, index, int);
            var previousRecord;
            if (record === null) {
              previousRecord = this._itTail;
            } else {
              previousRecord = record._prev;
              this._remove(record);
            }
            record = this._linkedRecords === null ? null : this._linkedRecords.get(item, index);
            if (record !== null) {
              this._moveAfter(record, previousRecord, index);
            } else {
              record = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(item);
              if (record !== null) {
                this._reinsertAfter(record, previousRecord, index);
              } else {
                record = this._addAfter(new CollectionChangeRecord(item), previousRecord, index);
              }
            }
            return assert.returnType((record), CollectionChangeRecord);
          },
          _verifyReinsertion: function(record, item, index) {
            assert.argumentTypes(record, CollectionChangeRecord, item, assert.type.any, index, int);
            var reinsertRecord = assert.type(this._unlinkedRecords === null ? null : this._unlinkedRecords.get(item), CollectionChangeRecord);
            if (reinsertRecord !== null) {
              record = this._reinsertAfter(reinsertRecord, record._prev, index);
            } else if (record.currentIndex != index) {
              record.currentIndex = index;
              this._addToMoves(record, index);
            }
            return assert.returnType((record), CollectionChangeRecord);
          },
          _truncate: function(record) {
            assert.argumentTypes(record, CollectionChangeRecord);
            while (record !== null) {
              var nextRecord = assert.type(record._next, CollectionChangeRecord);
              this._addToRemovals(this._unlink(record));
              record = nextRecord;
            }
            if (this._unlinkedRecords !== null) {
              this._unlinkedRecords.clear();
            }
            if (this._additionsTail !== null) {
              this._additionsTail._nextAdded = null;
            }
            if (this._movesTail !== null) {
              this._movesTail._nextMoved = null;
            }
            if (this._itTail !== null) {
              this._itTail._next = null;
            }
            if (this._removalsTail !== null) {
              this._removalsTail._nextRemoved = null;
            }
          },
          _reinsertAfter: function(record, prevRecord, index) {
            assert.argumentTypes(record, CollectionChangeRecord, prevRecord, CollectionChangeRecord, index, int);
            if (this._unlinkedRecords !== null) {
              this._unlinkedRecords.remove(record);
            }
            var prev = record._prevRemoved;
            var next = record._nextRemoved;
            if (prev === null) {
              this._removalsHead = next;
            } else {
              prev._nextRemoved = next;
            }
            if (next === null) {
              this._removalsTail = prev;
            } else {
              next._prevRemoved = prev;
            }
            this._insertAfter(record, prevRecord, index);
            this._addToMoves(record, index);
            return assert.returnType((record), CollectionChangeRecord);
          },
          _moveAfter: function(record, prevRecord, index) {
            assert.argumentTypes(record, CollectionChangeRecord, prevRecord, CollectionChangeRecord, index, int);
            this._unlink(record);
            this._insertAfter(record, prevRecord, index);
            this._addToMoves(record, index);
            return assert.returnType((record), CollectionChangeRecord);
          },
          _addAfter: function(record, prevRecord, index) {
            assert.argumentTypes(record, CollectionChangeRecord, prevRecord, CollectionChangeRecord, index, int);
            this._insertAfter(record, prevRecord, index);
            if (this._additionsTail === null) {
              this._additionsTail = this._additionsHead = record;
            } else {
              this._additionsTail = this._additionsTail._nextAdded = record;
            }
            return assert.returnType((record), CollectionChangeRecord);
          },
          _insertAfter: function(record, prevRecord, index) {
            assert.argumentTypes(record, CollectionChangeRecord, prevRecord, CollectionChangeRecord, index, int);
            var next = assert.type(prevRecord === null ? this._itHead : prevRecord._next, CollectionChangeRecord);
            record._next = next;
            record._prev = prevRecord;
            if (next === null) {
              this._itTail = record;
            } else {
              next._prev = record;
            }
            if (prevRecord === null) {
              this._itHead = record;
            } else {
              prevRecord._next = record;
            }
            if (this._linkedRecords === null) {
              this._linkedRecords = new _DuplicateMap();
            }
            this._linkedRecords.put(record);
            record.currentIndex = index;
            return assert.returnType((record), CollectionChangeRecord);
          },
          _remove: function(record) {
            assert.argumentTypes(record, CollectionChangeRecord);
            return assert.returnType((this._addToRemovals(this._unlink(record))), CollectionChangeRecord);
          },
          _unlink: function(record) {
            assert.argumentTypes(record, CollectionChangeRecord);
            if (this._linkedRecords !== null) {
              this._linkedRecords.remove(record);
            }
            var prev = record._prev;
            var next = record._next;
            if (prev === null) {
              this._itHead = next;
            } else {
              prev._next = next;
            }
            if (next === null) {
              this._itTail = prev;
            } else {
              next._prev = prev;
            }
            return assert.returnType((record), CollectionChangeRecord);
          },
          _addToMoves: function(record, toIndex) {
            assert.argumentTypes(record, CollectionChangeRecord, toIndex, int);
            if (record.previousIndex === toIndex) {
              return assert.returnType((record), CollectionChangeRecord);
            }
            if (this._movesTail === null) {
              this._movesTail = this._movesHead = record;
            } else {
              this._movesTail = this._movesTail._nextMoved = record;
            }
            return assert.returnType((record), CollectionChangeRecord);
          },
          _addToRemovals: function(record) {
            assert.argumentTypes(record, CollectionChangeRecord);
            if (this._unlinkedRecords === null) {
              this._unlinkedRecords = new _DuplicateMap();
            }
            this._unlinkedRecords.put(record);
            record.currentIndex = null;
            record._nextRemoved = null;
            if (this._removalsTail === null) {
              this._removalsTail = this._removalsHead = record;
              record._prevRemoved = null;
            } else {
              record._prevRemoved = this._removalsTail;
              this._removalsTail = this._removalsTail._nextRemoved = record;
            }
            return assert.returnType((record), CollectionChangeRecord);
          },
          toString: function() {
            var record;
            var list = [];
            for (record = this._itHead; record !== null; record = record._next) {
              ListWrapper.push(list, record);
            }
            var previous = [];
            for (record = this._previousItHead; record !== null; record = record._nextPrevious) {
              ListWrapper.push(previous, record);
            }
            var additions = [];
            for (record = this._additionsHead; record !== null; record = record._nextAdded) {
              ListWrapper.push(additions, record);
            }
            var moves = [];
            for (record = this._movesHead; record !== null; record = record._nextMoved) {
              ListWrapper.push(moves, record);
            }
            var removals = [];
            for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
              ListWrapper.push(removals, record);
            }
            return assert.returnType(("collection: " + list.join(', ') + "\n" + "previous: " + previous.join(', ') + "\n" + "additions: " + additions.join(', ') + "\n" + "moves: " + moves.join(', ') + "\n" + "removals: " + removals.join(', ') + "\n"), assert.type.string);
          }
        }, {supports: function(obj) {
            return assert.returnType((isListLikeIterable(obj)), assert.type.boolean);
          }});
      }()));
      Object.defineProperty(ArrayChanges.prototype.forEachItem, "parameters", {get: function() {
          return [[Function]];
        }});
      Object.defineProperty(ArrayChanges.prototype.forEachPreviousItem, "parameters", {get: function() {
          return [[Function]];
        }});
      Object.defineProperty(ArrayChanges.prototype.forEachAddedItem, "parameters", {get: function() {
          return [[Function]];
        }});
      Object.defineProperty(ArrayChanges.prototype.forEachMovedItem, "parameters", {get: function() {
          return [[Function]];
        }});
      Object.defineProperty(ArrayChanges.prototype.forEachRemovedItem, "parameters", {get: function() {
          return [[Function]];
        }});
      Object.defineProperty(ArrayChanges.prototype._mismatch, "parameters", {get: function() {
          return [[CollectionChangeRecord], [], [int]];
        }});
      Object.defineProperty(ArrayChanges.prototype._verifyReinsertion, "parameters", {get: function() {
          return [[CollectionChangeRecord], [], [int]];
        }});
      Object.defineProperty(ArrayChanges.prototype._truncate, "parameters", {get: function() {
          return [[CollectionChangeRecord]];
        }});
      Object.defineProperty(ArrayChanges.prototype._reinsertAfter, "parameters", {get: function() {
          return [[CollectionChangeRecord], [CollectionChangeRecord], [int]];
        }});
      Object.defineProperty(ArrayChanges.prototype._moveAfter, "parameters", {get: function() {
          return [[CollectionChangeRecord], [CollectionChangeRecord], [int]];
        }});
      Object.defineProperty(ArrayChanges.prototype._addAfter, "parameters", {get: function() {
          return [[CollectionChangeRecord], [CollectionChangeRecord], [int]];
        }});
      Object.defineProperty(ArrayChanges.prototype._insertAfter, "parameters", {get: function() {
          return [[CollectionChangeRecord], [CollectionChangeRecord], [int]];
        }});
      Object.defineProperty(ArrayChanges.prototype._remove, "parameters", {get: function() {
          return [[CollectionChangeRecord]];
        }});
      Object.defineProperty(ArrayChanges.prototype._unlink, "parameters", {get: function() {
          return [[CollectionChangeRecord]];
        }});
      Object.defineProperty(ArrayChanges.prototype._addToMoves, "parameters", {get: function() {
          return [[CollectionChangeRecord], [int]];
        }});
      Object.defineProperty(ArrayChanges.prototype._addToRemovals, "parameters", {get: function() {
          return [[CollectionChangeRecord]];
        }});
      CollectionChangeRecord = $__export("CollectionChangeRecord", (function() {
        var CollectionChangeRecord = function CollectionChangeRecord(item) {
          this.currentIndex = null;
          this.previousIndex = null;
          this.item = item;
          this._nextPrevious = null;
          this._prev = null;
          this._next = null;
          this._prevDup = null;
          this._nextDup = null;
          this._prevRemoved = null;
          this._nextRemoved = null;
          this._nextAdded = null;
          this._nextMoved = null;
        };
        return ($traceurRuntime.createClass)(CollectionChangeRecord, {toString: function() {
            return assert.returnType((this.previousIndex === this.currentIndex ? stringify(this.item) : stringify(this.item) + '[' + stringify(this.previousIndex) + '->' + stringify(this.currentIndex) + ']'), assert.type.string);
          }}, {});
      }()));
      _DuplicateItemRecordList = (function() {
        var _DuplicateItemRecordList = function _DuplicateItemRecordList() {
          this._head = null;
          this._tail = null;
        };
        return ($traceurRuntime.createClass)(_DuplicateItemRecordList, {
          add: function(record) {
            assert.argumentTypes(record, CollectionChangeRecord);
            if (this._head === null) {
              this._head = this._tail = record;
              record._nextDup = null;
              record._prevDup = null;
            } else {
              this._tail._nextDup = record;
              record._prevDup = this._tail;
              record._nextDup = null;
              this._tail = record;
            }
          },
          get: function(item, afterIndex) {
            assert.argumentTypes(item, assert.type.any, afterIndex, int);
            var record;
            for (record = this._head; record !== null; record = record._nextDup) {
              if ((afterIndex === null || afterIndex < record.currentIndex) && looseIdentical(record.item, item)) {
                return assert.returnType((record), CollectionChangeRecord);
              }
            }
            return assert.returnType((null), CollectionChangeRecord);
          },
          remove: function(record) {
            assert.argumentTypes(record, CollectionChangeRecord);
            var prev = assert.type(record._prevDup, CollectionChangeRecord);
            var next = assert.type(record._nextDup, CollectionChangeRecord);
            if (prev === null) {
              this._head = next;
            } else {
              prev._nextDup = next;
            }
            if (next === null) {
              this._tail = prev;
            } else {
              next._prevDup = prev;
            }
            return assert.returnType((this._head === null), assert.type.boolean);
          }
        }, {});
      }());
      Object.defineProperty(_DuplicateItemRecordList.prototype.add, "parameters", {get: function() {
          return [[CollectionChangeRecord]];
        }});
      Object.defineProperty(_DuplicateItemRecordList.prototype.get, "parameters", {get: function() {
          return [[], [int]];
        }});
      Object.defineProperty(_DuplicateItemRecordList.prototype.remove, "parameters", {get: function() {
          return [[CollectionChangeRecord]];
        }});
      _DuplicateMap = (function() {
        var _DuplicateMap = function _DuplicateMap() {
          this.map = MapWrapper.create();
        };
        return ($traceurRuntime.createClass)(_DuplicateMap, {
          put: function(record) {
            assert.argumentTypes(record, CollectionChangeRecord);
            var key = getMapKey(record.item);
            var duplicates = MapWrapper.get(this.map, key);
            if (!isPresent(duplicates)) {
              duplicates = new _DuplicateItemRecordList();
              MapWrapper.set(this.map, key, duplicates);
            }
            duplicates.add(record);
          },
          get: function(value) {
            var afterIndex = arguments[1] !== (void 0) ? arguments[1] : null;
            var key = getMapKey(value);
            var recordList = MapWrapper.get(this.map, key);
            return assert.returnType((isBlank(recordList) ? null : recordList.get(value, afterIndex)), CollectionChangeRecord);
          },
          remove: function(record) {
            assert.argumentTypes(record, CollectionChangeRecord);
            var key = getMapKey(record.item);
            var recordList = assert.type(MapWrapper.get(this.map, key), _DuplicateItemRecordList);
            if (recordList.remove(record)) {
              MapWrapper.delete(this.map, key);
            }
            return assert.returnType((record), CollectionChangeRecord);
          },
          get isEmpty() {
            return assert.returnType((MapWrapper.size(this.map) === 0), assert.type.boolean);
          },
          clear: function() {
            MapWrapper.clear(this.map);
          },
          toString: function() {
            return assert.returnType(('_DuplicateMap(' + stringify(this.map) + ')'), assert.type.string);
          }
        }, {});
      }());
      Object.defineProperty(_DuplicateMap.prototype.put, "parameters", {get: function() {
          return [[CollectionChangeRecord]];
        }});
      Object.defineProperty(_DuplicateMap.prototype.remove, "parameters", {get: function() {
          return [[CollectionChangeRecord]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/change_detection/array_changes.map

//# sourceMappingURL=../../../angular2/src/change_detection/array_changes.js.map