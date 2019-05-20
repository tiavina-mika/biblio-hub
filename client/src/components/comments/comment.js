import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import red from '@material-ui/core/colors/red';
import { BASE_URL } from '../../redux/actions/constants';
import { uncomment } from '../../redux/actions/books';

const styles = theme => ({
  cardHeader: {
    backgroundColor: 'rgba(0,0,0,.03)',
    borderBottom: '1px solid rgba(0,0,0,.125)',
  },
  card: {
    boxShadow:'0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12)',
    marginTop: 25,
    textAlign: 'left',
  },
  avatar: {
    backgroundColor: red[500],
  },
  primary: {
    fontWeight: 700,
    color: theme.palette.primary.main,
    fontSize: 16,
    marginLeft: 0
  },
  name: {
    textDecoration: 'none',
    color: theme.palette.primary.main
  },
  action: {
    marginTop: 10,
    marginRight: 10,
    display: 'flex',
    alignItems: 'center'
  },
  iconButton: {
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  deleteIcon: {
    fontSize: 18,
    '&:hover': {
      color: '#000'
    }
  },
});

class Comment extends React.Component {
  handleDelete = () => {
    const {comment, userId, book, uncomment} = this.props;
    uncomment(userId, book._id, comment, `/livres/${book.slug}`);
  }
  rightAction = () => {
    const { classes, comment, userId } = this.props;
    return ([
      comment.postedBy && userId === comment.postedBy._id && <Tooltip title="Supprimer votre commentaire">
            <IconButton className={classes.iconButton} onClick={this.handleDelete}>
              <DeleteIcon className={classes.deleteIcon} />
            </IconButton>
          </Tooltip>,
          <span>
          {moment(new Date(comment.createdAt)).fromNow()}
          </span>
    ])
  }

  render() {
    const { classes, comment } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          classes={{title: classes.primary, action: classes.action}}
          className={classes.cardHeader}
          avatar={
            comment.postedBy && <Avatar aria-label="Recipe" src={`${BASE_URL}/api/users/${comment.postedBy._id}/photo`} />
          }
          action={this.rightAction()}
          title={<Link to='#' className={classes.name}>{comment.postedBy.name}</Link>}
        />

        <CardContent>
          <Typography component="p">
            {comment.text}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

Comment.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(null, { uncomment })(withStyles(styles)(Comment));
