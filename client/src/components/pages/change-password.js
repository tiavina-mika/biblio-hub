import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import ChangePasswordForm from '../forms/change-password';
import { getUserId } from '../../redux/root-reducer';
import { notify } from 'react-notify-toast';
import { changePassword } from '../../redux/actions/users';

const styles = theme => ({
	card: {
    borderRadius: 2,
    paddingTop: 2,
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 22
	},
  cardTitle: {
    textTransform: 'uppercase',
    marginBottom: 1
  },
	cardSubtitle: {
    textTransform: 'uppercase',
    marginTop: 1
  },
  cardContent: {
    marginTop: 0
  }
});

class ChangePassword extends React.PureComponent {
  onSubmit = (form) => {
        const { userId , changePassword, history: { push } } = this.props;
        if (userId) {
            changePassword(userId, form.password, form.newPassword)
                .then(res => notify.show("Votre mot de passe a été modifié avec succèss", 'success', 6000));
        } else {
            push('/logout');
        }
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid fluid>
        <Row center="xs">
          <Col xs={12} sm={9} md={7} lg={4} start="xs">
            <Card className={classes.card}>
              <CardHeader
                classes={{title: classes.cardTitle, subheader: classes.cardSubtitle}}
                title="Mot de passe"
                subheader="Modification de mot de passe"/>
              <CardContent  className={classes.cardContent}>
                  <ChangePasswordForm onSubmit={this.onSubmit} />
              </CardContent>
            </Card>
          </Col>
        </Row>
      </Grid>
    );
  }
}
const mapStateToProps = (state) => ({
    userId: getUserId(state),
});
ChangePassword = connect(mapStateToProps, { changePassword })(ChangePassword);

ChangePassword.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChangePassword);