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
};