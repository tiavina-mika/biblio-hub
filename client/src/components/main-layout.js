import React from 'react';
import PropTypes from 'prop-types';
import Notifications from 'react-notify-toast';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Header from './pages/header';

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
  render() {
    const { classes, children, history, authenticated, ...rest } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header />
        <main className={classes.content}>
            <Notifications  options={{zIndex: 200, top: '80px'}}/>
            {children}
        </main>
      </div>
    );
  }
}

MainLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(MainLayout);