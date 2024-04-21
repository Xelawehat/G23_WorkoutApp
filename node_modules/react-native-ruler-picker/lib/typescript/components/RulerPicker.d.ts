import { TextStyle } from 'react-native';
import { RulerPickerItemProps } from './RulerPickerItem';
export type RulerPickerTextProps = Pick<TextStyle, 'color' | 'fontSize' | 'fontWeight'>;
export type RulerPickerProps = {
    /**
     * Width of the ruler picker
     * @default windowWidth
     */
    width?: number;
    /**
     * Height of the ruler picker
     * @default 500
     */
    height?: number;
    /**
     * Minimum value of the ruler picker
     *
     * @default 0
     */
    min: number;
    /**
     * Maximum value of the ruler picker
     *
     * @default 240
     */
    max: number;
    /**
     * Step of the ruler picker
     *
     * @default 1
     */
    step?: number;
    /**
     * Initial value of the ruler picker
     *
     * @default min
     */
    initialValue?: number;
    /**
     * Number of digits after the decimal point
     *
     * @default 1
     */
    fractionDigits?: number;
    /**
     * Unit of the ruler picker
     *
     * @default 'cm'
     */
    unit?: string;
    /**
     * Height of the indicator
     *
     * @default 80
     */
    indicatorHeight?: number;
    /**
     * Color of the center line
     *
     * @default 'black'
     */
    indicatorColor?: string;
    /**
     * Text style of the value
     */
    valueTextStyle?: RulerPickerTextProps;
    /**
     * Text style of the unit
     */
    unitTextStyle?: RulerPickerTextProps;
    /**
     * A floating-point number that determines how quickly the scroll view
     * decelerates after the user lifts their finger. You may also use string
     * shortcuts `"normal"` and `"fast"` which match the underlying iOS settings
     * for `UIScrollViewDecelerationRateNormal` and
     * `UIScrollViewDecelerationRateFast` respectively.
     *
     *  - `'normal'`: 0.998 on iOS, 0.985 on Android (the default)
     *  - `'fast'`: 0.99 on iOS, 0.9 on Android
     *
     * @default 'normal'
     */
    decelerationRate?: 'fast' | 'normal' | number;
    /**
     * Callback when the value changes
     *
     * @param value
     */
    onValueChange?: (value: string) => void;
    /**
     * Callback when the value changes end
     *
     * @param value
     */
    onValueChangeEnd?: (value: string) => void;
} & Partial<RulerPickerItemProps>;
export declare const RulerPicker: ({ width, height, min, max, step, initialValue, fractionDigits, unit, indicatorHeight, gapBetweenSteps, shortStepHeight, longStepHeight, stepWidth, indicatorColor, shortStepColor, longStepColor, valueTextStyle, unitTextStyle, decelerationRate, onValueChange, onValueChangeEnd, }: RulerPickerProps) => JSX.Element;
//# sourceMappingURL=RulerPicker.d.ts.map