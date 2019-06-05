import React from 'react';
import Helmet from 'react-helmet';

const CustomizedHelmet = ({title}) => (
    <Helmet titleTemplate={`%s | ${process.env.REACT_APP_NAME}`}>
        <title>{title}</title>
    </Helmet>
);

export default CustomizedHelmet;