import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import AlertDialog from './alert-dialog';
import TrashCanOutline from 'mdi-material-ui/TrashCanOutline';
import EyeOutline from 'mdi-material-ui/EyeOutline';
import Pencil from 'mdi-material-ui/Pencil';

const styles = {
    actionButtons: {
        '&:hover': {
        backgroundColor: 'transparent'
        }
    }
};

const ButtonActions = props => {
        const { dataTitle, classes, onRemove, onEdit, onShow, key } = props;
        return ([
                <AlertDialog
                    key={key}
                    style={classes.actionButtons}
                    component={Button}
                    tooltip="Supprimer"
                    icon={<TrashCanOutline />}
                    title="Suppression"
                    content={`Voulez-vous supprimez ${dataTitle}`}
                    submitButtonText='Supprimer'
                    onClick={onRemove}
                />,
                <Tooltip
                    title="Voir preview"
                    key={key}
                    placement='top'
                    enterDelay={300}> 
                        <Button onClick={onShow} className={classes.actionButtons}>
                            <EyeOutline />
                        </Button>                   
                </Tooltip>,
                <Tooltip
                    title="Modifier"
                    key={key}
                    placement='top'
                    enterDelay={300}>             
                        <Button onClick={onEdit} className={classes.actionButtons}>
                            <Pencil />
                        </Button> 
                </Tooltip> 
        ])
}
ButtonActions.propTypes = {
    classes: PropTypes.object.isRequired,
};
    
export default withStyles(styles)(ButtonActions);
