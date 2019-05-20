
import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import asyncComponent from './components/async-component';
import { Switch, Route } from 'react-router-dom';

import ErrorSnackbar from './components/error-snackbar';

import ActivateRoute from './routes/activate-route';
import AdminRoute from './routes/admin';
import MainRoute from './routes/main';
import AdminRoutes from './components/admin/admin-routes';
import MainRoutes from './components/main-routes';

const AsyncSignin = asyncComponent(() => import('./components/pages/signin'));
const AsyncSignup = asyncComponent(() => import('./components/pages/signup'));
const AsyncLogout = asyncComponent(() => import('./components/pages/logout'));

const theme = createMuiTheme({
  palette: {
		primary: {main: '#17a288'}
		// primary: {main: '#3c8dbc'}
	}
});

const App = () => (
	<MuiThemeProvider theme={theme}>
	<Switch>
			<Route path="/activate/:email/:token" component={ActivateRoute} />
			<Route path="/signin" component={AsyncSignin}/>
			<Route path="/signup" component={AsyncSignup}/>
			<Route path="/forgot" component={Forgot}/>
			<Route path="/logout" exact component={AsyncLogout} />
			<AdminRoutes path="/dashboard" />
			<MainRoutes />
			<Route path="*" component={Error404}/>

		</Switch>
		<ErrorSnackbar />
	</MuiThemeProvider>
);

const Dashboard = ({isAdmin, authenticated}) => {
	return <h1>Dashboard for Admin, {isAdmin ? 'admin' : 'not admin'}</h1>
}


const DashboardBooks = () => {
	return <h1>Books for admin</h1>
}

const Error404 = () => {
	return <h1>Error404 for admin</h1>
}

const Forgot = () => {
  return <h1>Forgot</h1>
}

const Home = () => {
	return <h1>Home</h1>
}

const Books = () => {
	return <h1>Books</h1>
}

export default App;