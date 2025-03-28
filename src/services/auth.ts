import Cookies from 'js-cookie';
import api from './api';
import axios from 'axios';
import { User, LoginResponse, ProfileResponse } from '../types';

const AUTH_COOKIE_NAME = import.meta.env.VITE_AUTH_COOKIE_NAME || 'sabihat_auth_token';
const AUTH_COOKIE_EXPIRES_DAYS = parseInt(import.meta.env.VITE_AUTH_COOKIE_EXPIRES_DAYS || '7', 10);

export const authService = {
  /**
   * Login user with phone and password
   */
  login: async (phone: string, password: string): Promise<User | null> => {
    try {
      // Ensure phone number has country code
      const formattedPhone = phone.startsWith('20') ? phone : `20${phone}`;
      
      const response = await api.post<LoginResponse>('/auth/login', {
        phone: formattedPhone,
        password,
      });

      if (response.data.success && response.data.data.token) {
        // Store token in a secure cookie
        Cookies.set(AUTH_COOKIE_NAME, response.data.data.token, {
          expires: AUTH_COOKIE_EXPIRES_DAYS,
          secure: import.meta.env.PROD, // Use import.meta.env.PROD for production check in Vite
          sameSite: 'strict',
        });

        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.data.result));
        
        return response.data.data.result;
      }
      
      return null;
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  },

  /**
   * Get user profile information
   */
  getProfile: async (): Promise<User | null> => {
    try {
      const response = await api.get<ProfileResponse>('/auth/profile');
      
      if (response.data.success) {
        // Update user data in localStorage with the latest info
        localStorage.setItem('user', JSON.stringify(response.data.data));
        return response.data.data;
      }
      
      return null;
    } catch (error) {
      console.error('Get profile error:', error);
      // If unauthorized, clear auth data
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        authService.logout();
      }
      return null;
    }
  },

  /**
   * Logout user by removing token and user data
   */
  logout: async(): Promise<void> => {
    const response = await api.post('/auth/logout');
    if (response.data.success) {
      Cookies.remove(AUTH_COOKIE_NAME);
      localStorage.removeItem('user');
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!Cookies.get(AUTH_COOKIE_NAME);
  },

  /**
   * Get current user data
   */
  getCurrentUser: (): User | null => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  },

  /**
   * Get auth token
   */
  getToken: (): string | undefined => {
    return Cookies.get(AUTH_COOKIE_NAME);
  },
};
