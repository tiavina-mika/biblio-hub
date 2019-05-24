import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Signin from './signin';
import Signup from './signup';
const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px`,
  },
  tabsIndicator: {
    backgroundColor: 'rgba(0,0,0,.12)',
  },
  tabsRoot: {
    padding: `${theme.spacing.unit}px 0`,

  },
  tabRoot: {
    textTransform: 'initial',
    fontSize: 18,
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 4,
    borderRadius: 2,
    color: '#666',
    opacity: 1,
    '&$tabSelected': {
      color: '#fff',
      fontWeight: theme.typography.fontWeightMedium,
      backgroundColor: theme.palette.primary.main,
    },
    '&:focus': {
      color: '#fff',
    },
  },
  tabSelected: {},
  dialogContent: {
    paddingRight: 0, 
    paddingLeft: 0,
    paddingTop: 50,
    textAlign: 'center'
  }
});

class SimpleTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, onClose, history, currentUrl } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
          <Tabs
            value={value}
             variant="fullWidth"
            onChange={this.handleChange}
            classes={{ indicator: classes.tabsIndicator,  root: classes.tabsRoot }}>
              <Tab
                label="Se connecter"
                classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                />
              <Tab 
                label="S'enregistrer"
                classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                />
          </Tabs>
        {value === 0 && 
            <Signin  onClose={onClose}  history={history} currentUrl={currentUrl}/>
        }
        {value === 1 && 
            <Signup  history={history} onClose={onClose}/>
        }
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);