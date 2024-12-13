import axios, { AxiosRequestConfig } from 'axios';

const API_URL = 'https://eclo-production.up.railway.app/api/auth/';

const postData = async (url: string, data: any): Promise<any> => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Sửa hàm fetchData để nhận token và đặt vào header
const fetchData = async (url: string, token: string): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginWithGoogle = (data: any) => postData(`${API_URL}login/google/callback`, data);
export const login = (data: any) => postData(`${API_URL}login`, data);
export const getMe = (token: string) => fetchData(`${API_URL}me`, token);
export const register = (data: any) => postData(`${API_URL}register`, data);
