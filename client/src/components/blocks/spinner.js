import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    fullScreen: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        position:'absolute' 
    },
    local: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
}

const Spinner = ({classes, local, height, width, color, backgroundColor, type}) => (
    <div className={!local ? classes.fullScreen : ''}>
        <Loader 
            type={type || "Oval"}
            color={color || "#17a288"}
            height={height || '100'}	
            width={width || '100'}
            style={{backgroundColor : backgroundColor}}
        />
    </div>
);

Spinner.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Spinner);