import React, { Component } from 'react'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllUsers, remove } from '../../../redux/actions/users';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { desc, stableSort, getSorting } from '../../../utils/utils';
import FloatingButtonActions from './floating-button-actions';
import CustomizedLinearProgress  from './progress';
import EnhancedTableToolbar  from './list-table-toolbar';
import EnhancedTableHead  from './list-table-head';
import ButtonActions  from './list-table-actions';
import ListRow  from '../users/list';

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
    orderBy: this.props.orderBy,
    selected: [],
    page: 0,
    rowsPerPage: 5,
  };

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

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes, data, loading, history , name, rows } = this.props;
    const dataLength = !loading && data ? data.length : 0;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataLength - page * rowsPerPage);

    if(loading) {
      return <CustomizedLinearProgress />
    }

    return (
      data && !loading
      ? <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} handleDeleteAllClick={this.handleDeleteAllClick} title={`Liste des ${name}s`}/>
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
                    return <ListRow 
                        data={n} 
                        emptyRows={emptyRows}
                        loading={loading}
                        dataLength={dataLength}
                        order={order}
                        isSelected={isSelected}
                        orderBy={orderBy}
                        selected={selected}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        isSelected={this.isSelected}
                        history={history}/>
                })}

              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={9} />
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
            name={name}
            add
            remove={selected.length > 0}
            onDelete={this.handleDeleteAllClick}
          />
      </Paper>
      : <CustomizedLinearProgress />
    );
  }
}

List.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(List)