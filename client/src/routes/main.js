import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import asyncComponent from '../components/async-component';
import Header from '../components/pages/header';


const MainRoute = ({ component: Component, authenticated, isAdmin, ...rest }) => (
    <Route {...rest} render={props => <MainLayout {...props}><Component authenticated={authenticated} isAdmin={isAdmin} {...props}/></MainLayout>
    }/>
  )

  const MainLayout = ({ children, ...rest }) => {
    return (
      <div>
        <Header/>
        {children}
      </div>
    )
  }



const Error404 = () => {
    return <h1>Error404 for admin</h1>
}

const mapStateToProps = state => ({
	authenticated: state.user.get('authenticated'),
	isAdmin: state.user.get('isAdmin'),
	email: state.user.get('email'),
});

export default connect(mapStateToProps)(MainRoute);
