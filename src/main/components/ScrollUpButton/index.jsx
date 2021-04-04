import React from 'react'

import { ArrowUpward as ArrowUpwardIcon } from '@material-ui/icons'
import clsx from 'clsx'

import ExtendedFab from '@main/components/ExtendedFab'

import useStyles from './style'

function ScrollUpButton({ targetRef, className, open }) {
  const classes = useStyles()

  const handleScrollUp = () => {
    scrollTo(targetRef.current, 0, 500)
  }

  return (
    <ExtendedFab
      className={clsx(classes.root, className, {
        [classes.showBtn]: open,
      })}
      color="primary"
      onClick={handleScrollUp}
    >
      <ArrowUpwardIcon />
    </ExtendedFab>
  )
}

function scrollTo(element, to = 0, duration = 500, scrollToDone = null) {
  const start = element.scrollTop
  const change = to - start
  const increment = 20
  let currentTime = 0

  const easeInOutQuad = (currentTime, start, change, duration) => {
    currentTime /= duration / 2
    if (currentTime < 1) return (change / 2) * currentTime * currentTime + start
    currentTime--
    return (-change / 2) * (currentTime * (currentTime - 2) - 1) + start
  }

  const animateScroll = () => {
    currentTime += increment
    const val = easeInOutQuad(currentTime, start, change, duration)
    element.scrollTop = val
    if (currentTime < duration) setTimeout(animateScroll, increment)
    else if (scrollToDone) scrollToDone()
  }

  animateScroll()
}

export default ScrollUpButton
