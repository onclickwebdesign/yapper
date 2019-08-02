import React from 'react';
import logo from './logo.svg';
import Register from './components/Register';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Register />
    </div>
  );
}

export default App;
