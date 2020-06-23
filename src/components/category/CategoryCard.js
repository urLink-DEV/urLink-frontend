/* global chrome */
import React, {useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import AddAlertIcon from '@material-ui/icons/AddAlert'
import Typography from '@material-ui/core/Typography'
import useStyles, { DatePickerWithStyles } from './styles/CategoryCard'

export default function CategoryCard(props) {
  const classes = useStyles()
  const {handleSelectedCard, isReset, setIsReset} = props
  const {path, image_path, title, description, key} = props.linkInfo
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [hover, setHover] = useState(false)
  const [isSelected, setIsSelected] = useState(false)

  const handleClickCard = () => {
    console.log('select tab')
    setIsSelected(!isSelected)
    handleSelectedCard()
    
  }

  useEffect(() => {
    if (isReset) {
      setIsSelected(false)
      setIsReset(false)
    }
  })

  const handleMouseEnterCard = () => {
    setHover(true)
  }

  const handleMouseLeaveCard = () => {
    setHover(false)
  }

  const handleClickHoverBtn = e => {
    e.stopPropagation()
    console.log('open tab')
    window.open(path)
  }

  const limitedDescription = desc => {
    if (!desc) return ''
    const limitedLength = 30
    return desc.length > limitedLength 
    ? desc.substring(0, limitedLength) + ' ... '
    : desc
  }

  const handleSetAlarm = (date) => {
    setSelectedDate(date);
    console.log('set snooze')
    console.log(date, title)
  }

  return (
    <div className={classes.divRoot}>
      <Card className={isSelected ? classes.selectedRoot : classes.root} 
        onClick={handleClickCard}
        onMouseEnter={handleMouseEnterCard}
        onMouseLeave={handleMouseLeaveCard}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="120"
            image={image_path}
            title="Contemplative Reptile"
          />
          {
            hover ? 
            <Button className={classes.cardOpenBtn} 
              size="small"
              variant="contained"
              onClick={handleClickHoverBtn}
            >
              open
            </Button> 
            : null
          }
          <CardContent className={classes.cardContent}>
            <Grid item zeroMinWidth>
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
            </Grid>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.cardActions}>
          <IconButton aria-label="favorites">
            <FavoriteIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon fontSize="small" />
          </IconButton>
          <DatePickerWithStyles key={key}
            className={classes.datePicker}
            margin="normal"
            onChange={handleSetAlarm}
            InputProps={{
              disableUnderline: true,
            }}
            keyboardIcon={<AddAlertIcon />}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </CardActions>
      </Card>
    </div>
  )
}
