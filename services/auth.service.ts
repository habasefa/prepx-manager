import * as SecureStore from 'expo-secure-store';
import axiosInstance from './axios-instance';
import {
  ConfirmLoginRequest,
  FinalLoginResponse,
  InitialLoginResponse,
  LoginCredentials,
} from '../types/auth';

export const authService = {
  initialLogin: async (credentials: LoginCredentials): Promise<InitialLoginResponse> => {
    const response = await axiosInstance.post('/auth/signin', credentials);
    return response.data;
  },

  confirmLogin: async (request: ConfirmLoginRequest): Promise<FinalLoginResponse> => {
    const response = await axiosInstance.post('/auth/signin', request);
    return response.data;
  },
  
  logout: async () => {
    await SecureStore.deleteItemAsync('authToken');
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
  },
};
