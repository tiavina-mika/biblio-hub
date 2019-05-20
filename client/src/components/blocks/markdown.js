import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import ReactMarkdown from 'react-markdown/with-html';
import CodeBlock from '../pages/codeBlock';

const styles = theme => ({
  table: {
    [theme.breakpoints.up('md')]: {
      minWidth: 700,
    }
  },
  markDown: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'justify',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 3}px`,
  }
});

const Paragraph = (props) => {
    return <p style={{fontSize: 18, lineHeight: 1.5}}>{props.children}</p>
}

const Markdown = ({ classes, input }) =>{
    return (
        <div className={classes.markDown}>
            <ReactMarkdown source={input} escapeHtml={false}
                renderers={{ code: CodeBlock, paragraph: Paragraph }} />
        </div>     
    );
}

Markdown.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Markdown);
