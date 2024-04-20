import validator from 'email-validator';

export function isValidEmail(email: string): boolean
{
	return validator.validate(email);
}

/*
	function to check if username already exists and/or is valid
*/
export function isValidUsername(username: string): boolean
{
	return true;
}

/*
	function to check if a password is valid or within set restraints
*/
export function isValidPassword(password: string): { isValid: boolean; reason?: string }
{
	if (password.length < 8) 
	{
    	return { isValid: false, reason: "Password must be at least 8 characters long." };
  	}

  	// Regex pattern for complexity requirements
  	const pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;

  	// Check if the password contains at least one digit, lowercase letter, uppercase letter, and special character
	if (!pattern.test(password)) 
	{
		return { isValid: false, reason: "Password must contain at least one digit, lowercase letter, uppercase letter, and special character." };
	}

	return { isValid: true };
};

export function isValidDate(birthday: Date): boolean
{
	const currentDate = new Date();

	let userAge = currentDate.getFullYear() - birthday.getFullYear();

	if ( currentDate.getMonth() < birthday.getMonth() || (currentDate.getMonth() === birthday.getMonth() && currentDate.getDate() < birthday.getDay()))
	{
		userAge--;
	}
	
	return userAge >= 18;
};

export function isValidWeight(weight: number): boolean
{
	if (weight < 50 || weight > 500)
	{
		return { isValid: false, reason: "Weight is an unreasonable number" };
	}
	return { isValid: true };
};

export function isValidGoal(goal: string): boolean
{
	if (goal === 'cut' || goal === 'bulk' || goal === 'maintain')
	{
		return true;
	}

	return false;
};