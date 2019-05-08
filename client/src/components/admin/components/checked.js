import React from 'react';

import Check from 'mdi-material-ui/Check';
import Close from 'mdi-material-ui/Close';

const SUCCESS = '#138215';
const FAILED = '#891111';

const Checked = ({checked}) => checked ? <Check style={{color: SUCCESS}}/> : <Close style={{color: FAILED}} />;

export default Checked