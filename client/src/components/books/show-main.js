import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { getOneBySlug } from '../../redux/actions/books';
import Chip from '@material-ui/core/Chip';
import { Grid, Row, Col } from 'react-flexbox-grid';
// import CustomizedBreadcrumbs from '../components/breadcrumbs';
import { BASE_URL } from '../../redux/actions/constants'
import InfoIcon from '@material-ui/icons/Info';
import Typography from '@material-ui/core/Typography';
import DownloadIcon from 'mdi-material-ui/Download';
import { IconButton }  from '../blocks/buttons';
import Markdown from '../blocks/markdown';

const styles = theme => ({
  primaryText : {
    marginRight: 5,
    fontWeight: 400,
    fontStyle : 'normal',
    lineHeight: '29px',
    color: '#333333',
    textTransform: 'uppercase',
    fontFamily: [
      'Century Gothic Regular',
      'sans-serif',
    ].join(','),
  },
  secondaryText : {
    fontWeight: 400,
    fontStyle : 'normal',
    lineHeight: '29px',
    color: '#333333',
    fontFamily: [
      'Helvetica',
      'sans-serif',
    ].join(','),
  },
  cardMain: {
    [theme.breakpoints.up('md')]: {
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,    
    },
    [theme.breakpoints.down('md')]: {     
      marginTop: theme.spacing.unit * 4,        
    },
    [theme.breakpoints.down('sm')]: {     
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit}px`,
    },
    marginBottom: 5,
    textAlign: 'left',
  },
  title: {
    fontWeight: 700,
    width: '100%',
    color: '#616161'
  },
  subtitle: {
    fontWeight: 300,
    marginTop: 5,
    color:  '#616161',
    fontSize: 14,
  },
  downloadButtons: {
    padding: `${theme.spacing.unit * 2}px 0`,
    display: 'flex',
    marginTop: 25
  },
  breadcrumbs: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    marginBottom: 25
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
  image: {
    objectFit: 'cover',
    width: '50%'
  },
  cardRightSidebar: {
    marginBottom: 15
  },
  chip: {
    borderColor: '#17a288',
    color: '#17a288',
    marginLeft: 15,
    marginTop: -8
  },
  link: {
    color: '#17a288',
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 300
  },
  info: {
    paddingBottom: 15,
    fontFamily: 'Helvetica',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: '17px',
    color: '#686868',
    display: 'flex',
    alignItems: 'flex-start'
  },
});

class Header extends Component {
    renderDownloadButtons = () => {
      const { data, classes } = this.props;
      return ([
        <div className={classes.downloadButtons}>
          { data.epub && data.epub.data &&
              <a href={`${BASE_URL}/api/books/epub/${data._id}`} style={{textDecoration: 'none'}}>
                <IconButton label={`Télecharger EPUB (${Number(data.epub.size / (1024 * 1024)).toFixed(3)}Mo)`} icon={<DownloadIcon style={{marginRight: 5}} />}/>
              </a> }
          { data.pdf && data.pdf.data &&
                <a href={`${BASE_URL}/api/books/pdf/${data._id}`} style={{textDecoration: 'none'}}>
                  <IconButton label={`Télecharger PDF (${Number(data.pdf.size / (1024 * 1024)).toFixed(3)}Mo)`} icon={<DownloadIcon style={{marginRight: 5}} />}/>
                </a> }
        </div> , 
          (data.epub || data.pdf) && 
            <div className={classes.info}>
              <InfoIcon style={{fontSize: 14, marginRight: 5}}/>Ce format est disponible en téléchargement gratuit en plusieurs formats - epub, pdf
            </div>
      ])  
    }

    renderNonAuthenticated = () => {
      const { classes } = this.props;
      return ([
        <div className={classes.downloadButtons}>
              <a href={`${BASE_URL}/signin`} style={{textDecoration: 'none'}}>
                <IconButton label={`Connexion`} />
              </a>
        </div>,
        <div className={classes.info}>
            <InfoIcon style={{fontSize: 14, marginRight: 5}}/>Connectez-vous pour pouvoir télécharger ce livre en plusieurs formats - epup, pdf.
        </div>
      ])  
    }

    render() {
      const { classes, data, push, authenticated } = this.props;
      return (
              <Card className={classes.cardMain}>
                  <Typography variant="h3" className={classes.title}>
                    {data.title}
                  </Typography>
                  {data.author &&
                    <Typography variant="title" className={classes.subtitle}>
                      Par <Link to={`/auteurs/${data.author.slug}`} className={classes.link}>
                              {`${data.author && data.author.first_name} ${data.author && data.author.family_name}`}
                          </Link>
                    </Typography>}

                    {authenticated && data.member ?  this.renderNonAuthenticated() : this.renderDownloadButtons()}
                    { data && data.genres && 
                      <div>
                          {data.genres.map(n => (
                            <Chip
                                className={classes.chip}
                                onClick={() => push(`/dashboard/genre/${n._id}`)}
                                variant="outlined"
                                label={n.name} />
                          ))}
                      </div> }
                      { data.summary &&<Markdown input={data.summary}/>}

              </Card>
          );
    }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
