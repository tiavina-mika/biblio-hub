import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router/immutable';
import GoogleAnalytics from './google-analytics';
import Header from './pages/header';
import asyncComponent from './async-component';
import { getAuthenticated, getIsAdmin } from '../redux/root-reducer';

const AsyncSignin = asyncComponent(() => import('./pages/signin'));
const AsyncSignup = asyncComponent(() => import('./pages/signup'));
const AsyncForgot = asyncComponent(() => import('./pages/forgot'));
const AsyncError404 = asyncComponent(() => import('./pages/error-404'));




const AdminRoute = ({ authenticated, isAdmin, ...rest }) => authenticated && isAdmin
    ? <Route {...rest} component={UnauthenticatedPage} />
    : <Redirect to={'/'} />;
    // : <Redirect to={location && location.query && location.query.redirect ? location.query.redirect : '/'} />;

// const mapStateToProps = state => ({
//   authenticated: getAuthenticated(state)
// });

// export default connect(mapStateToProps)(AuthRoute);

const UnauthenticatedPage = () => (
    <div>
        <Switch>
            <Route path="/dashboard" exact component={Dashboard}/>
            <Route path="/dasboard/books" exact component={Books}/>
        </Switch>
    </div>
)

const Dashboard = () => {
    return <h1>Dashboard for Admin</h1>
}

const Books = () => {
    return <h1>Books for admin</h1>
}

const mapStateToProps = state => ({
	authenticated: getAuthenticated(state),
    isAdmin: getIsAdmin(state),
});

export default connect(mapStateToProps)(AdminRoute);