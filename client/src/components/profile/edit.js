import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import EditProfileForm from '../forms/edit-profile';
import { getUserState, getUsersLoading, getUserId } from '../../redux/root-reducer';
import { edit, getOne, initialize } from '../../redux/actions/users';
import Spinner from '../blocks/spinner';
const styles = {
	card: {
    borderRadius: 2,
    paddingTop: 2
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
};

class EditProfile extends React.PureComponent {
    componentDidMount = () => {
        const { userId, getOne, history: { push } } = this.props;
        getOne(userId);
    }
    onSubmit = (form) => {
        const id = form._id;
        id ? this.props.edit(id, form.name, form.email, `/profil`) : this.props.initialize();
    }
  render() {
    const { data, loading, classes } = this.props;
    if(loading) {
      return <Spinner />
    }
    return (
      <Grid fluid>
        <Row center="xs">
          <Col xs={12} sm={9} md={7} lg={4} start="xs">
            <Card className={classes.card}>
                <CardHeader
                    classes={{title: classes.cardTitle, subheader: classes.cardSubtitle}}
                    title="Modifier"
                    subheader="Modifier votre compte"/>
                <CardContent  className={classes.cardContent}>
                    <EditProfileForm initialValues={data} data={data} onSubmit={this.onSubmit}/>
                </CardContent>
            </Card>
          </Col>
        </Row>
      </Grid>
    );
  }
}

EditProfile.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    data: getUserState(state),
    loading: getUsersLoading(state),
    userId: getUserId(state),

});

EditProfile = connect(mapStateToProps, { edit, getOne, initialize })(EditProfile);

export default withStyles(styles)(EditProfile);