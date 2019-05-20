
import React from 'react';
import asyncComponent from '../async-component';

import AdminRoute from '../../routes/admin';

const AsyncAdminRedirect = asyncComponent(() => import('./components/redirect'));

const AsyncAdminAuthors = asyncComponent(() => import('./authors/list'));
const AsyncAddAuthor = asyncComponent(() => import('./authors/add'));
const AsyncShowAuthor = asyncComponent(() => import('./authors/show'));
const AsyncEditAuthor = asyncComponent(() => import('./authors/edit'));

const AsyncAdminGenres = asyncComponent(() => import('./genres/list'));
const AsyncShowGenre = asyncComponent(() => import('./genres/show'));
const AsyncAddGenre = asyncComponent(() => import('./genres/add'));
const AsyncEditGenre = asyncComponent(() => import('./genres/edit'));

const AsyncAdminBooks = asyncComponent(() => import('./books/list'));
const AsyncShowBook = asyncComponent(() => import('./books/show'));
const AsyncAddBook = asyncComponent(() => import('./books/add'));
const AsyncEditBook = asyncComponent(() => import('./books/edit'));

const AsyncAdminUsers = asyncComponent(() => import('./users/list'));
const AsyncShowUser = asyncComponent(() => import('./users/show'));
const AsyncAddUser = asyncComponent(() => import('./users/add'));
const AsyncEditUser = asyncComponent(() => import('./users/edit'));
const AsyncAddProfile = asyncComponent(() => import('./profile/add'));

const AsyncProfileAdmin = asyncComponent(() => import('./profile/profile'));

const AdminRoutes = ({path}) => ([
        <AdminRoute path={`${path}`} exact component={Dashboard}/>,

        <AdminRoute path={`${path}/redirect`} exact component={AsyncAdminRedirect}/>,

        <AdminRoute path={`${path}/auteurs`} exact component={AsyncAdminAuthors}/>,
        <AdminRoute path={`${path}/auteurs/recherche/:search`} exact component={AsyncAdminAuthors}/>,
        <AdminRoute path={`${path}/ajouter/auteur`} exact component={AsyncAddAuthor}/>,
        <AdminRoute path={`${path}/auteur/:id`} exact component={AsyncShowAuthor}/>,
        <AdminRoute path={`${path}/modifier/auteur/:id`} exact component={AsyncEditAuthor}/>,
        
        <AdminRoute path={`${path}/genres/recherche/:search`} exact component={AsyncAdminGenres}/>,
        <AdminRoute path={`${path}/genres`} exact component={AsyncAdminGenres}/>,
        <AdminRoute path={`${path}/ajouter/genre`} exact component={AsyncAddGenre}/>,
        <AdminRoute path={`${path}/genre/:id`} exact component={AsyncShowGenre}/>,
        <AdminRoute path={`${path}/modifier/genre/:id`} exact component={AsyncEditGenre}/>,

        <AdminRoute path={`${path}/livres/recherche/:search`} exact component={AsyncAdminBooks}/>,
        <AdminRoute path={`${path}/livres`} exact component={AsyncAdminBooks}/>,
        <AdminRoute path={`${path}/ajouter/livre`} exact component={AsyncAddBook}/>,
        <AdminRoute path={`${path}/livre/:id`} exact component={AsyncShowBook}/>,
        <AdminRoute path={`${path}/modifier/livre/:id`} exact component={AsyncEditBook}/>,


        <AdminRoute path={`${path}/utilisateurs/recherche/:search`} exact component={AsyncAdminUsers}/>,
        <AdminRoute path={`${path}/utilisateurs`} exact component={AsyncAdminUsers}/>,
        <AdminRoute path={`${path}/ajouter/utilisateur`} exact component={AsyncAddUser}/>,
        <AdminRoute path={`${path}/utilisateur/:id`} exact component={AsyncShowUser}/>,
        <AdminRoute path={`${path}/modifier/utilisateur/:id`} exact component={AsyncEditUser}/>,
        <AdminRoute path={`${path}/profile/:id`} exact component={AsyncProfileAdmin}/>,
        <AdminRoute path={`${path}/:id/ajouter/profil`} exact component={AsyncAddProfile}/>,
]);
const Dashboard = ({isAdmin, authenticated}) => {
	return <h1>Dashboard for Admin, {isAdmin ? 'admin' : 'not admin'}</h1>
}
export default AdminRoutes;