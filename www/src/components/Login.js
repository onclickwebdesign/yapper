import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Row>
        <Col xs={12}>
          <input type="text" name="handle" value={this.state.handle} placeholder="Handle" />
        </Col>

        <Col xs={12}>
          <input type="email" name="email" value={this.state.email} placeholder="email" />
        </Col>

        <Col xs={12}>
          <input type="password" name="password" value={this.state.password} placeholder="Password" />
        </Col>

        <Col xs={12}>
          <button id="register-button" type="submit">Join</button>
        </Col>
      </Row>
    );
  }
  
}

export default Login;
