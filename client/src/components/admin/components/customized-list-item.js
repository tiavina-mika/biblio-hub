import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    nested: {
        paddingLeft: theme.spacing.unit * 6,
        backgroundColor: '#1b2327'
    },
    listItem: {
        '&:hover': {
            backgroundColor: '#1b2327',
        }
    },
    item : {
        color: 'rgba(255,255,255,.7)',
        '&:hover': {
            color: 'rgba(255,255,255,.9)'
        }
    },
    divider: {
        borderColor: "rgba(255,255,255,.4)",
        borderWidth: '.5px'
    }
});

class CustomizedListItem extends React.Component {
    handleClick = () => {
        const { history, link } = this.props;
        history.push(link);
    }
    render () {
         const { icon, text, classes, nested } = this.props;
         return (
            <ListItem
                divider 
                button 
                classes={{divider: classes.divider}} 
                onClick={this.handleClick} 
                className={classNames(nested && classes.nested, classes.listItem)}  
                key={`${text}-${this.props.link}`}>
                <ListItemIcon className={classes.item}>
                    {icon}
                </ListItemIcon>
                <ListItemText inset primary={text} classes={{primary: classes.item}}/>
            </ListItem>
         )
    }
};



CustomizedListItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedListItem);