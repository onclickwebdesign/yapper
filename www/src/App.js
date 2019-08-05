import React from 'react';
import logo from './logo.svg';
import { Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <h1>Welcome to Yapper!</h1>
      <h4>
        <Link to="/login">Login</Link>
        <br/>or<br/>
        <Link to="/register">Register</Link>
        <br/> to get started.
      </h4>
    </div>
  );
}

export default App;
