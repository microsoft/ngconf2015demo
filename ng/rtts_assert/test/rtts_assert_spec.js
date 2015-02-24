System.register(["rtts_assert/rtts_assert"], function($__export) {
  "use strict";
  var assert;
  function main() {
    describe('basic type check', function() {
      var Type = function Type() {};
      ($traceurRuntime.createClass)(Type, {}, {});
      it('should pass', function() {
        assert.type(new Type(), Type);
      });
      it('should fail', function() {
        expect((function() {
          return assert.type(123, Type);
        })).toThrowError('Expected an instance of Type, got 123!');
      });
      it('should allow null', function() {
        assert.type(null, Type);
      });
    });
    describe('custom check', function() {
      var Type = function Type() {};
      ($traceurRuntime.createClass)(Type, {}, {});
      it('should pass when returns true', function() {
        Type.assert = function(value) {
          return true;
        };
        assert.type({}, Type);
      });
      it('should fail when returns false', function() {
        Type.assert = function(value) {
          return false;
        };
        expect((function() {
          return assert.type({}, Type);
        })).toThrowError('Expected an instance of Type, got {}!');
      });
      it('should fail when calls assert.fail()', function() {
        Type.assert = function(value) {
          assert.fail('not smart enough');
          assert.fail('not blue enough');
        };
        expect((function() {
          return assert.type({}, Type);
        })).toThrowError('Expected an instance of Type, got {}!\n' + '  - not smart enough\n' + '  - not blue enough');
      });
      it('should fail when throws an exception', function() {
        Type.assert = function(value) {
          throw new Error('not long enough');
        };
        expect(function() {
          assert.type(12345, Type);
        }).toThrowError('Expected an instance of Type, got 12345!\n' + '  - not long enough');
      });
    });
    describe('primitive value check', function() {
      var primitive = $traceurRuntime.type;
      describe('string', function() {
        it('should pass', function() {
          assert.type('xxx', primitive.string);
        });
        it('should fail', function() {
          expect((function() {
            return assert.type(12345, primitive.string);
          })).toThrowError('Expected an instance of string, got 12345!');
        });
        it('should allow null', function() {
          assert.type(null, primitive.string);
        });
      });
      describe('number', function() {
        it('should pass', function() {
          assert.type(123, primitive.number);
        });
        it('should fail', function() {
          expect((function() {
            return assert.type(false, primitive.number);
          })).toThrowError('Expected an instance of number, got false!');
        });
        it('should allow null', function() {
          assert.type(null, primitive.number);
        });
      });
      describe('boolean', function() {
        it('should pass', function() {
          expect(assert.type(true, primitive.boolean)).toBe(true);
          expect(assert.type(false, primitive.boolean)).toBe(false);
        });
        it('should fail', function() {
          expect((function() {
            return assert.type(123, primitive.boolean);
          })).toThrowError('Expected an instance of boolean, got 123!');
        });
        it('should allow null', function() {
          assert.type(null, primitive.boolean);
        });
      });
    });
    describe('define', function() {
      it('should define assert for an existing type', function() {
        var Type = function Type() {};
        ($traceurRuntime.createClass)(Type, {}, {});
        assert.define(Type, function(value) {
          assert(value).is(Function, Object);
        });
        assert.type({}, Type);
        assert.type(function() {}, Type);
        expect((function() {
          return assert.type('str', Type);
        })).toThrowError('Expected an instance of Type, got "str"!\n' + '  - "str" is not instance of Function\n' + '  - "str" is not instance of Object');
      });
      it('should define an interface', function() {
        var User = assert.define('MyUser', function(user) {
          assert(user).is(Object);
        });
        assert.type({}, User);
        expect((function() {
          return assert.type(12345, User);
        })).toThrowError('Expected an instance of MyUser, got 12345!\n' + '  - 12345 is not instance of Object');
      });
      describe('arrayOf', function() {
        var Titles = assert.define('ListOfTitles', function(value) {
          assert(value).is(assert.arrayOf(assert.string, assert.number));
        });
        it('should pass', function() {
          assert.type(['one', 55, 'two'], Titles);
        });
        it('should fail when non-array given', function() {
          expect((function() {
            return assert.type('foo', Titles);
          })).toThrowError('Expected an instance of ListOfTitles, got "foo"!\n' + '  - "foo" is not instance of array of string/number\n' + '    - "foo" is not instance of Array');
        });
        it('should fail when an invalid item in the array', function() {
          expect((function() {
            return assert.type(['aaa', true], Titles);
          })).toThrowError('Expected an instance of ListOfTitles, got ["aaa", true]!\n' + '  - ["aaa", true] is not instance of array of string/number\n' + '    - true is not instance of string\n' + '    - true is not instance of number');
        });
      });
      describe('structure', function() {
        var User = assert.define('MyUser', function(value) {
          assert(value).is(assert.structure({
            name: assert.string,
            age: assert.number
          }));
        });
        it('should pass', function() {
          assert.type({
            name: 'Vojta',
            age: 28
          }, User);
        });
        it('should fail when non-object given', function() {
          expect((function() {
            return assert.type(123, User);
          })).toThrowError('Expected an instance of MyUser, got 123!\n' + '  - 123 is not instance of object with properties name, age\n' + '    - 123 is not instance of Object');
        });
        it('should fail when an invalid property', function() {
          expect((function() {
            return assert.type({
              name: 'Vojta',
              age: true
            }, User);
          })).toThrowError('Expected an instance of MyUser, got {name: "Vojta", age: true}!\n' + '  - {name: "Vojta", age: true} is not instance of object with properties name, age\n' + '    - true is not instance of number');
        });
      });
    });
    describe('Traceur', function() {
      describe('arguments', function() {
        function reverse(str) {
          assert.argumentTypes(str, assert.type.string);
          return str ? reverse(str.substring(1)) + str[0] : '';
        }
        Object.defineProperty(reverse, "parameters", {get: function() {
            return [[assert.type.string]];
          }});
        it('should pass', function() {
          expect(reverse('angular')).toBe('ralugna');
        });
        it('should fail', function() {
          expect((function() {
            return reverse(123);
          })).toThrowError('Invalid arguments given!\n' + '  - 1st argument has to be an instance of string, got 123');
        });
      });
      describe('return value', function() {
        function foo(bar) {
          return assert.returnType((bar), assert.type.number);
        }
        it('should pass', function() {
          expect(foo(123)).toBe(123);
        });
        it('should fail', function() {
          expect((function() {
            return foo('bar');
          })).toThrowError('Expected to return an instance of number, got "bar"!');
        });
      });
      describe('variables', function() {
        it('should pass', function() {
          var count = assert.type(1, assert.type.number);
        });
        it('should fail', function() {
          expect((function() {
            var count = assert.type(true, assert.type.number);
          })).toThrowError('Expected an instance of number, got true!');
        });
      });
      describe('void', function() {
        function foo(bar) {
          return assert.returnType((bar), assert.type.void);
        }
        it('should pass when not defined', function() {
          function nonReturn() {}
          function returnNothing() {
            return ;
          }
          function returnUndefined() {
            return assert.returnType((undefined), assert.type.void);
          }
          foo();
          foo(undefined);
          nonReturn();
          returnNothing();
          returnUndefined();
        });
        it('should fail when a value returned', function() {
          expect((function() {
            return foo('bar');
          })).toThrowError('Expected to return an instance of void, got "bar"!');
        });
        it('should fail when null returned', function() {
          expect((function() {
            return foo(null);
          })).toThrowError('Expected to return an instance of void, got null!');
        });
      });
      describe('generics', function() {
        it('should pass', function() {
          var list = assert.type([], assert.genericType(Array, assert.type.string));
        });
      });
    });
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }],
    execute: function() {
    }
  };
});

//# sourceMappingURL=rtts_assert/test/rtts_assert_spec.map

//# sourceMappingURL=../../rtts_assert/test/rtts_assert_spec.js.map