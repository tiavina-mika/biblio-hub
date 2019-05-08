import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

const styles = {
    hovered: {
        '&:hover': {
            backgroundColor: 'transparent'
        }
    }
  };

class AlertDialog extends React.Component {
    state = {
        open: false,
    };
    
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    handleClickClose = () => {
        this.setState({ open: false });
        this.props.onClick();
    };

    
    render() {
        const { component : Component, onClick, classes, icon, title, content, submitButtonText, tooltip, color, key } = this.props;
        return ([
                <Tooltip
                    title={tooltip}
                    key={key}
                    placement='top'
                    enterDelay={300}> 
                    <Component  key={key} onClick={this.handleClickOpen} color={color} className={classes.hovered}>
                        {icon}
                    </Component>
                </Tooltip>,
                <Dialog
                    key={key}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {content}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Annuler
                        </Button>
                        <Button onClick={this.handleClickClose} color="primary" variant="contained" autoFocus>
                            {submitButtonText}
                        </Button>
                    </DialogActions>
                </Dialog>
        ])
    }
}
AlertDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};
    
export default withStyles(styles)(AlertDialog);
