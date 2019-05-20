
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

const MainRoutes = () => ([
        <MainRoute path="/" exact component={AsyncHome}/>,
        <MainRoute path={`/redirect`} exact component={AsyncRedirect}/>,
        <MainRoute path="/livres" exact component={AsyncBooks}/>,
        <MainRoute path="/livres/recherche/:search" exact component={AsyncBooks}/>,
        <MainRoute path="/auteurs" exact component={AsyncAuthors}/>,
        <MainRoute path="/auteurs/recherche/:search" exact component={AsyncAuthors}/>,
        <MainRoute path="/genres" exact component={AsyncGenres}/>,
        <MainRoute path="/genres/recherche/:search" exact component={AsyncGenres}/>,
        <MainRoute path="/livres/:slug" exact component={AsyncBook}/>,
        <MainRoute path="/auteurs/:slug" exact component={AsyncAuthor}/>,
        <MainRoute path="/genres/:slug" exact component={AsyncGenre}/>,
        <MainRoute path="/contact" exact component={AsyncContact}/>,
]);

export default MainRoutes;