"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateCurrentValue = void 0;
const calculateCurrentValue = (scrollPosition, stepWidth, gapBetweenItems, min, max, step, fractionDigits) => {
  const index = Math.round(scrollPosition / (stepWidth + gapBetweenItems));
  return Math.min(Math.max(index * step + min, min), max).toFixed(fractionDigits);
};
exports.calculateCurrentValue = calculateCurrentValue;
//# sourceMappingURL=calculations.js.map