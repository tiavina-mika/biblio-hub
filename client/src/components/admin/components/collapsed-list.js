import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { withStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';

const DASHBOARD_MAIN_COLOR = '#1b2327';

const styles = {
    listItem: {
        '&:hover': {
            backgroundColor: DASHBOARD_MAIN_COLOR,
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
};

class CollapsedList extends React.Component {
    state = {
        open: false
    };
    handleOpen = () => {
        this.setState(state => ({ open: !state.open }));
    };

    render() {
        const { classes, text, icon, collapse } = this.props;
        return ([
            <ListItem
                key={uuid}
                button
                classes={{divider: classes.divider}} 
                divider 
                onClick={this.handleOpen} 
                className={classes.listItem}>
                <ListItemIcon className={classes.item}>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={text} classes={{primary: classes.item}}/>
                {this.state.open ? <ExpandLess className={classes.item}/> : <ExpandMore className={classes.item}/>}
            </ListItem>,
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {collapse}
                </List>
            </Collapse>]
        )                
    }
}

CollapsedList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CollapsedList);