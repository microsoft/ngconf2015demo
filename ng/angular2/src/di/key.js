System.register(["rtts_assert/rtts_assert", "./exceptions", "angular2/src/facade/collection", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var assert,
      KeyMetadataError,
      MapWrapper,
      Map,
      FIELD,
      int,
      isPresent,
      Key,
      KeyRegistry,
      _globalKeyRegistry;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      KeyMetadataError = $__m.KeyMetadataError;
    }, function($__m) {
      MapWrapper = $__m.MapWrapper;
      Map = $__m.Map;
    }, function($__m) {
      FIELD = $__m.FIELD;
      int = $__m.int;
      isPresent = $__m.isPresent;
    }],
    execute: function() {
      Key = $__export("Key", (function() {
        var Key = function Key(token, id) {
          assert.argumentTypes(token, assert.type.any, id, int);
          this.token = token;
          this.id = id;
          this.metadata = null;
        };
        return ($traceurRuntime.createClass)(Key, {}, {
          setMetadata: function(key, metadata) {
            assert.argumentTypes(key, Key, metadata, assert.type.any);
            if (isPresent(key.metadata) && key.metadata !== metadata) {
              throw new KeyMetadataError();
            }
            key.metadata = metadata;
            return assert.returnType((key), Key);
          },
          get: function(token) {
            return assert.returnType((_globalKeyRegistry.get(token)), Key);
          },
          get numberOfKeys() {
            return assert.returnType((_globalKeyRegistry.numberOfKeys), int);
          }
        });
      }()));
      Object.defineProperty(Key, "parameters", {get: function() {
          return [[], [int]];
        }});
      Object.defineProperty(Key.setMetadata, "parameters", {get: function() {
          return [[Key], []];
        }});
      KeyRegistry = $__export("KeyRegistry", (function() {
        var KeyRegistry = function KeyRegistry() {
          this._allKeys = MapWrapper.create();
        };
        return ($traceurRuntime.createClass)(KeyRegistry, {
          get: function(token) {
            if (token instanceof Key)
              return assert.returnType((token), Key);
            if (MapWrapper.contains(this._allKeys, token)) {
              return assert.returnType((MapWrapper.get(this._allKeys, token)), Key);
            }
            var newKey = new Key(token, Key.numberOfKeys);
            MapWrapper.set(this._allKeys, token, newKey);
            return assert.returnType((newKey), Key);
          },
          get numberOfKeys() {
            return assert.returnType((MapWrapper.size(this._allKeys)), int);
          }
        }, {});
      }()));
      _globalKeyRegistry = new KeyRegistry();
    }
  };
});

//# sourceMappingURL=angular2/src/di/key.map

//# sourceMappingURL=../../../angular2/src/di/key.js.map