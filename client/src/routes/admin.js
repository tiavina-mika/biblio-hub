import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const AdminRoute = ({ component: Component, authenticated, isAdmin, ...rest }) => (
    <Route {...rest} render={props => authenticated
        ? Boolean(isAdmin)
          ? <AdminLayout authenticated={authenticated} isAdmin={isAdmin}><Component {...props}/></AdminLayout>
          : <Redirect to={{ pathname: '/', state: { from: props.location }}}/>
        : <Redirect to={{ pathname: '/signin', state: { from: props.location }}}/>
    }/>
  )

  const AdminLayout = ({ children,authenticated, isAdmin, email,  ...rest }) => {
    return (
      <div>
        <Header />
        {children}
        <Footer />
      </div>
    )
  }

const Header = () => {
    return <h1>Header for Admin</h1>
}

const Footer = () => {
    return <h1>Footer for Admin</h1>
}

const mapStateToProps = state => ({
	authenticated: state.user.get('authenticated'),
	isAdmin: state.user.get('isAdmin'),
	email: state.user.get('email'),
});


export default connect(mapStateToProps)(AdminRoute);