import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

interface AuthState {
  username: string
}

const initialState: AuthState = {
  username: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ username: string }>) {
      if (!action.payload.username) throw new Error('Empty username cannot be set')
      state.username = action.payload.username
    },
    logout(state) {
      state.username = initialState.username
    }
  }
})

export function isLoggedIn(state: RootState) {
  return state.auth.username !== initialState.username
}

export const { login, logout }  = authSlice.actions
export default authSlice.reducer
