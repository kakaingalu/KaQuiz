// src/store/slices/authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create an async thunk for login
export const performLogin = createAsyncThunk(
  'auth/login',
  async (payload, thunkAPI) => {
    try {
      // Make the API call using axios
      const instance = axios.create({
        baseURL: 'http://localhost:5000', 
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await instance.post('/api/login', payload);

      // Handle the response
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }
);

// Create an async thunk for signup
export const performSignup = createAsyncThunk(
  'auth/signup',
  async (payload, thunkAPI) => {
    try {
      // Make the API call using axios
      const instance = axios.create({
        baseURL: 'http://localhost:5000', 
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await instance.post('/api/signup', payload);

      // Handle the response
      return response.data;
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(performLogin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(performLogin.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.status = 'succeeded';
      })
      .addCase(performLogin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(performSignup.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(performSignup.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.status = 'succeeded';
      })
      .addCase(performSignup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { login } = authSlice.actions;
export const { signup } = authSlice.actions;
export default authSlice.reducer;

// Define the payload type for the login action
const loginPayload = {
  email: '',
  password: ''
};

// Define the payload type for the signup action
const signupPayload = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
};
