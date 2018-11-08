const express = require('express');

//modulo de rotas do express, definicao das rotas da app
const routes = express.Router();

//importando controller que exporta metodos
const TweetController = require('./controllers/TweetController');
const LikeController = require('./controllers/LikeController');

//quando bater na rota tweets com get e post, utiliza metodos da controller
//adicionando like ao tweet e passando o id como param
routes.get('/tweets', TweetController.index);
routes.post('/tweets', TweetController.store);
routes.post('/likes/:id', LikeController.store);

module.exports = routes;
