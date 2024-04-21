import React from 'react';
export type RulerPickerItemProps = {
    /**
     * Gap between steps
     *
     * @default 10
     */
    gapBetweenSteps: number;
    /**
     * Height of the short step
     *
     * @default 20
     */
    shortStepHeight: number;
    /**
     * Height of the long step
     *
     * @default 40
     */
    longStepHeight: number;
    /**
     * Width of the steps
     *
     * @default 2
     */
    stepWidth: number;
    /**
     * Color of the short steps
     *
     * @default 'lightgray'
     */
    shortStepColor: string;
    /**
     * Color of the long steps
     *
     * @default 'gray'
     */
    longStepColor: string;
};
type Props = {
    index: number;
    isLast: boolean;
} & RulerPickerItemProps;
export declare const RulerPickerItem: React.MemoExoticComponent<({ isLast, index, gapBetweenSteps, shortStepHeight, longStepHeight, stepWidth, shortStepColor, longStepColor, }: Props) => JSX.Element>;
export {};
//# sourceMappingURL=RulerPickerItem.d.ts.map