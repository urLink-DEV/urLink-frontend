import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  divRoot: {
    display: 'inline',
  },
  root: {
    maxWidth: 345,
  },
  cardContent: {
    maxHeight: 130,
  },
  cardActions: {
    padding: 5
  },
  icons: {
    padding: 5
  }
});

export default function CategoryCard(props) {
  const classes = useStyles()
  const {img, title, description} = props.urlInfoList

  const limitedDescription = desc => {
    const limitedLength = 60
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
            image={img}
            title="Contemplative Reptile"
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {limitedDescription(description)}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.cardActions}>
          <IconButton className={classes.icons} aria-label="add to favorites">
            <FavoriteIcon fontSize="small"/>
          </IconButton>
          <IconButton className={classes.icons} aria-label="share">
            <ShareIcon fontSize="small"/>
          </IconButton>
        </CardActions>
      </Card>
    </div>
  )
}
