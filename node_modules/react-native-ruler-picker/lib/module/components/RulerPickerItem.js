/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
export const RulerPickerItem = /*#__PURE__*/React.memo(_ref => {
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
  return /*#__PURE__*/React.createElement(View, {
    style: [{
      width: stepWidth,
      height: '100%',
      justifyContent: 'center',
      marginRight: isLast ? 0 : gapBetweenSteps,
      marginTop: shortStepHeight
    }]
  }, /*#__PURE__*/React.createElement(View, {
    style: [{
      width: '100%',
      height: height,
      backgroundColor: isLong ? longStepColor : shortStepColor,
      marginTop: isLong ? 0 : shortStepHeight
    }]
  }));
});
//# sourceMappingURL=RulerPickerItem.js.map