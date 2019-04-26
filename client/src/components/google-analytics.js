import React from 'react';
import { withRouter } from 'react-router-dom';
import GA from 'react-router-google-analytics';

class GoogleAnalytics extends React.Component {
    componentWillUpdate ({ location, history }) {
        if (location.pathname === this.props.location.pathname) {
            return;
        }
        if(history.action === 'PUSH' && typeof(GA) === 'function') {
            GA(process.env.REACT_APP_GOOGLE_ANALYTICS)('send', 'pageview', location.pathname);
        }
    }

    render () {
        return null;
    }
}

export default withRouter(GoogleAnalytics);