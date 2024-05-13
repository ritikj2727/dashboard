// authThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit'
import { loginStart, loginSuccess, loginFail } from './authSlice'
import axios from 'axios'
import Cookies from 'js-cookie'

export const login = (email, password) => async (dispatch) => {
  dispatch(loginStart())
  try {
    const response = await axios.post('http://localhost:5000/api/users/login', { email, password })
    const user = response.data // Assuming the API returns the user object
    await Cookies.set('user', JSON.stringify(user), { expires: 7 }) // Expires in 7 days
    await Cookies.set('token', user.token, { expires: 7 }) // Expires in 7 days
    dispatch(loginSuccess(user))
  } catch (error) {
    dispatch(loginFail(error.response.data.message)) // Assuming the API returns error messages
  }
}
const getTokenFromCookies = () => {
  const token = Cookies.get('token')
  return token
}

export const createUser = createAsyncThunk(
  'auth/createUser',
  async (userData, { rejectWithValue, getState }) => {
    const token = getTokenFromCookies() // Get the token from cookies
    const headers = {
      Authorization: `Bearer ${token}`, // Set the Authorization header with the token
    }

    // Check if the user is authenticated and has admin privileges
    const state = getState()
    const isAdmin = state.auth.user && state.auth.user.role === 'admin'

    if (!isAdmin) {
      return rejectWithValue('You are not authorized to create a user.') // Return error if not an admin
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', userData, {
        headers,
      })
      return response.data
    } catch (error) {
      // console.log(error.response.data.message)
      return rejectWithValue(error.response.data) // Use rejectWithValue to include the error message in the action payload
    }
  },
)

export const deleteUser = createAsyncThunk(
  'auth/deleteUser',
  async (id, { rejectWithValue, getState }) => {
    const token = getTokenFromCookies() // Get the token from cookies
    const headers = {
      Authorization: `Bearer ${token}`, // Set the Authorization header with the token
    }

    // Check if the user is authenticated and has admin privileges
    const state = getState()
    const isAdmin = state.auth.user && state.auth.user.role === 'admin'

    if (!isAdmin) {
      return rejectWithValue('You are not authorized to create a user.') // Return error if not an admin
    }

    try {
      const response = await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers,
      })
      return response.data
    } catch (error) {
      // console.log(error.response.data.message)
      return rejectWithValue(error.response.data) // Use rejectWithValue to include the error message in the action payload
    }
  },
)
