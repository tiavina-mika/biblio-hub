import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Carousel } from "react-responsive-carousel";

const styles = theme => ({
    main: {
        [theme.breakpoints.up('lg')]: {
            height: 300
        },
        [theme.breakpoints.only('sm')]: {
            height: 250
        },
        [theme.breakpoints.only('xs')]: {
            height: 350,
            backgroundColor: 'rgba(255, 255, 255, .8)'
        },
    },
    legend: {
        [theme.breakpoints.up('lg')]: {
            marginTop: -200,
        },
        [theme.breakpoints.only('md')]: {
            marginTop: -150,
        },
        [theme.breakpoints.only('sm')]: {
            marginTop: -5,
        },
        [theme.breakpoints.only('xs')]: {
            marginTop: 70,
        },
        textAlign: 'center',
    },
    title: {
        [theme.breakpoints.only('md')]: {
            fontSize: 30
        },
        [theme.breakpoints.only('sm')]: {
            fontSize: 20
        },
        [theme.breakpoints.only('xs')]: {
            fontSize: 20,
            color: '#000',
            textShadow: 'none'
        },
        textTransform: 'uppercase',
        color:'#fff',
        textShadow: '1px 1px 1px #000'
    },
    subtitleContainer: {

        marginTop: 25,
        display: 'flex',
        justifyContent: 'center'
    },
    subtitle: {
        [theme.breakpoints.only('sm')]: {
            fontSize: 15
        },
        [theme.breakpoints.only('xs')]: {
            color: '#000',
            textShadow: 'none'
        },
        color:'#fff',
        textShadow: '1px 1px 1px #000',
        [theme.breakpoints.up('md')]: {
            width: '50%',
        },

    },
});

class CarouselComponent extends React.Component {
  render() {
    const { classes } = this.props;

    return (
        <Carousel autoPlay showThumbs={false} showStatus={false}>
            <div className={classes.main}>
                <img src={`${process.env.PUBLIC_URL}/images/carousel-01.jpg`} alt={process.env.REACT_APP_NAME}/>
                <div className={classes.legend}>
                    <Typography variant="h3" className={classes.title}>Télécharger gratuitement des Ebooks</Typography>
                    <div className={classes.subtitleContainer}>
                        <Typography variant="h6" className={classes.subtitle}>
                            Une grande partie des e-books disponibles en téléchargement gratuit sont des livres anciens passés dans le domaine public.
                        </Typography>
                    </div>
                </div>
            </div>
            <div className={classes.main}>
                <img src={`${process.env.PUBLIC_URL}/images/carousel-02.jpg`} alt={process.env.REACT_APP_NAME}/>
                <div className={classes.legend}>
                    <Typography variant="h3" className={classes.title}>
                        Ebooks gratuits à télécharger en PDF et EPUB
                    </Typography>
                    <div className={classes.subtitleContainer}>
                        <Typography variant="h6" className={classes.subtitle}>
                        la bibliothèque en ligne des livres libres et gratuits en français
                        </Typography>
                    </div>
                </div>
            </div>
            <div className={classes.main}>
                <img src={`${process.env.PUBLIC_URL}/images/carousel-03.jpg`} alt={process.env.REACT_APP_NAME}/>
                <div className={classes.legend}>
                    <Typography variant="h3" className={classes.title}>
                    Parcourez notre collection de livres gratuits et publics
                    </Typography>

                </div>
            </div>
        </Carousel>
    );
  }
}

CarouselComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(CarouselComponent);