import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import CommentIcon from '@material-ui/icons/Comment';
import red from '@material-ui/core/colors/red';
import ChatIcon from 'mdi-material-ui/Chat';

import CommentForm from '../forms/comment';
import { comment } from '../../redux/actions/books';
import { BASE_URL } from '../../redux/actions/constants';
import ReCaptcha from '../blocks/recaptcha';

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
    fontSize: 16,
    marginLeft: 0
  },
  action: {
    marginTop: 10,
    marginRight: 10
  },
  cardIcons: {
    display: 'flex',
    justifyContent: 'center'
},
  commentCount: {
      marginLeft: 3,
      fontSize: 20
  },
  icon: {
      fontSize: 20
  },
  iconsContainer: {
      display: 'flex',
      alignItems: 'center',
      color: '#7f7f7f',
      marginRight: 10,
  }
});

class Comment extends React.Component {
    onSubmit = (form) => {
        const { userId, book, comment, history: { push, go } } = this.props;
        comment(userId, book._id, form.comment, book._slug)
          .then(() => go(0));
    }
    render() {
        const { classes, userId, book } = this.props;
        return (
        <Card className={classes.card}>
            <CardHeader
                classes={{title: classes.primary, action: classes.action}}
                className={classes.cardHeader}
                avatar={
                  userId && <Avatar src={`${BASE_URL}/api/users/photo/${userId}`}/>
                }
                action={
                  <div className={classes.iconsContainer}>
                      <ChatIcon className={classes.icon}/>
                      <span className={classes.commentCount}>{book.comments.length}</span>
                  </div>
                }
                title="Ajouter un commentaire"
            />

            <CardContent>
                <CommentForm onSubmit={this.onSubmit} />
                <ReCaptcha />
            </CardContent>
        </Card>
    );
  }
}

Comment.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(null, { comment })(withStyles(styles)(Comment));
