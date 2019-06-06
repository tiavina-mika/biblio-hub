import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import MainLayout from '../components/main-layout';

const MainRoute = ({ component: Component, authenticated, id, isAdmin, ...rest }) => (
    <Route {...rest} render={props => <MainLayout {...props} authenticated={authenticated} isAdmin={isAdmin} id={id}>
			<Component authenticated={authenticated} id={id} {...props}/>
		</MainLayout>
    }/>
)

const mapStateToProps = state => ({
	authenticated: state.user.get('authenticated'),
	id: state.user.get('id'),
	email: state.user.get('email'),
	isAdmin: state.user.get('isAdmin'),
});

export default connect(mapStateToProps)(MainRoute);