import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Row, Col } from 'react-flexbox-grid';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Facebook, Youtube, Twitter } from 'mdi-material-ui';
import { Typography } from '@material-ui/core';
import { getAuthenticated, getIsAdmin, getUserId } from '../../redux/root-reducer';

const footerMainColor = '#263238';
const greyColor = '#cbd0d3';

const styles = theme => ({
    root: {
        backgroundColor: footerMainColor,
        width: '100%',
        flexShrink: 0,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
          width: 1500,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
    },
    link: {
        color: footerMainColor,
        fontSize: 60,
        marginRight: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 2,
        height: 60,
        width: 60,
        borderRadius: '50%',
    },
    linkMenu: {
        color: greyColor,
        marginRight: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
        fontSize: 16,
        fontFamily: 'Nunito'
    },
    icon: {
        fontSize: 60,
        backgroundColor: greyColor,
        height: 60,
        width: 60,
        borderRadius: '50%',
        padding: 10,
        '&:hover': {
            backgroundColor:'rgba(255, 255, 255, .5)',
        }
    },
    titleContainer: {
        paddingTop: theme.spacing.unit * 8,
        paddingBottom: theme.spacing.unit * 3
    },
    mainTitleContainer: {
        paddingBottom: theme.spacing.unit * 5
    },
    menuContainer: {
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    },
    title: {
        color: greyColor
    },
    copyright: {
        textDecoration: 'none'
    }
});

const Footer = (props) => {
    const { classes, authenticated, isAdmin } = props;
    return <div className={classes.root}> 
                <Grid fluid className={classNames(classes.layout)}>
                    <Row center="xs">
                        <Col xs={12} sm={8} md={8} lg={12} start="xs">
                            <div className={classes.titleContainer}>
                                <Typography variant="h6" className={classes.title}>Suivez-nous</Typography>
                            </div>
                            <div className={classes.mainTitleContainer}>
                                <Link to="/facebook" className={classes.link}>
                                    <Facebook className={classes.icon}/>
                                </Link>
                                <Link to="/facebook" className={classes.link}>
                                    <Youtube className={classes.icon}/>
                                </Link>
                                <Link to="/facebook" className={classes.link}>
                                    <Twitter className={classes.icon}/>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                    <Row center="xs">
                        <Col xs={12} sm={8} md={8} lg={12} start="xs">
                            <div className={classes.menuContainer}>
                                <Link to="/contact" className={classes.linkMenu}>
                                    Contact
                                </Link>
                                { isAdmin && <Link to="/dashboard" className={classes.linkMenu}>
                                    Dashboard
                                </Link>}
                                <Link className={classNames(classes.linkMenu, classes.copyright)}>
                                     &copy; { new Date().getFullYear()} {process.env.REACT_APP_NAME}
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    authenticated: getAuthenticated(state),
    isAdmin: getIsAdmin(state),
    id: getUserId(state),
});

export default connect(mapStateToProps)(withStyles(styles)(Footer));