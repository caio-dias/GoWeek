/**
 * Sistema de likes da app
 */

const Tweet = require('../models/Tweet');

module.exports = {
  async store(req, res) {
    //pegando o tweet por id
    const tweet = await Tweet.findById(req.params.id);

    //atualizando os likes do tweet
    tweet.set({ likes: tweet.likes + 1 });

    await tweet.save();

    req.io.emit('like', tweet);
    
    return res.json(tweet);
  }
}