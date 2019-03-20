import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css' 
import * as serviceWorker from './serviceWorker';
import Login from './Componentes/Login';
import PokeList from './Componentes/PokeList';
import {Route, Switch , BrowserRouter} from "react-router-dom";

const routing = (
    <BrowserRouter>
      <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/Pokelist" component={PokeList} />
      </Switch>
    </BrowserRouter>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


