import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import asyncComponent from '../components/async-component';
import Header from '../components/pages/header';


const MainRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props =>  <MainLayout><Component {...props}/></MainLayout>
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

export default MainRoute;
