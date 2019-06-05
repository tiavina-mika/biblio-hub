import React, { Component } from 'react';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAll, remove } from '../../../redux/actions/books';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { desc, stableSort, getSorting } from '../../../utils/utils';
import FloatingButtonActions from '../components/floating-button-actions';
import CustomizedLinearProgress  from '../components/progress';
import EnhancedTableToolbar  from '../components/list-table-toolbar';
import EnhancedTableHead  from '../components/list-table-head';
import ButtonActions  from '../components/list-table-actions';
import Checked  from '../components/checked';
import { getBooks, getBooksLoading } from '../../../redux/root-reducer';
import Pagination from '../../blocks/pagination';
import { DASHBOARD_LIST_PER_PAGE } from '../../../redux/actions/constants';
import { Typography } from '@material-ui/core';
import Helmet from '../../helmet';

const rows = [
  { id: 'title', disablePadding: false, label: 'Titre' },
  { id: 'photo', disablePadding: false, label: 'Photo' },
  { id: 'epub', disablePadding: false, label: 'Epub' },
  { id: 'pdf', disablePadding: false, label: 'Pdf' },
  { id: 'views', disablePadding: false, label: 'vues' },
  { id: 'comments', disablePadding: false, label: 'commentaires' },
  { id: 'createdAt', disablePadding: false, label: 'Ajouté le' },
];

const getSort = name => {
  let query;
  if(name === 'titre') {
    query = 'title';
  } else if (name === 'date') {
    query = 'createdAt'
  } else if (name === 'telechargement') {
    query = 'download'
  } else if (name === 'vues') {
    query = 'views'
  }
  return query;
}

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
  totalComment: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff'
  },
  totalNonReadComment: {
    backgroundColor: '#961919',
    color: '#fff'
  },
  subheading: {
    color: '#898989',
    fontSize: 13
  }
});


class List extends Component {
  state = {
    order: 'asc',
    orderBy: 'family_name',
    selected: [],
    page: 0,
    rowsPerPage: DASHBOARD_LIST_PER_PAGE,
  };

  componentDidMount() {
    const { getAll, match : { params }} = this.props;    
    if(params && params.search) {
        getAll(DASHBOARD_LIST_PER_PAGE, 1, null, null, params.search)
    } else if(params && params.sort) {
        getAll(DASHBOARD_LIST_PER_PAGE, 1, null, null, null, getSort(params.sort))
    } else {
        getAll(DASHBOARD_LIST_PER_PAGE, 1)
    }
  }
  componentWillUpdate ({ location }) {
    const { getAll, match : { params }} = this.props;    
      if (location.pathname !== this.props.location.pathname) {
        if(params && params.search) {
            getAll(DASHBOARD_LIST_PER_PAGE, 1, null, null, params.search)
        } else if(params && params.sort) {
            getAll(DASHBOARD_LIST_PER_PAGE, 1, null, null, null, getSort(params.sort))
        } else {
            getAll(DASHBOARD_LIST_PER_PAGE, 1)
        }
      }
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
      this.setState(state => ({ selected: this.props.data.books.map(n => n._id) }));

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
    this.props.history.push(`/dashboard/livre/${id}`);
  }
  handleEdit = (id) => {
    this.props.history.push(`/dashboard/modifier/livre/${id}`);
  }
  handleDelete = (id) => {
    this.props.remove(id)
    this.props.history.push(`/dashboard/redirect`);
  }

  handleChangePage = page => {
    this.setState({page});
    const { getAll, match : { params }} = this.props;    
    if(params && params.search) {
        getAll(DASHBOARD_LIST_PER_PAGE, page, null, null, params.search)
    } else if(params && params.sort) {
        getAll(DASHBOARD_LIST_PER_PAGE, page, null, null, null, getSort(params.sort))
    } else {
        getAll(DASHBOARD_LIST_PER_PAGE, page, null)
    }
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes, data, loading } = this.props;
    const dataLength = !loading && data ? data.books.length : 0;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataLength - page * rowsPerPage);

    if(loading) {
      return <CustomizedLinearProgress />
    }

    return (
      data && !loading
      ? <Paper className={classes.root}>
          <Helmet title="Liste des livres" />
          <EnhancedTableToolbar numSelected={selected.length} handleDeleteAllClick={this.handleDeleteAllClick} title="Liste des livres"/>
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
                {stableSort(data.books, getSorting(order, orderBy))
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
                          {n.title}
                          <Typography variant="subheading" className={classes.subheading}>{n.author && n.author.family_name}</Typography>
                        </TableCell>
                        <TableCell align="right"><Checked checked={n.photo}/></TableCell>
                        <TableCell align="right"><Checked checked={n.epub}/></TableCell>
                        <TableCell align="right"><Checked checked={n.pdf}/></TableCell>
                        <TableCell align="right">{n.views}</TableCell>
                        <TableCell align="right">
                          <Button className={classes.totalComment} >{n.comments.length}</Button>
                        </TableCell>
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
              name="livre"
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
  data: getBooks(state),
  loading: getBooksLoading(state),
});

export default connect(mapStateToProps, { getAll, remove })(withStyles(styles)(List));