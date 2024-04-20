"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _calculations = require("./calculations");
Object.keys(_calculations).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _calculations[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _calculations[key];
    }
  });
});
//# sourceMappingURL=index.js.map