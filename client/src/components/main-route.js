import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import GoogleAnalytics from './google-analytics';
import Header from './pages/header';
import asyncComponent from './async-component';

const AsyncSignin = asyncComponent(() => import('./pages/signin'));
const AsyncSignup = asyncComponent(() => import('./pages/signup'));
const AsyncForgot = asyncComponent(() => import('./pages/forgot'));
const AsyncError404 = asyncComponent(() => import('./pages/error-404'));

const MainRoute = () => (
    <div>
        <Header key="header" />
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/books" component={Books}/>
            <Route path="*" component={Error404} />
        </Switch>
        <GoogleAnalytics />
    </div>
)

const Home = () => {
    return <h1>Home</h1>
}

const Books = () => {
    return <h1>Books</h1>
}

const Error404 = () => {
    return <h1>Error404</h1>
}

export default MainRoute;