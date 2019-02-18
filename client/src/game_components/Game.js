import React, { Component } from 'react';
import Board from './Board';
import './Game.css';

export default class Game extends Component {
  constructor(props){
    super(props);
    this.state = {
      winner: ''
    };
  }
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board winner={this.state.winner} />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
