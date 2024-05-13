import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import usersReducer from './users/usersSlice'


const initialState = {
  sidebarShow: true,
  theme: 'light',
}

const changeState = (state = initialState, action) => {
  switch (action.type) {
    case 'set':
      return { ...state, ...action.payload }
    default:
      return state
  }
}

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    app: changeState,
    // Add other reducers here if needed
  },
})

export default store
