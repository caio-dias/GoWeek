import React, { Component } from 'react';
import './Login.css';
import twitterLogo from '../assets/twitter.svg';

class Login extends Component {
  //estado da app, os dados salvos que sao manipulados
  state = {
    username: ''
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const {username} = this.state;
    if(!username.length) return;

    //salva nome de usuario no localstorage
    localStorage.setItem('@GoTwitter:username', username);

    //manda para a timeline
    this.props.history.push('/timeline');
  }

  //atualiza o estado pegando o valor que vem no evento
  handleInputChange = (event) => {
    this.setState({ username: event.target.value });
  }

  render() {
    return (
      <div className='login-wrapper'>
        <img src={twitterLogo} alt='GoTwitter' />
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder='Nome de usuário'
            value={this.state.username}
            onChange={this.handleInputChange}
          />
          <button type='submit'>Entrar</button>
        </form>
      </div>
      );
  }
}

export default Login;
