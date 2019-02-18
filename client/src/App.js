import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: ''
    }
    this.onSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = event => {
    event.preventDefault();
    fetch("/ttt", {
    method: 'POST',
    body: JSON.stringify({name: this.state.name}),
    headers: {
        'Content-Type': 'application/json'
    }
    })
    .then(res => res.json())
    .then(
      (result) => {
        //callback for the response
      }
     );
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <form onSubmit={this.handleSubmit} action="." method="post">
          <p><input type='text' placeholder='Your Name' name='name' onChange={this.handleChange} /></p>
          <p><input type="submit" value="Start"/></p>
        </form>
        <p className="App-intro">{this.state.message}</p>
      </div>
    );
  }
}

export default App;
