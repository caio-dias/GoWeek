import React, { Component } from 'react';
import api from '../services/api';

import './Tweet.css';
import like from '../assets/like.svg';

class Tweet extends Component {

  handleLike = async () => {
    const {_id} = this.props.tweet;

    //atualizando numero de likes do tweet
    await api.post(`likes/${_id}`);
  }

  render() {
    const {tweet} = this.props;
    return (
        <li className="tweet">
          <strong>{tweet.author}</strong>
          <p>{tweet.content}</p>
          <button type='button' onClick={this.handleLike}>
            <img src={like} alt='like' />
            {tweet.likes}
          </button>
        </li>
      );
  }
}

export default Tweet;
