import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Register from './auth/Register';
import Login from './auth/Login';
import NotFound from './NotFound';
import UserHome from './user/UserHome';
import Main from './Main';
import Footer from './Footer';

class Home extends Component {
  constructor(props) {
    super(props);
    const session = JSON.parse(localStorage.getItem('usersession'));
    
    this.state = {
      handle: session ? session.handle : '',
      email: session ? session.email : '',
      profileImage: session ? session.profileImage : '',
      token: session ? session.token : false,
      id: session ? session._id: '',
    };
  }

  getMainRender = () => {
    const app = this.state.token ? (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={() => <UserHome {...this.state} />} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    ) : (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={() => <div style={{height:'85%'}}><Main /><Footer /></div>} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );

    return app;
  }

  render() {
    return this.getMainRender();
  }
}

export default Home;