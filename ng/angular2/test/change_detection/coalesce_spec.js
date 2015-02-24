System.register(["angular2/test_lib", "angular2/src/change_detection/coalesce", "angular2/src/change_detection/proto_change_detector"], function($__export) {
  "use strict";
  var ddescribe,
      describe,
      it,
      iit,
      xit,
      expect,
      beforeEach,
      afterEach,
      coalesce,
      RECORD_TYPE_SELF,
      ProtoRecord;
  function main() {
    function r(funcOrValue, args, contextIndex, selfIndex) {
      var lastInBinding = arguments[4] !== (void 0) ? arguments[4] : false;
      return new ProtoRecord(99, "name", funcOrValue, args, null, contextIndex, selfIndex, null, null, null, lastInBinding, false);
    }
    describe("change detection - coalesce", (function() {
      it("should work with an empty list", (function() {
        expect(coalesce([])).toEqual([]);
      }));
      it("should remove non-terminal duplicate records" + " and update the context indices referencing them", (function() {
        var rs = coalesce([r("user", [], 0, 1), r("first", [], 1, 2), r("user", [], 0, 3), r("last", [], 3, 4)]);
        expect(rs).toEqual([r("user", [], 0, 1), r("first", [], 1, 2), r("last", [], 1, 3)]);
      }));
      it("should update indices of other records", (function() {
        var rs = coalesce([r("dup", [], 0, 1), r("dup", [], 0, 2), r("user", [], 0, 3), r("first", [3], 3, 4)]);
        expect(rs).toEqual([r("dup", [], 0, 1), r("user", [], 0, 2), r("first", [2], 2, 3)]);
      }));
      it("should remove non-terminal duplicate records" + " and update the args indices referencing them", (function() {
        var rs = coalesce([r("user1", [], 0, 1), r("user2", [], 0, 2), r("hi", [1], 0, 3), r("hi", [1], 0, 4), r("hi", [2], 0, 5)]);
        expect(rs).toEqual([r("user1", [], 0, 1), r("user2", [], 0, 2), r("hi", [1], 0, 3), r("hi", [2], 0, 4)]);
      }));
      it("should replace duplicate terminal records with" + " self records", (function() {
        var rs = coalesce([r("user", [], 0, 1, true), r("user", [], 0, 2, true)]);
        expect(rs[1]).toEqual(new ProtoRecord(RECORD_TYPE_SELF, "self", null, [], null, 1, 2, null, null, null, true, false));
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      ddescribe = $__m.ddescribe;
      describe = $__m.describe;
      it = $__m.it;
      iit = $__m.iit;
      xit = $__m.xit;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
      afterEach = $__m.afterEach;
    }, function($__m) {
      coalesce = $__m.coalesce;
    }, function($__m) {
      RECORD_TYPE_SELF = $__m.RECORD_TYPE_SELF;
      ProtoRecord = $__m.ProtoRecord;
    }],
    execute: function() {
    }
  };
});

//# sourceMappingURL=angular2/test/change_detection/coalesce_spec.map

//# sourceMappingURL=../../../angular2/test/change_detection/coalesce_spec.js.map