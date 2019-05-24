import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    FacebookShareCount
} from 'react-share';
import Facebook from 'mdi-material-ui/Facebook';
import Twitter from 'mdi-material-ui/Twitter';
import Linkedin from 'mdi-material-ui/Linkedin';

import Button from '@material-ui/core/Button';


const styles = theme => ({
    root: {
        display: 'flex',
        width: '100%',
        padding: `0px ${theme.spacing.unit }px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
    },
    button: {
        color: '#fff',
        textTransform: 'inherit',
        padding: `4px ${theme.spacing.unit * 3}px 4px ${theme.spacing.unit * 2}px`,
        borderRadius: 10,
        display: 'flex',
        fontSize: 15,
        marginRight: 15
    },
    facebook: {
        backgroundColor: '#2d4373',
        '&:hover': {
            backgroundColor: '#7486ad'
        }
    },
    twitter: {
        backgroundColor: '#222d3c',
        '&:hover': {
            backgroundColor: '#4e5f75'
        }
    },
    linkedin: {
        backgroundColor: '#007fb1',
        '&:hover': {
            backgroundColor: '#4994af'
        }
    },
    icon: {
        fontSize: 12
    }
});

const Share = ({classes, url}) => (
    <div className={classes.root}>
        <Button className={classNames(classes.button, classes.facebook)} color="inherit">
            <FacebookShareButton url={url}><Facebook className={classes.icon}/> facebook </FacebookShareButton>
            (<FacebookShareCount  url={url}/>)
        </Button>
        <Button className={classNames(classes.button, classes.twitter)} color="inherit">
            <TwitterShareButton url={url}><Twitter className={classes.icon}/> twitter </TwitterShareButton>
        </Button>
        <Button className={classNames(classes.button, classes.linkedin)} color="inherit">
            <LinkedinShareButton url={url}><Linkedin className={classes.icon}/> linkedIn </LinkedinShareButton>
        </Button>
    </div>                 
)

Share.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Share);
