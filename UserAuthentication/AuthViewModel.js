import AuthModel from './AuthModel'

// Acts as medium between model and views, gets data from model and gives to view
class AuthViewModel
{
	static async login(user, pass)
	{
		return await AuthModel.loginUser(user, pass)
	}

	static async createUser(email, user, pass)
	{
		return await AuthModel.createUser(email, user, pass)
	}
}

export default AuthViewModel;