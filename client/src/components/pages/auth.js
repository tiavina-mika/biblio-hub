import React from 'react';
import { Route, Switch } from 'react-router-dom';

import asyncComponent from '../async-component';
import Header from './header';

import AsyncSignin from './signin';
import AsyncSignup from './signup';
import AsyncForgot from './forgot';
import AsyncError404 from './error-404';

const AuthPage = () => (
	<div>
		<Switch>
			<Route path="/signup" exact component={AsyncSignup} />
			<Route path="/signin" exact component={AsyncSignin} />
			<Route path="/forgot" exact component={AsyncForgot} />
			<Route path="*" component={AsyncError404} />
		</Switch>
	</div>
);

export default UnauthenticatedPage;