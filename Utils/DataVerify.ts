import validator from 'email-validator';

export function isValidEmail(email: string): boolean
{
	return validator.validate(email);
}