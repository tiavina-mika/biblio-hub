import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import AdminLayout from '../components/admin/admin-layout';

const AdminRoute = ({ component: Component, authenticated, isAdmin, id, ...rest }) => (
    <Route {...rest} render={props => authenticated
        ? Boolean(isAdmin)
          ? <AdminLayout {...props} authenticated={authenticated} isAdmin={isAdmin} id={id}>
              <Component authenticated={authenticated} isAdmin={isAdmin} id={id} {...props}/>
            </AdminLayout>
          : <Redirect to={{ pathname: '/', state: { from: props.location }}}/>
        : <Redirect to={{ pathname: '/signin', state: { from: props.location }}}/>
    }/>
);

const mapStateToProps = state => ({
	authenticated: state.user.get('authenticated'),
	isAdmin: state.user.get('isAdmin'),
	email: state.user.get('email'),
	id: state.user.get('id'),
});

export default connect(mapStateToProps)(AdminRoute);