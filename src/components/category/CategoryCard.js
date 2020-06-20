import React, {useState} from 'react'
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
import useStyles, { DatePickerWithStyles } from './styles/CategoryCard'
// import { KeyboardDatePicker } from '@material-ui/pickers'

export default function CategoryCard(props) {
  const classes = useStyles()
  const {image_path, title, description} = props.urlInfoList
  const [selectedDate, setSelectedDate] = useState(new Date())
  
  const limitedDescription = desc => {
    if (!desc) return ''
    const limitedLength = 60
    return desc.length > limitedLength 
    ? desc.substring(0, limitedLength) + ' ... '
    : desc
  }

  const onClickToSetAlarm = () => {
    console.log('set alarm')
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(date, title)
  }

  return (
    <div className={classes.divRoot}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="120"
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
          {/* <IconButton className={classes.icons} 
            aria-label="alarm"
            onClick={onClickToSetAlarm}
          >
            <AlarmIcon fontSize="small"/>
          </IconButton> */}
          <DatePickerWithStyles
            className={classes.datePicker}
            margin="normal"
            id="date-picker-dialog"
            format=''
            onChange={handleDateChange}
            InputProps={{
              disableUnderline: true,
              display: 'none,'
            }}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </CardActions>
      </Card>
    </div>
  )
}
