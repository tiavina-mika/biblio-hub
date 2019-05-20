import React from 'react';
import UltimatePagination from '@watchmen/react-ultimate-pagination-material-ui';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    width: '100%',
    padding: `${theme.spacing.unit * 4}px 0`,
  },
  buttonClass: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    height: 50,
    width: 50,
    borderRadius: '50%',
    '&:hover': {
      backgroundColor: 'transparent',
      border: `1px solid  ${theme.palette.primary.main}`,
      color: theme.palette.primary.main
    }
  }
});

const Paginator = (props) => {
  const { currentPage, total, onChange, position, classes, primary } = props;
  const Pagination = primary ? UltimatePagination({buttonClass: classes.buttonClass}) : UltimatePagination();

    return (
      <div className={classes.root} style={{justifyContent: position || 'right'}}>
        <Pagination
          currentPage={currentPage}
          totalPages={total}
          onChange={onChange}
        />
      </div>
    )
};

export default (withStyles(styles)(Paginator));

