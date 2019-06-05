import React from 'react';
import PropTypes from 'prop-types';
import Notifications from 'react-notify-toast';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Header from './pages/header';
import Footer from './pages/footer';
import { connect } from 'react-redux';
import { getOne } from '../redux/actions/users';

const styles = theme => ({
  root: {
    display: 'block',
  },
  content: {
    [theme.breakpoints.up('md')]: {
    }
  },
});

class MainLayout extends React.Component {
  state = {
    mobileOpen: false,
    currentUser: ''
  };
  componentDidMount() {
    this.props.getOne(this.props.id).then(d => this.setState({currentUser: d}))
  }
  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  }
  render() {
    const { classes, children, history, authenticated, ...rest } = this.props;
    const { currentUser } = this.state;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header
          handleDrawerToggle={this.handleDrawerToggle}
          authenticated={authenticated}
          currentUser={currentUser}
          />
        <main className={classes.content}>
            <Notifications  options={{zIndex: 200, top: '80px'}}/>
            {children}
        </main>
        <Footer
            authenticated={authenticated}
            currentUser={currentUser}/>
      </div>
    );
  }
}

MainLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};
// export default withStyles(styles, { withTheme: true })(MainLayout)
export default connect(null, { getOne })(withStyles(styles, { withTheme: true })(MainLayout))
