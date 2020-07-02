import React from 'react'
import checkTrue from '../images/check-true.png'
import checkFalse from '../images/check-false.png'

export default function MsgAlert(props) {

  const { msg, check } = props

  return (
    <div className={"check-validation " + (msg ? (check ? "check-false" : "check-true") : "")}>
      <span>{<img src={check ? checkFalse : checkTrue} alt={check ? "check false" : "check true"}></img>}</span>
      {msg}
    </div>
  )
}