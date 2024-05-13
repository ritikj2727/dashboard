// usersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie'

// Define the initial state
const initialState = {
  users: [],
  status: 'idle',
  error: null,
}

// Helper function to get the token from cookies
const getTokenFromCookies = () => {
  const token = Cookies.get('token')
  return token
}

// Define the asynchronous thunk action to fetch users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { getState }) => {
  const token = getTokenFromCookies() // Get the token from cookies
  const headers = {
    Authorization: `Bearer ${token}`, // Set the Authorization header with the token
  }

  try {
    const response = await axios.get('http://localhost:5000/api/users', { headers })
    return response.data
  } catch (error) {
    throw error
  }
})

// Create a slice for users
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default usersSlice.reducer
