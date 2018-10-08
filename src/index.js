import React from 'react';
import ReactDOM from 'react-dom';

import './css/timeline.css';
import './css/reset.css';
import './css/login.css';

import App from './App';
import Login from './componentes/Login';
import Logout from './componentes/Logout';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';


ReactDOM.render(

    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route exact path="/timeline" render={() => (
                isLoggedIn() ? (
                    <Redirect to="/?msg=Você precisa estar logado para acessar"/>
                ) : (
                    <App />
                )
            )}/>
        </Switch>
    </BrowserRouter>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

function isLoggedIn() {
    return localStorage.getItem('auth-token') === null;
}