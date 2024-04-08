/*
	File for managing the different colored components and text
	throughout the app.

	Changes here changes all
*/

export interface Colors {
	none: string;

	primaryText: string;
	secondaryText: string;
	thirdText: string;

	primaryButtonBackground: string;
	secondaryButtonBackground: string;
}

export const COLOR: Colors  = {

	none: 'transparent',

	primaryText: '#FFFFFF',
	secondaryText: '#FFC107',
	thirdText: '#CCCCCC',

	primaryButtonBackground: '#5C6BC0',
	secondaryButtonBackground: '#FFC107',
};