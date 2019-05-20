import React, { Component } from 'react'
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllUsers, remove } from '../../../redux/actions/users';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { desc, stableSort, getSorting } from '../../../utils/utils';
import FloatingButtonActions from '../components/floating-button-actions';
import CustomizedLinearProgress  from '../components/progress';
import EnhancedTableToolbar  from '../components/list-table-toolbar';
import EnhancedTableHead  from '../components/list-table-head';
import ButtonActions  from '../components/list-table-actions';
import Checked  from '../components/checked';
import Chip from '@material-ui/core/Chip';
import { getUsers, getUsersLoading } from '../../../redux/root-reducer';
import Pagination from '../../blocks/pagination';
import { DASHBOARD_LIST_PER_PAGE } from '../../../redux/actions/constants';

const rows = [
  { id: 'name', disablePadding: false, label: 'Nom' },
  { id: 'email', disablePadding: false, label: 'Email' },
  { id: 'photo', disablePadding: false, label: 'Photo' },
  { id: 'checked', disablePadding: false, label: 'Vu' },
  { id: 'role', disablePadding: false, label: 'Role' },
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
  },
	chip: {
		marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    borderRadius: 8
  },
  adminChip: {
    borderColor: '#63ad5f',
    color: '#63ad5f'
  },
  userChip: {
    borderColor: '#d64444',
    color: '#d64444',
  }
});


class List extends Component {
  state = {
    order: 'asc',
    orderBy: 'createdAt',
    selected: [],
    page: 0,
    rowsPerPage: DASHBOARD_LIST_PER_PAGE,
  };

  componentDidMount() {
    const { getAllUsers, match : { params }} = this.props;
    params ? getAllUsers(DASHBOARD_LIST_PER_PAGE, 1, params.search) : getAllUsers(DASHBOARD_LIST_PER_PAGE, 1);
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
      this.setState(state => ({ selected: this.props.data.users.map(n => n._id) }));

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

  handleShow = (id) => {
    this.props.history.push(`/dashboard/utilisateur/${id}`);
  }
  handleEdit = (id) => {
    this.props.history.push(`/dashboard/modifier/utilisateur/${id}`);
  }
  handleDelete = (id) => {
    this.props.remove(id)
    this.props.history.push(`/dashboard/redirect`);
  }
  handleChangePage = page => {
    this.setState({page});
    this.props.getAllUsers(DASHBOARD_LIST_PER_PAGE, page);
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes, data, loading, history: { push } } = this.props;
    const dataLength = !loading && data ? data.users.length : 0;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataLength - page * rowsPerPage);

    if(loading) {
      return <CustomizedLinearProgress />
    }

    return (
      data && !loading
      ? <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} handleDeleteAllClick={this.handleDeleteAllClick} title="Liste des utilisateurs"/>
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
              {stableSort(data.users, getSorting(order, orderBy))
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
                      <TableCell align="right">{n.email}</TableCell>
                      <TableCell align="right"><Checked checked={n.photo}/></TableCell>
                      <TableCell align="right"><Checked checked={n.checked}/></TableCell>
                      <TableCell align="right">
                        <Chip
                          label={n.role}
                          className={classes.chip}
                          classes={{outlined: n.role === 'ADMIN' ? classes.adminChip :classes.userChip}}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="right">{moment(new Date(n.createdAt)).format('DD MMMM YYYY')}</TableCell>
                      <TableCell align="right">                     
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
                  <TableCell colSpan={9} />
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
            name="utilisateur"
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

const mapStateToProps = (state) => ({
  data: getUsers(state),
  loading: getUsersLoading(state),
});

export default connect(mapStateToProps, { getAllUsers, remove })(withStyles(styles)(List))