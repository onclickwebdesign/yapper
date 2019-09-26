import React from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <div id="yapper-wrapper">
      <Home />
    </div>
  );
}

export default App;
