
import React from 'react';
import asyncComponent from './async-component';

import MainRoute from '../routes/main';
const AsyncHome = asyncComponent(() => import('./pages/home'));
const AsyncContact = asyncComponent(() => import('./pages/contact'));
const AsyncBook = asyncComponent(() => import('./books/show'));
const AsyncBooks = asyncComponent(() => import('./books/list'));
const AsyncAuthors = asyncComponent(() => import('./authors/list'));
const AsyncAuthor = asyncComponent(() => import('./authors/show'));
const AsyncGenre = asyncComponent(() => import('./genres/show'));
const AsyncGenres = asyncComponent(() => import('./genres/list'));
const AsyncRedirect = asyncComponent(() => import('./pages/redirect'));
const AsyncNewPassword = asyncComponent(() => import('./pages/new-password'));
const AsyncForgottenPassword = asyncComponent(() => import('./pages/forgotten-password'));
const AsyncConfirm = asyncComponent(() => import('./pages/confirm'));
const AsyncChangePassword = asyncComponent(() => import('./pages/change-password'));
const AsyncProfile = asyncComponent(() => import('./profile/show'));
const AsyncEditProfile = asyncComponent(() => import('./profile/edit'));

const MainRoutes = () => ([
        <MainRoute path="/" exact component={AsyncHome}/>,
        <MainRoute path="/redirect" exact component={AsyncRedirect}/>,
        <MainRoute path="/confirmer/:id" exact component={AsyncConfirm}/>,
        <MainRoute path="/nouveau/mot-de-passe/:id" exact component={AsyncNewPassword}/>,
        <MainRoute path="/changer/mot-de-passe" exact component={AsyncChangePassword}/>,
        <MainRoute path="/modifier/compte" exact component={AsyncEditProfile}/>,
        <MainRoute path="/mot-de-passe-oublie" exact component={AsyncForgottenPassword}/>,
        <MainRoute path="/livres" exact component={AsyncBooks}/>,
        <MainRoute path="/livres/connexion/membre" exact component={AsyncBooks}/>,
        <MainRoute path="/livres/recherche/:search" exact component={AsyncBooks}/>,
        <MainRoute path="/livres/trier/:sort" exact component={AsyncBooks}/>,
        <MainRoute path="/auteurs" exact component={AsyncAuthors}/>,
        <MainRoute path="/auteurs/recherche/:search" exact component={AsyncAuthors}/>,
        <MainRoute path="/genres" exact component={AsyncGenres}/>,
        <MainRoute path="/genres/recherche/:search" exact component={AsyncGenres}/>,
        <MainRoute path="/livres/:slug" exact component={AsyncBook}/>,
        <MainRoute path="/auteurs/:slug" exact component={AsyncAuthor}/>,
        <MainRoute path="/genres/:slug" exact component={AsyncGenre}/>,
        <MainRoute path="/profil" exact component={AsyncProfile}/>,
        <MainRoute path="/contact" exact component={AsyncContact}/>,
]);

export default MainRoutes;