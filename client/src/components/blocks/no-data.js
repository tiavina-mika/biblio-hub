import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/Grid';
import { Grid, Row, Col } from 'react-flexbox-grid';

const styles = theme => ({
    grid: {
        padding:`${theme.spacing.unit * 8}px ${theme.spacing.unit * 3}px `,
    },
    title: {
        fontFamily: 'Helvetica',
        width: '100%'
    },
    link: {
        marginTop: theme.spacing.unit * 3
    }
});

const NoData = props => {
    const { classes, title, link } = props;
    return <Grid fluid>
                <Row center="xs">
                    <Col xs={12} sm={12} md={12} lg={12} start="xs">
                        <GridList container spacing={8} justify="center" className={classes.grid}>
                            <Typography variant='h6' className={classes.title}>{title}</Typography>
                            {link && <Link to={link || '/'} className={classes.link}>Retourner sur la page d'accueil?</Link>}
                        </GridList>
                    </Col>
                </Row>
            </Grid>
}

NoData.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NoData);