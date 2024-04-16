/*
	File for managing the different colored components and text
	throughout the app.

	Changes here changes all
*/

export interface Colors {
	none: string;

	gradientColorOne: string;
	gradientColorTwo: string;

	gradientColors: string[];

	primaryText: string;
	secondaryText: string;
	thirdText: string;

	primaryButtonBackground: string;
	secondaryButtonBackground: string;

	opaqueColor: (color: string, opacity: number) => string;
}

export const COLOR: Colors  = {

	none: 'transparent',

	gradientColors: ['#3F51B5','#03A9F4', '#FFFFFF'],

	gradientColorOne: '#3F51B5',
	gradientColorTwo: '#03A9F4',

	primaryText: '#FFFFFF',
	secondaryText: '#FFC107',
	thirdText: '#CCCCCC',

	primaryButtonBackground: '#5C6BC0',
	secondaryButtonBackground: '#FFC107',

	opaqueColor: (color: string, opacity: number): string => {
		const validOpacity = Math.max(0, Math.min(1, opacity));
    const hexToRgb = (hex: string): string => {
        const bigint = parseInt(hex.replace('#', ''), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `${r}, ${g}, ${b}`;
    };

    return `rgba(${hexToRgb(color)}, ${validOpacity})`;
	}
};