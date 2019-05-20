import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { Link } from 'react-router-dom';
import GridList from '@material-ui/core/Grid';
import { Col } from 'react-flexbox-grid';
import { BASE_URL } from '../../redux/actions/constants'
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import TitleHeader from '../blocks/title-header';
import { LIST_AUTHORS_PER_PAGE } from '../../redux/actions/constants';
import Pagination from '../blocks/pagination';

const styles = theme => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 0,
        boxShadow: 'none',
        backgroundColor: 'transparent',
        padding: `${theme.spacing.unit * 2}px`,
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
        height: 300,
        width: '100%',
        boxShadow: '0 5px 6px rgba(0,0,0,.2), 0 3px 6px rgba(0,0,0,.23)',
        transition: 'box-shadow .15s',
        '&:hover': {
            boxShadow: '0 10px 8px rgba(0, 0, 0, 0.3), 0 6px 10px rgba(0, 0, 0, 0.3)',
        }
    },
    cardActions: {
        display: 'block',
        paddingTop: `${theme.spacing.unit}px`,
        textAlign: 'left'
    },
    root: {
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 4}px 0`,
        margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit}px 0`,
        textAlign: 'center',
        margin: 'auto'
    },
    header: {
        paddingBottom: `${theme.spacing.unit * 2}px`,
        display: 'flex'
    },
    link: {
        textDecoration: 'none'
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        marginTop:  `${theme.spacing.unit * 5}px`,
    }
});

class MainList extends React.Component {
    render() {
        const { classes, authors, headerTitle, currentPage, total, pages, onChange, path, xs, sm, md, lg, listSm, listMd, listLg } = this.props;  

        return (
            <Col xs={xs || 12} sm={sm || 12} md={md || 12} lg={lg || 12} start="xs">

                <GridList container spacing={8} justify="center">
                    <GridList item sm={12} md={12} lg={12} className={classes.title}>
                        {headerTitle && <TitleHeader title={headerTitle} path={path} /> }
                    </GridList>
                    { authors.map(author => (
                    <GridList item key={author._id} sm={listSm || 4} md={listMd ||3} lg={listLg || 2} justify="center">
                        <Link to={`/auteurs/${author.slug}`} className={classes.link}>
                        
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={`${BASE_URL}/api/authors/photo/${author._id}`}
                                    title={`${author.first_name && author.first_name} ${author.family_name}`}
                                />
                                <CardActions className={classes.cardActions}>
                                    <Typography gutterBottom variant="h6" component="h2">
                                        {`${author.first_name && author.first_name} ${author.family_name}`}
                                    </Typography>
                                </CardActions>
                            </Card>
                        </Link>
                    </GridList>))}
                    { currentPage <= pages &&
                    <GridList item sm={12} md={12} lg={12} className={classes.title}>
                        <Pagination
                            currentPage={currentPage}
                            total={pages}
                            onChange={onChange}
                            primary
                            position='center'
                        />
                    </GridList> }

                </GridList>
            </Col>
        );
    }
}

MainList.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(MainList);
