import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import AlarmIcon from '@material-ui/icons/Alarm'
import Typography from '@material-ui/core/Typography'
import useStyles from './styles/CategoryCard'

export default function CategoryCard(props) {
  const classes = useStyles()
  const {image_path, title, description} = props.urlInfoList

  const limitedDescription = desc => {
    const limitedLength = 60
    if (!desc) return ''
    return desc.length > limitedLength 
      ? desc.substring(0, limitedLength) + ' ... '
      : desc
  }
  return (
    <div className={classes.divRoot}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={image_path}
            title="Contemplative Reptile"
          />
          <CardContent className={classes.cardContent}>
            <Typography className={classes.cardContentTitle}
              gutterBottom 
              variant="h6" 
              component="h2"
            >
              {title}
            </Typography>
            <Typography className={classes.cardContentDesc}
              variant="body2" 
              color="textSecondary"
              component="p"
            >
              {limitedDescription(description)}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.cardActions}>
          <IconButton className={classes.icons} aria-label="favorites">
            <FavoriteIcon fontSize="small"/>
          </IconButton>
          <IconButton className={classes.icons} aria-label="share">
            <ShareIcon fontSize="small"/>
          </IconButton>
          <IconButton className={classes.icons} aria-label="alarm">
            <AlarmIcon fontSize="small"/>
          </IconButton>
        </CardActions>
      </Card>
    </div>
  )
}
