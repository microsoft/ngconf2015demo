System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/math", "angular2/src/facade/async", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var assert,
      int,
      Math,
      PromiseWrapper,
      ListWrapper,
      MapWrapper,
      ITEMS,
      ITEM_HEIGHT,
      VISIBLE_ITEMS,
      HEIGHT,
      VIEW_PORT_HEIGHT,
      COMPANY_NAME_WIDTH,
      OPPORTUNITY_NAME_WIDTH,
      OFFERING_NAME_WIDTH,
      ACCOUNT_CELL_WIDTH,
      BASE_POINTS_WIDTH,
      KICKER_POINTS_WIDTH,
      STAGE_BUTTONS_WIDTH,
      BUNDLES_WIDTH,
      DUE_DATE_WIDTH,
      END_DATE_WIDTH,
      AAT_STATUS_WIDTH,
      ROW_WIDTH,
      STATUS_LIST,
      AAT_STATUS_LIST,
      CustomDate,
      RawEntity,
      Company,
      Offering,
      Opportunity,
      Account;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      int = $__m.int;
    }, function($__m) {
      Math = $__m.Math;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
    }],
    execute: function() {
      ITEMS = $__export("ITEMS", 1000);
      ITEM_HEIGHT = $__export("ITEM_HEIGHT", 40);
      VISIBLE_ITEMS = $__export("VISIBLE_ITEMS", 17);
      HEIGHT = $__export("HEIGHT", ITEMS * ITEM_HEIGHT);
      VIEW_PORT_HEIGHT = $__export("VIEW_PORT_HEIGHT", ITEM_HEIGHT * VISIBLE_ITEMS);
      COMPANY_NAME_WIDTH = $__export("COMPANY_NAME_WIDTH", 100);
      OPPORTUNITY_NAME_WIDTH = $__export("OPPORTUNITY_NAME_WIDTH", 100);
      OFFERING_NAME_WIDTH = $__export("OFFERING_NAME_WIDTH", 100);
      ACCOUNT_CELL_WIDTH = $__export("ACCOUNT_CELL_WIDTH", 50);
      BASE_POINTS_WIDTH = $__export("BASE_POINTS_WIDTH", 50);
      KICKER_POINTS_WIDTH = $__export("KICKER_POINTS_WIDTH", 50);
      STAGE_BUTTONS_WIDTH = $__export("STAGE_BUTTONS_WIDTH", 220);
      BUNDLES_WIDTH = $__export("BUNDLES_WIDTH", 120);
      DUE_DATE_WIDTH = $__export("DUE_DATE_WIDTH", 100);
      END_DATE_WIDTH = $__export("END_DATE_WIDTH", 100);
      AAT_STATUS_WIDTH = $__export("AAT_STATUS_WIDTH", 100);
      ROW_WIDTH = $__export("ROW_WIDTH", COMPANY_NAME_WIDTH + OPPORTUNITY_NAME_WIDTH + OFFERING_NAME_WIDTH + ACCOUNT_CELL_WIDTH + BASE_POINTS_WIDTH + KICKER_POINTS_WIDTH + STAGE_BUTTONS_WIDTH + BUNDLES_WIDTH + DUE_DATE_WIDTH + END_DATE_WIDTH + AAT_STATUS_WIDTH);
      STATUS_LIST = $__export("STATUS_LIST", ['Planned', 'Pitched', 'Won', 'Lost']);
      AAT_STATUS_LIST = $__export("AAT_STATUS_LIST", ['Active', 'Passive', 'Abandoned']);
      CustomDate = $__export("CustomDate", (function() {
        var CustomDate = function CustomDate(y, m, d) {
          assert.argumentTypes(y, int, m, int, d, int);
          this.year = y;
          this.month = m;
          this.day = d;
        };
        return ($traceurRuntime.createClass)(CustomDate, {addDays: function(days) {
            assert.argumentTypes(days, int);
            var newDay = this.day + days;
            var newMonth = this.month + Math.floor(newDay / 30);
            newDay = newDay % 30;
            var newYear = this.year + Math.floor(newMonth / 12);
            return assert.returnType((new CustomDate(newYear, newMonth, newDay)), CustomDate);
          }}, {now: function() {
            return assert.returnType((new CustomDate(2014, 1, 28)), CustomDate);
          }});
      }()));
      Object.defineProperty(CustomDate, "parameters", {get: function() {
          return [[int], [int], [int]];
        }});
      Object.defineProperty(CustomDate.prototype.addDays, "parameters", {get: function() {
          return [[int]];
        }});
      RawEntity = $__export("RawEntity", (function() {
        var RawEntity = function RawEntity() {
          this._data = MapWrapper.create();
        };
        return ($traceurRuntime.createClass)(RawEntity, {
          get: function(key) {
            assert.argumentTypes(key, assert.type.string);
            if (key.indexOf('.') == -1) {
              return this._data[key];
            }
            var pieces = key.split('.');
            var last = ListWrapper.last(pieces);
            pieces.length = pieces.length - 1;
            var target = _resolve(pieces, this);
            if (target == null) {
              return null;
            }
            return target[last];
          },
          set: function(key, value) {
            assert.argumentTypes(key, assert.type.string, value, assert.type.any);
            if (key.indexOf('.') == -1) {
              this._data[key] = value;
              return ;
            }
            var pieces = key.split('.');
            var last = ListWrapper.last(pieces);
            pieces.length = pieces.length - 1;
            var target = _resolve(pieces, this);
            target[last] = value;
          },
          remove: function(key) {
            assert.argumentTypes(key, assert.type.string);
            if (!key.contains('.')) {
              return this._data.remove(key);
            }
            var pieces = key.split('.');
            var last = ListWrapper.last(pieces);
            pieces.length = pieces.length - 1;
            var target = _resolve(pieces, this);
            return target.remove(last);
          },
          _resolve: function(pieces, start) {
            var cur = start;
            for (var i = 0; i < pieces.length; i++) {
              cur = cur[pieces[i]];
              if (cur == null) {
                return null;
              }
            }
            return cur;
          }
        }, {});
      }()));
      Object.defineProperty(RawEntity.prototype.get, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(RawEntity.prototype.set, "parameters", {get: function() {
          return [[assert.type.string], []];
        }});
      Object.defineProperty(RawEntity.prototype.remove, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Company = $__export("Company", (function($__super) {
        var Company = function Company() {
          $traceurRuntime.superConstructor(Company).apply(this, arguments);
        };
        return ($traceurRuntime.createClass)(Company, {
          get name() {
            return assert.returnType((this.get('name')), assert.type.string);
          },
          set name(val) {
            assert.argumentTypes(val, assert.type.string);
            this.set('name', val);
          }
        }, {}, $__super);
      }(RawEntity)));
      Object.defineProperty(Object.getOwnPropertyDescriptor(Company.prototype, "name").set, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Offering = $__export("Offering", (function($__super) {
        var Offering = function Offering() {
          $traceurRuntime.superConstructor(Offering).apply(this, arguments);
        };
        return ($traceurRuntime.createClass)(Offering, {
          get name() {
            return assert.returnType((this.get('name')), assert.type.string);
          },
          set name(val) {
            assert.argumentTypes(val, assert.type.string);
            this.set('name', val);
          },
          get company() {
            return assert.returnType((this.get('company')), Company);
          },
          set company(val) {
            assert.argumentTypes(val, Company);
            this.set('company', val);
          },
          get opportunity() {
            return assert.returnType((this.get('opportunity')), Opportunity);
          },
          set opportunity(val) {
            assert.argumentTypes(val, Opportunity);
            this.set('opportunity', val);
          },
          get account() {
            return assert.returnType((this.get('account')), Account);
          },
          set account(val) {
            assert.argumentTypes(val, Account);
            this.set('account', val);
          },
          get basePoints() {
            return assert.returnType((this.get('basePoints')), int);
          },
          set basePoints(val) {
            assert.argumentTypes(val, int);
            this.set('basePoints', val);
          },
          get kickerPoints() {
            return assert.returnType((this.get('kickerPoints')), int);
          },
          set kickerPoints(val) {
            assert.argumentTypes(val, int);
            this.set('kickerPoints', val);
          },
          get status() {
            return assert.returnType((this.get('status')), assert.type.string);
          },
          set status(val) {
            assert.argumentTypes(val, assert.type.string);
            this.set('status', val);
          },
          get bundles() {
            return assert.returnType((this.get('bundles')), assert.type.string);
          },
          set bundles(val) {
            assert.argumentTypes(val, assert.type.string);
            this.set('bundles', val);
          },
          get dueDate() {
            return assert.returnType((this.get('dueDate')), CustomDate);
          },
          set dueDate(val) {
            assert.argumentTypes(val, CustomDate);
            this.set('dueDate', val);
          },
          get endDate() {
            return assert.returnType((this.get('endDate')), CustomDate);
          },
          set endDate(val) {
            assert.argumentTypes(val, CustomDate);
            this.set('endDate', val);
          },
          get aatStatus() {
            return assert.returnType((this.get('aatStatus')), assert.type.string);
          },
          set aatStatus(val) {
            assert.argumentTypes(val, assert.type.string);
            this.set('aatStatus', val);
          }
        }, {}, $__super);
      }(RawEntity)));
      Object.defineProperty(Object.getOwnPropertyDescriptor(Offering.prototype, "name").set, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(Object.getOwnPropertyDescriptor(Offering.prototype, "company").set, "parameters", {get: function() {
          return [[Company]];
        }});
      Object.defineProperty(Object.getOwnPropertyDescriptor(Offering.prototype, "opportunity").set, "parameters", {get: function() {
          return [[Opportunity]];
        }});
      Object.defineProperty(Object.getOwnPropertyDescriptor(Offering.prototype, "account").set, "parameters", {get: function() {
          return [[Account]];
        }});
      Object.defineProperty(Object.getOwnPropertyDescriptor(Offering.prototype, "basePoints").set, "parameters", {get: function() {
          return [[int]];
        }});
      Object.defineProperty(Object.getOwnPropertyDescriptor(Offering.prototype, "kickerPoints").set, "parameters", {get: function() {
          return [[int]];
        }});
      Object.defineProperty(Object.getOwnPropertyDescriptor(Offering.prototype, "status").set, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(Object.getOwnPropertyDescriptor(Offering.prototype, "bundles").set, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(Object.getOwnPropertyDescriptor(Offering.prototype, "dueDate").set, "parameters", {get: function() {
          return [[CustomDate]];
        }});
      Object.defineProperty(Object.getOwnPropertyDescriptor(Offering.prototype, "endDate").set, "parameters", {get: function() {
          return [[CustomDate]];
        }});
      Object.defineProperty(Object.getOwnPropertyDescriptor(Offering.prototype, "aatStatus").set, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Opportunity = $__export("Opportunity", (function($__super) {
        var Opportunity = function Opportunity() {
          $traceurRuntime.superConstructor(Opportunity).apply(this, arguments);
        };
        return ($traceurRuntime.createClass)(Opportunity, {
          get name() {
            return assert.returnType((this.get('name')), assert.type.string);
          },
          set name(val) {
            assert.argumentTypes(val, assert.type.string);
            this.set('name', val);
          }
        }, {}, $__super);
      }(RawEntity)));
      Object.defineProperty(Object.getOwnPropertyDescriptor(Opportunity.prototype, "name").set, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Account = $__export("Account", (function($__super) {
        var Account = function Account() {
          $traceurRuntime.superConstructor(Account).apply(this, arguments);
        };
        return ($traceurRuntime.createClass)(Account, {
          get accountId() {
            return assert.returnType((this.get('accountId')), int);
          },
          set accountId(val) {
            assert.argumentTypes(val, int);
            this.set('accountId', val);
          }
        }, {}, $__super);
      }(RawEntity)));
      Object.defineProperty(Object.getOwnPropertyDescriptor(Account.prototype, "accountId").set, "parameters", {get: function() {
          return [[int]];
        }});
    }
  };
});

//# sourceMappingURL=benchmarks/src/naive_infinite_scroll/common.map

//# sourceMappingURL=../../../benchmarks/src/naive_infinite_scroll/common.js.map