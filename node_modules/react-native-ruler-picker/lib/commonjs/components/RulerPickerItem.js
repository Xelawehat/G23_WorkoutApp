"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RulerPickerItem = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable react-native/no-inline-styles */

const RulerPickerItem = /*#__PURE__*/_react.default.memo(_ref => {
  let {
    isLast,
    index,
    gapBetweenSteps,
    shortStepHeight,
    longStepHeight,
    stepWidth,
    shortStepColor,
    longStepColor
  } = _ref;
  const isLong = index % 10 === 0;
  const height = isLong ? longStepHeight : shortStepHeight;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [{
      width: stepWidth,
      height: '100%',
      justifyContent: 'center',
      marginRight: isLast ? 0 : gapBetweenSteps,
      marginTop: shortStepHeight
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [{
      width: '100%',
      height: height,
      backgroundColor: isLong ? longStepColor : shortStepColor,
      marginTop: isLong ? 0 : shortStepHeight
    }]
  }));
});
exports.RulerPickerItem = RulerPickerItem;
//# sourceMappingURL=RulerPickerItem.js.map