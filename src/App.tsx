import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginScreen from "./screen/LoginScreen";
import {useAppDispatch, useAppSelector} from "./redux/hooks";
import * as authSlice from "./redux/features/auth";

function App() {
  const isLoggedIn = useAppSelector(authSlice.isLoggedIn)
  const { username } = useAppSelector(s => s.auth)
  const dispatch = useAppDispatch()

  function renderLoggedIn() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Welcome, {username}.</p>
          <a
            className="App-link"
            href="#"
            onClick={() => dispatch(authSlice.logout())}
          >
            Logout
          </a>
        </header>
      </div>
    );
  }

  function renderLoggedOut() {
    return <LoginScreen/>
  }

  return isLoggedIn
    ? renderLoggedIn()
    : renderLoggedOut()
}

export default App;
