const express = require('express');
const mongoose = require('mongoose');

const app = express();

//extraindo o servidor http
const server = require('http').Server(app);

//habilitando o servidor a ouça tambem o metodo websocket que serve para atualizacao em tempo real
const io = require('socket.io')(server);

//habilitando que outras aplicacoes usem os servicos
const cors  = require('cors');

//usando serviço online chamado mlab.com e conectando ao banco
mongoose.connect('mongodb://caio:caio123@ds155313.mlab.com:55313/goweek-database', {
  useNewUrlParser: true
});

//criando uma var no req para ser acessivel globalmente
app.use((req, res, next) => {
  req.io = io;

  //next serve para o servidor seguir para o proximo passo e nao interromper o processo
  return next();
});

//habilitando que outras aplicacoes usem os servicos
app.use(cors());

//forçando o servidor a sempre usar json em todos as reqs
app.use(express.json());

//importando arquivo de rotas da app
app.use(require('./routes'));

server.listen(3000, () => {
  console.log('Server started on port 3000');
});