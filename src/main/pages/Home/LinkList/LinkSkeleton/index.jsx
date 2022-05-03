import React from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Skeleton from '@mui/material/Skeleton'

import useStyles from './style'

function LinkSkeleton() {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <Skeleton animation="wave" variant="rect" className={classes.media} />

      <CardContent className={classes.cardContent}>
        <Skeleton animation="wave" height={20} width="100%" />
        <Skeleton animation="wave" height={45} width="100%" style={{ margin: '5px 0 12px' }} />
        <Skeleton animation="wave" height={25} width="100%" />
      </CardContent>
    </Card>
  )
}

export default LinkSkeleton
