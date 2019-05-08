import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';

import { connect } from 'react-redux';
import { getGenre, remove } from '../../../redux/actions/genres';
import { getBooksByGenre } from '../../../redux/actions/books';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CustomizedBreadcrumbs from '../components/breadcrumbs';
import FloatingButtonActions from '../components/floating-button-actions';
import CustomizedLinearProgress  from '../components/progress';
import ListBy  from '../books/list-by';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  table: {
    minWidth: 700,
  },
  th: {
    fontWeight: 700
  },
  cardTable: {
    marginTop: 5,
    marginBottom: 55,
  },
  cardTitle: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
    marginBottom: 5
  },
  title: {
    fontSize: 20,
    fontWeight: 700
  },
  breadcrumbs: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    marginBottom: 25
  },
});

class Show extends React.Component {
  state = {books: ''};
  async componentDidMount() {
    const genre = await this.props.getGenre(this.props.match.params.id);
    const books = await this.props.getBooksByGenre(genre._id);
    this.setState({books: books});
  }
   render() {
    const { classes, data, loading } = this.props;
    const {books } = this.state;

    if(loading) {
      return <CustomizedLinearProgress />
    }
    return (
      data && !loading ?
      <div className={classes.root}>
        <Grid fluid>
          <Row center="xs">
            <Col xs={12} sm={9} md={7} lg={8} start="xs">
              <CustomizedBreadcrumbs
                text1="Genres"
                link1="/dashboard/genres"
                actualText={data.name}
              />
              <Card className={classes.cardTitle}>
                <Typography variant="title" className={classes.title}>
                  {data.name.toUpperCase()}
                </Typography>
              </Card>
              <Card className={classes.cardTable}>
                <Table className={classes.table}>
                    <TableRow>
                        <TableCell align="right">Nom</TableCell>
                        <TableCell align="left" className={classes.th}>{data.name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="right">Ajouté le</TableCell>
                        <TableCell align="left"  className={classes.th}>{moment(new Date(data.createdAt)).format('DD MMM YYYY à HH:mm')}</TableCell>
                      </TableRow> 
                      { data.updatedAt &&
                      <TableRow>
                        <TableCell align="right">Modifié le</TableCell>
                        <TableCell align="left"  className={classes.th}>{moment(new Date(data.updatedAt)).format('DD MMM YYYY à HH:mm')}</TableCell>
                      </TableRow> }
                      { data.slug &&
                      <TableRow>
                        <TableCell align="right">Slug</TableCell>
                        <TableCell align="left"  className={classes.th}>{data.slug}</TableCell>
                      </TableRow> }
  
                    </Table>
                </Card>
                <ListBy data={books} author={data} history={this.props.history}/>
              </Col>
            </Row>
          </Grid>
          <FloatingButtonActions
            title={`${data.name}`}
            name='genre'
            add 
            remove
            edit
            list
            onDelete={() => this.props.remove(data._id)}
            id={data._id}
          />
      </div>
      : <CustomizedLinearProgress />
    );
  }
}

Show.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.genres.genre.get('genre'),
  loading: state.genres.data.loading,
})

export default connect(mapStateToProps, { getGenre, getBooksByGenre , remove })(withStyles(styles)(Show))
