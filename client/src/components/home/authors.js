import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { getAllAuthors } from '../../redux/actions/authors';
import TitleHeader from '../blocks/title-header';
import { getAuthorsLoading, getAuthors } from '../../redux/root-reducer';
import Author from './author';
import { AUTHORS_HOME_LIMIT } from '../../redux/actions/constants';
import Spinner from '../blocks/spinner';
import NoData from '../blocks/no-data';
const styles = theme => ({
  root: {
      padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 4}px 0`,
      margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit}px 0`,
  },
});

class Authors extends Component {
   componentDidMount() {
    this.props.getAllAuthors(AUTHORS_HOME_LIMIT, 1);
  }

  render() {
    const { classes, loading, data, headerTitle, path } = this.props;
    if(loading) {
      return <Spinner color="rgba(0, 0, 0, .5)" height={50} width={50}/>
    }
    if(!data && !loading) {
      return <NoData title="Il n'y a pas encore d'auteur disponible sur le site"/>
    }
    return (
      data && data.authors
      ? <div className={classes.root}>
            <TitleHeader title={headerTitle} path={path} />
            <Grid container spacing={10}>
                {data.authors.map(n => <Author data={n} loading={loading} />)}
            </Grid>
        </div>
      : <Spinner/>
    );
  }
}

Authors.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
   data: getAuthors(state),
   loading: getAuthorsLoading(state),
});

export default connect(mapStateToProps, { getAllAuthors })(withStyles(styles)(Authors))