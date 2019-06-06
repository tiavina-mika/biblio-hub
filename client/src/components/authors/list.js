import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';

import { getAuthors, getAuthorsLoading } from '../../redux/root-reducer';
import Genres from '../sidebars/genres';
import Books from '../sidebars/list-books';
import { getAllAuthors } from '../../redux/actions/authors';
import MainList from './main-list';
import Spinner from '../blocks/spinner';
import NoData from '../blocks/no-data';
import { LIST_AUTHORS_PER_PAGE } from '../../redux/actions/constants';
import Helmet from '../helmet';

const styles = theme => ({
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
  cardGrid: {
      padding: `${theme.spacing.unit * 4}px 0`,
  },
});

class List extends React.Component {
  componentDidMount() {
    const { getAllAuthors, match : { params }} = this.props;
    params ? getAllAuthors(LIST_AUTHORS_PER_PAGE, 1, params.search) : getAllAuthors(LIST_AUTHORS_PER_PAGE, 1);
  }
  handleChangePage = page => {
    this.props.getAllAuthors(LIST_AUTHORS_PER_PAGE, page);
  }
  render() {
    const { classes, loading, data } = this.props;
    
    if(loading) {
      return <Spinner />
    }
    if(!data && !loading) {
      return <NoData title="Il n'y a pas encore d'auteur" link/>
    }
    return (
      data && data.authors ?
        <div className={classNames(classes.layout, classes.cardGrid)}>
            <Helmet title="Auteurs" />
            <Grid fluid>
                <Row center="xs">
                <Col  xs={12} sm={8} md={3} lg={3} start="xs">
                    <Card>
                        <Genres />
                    </Card>
                    <Card style={{marginTop: 50}}>
                        <Books />
                    </Card>
                </Col>
                {data && <MainList 
                    authors={data.authors}
                    currentPage={data.currentPage}
                    total={data.total}
                    headerTitle={`Liste des auteurs`}
                    pages={data.pages}
                    onChange={this.handleChangePage}
                    sm={8}
                    md={7}
                    lg={9}
                    listLg={3}
                /> }
                </Row>
            </Grid>
        </div>
        : <Spinner />   
        );
    }
}

List.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: getAuthors(state),
  loading: getAuthorsLoading(state),
});

export default connect(mapStateToProps, { getAllAuthors })(withStyles(styles)(List));
