import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class ComposeYip extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      
    };
  }

  async componentDidMount() {
    
  }

  render() {
    return (
      <section id="compose-yip">
        <textarea></textarea>
        <button id="compose-yip-submit" className="yapper-btn-primary" />
      </section>
    );
  }
}

export default ComposeYip;