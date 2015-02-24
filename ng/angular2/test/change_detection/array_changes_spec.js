System.register(["angular2/test_lib", "angular2/src/change_detection/array_changes", "angular2/src/facade/lang", "angular2/src/facade/collection", "./iterable", "./util"], function($__export) {
  "use strict";
  var describe,
      it,
      iit,
      xit,
      expect,
      beforeEach,
      afterEach,
      ArrayChanges,
      NumberWrapper,
      ListWrapper,
      MapWrapper,
      TestIterable,
      arrayChangesAsString;
  function main() {
    describe('collection_changes', function() {
      describe('CollectionChanges', function() {
        var changes;
        var l;
        beforeEach((function() {
          changes = new ArrayChanges();
        }));
        afterEach((function() {
          changes = null;
        }));
        it('should support list and iterables', (function() {
          expect(ArrayChanges.supports([])).toBeTruthy();
          expect(ArrayChanges.supports(new TestIterable())).toBeTruthy();
          expect(ArrayChanges.supports(MapWrapper.create())).toBeFalsy();
          expect(ArrayChanges.supports(null)).toBeFalsy();
        }));
        it('should support iterables', (function() {
          l = new TestIterable();
          changes.check(l);
          expect(changes.toString()).toEqual(arrayChangesAsString({collection: []}));
          l.list = [1];
          changes.check(l);
          expect(changes.toString()).toEqual(arrayChangesAsString({
            collection: ['1[null->0]'],
            additions: ['1[null->0]']
          }));
          l.list = [2, 1];
          changes.check(l);
          expect(changes.toString()).toEqual(arrayChangesAsString({
            collection: ['2[null->0]', '1[0->1]'],
            previous: ['1[0->1]'],
            additions: ['2[null->0]'],
            moves: ['1[0->1]']
          }));
        }));
        it('should detect additions', (function() {
          l = [];
          changes.check(l);
          expect(changes.toString()).toEqual(arrayChangesAsString({collection: []}));
          ListWrapper.push(l, 'a');
          changes.check(l);
          expect(changes.toString()).toEqual(arrayChangesAsString({
            collection: ['a[null->0]'],
            additions: ['a[null->0]']
          }));
          ListWrapper.push(l, 'b');
          changes.check(l);
          expect(changes.toString()).toEqual(arrayChangesAsString({
            collection: ['a', 'b[null->1]'],
            previous: ['a'],
            additions: ['b[null->1]']
          }));
        }));
        it('should support changing the reference', (function() {
          l = [0];
          changes.check(l);
          l = [1, 0];
          changes.check(l);
          expect(changes.toString()).toEqual(arrayChangesAsString({
            collection: ['1[null->0]', '0[0->1]'],
            previous: ['0[0->1]'],
            additions: ['1[null->0]'],
            moves: ['0[0->1]']
          }));
          l = [2, 1, 0];
          changes.check(l);
          expect(changes.toString()).toEqual(arrayChangesAsString({
            collection: ['2[null->0]', '1[0->1]', '0[1->2]'],
            previous: ['1[0->1]', '0[1->2]'],
            additions: ['2[null->0]'],
            moves: ['1[0->1]', '0[1->2]']
          }));
        }));
        it('should handle swapping element', (function() {
          l = [1, 2];
          changes.check(l);
          ListWrapper.clear(l);
          ListWrapper.push(l, 2);
          ListWrapper.push(l, 1);
          changes.check(l);
          expect(changes.toString()).toEqual(arrayChangesAsString({
            collection: ['2[1->0]', '1[0->1]'],
            previous: ['1[0->1]', '2[1->0]'],
            moves: ['2[1->0]', '1[0->1]']
          }));
        }));
        it('should handle swapping element', (function() {
          l = ['a', 'b', 'c'];
          changes.check(l);
          ListWrapper.removeAt(l, 1);
          ListWrapper.insert(l, 0, 'b');
          changes.check(l);
          expect(changes.toString()).toEqual(arrayChangesAsString({
            collection: ['b[1->0]', 'a[0->1]', 'c'],
            previous: ['a[0->1]', 'b[1->0]', 'c'],
            moves: ['b[1->0]', 'a[0->1]']
          }));
          ListWrapper.removeAt(l, 1);
          ListWrapper.push(l, 'a');
          changes.check(l);
          expect(changes.toString()).toEqual(arrayChangesAsString({
            collection: ['b', 'c[2->1]', 'a[1->2]'],
            previous: ['b', 'a[1->2]', 'c[2->1]'],
            moves: ['c[2->1]', 'a[1->2]']
          }));
        }));
        it('should detect changes in list', (function() {
          l = [];
          changes.check(l);
          ListWrapper.push(l, 'a');
          changes.check(l);
          expect(changes.toString()).toEqual(arrayChangesAsString({
            collection: ['a[null->0]'],
            additions: ['a[null->0]']
          }));
          ListWrapper.push(l, 'b');
          changes.check(l);
          expect(changes.toString()).toEqual(arrayChangesAsString({
            collection: ['a', 'b[null->1]'],
            previous: ['a'],
            additions: ['b[null->1]']
          }));
          ListWrapper.push(l, 'c');
          ListWrapper.push(l, 'd');
          changes.check(l);
          expect(changes.toString()).toEqual(arrayChangesAsString({
            collection: ['a', 'b', 'c[null->2]', 'd[null->3]'],
            previous: ['a', 'b'],
            additions: ['c[null->2]', 'd[null->3]']
          }));
          ListWrapper.removeAt(l, 2);
          changes.check(l);
          expect(changes.toString()).toEqual(arrayChangesAsString({
            collection: ['a', 'b', 'd[3->2]'],
            previous: ['a', 'b', 'c[2->null]', 'd[3->2]'],
            moves: ['d[3->2]'],
            removals: ['c[2->null]']
          }));
          ListWrapper.clear(l);
          ListWrapper.push(l, 'd');
          ListWrapper.push(l, 'c');
          ListWrapper.push(l, 'b');
          ListWrapper.push(l, 'a');
          changes.check(l);
          expect(changes.toString()).toEqual(arrayChangesAsString({
            collection: ['d[2->0]', 'c[null->1]', 'b[1->2]', 'a[0->3]'],
            previous: ['a[0->3]', 'b[1->2]', 'd[2->0]'],
            additions: ['c[null->1]'],
            moves: ['d[2->0]', 'b[1->2]', 'a[0->3]']
          }));
        }));
        it('should test string by value rather than by reference (Dart)', (function() {
          l = ['a', 'boo'];
          changes.check(l);
          var b = 'b';
          var oo = 'oo';
          ListWrapper.set(l, 1, b + oo);
          changes.check(l);
          expect(changes.toString()).toEqual(arrayChangesAsString({
            collection: ['a', 'boo'],
            previous: ['a', 'boo']
          }));
        }));
        it('should ignore [NaN] != [NaN] (JS)', (function() {
          l = [NumberWrapper.NaN];
          changes.check(l);
          changes.check(l);
          expect(changes.toString()).toEqual(arrayChangesAsString({
            collection: [NumberWrapper.NaN],
            previous: [NumberWrapper.NaN]
          }));
        }));
        it('should detect [NaN] moves', (function() {
          l = [NumberWrapper.NaN, NumberWrapper.NaN];
          changes.check(l);
          ListWrapper.insert(l, 0, 'foo');
          changes.check(l);
          expect(changes.toString()).toEqual(arrayChangesAsString({
            collection: ['foo[null->0]', 'NaN[0->1]', 'NaN[1->2]'],
            previous: ['NaN[0->1]', 'NaN[1->2]'],
            additions: ['foo[null->0]'],
            moves: ['NaN[0->1]', 'NaN[1->2]']
          }));
        }));
        it('should remove and add same item', (function() {
          l = ['a', 'b', 'c'];
          changes.check(l);
          ListWrapper.removeAt(l, 1);
          changes.check(l);
          expect(changes.toString()).toEqual(arrayChangesAsString({
            collection: ['a', 'c[2->1]'],
            previous: ['a', 'b[1->null]', 'c[2->1]'],
            moves: ['c[2->1]'],
            removals: ['b[1->null]']
          }));
          ListWrapper.insert(l, 1, 'b');
          changes.check(l);
          expect(changes.toString()).toEqual(arrayChangesAsString({
            collection: ['a', 'b[null->1]', 'c[1->2]'],
            previous: ['a', 'c[1->2]'],
            additions: ['b[null->1]'],
            moves: ['c[1->2]']
          }));
        }));
        it('should support duplicates', (function() {
          l = ['a', 'a', 'a', 'b', 'b'];
          changes.check(l);
          ListWrapper.removeAt(l, 0);
          changes.check(l);
          expect(changes.toString()).toEqual(arrayChangesAsString({
            collection: ['a', 'a', 'b[3->2]', 'b[4->3]'],
            previous: ['a', 'a', 'a[2->null]', 'b[3->2]', 'b[4->3]'],
            moves: ['b[3->2]', 'b[4->3]'],
            removals: ['a[2->null]']
          }));
        }));
        it('should support insertions/moves', (function() {
          l = ['a', 'a', 'b', 'b'];
          changes.check(l);
          ListWrapper.insert(l, 0, 'b');
          changes.check(l);
          expect(changes.toString()).toEqual(arrayChangesAsString({
            collection: ['b[2->0]', 'a[0->1]', 'a[1->2]', 'b', 'b[null->4]'],
            previous: ['a[0->1]', 'a[1->2]', 'b[2->0]', 'b'],
            additions: ['b[null->4]'],
            moves: ['b[2->0]', 'a[0->1]', 'a[1->2]']
          }));
        }));
        it('should not report unnecessary moves', (function() {
          l = ['a', 'b', 'c'];
          changes.check(l);
          ListWrapper.clear(l);
          ListWrapper.push(l, 'b');
          ListWrapper.push(l, 'a');
          ListWrapper.push(l, 'c');
          changes.check(l);
          expect(changes.toString()).toEqual(arrayChangesAsString({
            collection: ['b[1->0]', 'a[0->1]', 'c'],
            previous: ['a[0->1]', 'b[1->0]', 'c'],
            moves: ['b[1->0]', 'a[0->1]']
          }));
        }));
      });
    });
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      describe = $__m.describe;
      it = $__m.it;
      iit = $__m.iit;
      xit = $__m.xit;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
      afterEach = $__m.afterEach;
    }, function($__m) {
      ArrayChanges = $__m.ArrayChanges;
    }, function($__m) {
      NumberWrapper = $__m.NumberWrapper;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      TestIterable = $__m.TestIterable;
    }, function($__m) {
      arrayChangesAsString = $__m.arrayChangesAsString;
    }],
    execute: function() {
    }
  };
});

//# sourceMappingURL=angular2/test/change_detection/array_changes_spec.map

//# sourceMappingURL=../../../angular2/test/change_detection/array_changes_spec.js.map