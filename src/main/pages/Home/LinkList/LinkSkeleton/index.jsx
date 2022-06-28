import React from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Skeleton from '@mui/material/Skeleton'

import useStyles from './style'

function LinkSkeleton() {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <Skeleton animation="wave" variant="rect" height={120} sx={{ bgcolor: '#F2F2F2' }} />

      <CardContent className={classes.cardContent}>
        <Skeleton animation="wave" height={20} sx={{ bgcolor: '#F2F2F2' }} />
        <Skeleton animation="wave" height={128} sx={{ bgcolor: '#F2F2F2', margin: '8px 0 16px' }} />
        <Skeleton animation="wave" height={28} sx={{ bgcolor: '#F2F2F2' }} />
      </CardContent>
    </Card>
  )
}

export default LinkSkeleton
