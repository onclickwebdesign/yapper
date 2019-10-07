import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import constants from '../../util/constants';

const Avatar = styled.img`
  border-radius: 30px;
  width: 40px;
  height: 40px;
  margin: 1rem;
`;

const TextArea = styled.div`
  background: transparent;
  
`;

class ComposeYip extends Component {
  constructor(props) {
    super(props);
    console.log('ComposeYip ', props);
    this.state = {
      user: props
    };
  }

  async componentDidMount() {
    
  }

  render() {
    return (
      <section id="compose-yip">
        <Avatar src={this.state.user.userImage ? this.state.user.userImage : constants.DEFAULT_USER_IMAGE} />
        <textarea></textarea>
        <button id="compose-yip-submit" className="yapper-btn-primary" />
      </section>
    );
  }
}

export default ComposeYip;