import React from 'react';
import ReactDOM from 'react-dom';

import './css/timeline.css';
import './css/reset.css';
import './css/login.css';
import './css/alert.css';

import App from './App';
import Login from './componentes/Login';
import createBrowserHistory from 'history/createBrowserHistory';
import {BrowserRouter, Switch, Route, Redirect,matchPath} from 'react-router-dom';



ReactDOM.render(

    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/logout" render={() => (
                <Redirect to="/?logout=true"/>
            )} />
            <Route path="/timeline/:login?" render={(props) => (
                isLoggedIn() ? (
                    <Redirect to="/?notLogged=true"/>
                ) : (
                    <App {...props}/>
                )
            )}/>
            <Route path="/**" render={() => (
                <Redirect to="/logout"/>
            )}
            />

        </Switch>
    </BrowserRouter>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

function isLoggedIn() {
    const history = createBrowserHistory();
    const match = matchPath(history.location.pathname,  {path: '/timelineReducer/:login'});

    const privateRoute = match === null;

    return (privateRoute && localStorage.getItem('auth-token')) === null;

}