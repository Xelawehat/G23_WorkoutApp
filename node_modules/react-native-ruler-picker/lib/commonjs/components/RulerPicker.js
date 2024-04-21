"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RulerPicker = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _flashList = require("@shopify/flash-list");
var _RulerPickerItem = require("./RulerPickerItem");
var _utils = require("../utils/");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const {
  width: windowWidth
} = _reactNative.Dimensions.get('window');
const RulerPicker = _ref => {
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
  const listRef = (0, _react.useRef)(null);
  const stepTextRef = (0, _react.useRef)(null);
  const prevValue = (0, _react.useRef)(initialValue.toFixed(fractionDigits));
  const prevMomentumValue = (0, _react.useRef)(initialValue.toFixed(fractionDigits));
  const scrollPosition = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const valueCallback = (0, _react.useCallback)(_ref2 => {
    let {
      value
    } = _ref2;
    const newStep = (0, _utils.calculateCurrentValue)(value, stepWidth, gapBetweenSteps, min, max, step, fractionDigits);
    if (prevValue.current !== newStep) {
      var _stepTextRef$current;
      onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(newStep);
      (_stepTextRef$current = stepTextRef.current) === null || _stepTextRef$current === void 0 ? void 0 : _stepTextRef$current.setNativeProps({
        text: newStep
      });
    }
    prevValue.current = newStep;
  }, [fractionDigits, gapBetweenSteps, stepWidth, max, min, onValueChange, step]);
  (0, _react.useEffect)(() => {
    scrollPosition.addListener(valueCallback);
    return () => {
      scrollPosition.removeAllListeners();
    };
  }, [scrollPosition, valueCallback]);
  const scrollHandler = _reactNative.Animated.event([{
    nativeEvent: {
      contentOffset: {
        x: scrollPosition
      }
    }
  }], {
    useNativeDriver: true
  });
  const renderSeparator = (0, _react.useCallback)(() => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      width: width * 0.5 - stepWidth * 0.5
    }
  }), [stepWidth, width]);
  const renderItem = (0, _react.useCallback)(_ref3 => {
    let {
      index
    } = _ref3;
    return /*#__PURE__*/_react.default.createElement(_RulerPickerItem.RulerPickerItem, {
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
  const onMomentumScrollEnd = (0, _react.useCallback)(event => {
    const newStep = (0, _utils.calculateCurrentValue)(event.nativeEvent.contentOffset.x || event.nativeEvent.contentOffset.y, stepWidth, gapBetweenSteps, min, max, step, fractionDigits);
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
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      width,
      height
    }
  }, /*#__PURE__*/_react.default.createElement(_flashList.AnimatedFlashList, {
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
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    pointerEvents: "none",
    style: [styles.indicator, {
      transform: [{
        translateX: -stepWidth * 0.5
      }, {
        translateY: -indicatorHeight * 0.5 - ((valueTextStyle === null || valueTextStyle === void 0 ? void 0 : valueTextStyle.fontSize) ?? styles.valueText.fontSize)
      }],
      left: stepWidth * 0.5
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.displayTextContainer, {
      height: (valueTextStyle === null || valueTextStyle === void 0 ? void 0 : valueTextStyle.fontSize) ?? styles.valueText.fontSize,
      transform: [{
        translateY: -((valueTextStyle === null || valueTextStyle === void 0 ? void 0 : valueTextStyle.fontSize) ?? styles.valueText.fontSize) * 0.5
      }]
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, {
    ref: stepTextRef,
    defaultValue: initialValue.toFixed(fractionDigits),
    style: [{
      lineHeight: (valueTextStyle === null || valueTextStyle === void 0 ? void 0 : valueTextStyle.fontSize) ?? styles.valueText.fontSize
    }, styles.valueText, valueTextStyle]
  }), unit && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [{
      lineHeight: (unitTextStyle === null || unitTextStyle === void 0 ? void 0 : unitTextStyle.fontSize) ?? styles.unitText.fontSize
    }, styles.unitText, unitTextStyle]
  }, unit)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [{
      width: stepWidth,
      height: indicatorHeight,
      backgroundColor: indicatorColor
    }]
  })));
};
exports.RulerPicker = RulerPicker;
const styles = _reactNative.StyleSheet.create({
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