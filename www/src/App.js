import React from 'react';
import logo from './logo.svg';
import { Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';

function App() {
  return (
    <div id="yapper-wrapper">
      <section id="yapper-features">
        <h1>You're one step away from the greatest social web application on the internet.</h1>
        <h4>We have tons of cool features, including ...</h4>
        <ul>
          <li><span class="fa fa-hashtag"></span> Explore trending topics and interesting discussions.</li>
          <li><span class="fa fa-bookmark"></span> Save that intriguing topic for later review with a bookmark.</li> 
          <li><span class="fa fa-at"></span> Share with your friends with the "at username" functionality.</li> 
        </ul>
      </section>

      <section id="yapper-join-login">
        <header>
          <img src={logo} className="App-logo" alt="logo" />

          <h1>See what people are Yappin' about</h1>
          <h4>Join Yapper today.</h4>
          <Link to="/register" className="btn btn-primary yapper-btn-primary">Register</Link>
          
          <Link to="/login" className="btn btn-secondary yapper-btn-secondary">Log in</Link>
        </header>
      </section>
    </div>
  );
}

export default App;
