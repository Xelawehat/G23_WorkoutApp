import React, { useCallback, useEffect, useRef } from 'react';
import { Dimensions, StyleSheet, View, Text, Animated, TextInput } from 'react-native';
import { AnimatedFlashList } from '@shopify/flash-list';
import { RulerPickerItem } from './RulerPickerItem';
import { calculateCurrentValue } from '../utils/';
const {
  width: windowWidth
} = Dimensions.get('window');
export const RulerPicker = _ref => {
  let {
    width = windowWidth,
    height = 500,
    min,
    max,
    step = 1,
    initialValue = min,
    fractionDigits = 1,
    unit = 'cm',
    indicatorHeight = 80,
    gapBetweenSteps = 10,
    shortStepHeight = 20,
    longStepHeight = 40,
    stepWidth = 2,
    indicatorColor = 'black',
    shortStepColor = 'lightgray',
    longStepColor = 'darkgray',
    valueTextStyle,
    unitTextStyle,
    decelerationRate = 'normal',
    onValueChange,
    onValueChangeEnd
  } = _ref;
  const itemAmount = (max - min) / step;
  const arrData = Array.from({
    length: itemAmount + 1
  }, (_, index) => index);
  const listRef = useRef(null);
  const stepTextRef = useRef(null);
  const prevValue = useRef(initialValue.toFixed(fractionDigits));
  const prevMomentumValue = useRef(initialValue.toFixed(fractionDigits));
  const scrollPosition = useRef(new Animated.Value(0)).current;
  const valueCallback = useCallback(_ref2 => {
    let {
      value
    } = _ref2;
    const newStep = calculateCurrentValue(value, stepWidth, gapBetweenSteps, min, max, step, fractionDigits);
    if (prevValue.current !== newStep) {
      var _stepTextRef$current;
      onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(newStep);
      (_stepTextRef$current = stepTextRef.current) === null || _stepTextRef$current === void 0 ? void 0 : _stepTextRef$current.setNativeProps({
        text: newStep
      });
    }
    prevValue.current = newStep;
  }, [fractionDigits, gapBetweenSteps, stepWidth, max, min, onValueChange, step]);
  useEffect(() => {
    scrollPosition.addListener(valueCallback);
    return () => {
      scrollPosition.removeAllListeners();
    };
  }, [scrollPosition, valueCallback]);
  const scrollHandler = Animated.event([{
    nativeEvent: {
      contentOffset: {
        x: scrollPosition
      }
    }
  }], {
    useNativeDriver: true
  });
  const renderSeparator = useCallback(() => /*#__PURE__*/React.createElement(View, {
    style: {
      width: width * 0.5 - stepWidth * 0.5
    }
  }), [stepWidth, width]);
  const renderItem = useCallback(_ref3 => {
    let {
      index
    } = _ref3;
    return /*#__PURE__*/React.createElement(RulerPickerItem, {
      isLast: index === arrData.length - 1,
      index: index,
      shortStepHeight: shortStepHeight,
      longStepHeight: longStepHeight,
      gapBetweenSteps: gapBetweenSteps,
      stepWidth: stepWidth,
      shortStepColor: shortStepColor,
      longStepColor: longStepColor
    });
  }, [arrData.length, gapBetweenSteps, stepWidth, longStepColor, longStepHeight, shortStepColor, shortStepHeight]);
  const onMomentumScrollEnd = useCallback(event => {
    const newStep = calculateCurrentValue(event.nativeEvent.contentOffset.x || event.nativeEvent.contentOffset.y, stepWidth, gapBetweenSteps, min, max, step, fractionDigits);
    if (prevMomentumValue.current !== newStep) {
      onValueChangeEnd === null || onValueChangeEnd === void 0 ? void 0 : onValueChangeEnd(newStep);
    }
    prevMomentumValue.current = newStep;
  }, [fractionDigits, gapBetweenSteps, stepWidth, max, min, onValueChangeEnd, step]);
  function onContentSizeChange() {
    var _listRef$current;
    const initialIndex = Math.floor((initialValue - min) / step);
    (_listRef$current = listRef.current) === null || _listRef$current === void 0 ? void 0 : _listRef$current.scrollToOffset({
      offset: initialIndex * (stepWidth + gapBetweenSteps),
      animated: false
    });
  }
  return /*#__PURE__*/React.createElement(View, {
    style: {
      width,
      height
    }
  }, /*#__PURE__*/React.createElement(AnimatedFlashList, {
    ref: listRef,
    data: arrData,
    keyExtractor: (_, index) => index.toString(),
    renderItem: renderItem,
    ListHeaderComponent: renderSeparator,
    ListFooterComponent: renderSeparator,
    onScroll: scrollHandler,
    onMomentumScrollEnd: onMomentumScrollEnd,
    estimatedItemSize: stepWidth + gapBetweenSteps,
    snapToOffsets: arrData.map((_, index) => index * (stepWidth + gapBetweenSteps)),
    onContentSizeChange: onContentSizeChange,
    snapToAlignment: "start",
    decelerationRate: decelerationRate,
    estimatedFirstItemOffset: 0,
    scrollEventThrottle: 16,
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    horizontal: true
  }), /*#__PURE__*/React.createElement(View, {
    pointerEvents: "none",
    style: [styles.indicator, {
      transform: [{
        translateX: -stepWidth * 0.5
      }, {
        translateY: -indicatorHeight * 0.5 - ((valueTextStyle === null || valueTextStyle === void 0 ? void 0 : valueTextStyle.fontSize) ?? styles.valueText.fontSize)
      }],
      left: stepWidth * 0.5
    }]
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.displayTextContainer, {
      height: (valueTextStyle === null || valueTextStyle === void 0 ? void 0 : valueTextStyle.fontSize) ?? styles.valueText.fontSize,
      transform: [{
        translateY: -((valueTextStyle === null || valueTextStyle === void 0 ? void 0 : valueTextStyle.fontSize) ?? styles.valueText.fontSize) * 0.5
      }]
    }]
  }, /*#__PURE__*/React.createElement(TextInput, {
    ref: stepTextRef,
    defaultValue: initialValue.toFixed(fractionDigits),
    style: [{
      lineHeight: (valueTextStyle === null || valueTextStyle === void 0 ? void 0 : valueTextStyle.fontSize) ?? styles.valueText.fontSize
    }, styles.valueText, valueTextStyle]
  }), unit && /*#__PURE__*/React.createElement(Text, {
    style: [{
      lineHeight: (unitTextStyle === null || unitTextStyle === void 0 ? void 0 : unitTextStyle.fontSize) ?? styles.unitText.fontSize
    }, styles.unitText, unitTextStyle]
  }, unit)), /*#__PURE__*/React.createElement(View, {
    style: [{
      width: stepWidth,
      height: indicatorHeight,
      backgroundColor: indicatorColor
    }]
  })));
};
const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    top: '50%',
    width: '100%',
    alignItems: 'center'
  },
  displayTextContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  valueText: {
    color: 'black',
    fontSize: 32,
    fontWeight: '800',
    margin: 0,
    padding: 0
  },
  unitText: {
    color: 'black',
    fontSize: 24,
    fontWeight: '400',
    marginLeft: 6
  }
});
//# sourceMappingURL=RulerPicker.js.map