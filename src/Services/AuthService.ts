import axios, { AxiosError } from 'axios';
import { LoginRequestModel } from '../Models/Requests/Auth/LoginRequestModel';
import { RegisterRequestModel } from '../Models/Requests/Auth/RegisterRequestModel';
import { TokenModel } from '../Models/Responses/Token/TokenModel';
import { BASE_API_URL } from '../environment/environment';

class AuthService {
  async login(loginRequest: LoginRequestModel): Promise<TokenModel> {
    try {
      const response = await axios.post<TokenModel>(BASE_API_URL + 'Auths/login', loginRequest);
      return response.data;
    } catch (error: any) {
      throw (error as AxiosError).response?.data || error;
    }
  }

  async register(registerRequest: RegisterRequestModel): Promise<TokenModel> {
    try {
      const response = await axios.post<TokenModel>(BASE_API_URL + 'Auths/register', registerRequest);
      return response.data;
    } catch (error: any) {
      throw (error as AxiosError).response?.data || error;
    }
  }
}

export default new AuthService();