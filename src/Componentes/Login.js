import React, { Component } from 'react';
import { Paper } from '@material-ui/core';
import './Login.css';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Users: [{ userName: "Ash Ketchum", userEmail: "ash@pokemon.com", password: "pokedex" },
      { userName: "Misty", userEmail: "misty@pokemon.com", password: "paleta" }],
      email: '',
      password: '',
    }

  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    })
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    })
  }


  login = (e) => {
    
    if (this.state.Users[0].userEmail === this.state.email && this.state.Users[0].password === this.state.password) {
      this.props.history.push('/Pokelist')
    } else if (this.state.Users[1].userEmail === this.state.email && this.state.Users[1].password === this.state.password) {
      this.props.history.push('/Pokelist')
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1><img src={'https://www.pnn.space/uploads/1/3/2/9/13291422/editor/screen-shot-2018-11-18-at-8-57-47-am.png?1542550581'} style={{ width: 400 }} /></h1>

          <Paper style={{ width: 300, height: 300, color: 'black' }}>
            <div className="Login">
              <h1>LOGIN</h1>
              <input
                name="email"
                placeholder="Enter email"
                onChange={this.handleEmailChange} />
              <br />
              <input
                name="password"
                placeholder="Enter password"
                onChange={this.handlePasswordChange} />
              <br />
              <button name="login" onClick={this.login}>Login</button>
            </div>
          </Paper>
        </header>
      </div>
    );
  }
}

export default Login;