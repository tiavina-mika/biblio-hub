import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Pencil from 'mdi-material-ui/Pencil';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import ViewListIcon from '@material-ui/icons/ViewList';
import Tooltip from '@material-ui/core/Tooltip';
import AlertDialog from './alert-dialog';

const styles = theme => ({
    root: {
        position: 'fixed',
        bottom: 5,
        left: '15%',
        [theme.breakpoints.down('md')]: {
            left: '30%',
            position: 'relative'
        }
    },
    fab: {
        marginRight: theme.spacing.unit,
    },
});

class FloatingButtonOnShowActions extends React.Component {
    state = {
        open: false,
    };
    onAddClick = () => {
        this.props.history.push(`/dashboard/ajouter/${this.props.name}`);
    }
    onEditClick = () => {
        this.props.history.push(`/dashboard/modifier/${this.props.name}/${this.props.id}`)
    }
    onListClick = () => {
        this.props.history.push(`/dashboard/${this.props.name}s`)
    }  
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    
    render() {
        const { classes, name, onDelete, add, list, title, edit, remove } = this.props;
        return (
            <div className={classes.root}>
                { add &&
                    <Tooltip
                        title={`Ajouter ${name}`}
                        placement='top'
                        enterDelay={300}>
                        <Fab color="primary" aria-label="Add" className={classes.fab} onClick={this.onAddClick}>
                            <AddIcon />
                        </Fab> 
                    </Tooltip> }
                { edit && 
                    <Tooltip
                        title={`Modifier ${title}`}
                        placement='top'
                        enterDelay={300}>
                        <Fab color="secondary" aria-label="Edit" className={classes.fab} onClick={this.onEditClick}>
                            <Pencil />
                        </Fab>
                    </Tooltip> }
                { list &&
                    <Tooltip
                        title={`Liste des ${name}s`}
                        placement='top'
                        enterDelay={300}>              
                            <Fab color="inherit" aria-label="Edit" className={classes.fab} style={{ backgroundColor: '#019108'}} onClick={this.onListClick}>
                                <ViewListIcon style={{ color: "white"}}/>
                            </Fab>
                    </Tooltip> }
                { remove && <AlertDialog
                    style={classes.fab}
                    component={Fab}
                    icon={<DeleteIcon />}
                    title="Suppression"
                    content={`Voulez-vous supprimez ${title}`}
                    submitButtonText='Supprimer'
                    tooltip={`Supprimer ${title}`}
                    onClick={onDelete}
                /> }
            </div>
        )
    }
}

FloatingButtonOnShowActions.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withRouter(withStyles(styles)(FloatingButtonOnShowActions))