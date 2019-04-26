import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router/immutable';
import GoogleAnalytics from './google-analytics';
import Header from './pages/header';
import asyncComponent from './async-component';
import { getAuthenticated } from '../redux/root-reducer';

const AsyncSignin = asyncComponent(() => import('./pages/signin'));
const AsyncSignup = asyncComponent(() => import('./pages/signup'));
const AsyncForgot = asyncComponent(() => import('./pages/forgot'));
const AsyncError404 = asyncComponent(() => import('./pages/error-404'));


// const AuthRoute = ({ authenticated, location, ...rest }) => authenticated
//   ? <Redirect to={location && location.query && location.query.redirect ? location.query.redirect : '/'} />
//   : <Route {...rest} component={UnauthenticatedPage} />;

// const mapStateToProps = state => ({
//   authenticated: getAuthenticated(state)
// });

// export default connect(mapStateToProps)(AuthRoute);

// const AuthRoute = ({ authenticated, location, ...rest }) => authenticated
//   ? <Redirect to='/' />
//   : <Route {...rest} component={UnauthenticatedPage} />;

const AuthRoute = () => (
    <div>
        <Switch>
            <Route path="/signin" exact component={Signin}/>
            <Route path="/signup" exact component={Signup}/>
            <Route path="/forgot" exact component={Forgot}/>
        </Switch>
    </div>
)

const Signin = () => {
  return <h1>Signin</h1>
}

const Signup = () => {
  return <h1>Signup</h1>
}

const Forgot = () => {
  return <h1>Forgot</h1>
}


export default AuthRoute