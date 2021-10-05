import { configureStore } from '@reduxjs/toolkit'
import auth from "./features/auth";
import feed from './features/feed'

export const store = configureStore({
  reducer: {
    auth,
    feed
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
