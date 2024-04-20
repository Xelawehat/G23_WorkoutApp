export const calculateCurrentValue = (scrollPosition, stepWidth, gapBetweenItems, min, max, step, fractionDigits) => {
  const index = Math.round(scrollPosition / (stepWidth + gapBetweenItems));
  return Math.min(Math.max(index * step + min, min), max).toFixed(fractionDigits);
};
//# sourceMappingURL=calculations.js.map