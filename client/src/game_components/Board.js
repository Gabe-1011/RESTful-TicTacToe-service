import React, { Component } from 'react';
import Square from './Square';
import './Game.css';

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: Array(9).fill(''),
      xIsNext: true
    };
  }

  handleClick(i) {
    const squares = this.state.grid.slice();
    const winner = calculateWinner(squares).then(function(result) {
      return result.winner;
    });
    console.log(winner);
    if (winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      grid: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.grid[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.grid).then(function(result) {
      return result.winner;
    });
    //const winner = this.state.winner;
    let status;
    console.log(winner);
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

function calculateWinner(squares){
    fetch('/ttt/play', {
    method: 'post',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grid: squares
    })
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      console.log(data);
      return data;
    })
}
