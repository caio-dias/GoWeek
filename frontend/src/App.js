import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Timeline from './pages/Timeline';

class App extends Component {
  render() {
    return (
      //endereço do browser
      <BrowserRouter>
        {/* garante que so uma rota seja chamada */}
        <Switch>
            {/* Rotas */}
            <Route path="/" exact component={Login} />
            <Route path="/timeline" component={Timeline} />
        </Switch>
      </BrowserRouter>
      );
  }
}

export default App;
