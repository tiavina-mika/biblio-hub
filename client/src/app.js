import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import asyncComponent from './components/async-component';
import { Switch, Route } from 'react-router-dom';
import ErrorSnackbar from './components/error-snackbar';
import AdminRoutes from './components/admin/admin-routes';
import MainRoutes from './components/main-routes';
import { FONT } from './redux/actions/constants';
import MainRoute from './routes/main';

const AsyncSignin = asyncComponent(() => import('./components/pages/signin'));
const AsyncSignup = asyncComponent(() => import('./components/pages/signup'));
const AsyncLogout = asyncComponent(() => import('./components/pages/logout'));
const AsyncError404 = asyncComponent(() => import('./components/pages/error-404'));

const theme = createMuiTheme({
	palette: {
		primary: {main: '#17a288'}
	},
	typography: {
		h1: { fontFamily: FONT },
		h2: { fontFamily: FONT },
		h3: { fontFamily: FONT },
		h4: { fontFamily: FONT },
		h5: { fontFamily: FONT },
		h6: { fontFamily: FONT },
	},
});

const App = () => (
	<MuiThemeProvider theme={theme}>
		<Switch>
			<Route path="/signin" component={AsyncSignin}/>
			<Route path="/signup" component={AsyncSignup}/>
			{/* <Route path="/forgot" component={Forgot}/> */}
			<Route path="/logout" exact component={AsyncLogout} />
			<AdminRoutes path="/dashboard" />
			<MainRoutes />
			<MainRoute path="*" component={AsyncError404}/>,
			{/* <Route path="*" component={Error404}/> */}
		</Switch>
		<ErrorSnackbar />
	</MuiThemeProvider>
);

export default App;