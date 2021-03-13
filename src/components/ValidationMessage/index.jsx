import React from 'react'

import clsx from 'clsx'

import checkFalseImg from '@assets/images/check-false.png'
import checkTrueImg from '@assets/images/check-true.png'

import useStyles from './style.js'

function ValidationMessage({ msg, check }) {
  const classes = useStyles()

  return (
    <div
      className={clsx(classes.checkValidation, {
        [classes.checkFalse]: msg && check,
        [classes.checkTrue]: msg && !check,
      })}
    >
      <img src={check ? checkFalseImg : checkTrueImg} alt={check ? 'validation  error' : 'validation success'}></img>
      {msg}
    </div>
  )
}

export default ValidationMessage
