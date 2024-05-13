import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { createUser, deleteUser } from './authThunks'

const userInfoFromStorage = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null

const initialState = {
  user: userInfoFromStorage,
  isAuthenticated: false,
  loading: false,
  createUserLoading: false,
  createUserError: null,
  error: null,
  deleteSuccess: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true
      state.error = null
    },
    loginSuccess(state, action) {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload
    },
    loginFail(state, action) {
      state.loading = false
      state.error = action.payload
    },
    logout(state) {
      state.isAuthenticated = false
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.createUserLoading = true
        state.createUserError = null
      })
      .addCase(createUser.fulfilled, (state) => {
        state.createUserLoading = false
      })
      .addCase(createUser.rejected, (state, action) => {
        state.createUserLoading = false
        state.createUserError = action.payload
      })
      .addCase(deleteUser.pending, (state) => {
        state.deleteSuccess = false
        state.deleteError = null
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.deleteSuccess = true
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.deleteSuccess = false
        state.deleteError = action.payload
      })
  },
})

export const { loginStart, loginSuccess, loginFail, logout } = authSlice.actions
export default authSlice.reducer
