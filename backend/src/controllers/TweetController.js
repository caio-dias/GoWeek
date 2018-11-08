/**
 * Ações de CRUD da app
 * Listagem e criação de novos tweets
 */

const Tweet = require('../models/Tweet');

//metodos executaveis
module.exports = {
  //metodo de listagem
  async index(req, res) {
    //pegando tweets do banco e ordenando por data de criação com os mais novos em cima (-)
    const tweets = await Tweet.find({}).sort('-createdAt');

    //retornando json com os tweets
    return res.json(tweets);
  },
  //metodo de criacao
  async store(req, res) {
    /**
     * criando um tweet
     * envia os dados (autor etc) como corpo da requisicao em json
     */
    const tweet = await Tweet.create(req.body);
    
    //quando a app chegar nessa parte do codigo, todos que tiverem usando o req.io, irão receber a mensagem para atualizar em tempo real
    req.io.emit('tweet', tweet);

    return res.json(tweet);
  }
}