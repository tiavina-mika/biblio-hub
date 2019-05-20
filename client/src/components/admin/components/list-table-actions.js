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
        const remove = onRemove && <AlertDialog
                key={key}
                style={classes.actionButtons}
                component={Button}
                tooltip={`Supprimer ${dataTitle}`}
                icon={<TrashCanOutline />}
                title="Suppression"
                content={`Voulez-vous supprimez ${dataTitle}`}
                submitButtonText='Supprimer'
                onClick={onRemove}
            />;
        const show = onShow && <Tooltip
                title="Voir preview"
                key={key}
                placement='top'
                enterDelay={300}> 
                    <Button onClick={onShow} className={classes.actionButtons}>
                        <EyeOutline />
                    </Button>                   
            </Tooltip>;
        const edit = onEdit && <Tooltip
                title={`Modifier ${dataTitle}`}
                key={key}
                placement='top'
                enterDelay={300}>             
                    <Button onClick={onEdit} className={classes.actionButtons}>
                        <Pencil />
                    </Button> 
            </Tooltip> ;
        return ([remove,show,edit]);
}
ButtonActions.propTypes = {
    classes: PropTypes.object.isRequired,
};
    
export default withStyles(styles)(ButtonActions);
