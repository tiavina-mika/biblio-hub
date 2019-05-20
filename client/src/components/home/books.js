import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { getAll } from '../../redux/actions/books';
import Spinner from '../blocks/spinner';
import NoData from '../blocks/no-data';
import TitleHeader from '../blocks/title-header';
import { getBooksLoading } from '../../redux/root-reducer';
import Book from './book';
import { BOOKS_HOME_LIMIT } from '../../redux/actions/constants';

const styles = theme => ({
    root: {
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 4}px 0`,
        margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit}px 0`,
    },
});

class Books extends Component {
  state = {data: ''}
  componentDidMount() {
    const { getAll, member } = this.props;
    member
      ? getAll(BOOKS_HOME_LIMIT, 1, true, true).then(res => this.setState({data: res.books}))
      : getAll(BOOKS_HOME_LIMIT, 1, true, false).then(res => this.setState({data: res.books}));
  }
  render() {
    const { classes, loading, headerTitle, path } = this.props;
    const { data } = this.state;

    if(loading) {
      return <Spinner color="rgba(0, 0, 0, .5)" height={50} width={50}/>
    }
    if(!data && !loading) {
      return <NoData title="Il n'y a pas encore de livre disponible sur le site"/>
    }
    return (
      data 
      ? <div className={classes.root}>
            {headerTitle && <TitleHeader title={headerTitle} path={path} /> }
            <Grid container spacing={8}>
                {data.map(n => <Book book={n} loading={loading} />)}
            </Grid>
        </div>
      : <Spinner/>
    );
  }
}

Books.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
   loading: getBooksLoading(state),
});

export default connect(mapStateToProps, { getAll })(withStyles(styles)(Books))