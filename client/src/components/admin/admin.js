import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Intercom from 'react-intercom';

import asyncComponent from '../async-component';
import Header from '../breadcrumbs/header';
import ImmutableToJson from '../immutable-to-json';

import { APPLICATION } from '../../utils/router-paths';
import { getUserId, getUserEmail, getAuthenticated } from '../../redux/root-reducer';
import { applications } from '../../redux/actions/user';

const AsyncBotsList = asyncComponent(() => import('./bots-list'));
const AsyncApplication = asyncComponent(() => import('./application'));
const AsyncError404 = asyncComponent(() => import('./error-404'));
const AsyncSidebarOnlyBottom = asyncComponent(() => import('../sidebar/sidebar-only-bottom'));
const AsyncSidebar = asyncComponent(() => import('../sidebar/sidebar'));
const AsyncLogout = asyncComponent(() => import('./logout'));
const AsyncPrivacyPolicy = asyncComponent(() => import('./privacy-policy'));
const AsyncProfile = asyncComponent(() => import('./profile'));
const AsyncInviteAccept = asyncComponent(() => import('./invite-accept'));

class AdminPage extends React.Component {
	render() {
		const { authenticated, id, email, match } = this.props;
		return ([
			<section key="wrapper" className="wrapper">
                <Switch>
                    <Route path="/" exact component={Home} />
                </Switch>
			</section>
		]);
	}
}

const mapStateToProps = state => ({
	authenticated: getAuthenticated(state),
	email: getUserEmail(state),
	id: getUserId(state),
});

AdminPage = connect(mapStateToProps, { applications })(AdminPage);

export default AuthenticatedPage;
