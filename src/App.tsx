import React from 'react';
import LoginScreen from "./screen/LoginScreen";
import {useAppSelector} from "./redux/hooks";
import * as authSlice from "./redux/features/auth";
import HomeScreen from "./screen/HomeScreen";

function App() {
  const isLoggedIn = useAppSelector(authSlice.isLoggedIn)
  return isLoggedIn ? <HomeScreen/> : <LoginScreen/>
}

export default App;
