import React from 'react';

import useStyles from './styled.js';
import checkTrueImg from '@images/check-true.png';
import checkFalseImg from '@images/check-false.png';

function ValidationMessage({ msg, check }) {
  const classes = useStyles();

  return (
    <div className={classes.checkValidation + ' ' + (msg && (check ? classes.checkFalse : classes.checkTrue))}>
      <img src={check ? checkFalseImg : checkTrueImg} alt={check ? classes.checkFalse : classes.checkTrue}></img>
      {msg}
    </div>
  );
}

export default ValidationMessage;
