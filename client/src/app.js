
import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import asyncComponent from './components/async-component';
import { Switch, Route } from 'react-router-dom';
import 'dotenv/config';

import ErrorSnackbar from './components/error-snackbar';

import ActivateRoute from './routes/activate-route';
import AdminRoute from './routes/admin';
import MainRoute from './routes/main';

const AsyncSignin = asyncComponent(() => import('./components/pages/signin'));
const AsyncSignup = asyncComponent(() => import('./components/pages/signup'));
const AsyncLogout = asyncComponent(() => import('./components/pages/logout'));

const AsyncAdminRedirect = asyncComponent(() => import('./components/admin/components/redirect'));

const AsyncAdminAuthors = asyncComponent(() => import('./components/admin/authors/list'));
const AsyncAddAuthor = asyncComponent(() => import('./components/admin/authors/add'));
const AsyncShowAuthor = asyncComponent(() => import('./components/admin/authors/show'));
const AsyncEditAuthor = asyncComponent(() => import('./components/admin/authors/edit'));

const AsyncAdminGenres = asyncComponent(() => import('./components/admin/genres/list'));
const AsyncShowGenre = asyncComponent(() => import('./components/admin/genres/show'));
const AsyncAddGenre = asyncComponent(() => import('./components/admin/genres/add'));
const AsyncEditGenre = asyncComponent(() => import('./components/admin/genres/edit'));

const AsyncAdminBooks = asyncComponent(() => import('./components/admin/books/list'));
const AsyncShowBook = asyncComponent(() => import('./components/admin/books/show'));
const AsyncAddBook = asyncComponent(() => import('./components/admin/books/add'));
const AsyncEditBook = asyncComponent(() => import('./components/admin/books/edit'));

// const AsyncAdminUsers = asyncComponent(() => import('./components/admin/users/list'));
const AsyncAdminUsers = asyncComponent(() => import('./components/admin/users/list'));
const AsyncShowUser = asyncComponent(() => import('./components/admin/users/show'));
const AsyncAddUser = asyncComponent(() => import('./components/admin/users/add'));
const AsyncEditUser = asyncComponent(() => import('./components/admin/users/edit'));
const AsyncAddProfile = asyncComponent(() => import('./components/admin/profile/add'));

const AsyncProfileAdmin = asyncComponent(() => import('./components/admin/profile/profile'));

const theme = createMuiTheme({
  palette: {
		primary: {main: '#3c8dbc'}
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
			<AdminRoute path="/dashboard" exact component={Dashboard}/>
			<AdminRoute path="/dashboard/books" component={DashboardBooks}/>

			<AdminRoute path="/dashboard/redirect" component={AsyncAdminRedirect}/>

			<AdminRoute path="/dashboard/auteurs" component={AsyncAdminAuthors}/>
			<AdminRoute path="/dashboard/ajouter/auteur" exact component={AsyncAddAuthor}/>
			<AdminRoute path="/dashboard/auteur/:id" component={AsyncShowAuthor}/>
			<AdminRoute path="/dashboard/modifier/auteur/:id" component={AsyncEditAuthor}/>
			
			<AdminRoute path="/dashboard/genres" component={AsyncAdminGenres}/>
			<AdminRoute path="/dashboard/ajouter/genre" exact component={AsyncAddGenre}/>
			<AdminRoute path="/dashboard/genre/:id" component={AsyncShowGenre}/>
			<AdminRoute path="/dashboard/modifier/genre/:id" component={AsyncEditGenre}/>

			<AdminRoute path="/dashboard/livres" component={AsyncAdminBooks}/>
			<AdminRoute path="/dashboard/ajouter/livre" exact component={AsyncAddBook}/>
			<AdminRoute path="/dashboard/livre/:id" component={AsyncShowBook}/>
			<AdminRoute path="/dashboard/modifier/livre/:id" component={AsyncEditBook}/>


			<AdminRoute path="/dashboard/utilisateurs" component={AsyncAdminUsers}/>
			<AdminRoute path="/dashboard/ajouter/utilisateur" exact component={AsyncAddUser}/>
			<AdminRoute path="/dashboard/utilisateur/:id" component={AsyncShowUser}/>
			<AdminRoute path="/dashboard/modifier/utilisateur/:id" component={AsyncEditUser}/>
			<AdminRoute path="/dashboard/profile/:id" component={AsyncProfileAdmin}/>
			<AdminRoute path="/dashboard/:id/ajouter/profil" exact component={AsyncAddProfile}/>


			<MainRoute path="/" exact component={Home}/>
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