import React, { Component } from 'react'
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { getAllGenres, remove } from '../../../redux/actions/genres';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import { desc, stableSort, getSorting } from '../../../utils/utils';
import FloatingButtonActions from '../components/floating-button-actions';
import CustomizedLinearProgress  from '../components/progress';
import EnhancedTableToolbar  from '../components/list-table-toolbar';
import EnhancedTableHead  from '../components/list-table-head';
import ButtonActions  from '../components/list-table-actions';
import Checked  from '../components/checked';
import { getGenres, getGenresLoading } from '../../../redux/root-reducer';
import Pagination from '../../blocks/pagination';
import { DASHBOARD_LIST_PER_PAGE } from '../../../redux/actions/constants';
import Helmet from '../../helmet';

const rows = [
  { id: 'name', disablePadding: false, label: 'Nom' },
  { id: 'photo', numeric: false, disablePadding: false, label: 'Photo' },
  { id: 'createdAt', disablePadding: false, label: 'Ajouté le' },
];

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  noData: {
    padding: 20
  },
  actionButtons: {
    '&:hover': {
      backgroundColor: 'transparent'
    }
  }
});


class List extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'name',
    selected: [],
    page: 0,
    rowsPerPage: DASHBOARD_LIST_PER_PAGE,
  };

  componentDidMount() {
    const { getAllGenres, match : { params }} = this.props;
    params ? getAllGenres(DASHBOARD_LIST_PER_PAGE, 1, params.search):  getAllGenres(DASHBOARD_LIST_PER_PAGE, 1);
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: this.props.data.genres.map(n => n._id) }));

      return;
    }
    this.setState({ selected: [] });
  };

  handleDeleteAllClick = event => {
      const selectedValues = Object.values(this.state.selected);
      selectedValues.map(n => this.props.remove(n));
      this.setState({ selected: [] });
      this.props.history.push(`/dashboard/redirect`);
  };


  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleShow = (id) => {
    this.props.history.push(`/dashboard/genre/${id}`);
  }
  handleEdit = (id) => {
    this.props.history.push(`/dashboard/modifier/genre/${id}`);
  }
  handleDelete = (id) => {
    this.props.remove(id)
    this.props.history.push(`/dashboard/redirect`);
  }
  handleChangePage = page => {
    this.setState({page});
    this.props.getAllGenres(DASHBOARD_LIST_PER_PAGE, page);
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes, data, loading } = this.props;
    const dataLength = !loading && data ? data.genres.length : 0;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataLength - page * rowsPerPage);

    if(loading) {
      return <CustomizedLinearProgress />
    }

    return (
      data && !loading
      ? <Paper className={classes.root}>
          <Helmet title="Liste des genres" />
          <EnhancedTableToolbar numSelected={selected.length} handleDeleteAllClick={this.handleDeleteAllClick} title="Liste des genres"/>
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={dataLength}
                rows={rows}
              />
              <TableBody>
                {stableSort(data.genres, getSorting(order, orderBy))
                  .map(n => {
                    const isSelected = this.isSelected(n._id);
                    return (
                      <TableRow
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n._id}
                        selected={isSelected}
                      >
                        <TableCell padding="checkbox">                     
                          <Checkbox checked={isSelected} onChange={event => this.handleClick(event, n._id)} />
                        </TableCell>
                        <TableCell component="th" align="right">
                          {n.name}
                        </TableCell>
                        <TableCell align="right"><Checked checked={n.photo}/></TableCell>
                        <TableCell align="right">{moment(new Date(n.createdAt)).format('DD MMMM YYYY')}</TableCell>

                        <TableCell align="center">
                          <ButtonActions
                              dataTitle={n.name}
                              key={n._id}
                              onShow={() => this.handleShow(n._id)}
                              onRemove={() => this.handleDelete(n._id)}
                              onEdit={() => this.handleEdit(n._id)}
                            />                     
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 10 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <Pagination
            currentPage={data.currentPage}
            total={data.pages}
            onChange={this.handleChangePage}
          />

          <FloatingButtonActions
              name="genre"
              add
              remove={selected.length > 0}
              onDelete={this.handleDeleteAllClick}
            />
        </Paper>
      : <CustomizedLinearProgress/>
    );
  }
}

List.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: getGenres(state),
  loading: getGenresLoading(state),
});

export default connect(mapStateToProps, { getAllGenres, remove })(withStyles(styles)(List))