import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import asyncComponent from '../components/async-component';
import MainLayout from '../components/main-layout';


const MainRoute = ({ component: Component, authenticated, id, ...rest }) => (
    <Route {...rest} render={props => <MainLayout {...props}><Component authenticated={authenticated} id={id} {...props}/></MainLayout>
    }/>
)

const mapStateToProps = state => ({
	authenticated: state.user.get('authenticated'),
	id: state.user.get('id'),
	email: state.user.get('email'),
});

export default connect(mapStateToProps)(MainRoute);
