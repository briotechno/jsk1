import { fetchAPI } from '../../utils/api';

export const authController = {
  checkUsername: async (username) => fetchAPI('/namecheck', { username }),
  sendOtp: async (mobile) => fetchAPI('/sendotp', { mobile }),
  createUser: async (data) => fetchAPI('/createuser', data),
  login: async (data) => fetchAPI('/login', data),
  changePassword: async (data) => {
    const { loginToken, ...rest } = data;
    return fetchAPI('/changepass', { LoginToken: loginToken, ...rest });
  },
  forgotPassword: async (mobile) => fetchAPI('/forgotpass', { Mobile: mobile }),
};
