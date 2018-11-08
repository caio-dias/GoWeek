import React, { Component } from 'react';
import api from '../services/api';
import socket from 'socket.io-client';

import './Timeline.css';
import twitterLogo from '../assets/twitter.svg';

import Tweet from '../components/Tweet';

class Timeline extends Component {
  state = {
    tweets: [],
    newTweet:''
  };

  //quando o component é renderizado, essa funcao é chamada
  async componentDidMount() {
    this.subscribeToEvents();

    //pegando os tweets do banco e preenchendo o estado com eles
    const response = await api.get('tweets');
    this.setState({tweets: response.data});
  }

  //usando o web sockets para atualizar a timeline em tempo real
  subscribeToEvents = () => {
    const io = socket('http://localhost:3000');

    //evento de criar novo tweet
    io.on('tweet', data => {
      //atualizando estado dos tweets
      this.setState({tweets: [data, ...this.state.tweets]});
    })

    io.on('like', data => {
      //atualizando estado dos likes
      this.setState({tweets: this.state.tweets.map(tweet =>
        //se o id do tweet atual for igual do que vem do data, atualiza o like, se nao, retorna o proprio tweet para o state
        tweet._id === data._id ? data : tweet
      )})
    })
  }

  handleInputChange = (event) => {
    this.setState({ newTweet: event.target.value });
  };

  handleNewTweet = (event) => {
    if(event.keyCode !== 13) return;

    const content = this.state.newTweet;
    const author = localStorage.getItem('@GoTwitter:username');

    //salvando os dados no banco na rota tweets
    api.post('tweets', {content, author});

    //zera a textarea
    this.setState({newTweet: ''});
  };

  render() {
    return (
        <div className='timeline-wrapper'>
          <img height={24} src={twitterLogo} alt='GoTwitter' />
          <form>
            <input
              value={this.state.newTweet}
              onChange={this.handleInputChange}
              onKeyDown={this.handleNewTweet}
              placeholder='O que está acontecendo?'
            />
          </form>
          <ul className='tweet-list'>
            {/* renderizando os tweets na timeline, passando para o componente tweet os dados do tweet como propriedade */}
            {this.state.tweets.map( tweet => (
              <Tweet key={tweet._id} tweet={tweet} />
            ))}
          </ul>
        </div>
      );
  }
}

export default Timeline;
