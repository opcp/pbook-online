import React, { Component } from 'react';
import className from 'classnames';

export default class Mole extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  
  render() {
    const moleClass = className('mole', {
      up: this.props.up
    });
    return (
      <div className="hole hole2">
        <div className={moleClass} onClick={this.props.onHit} />
      </div>
    );
  }
}
