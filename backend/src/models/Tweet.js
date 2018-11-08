/**
 * Schema de dados: os campos da tabela de dados
 */
const mongoose = require('mongoose');

const TweetSchema = new mongoose.Schema({
  author: String,
  content: String,
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * exportando o arquivo
 * 1 param = nome do model
 * 2 param = obj do model
 */
module.exports = mongoose.model('Tweet', TweetSchema);