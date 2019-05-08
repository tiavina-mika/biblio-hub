import React, { Component } from 'react';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { getAllAuthors, remove } from '../../../redux/actions/authors';
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

const rows = [
  { id: 'first_name', numeric: false, disablePadding: false, label: 'Prenoms' },
  { id: 'family_name', numeric: false, disablePadding: false, label: 'Nom' },
  { id: 'photo', numeric: false, disablePadding: false, label: 'Photo' },
  { id: 'date_of_birth', numeric: false, disablePadding: false, label: 'Date de naissance' },
  { id: 'createdAt', numeric: false, disablePadding: false, label: 'Ajouté le' },
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
    orderBy: 'family_name',
    selected: [],
    page: 0,
    rowsPerPage: 5,
  };

  componentDidMount() {
    this.props.getAllAuthors()
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
      this.setState(state => ({ selected: this.props.data.map(n => n._id) }));

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
    this.props.history.push(`/dashboard/auteur/${id}`);
  }
  handleEdit = (id) => {
    this.props.history.push(`/dashboard/modifier/auteur/${id}`);
  }
  handleDelete = (id) => {
    this.props.remove(id)
    this.props.history.push(`/dashboard/redirect`);
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes, data, loading } = this.props;
    const dataLength = !loading && data ? data.length : 0;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataLength - page * rowsPerPage);

    if(loading) {
      return <CustomizedLinearProgress />
    }

    return (
      data && !loading
      ? <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} handleDeleteAllClick={this.handleDeleteAllClick} title="Liste des auteurs"/>
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
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                        {n.first_name}
                      </TableCell>
                      <TableCell align="right">{n.family_name}</TableCell>
                      <TableCell align="right"><Checked checked={n.photo}/></TableCell>
                      <TableCell align="right">{moment(new Date(n.date_of_birth)).format('DD MMMM YYYY')}</TableCell>
                      <TableCell align="right">{moment(new Date(n.createdAt)).format('DD MMMM YYYY')}</TableCell>
                      <TableCell align="right">
                        <ButtonActions
                            dataTitle={n.title}
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
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dataLength}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />

        <FloatingButtonActions
            name="auteur"
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
  data: state.authors.data.get('authors'),
  loading: state.authors.data.loading,
})

export default connect(mapStateToProps, { getAllAuthors, remove })(withStyles(styles)(List))