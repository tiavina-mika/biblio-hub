import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Link from '@material-ui/core/Link';

const styles = theme => ({
    breadcrumbs: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
        marginBottom: 25,
        [theme.breakpoints.down('md')]: {
            marginTop: 15
        }
    },
});

const CustomizedBreadcrumbs = ({ classes, actualText, text1, link1, text2, link2 }) => (
    <Card className={classes.breadcrumbs}>
        <Breadcrumbs separator="›" arial-label="Breadcrumb">
            <Link color="inherit" href="/dashboard">
                Dashboard
            </Link>
            { text1 && link1 &&
                <Link color="inherit" href={link1}>
                    {text1}
                </Link>
            }
            { text2 && link2 &&
                <Link color="inherit" href={link2}>
                    {text2}
                </Link>
            }
            <Typography color="textPrimary">{actualText}</Typography>
        </Breadcrumbs>
    </Card>
);

CustomizedBreadcrumbs.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(CustomizedBreadcrumbs)