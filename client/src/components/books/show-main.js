import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import { BASE_URL } from '../../redux/actions/constants'
import InfoIcon from '@material-ui/icons/Info';
import Typography from '@material-ui/core/Typography';
import CommentOutlineIcon from 'mdi-material-ui/CommentOutline';
import EyeOutlineIcon from 'mdi-material-ui/EyeOutline';
import DownloadIcon from 'mdi-material-ui/Download';
import { IconButton }  from '../blocks/buttons';
import Markdown from '../blocks/markdown';
import Share from '../blocks/social-share';
import CommentDialog from '../comments/auth-dialog';

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
    padding: `${theme.spacing.unit}px 0`,
    display: 'flex',
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
  commentCount: {
    marginLeft: 3,
    fontSize: 14
  },
  icon: {
    fontSize: 16
  },
  eyeIcon: {
    fontSize: 18
  },
  iconsContainer: {
    display: 'flex',
    alignItems: 'center',
    color: '#7f7f7f',
    marginRight: 10
  },
  cardIcons: {
    display: 'flex',
    paddingTop: `${theme.spacing.unit}px`,
    paddingBottom: `${theme.spacing.unit * 2}px`,
    textAlign: 'left'
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
      const { classes, history } = this.props;
      return ([
        <div className={classes.downloadButtons}>
                <CommentDialog title="Se connecter pour télécharger ce livre" variant="contained" history={history}/>
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

                    <div className={classes.cardIcons}>
                        <div className={classes.iconsContainer}>
                            <CommentOutlineIcon className={classes.icon}/>
                            <span className={classes.commentCount}>{data.comments.length}</span>
                        </div>
                        <div className={classes.iconsContainer}>
                            <EyeOutlineIcon className={classes.eyeIcon}/>
                            <span className={classes.commentCount}>{data.views}</span>
                        </div>
                        <div className={classes.iconsContainer}>
                            <DownloadIcon className={classes.eyeIcon}/>
                            <span className={classes.commentCount}>{data.download}</span>
                        </div>
                    </div>
                    { authenticated ?  this.renderDownloadButtons() : this.renderNonAuthenticated() }
                    { data && data.genres && 
                      <div>
                          {data.genres.map(n => (
                            <Chip
                                className={classes.chip}
                                onClick={() => push(`/genres/${n.slug}`)}
                                variant="outlined"
                                label={n.name} />
                          ))}
                      </div> }
                      { data.summary &&<Markdown input={data.summary}/>}
                      <Share url={`${BASE_URL}/livres/${data.slug}`} />
              </Card>
          );
    }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);