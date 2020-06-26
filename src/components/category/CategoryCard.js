/* global chrome */
import React, {useState, useEffect, useRef} from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import AddAlertIcon from '@material-ui/icons/AddAlert'
import CreateIcon from '@material-ui/icons/Create'
import DoneIcon from '@material-ui/icons/Done'
import Typography from '@material-ui/core/Typography'
import useStyles, { DatePickerWithStyles } from './styles/CategoryCard'
import newTab from '../../images/new-tab.svg'
import Snackbar from '../Snackbar'
import InputBase from '@material-ui/core/InputBase'
import useOutsideAlerter from '../../hooks/useOutsideAlerter'
import {useLinkDispatch} from '../../containers/category/CategoryContainer'

export default function CategoryCard(props) {
  const classes = useStyles()
  const {updateLink} = useLinkDispatch()
  const {handleSelectedCard, isReset, setIsReset} = props
  const {id, category, path, image_path, title, description, is_favorited, key} = props.linkInfo
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [hover, setHover] = useState(false)
  const [isSelected, setIsSelected] = useState(false)
  const [copySuccessAlert, setCopySuccessAlert] = useState(false)
  const [isEditable, setIsEditable] = useState(false)
  const [editableTitle, setEditableTitle] = useState(title)
  const [editableDesc, setEditableDesc] = useState(description ? description : '')

  const handleClickCard = e => {
    e.stopPropagation()
    if (isEditable) return
    setIsSelected(!isSelected)
    handleSelectedCard()
  }

  useEffect(() => {
    if (isReset || isEditable) {
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
    window.open(path)
  }

  const limitedDescription = desc => {
    if (!desc) return ''
    const limitedLength = 30
    return desc.length > limitedLength 
    ? desc.substring(0, limitedLength) + ' ... '
    : desc
  }

  const handleClickFavorite = e => {
    updateLink({id, category, is_favorited: !Boolean(is_favorited)})
  }

  const handleClickCopy = e => {
    e.stopPropagation()
    var copyElement = document.createElement('textarea')
    copyElement.value = path
    document.body.appendChild(copyElement)
    copyElement.select()
    document.execCommand("copy")
    document.body.removeChild(copyElement)
    setCopySuccessAlert(true)
  }

  const handleCopySuccessAlert = e => {
    setCopySuccessAlert(false)
  }

  const handleSetAlarm = date => e => {
    e.stopPropagation()
    setSelectedDate(date);
    console.log('set snooze')
    console.log(date, title)
  }

  const handleClickEdit = e => {
    e.stopPropagation()
    setIsEditable(true)
  }

  const handleChangeTitle = e => {
    setEditableTitle(e.target.value)
  }

  const handleChangeDesc = e => {
    setEditableDesc(e.target.value)
  }

  const handleCancelEdit = e => {
    setIsEditable(false)
  }

  const handleClickEditDone = e => {
    e.stopPropagation()
    updateLink({id, category, title: editableTitle, description: editableDesc})
    setIsEditable(false)
  }

  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef, isEditable, handleCancelEdit)

  return (
    <div className={classes.divRoot} ref={wrapperRef}>
      <Card className={!isSelected ? isEditable ? classes.editableRoot : classes.root : classes.selectedRoot}
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
            <img className={classes.cardOpenBtn} 
              src={newTab} 
              onClick={handleClickHoverBtn} 
              alt="새 창으로 열기" 
              title="새 창으로 열기"
            /> : null
          }
          {
            isEditable 
            ? <CardContent className={classes.cardContent}>
            <Grid item zeroMinWidth>
              <InputBase className={classes.edittingCardContentTitle}
                value={editableTitle}
                onChange={handleChangeTitle}
                fontSize="medium"
              />
              <InputBase className={classes.edittingCardContentDesc}
                value={editableDesc}
                onChange={handleChangeDesc}
                rowsMin={3}
                multiline
              />
            </Grid>
          </CardContent>
            : <CardContent className={classes.cardContent}>
            <Grid item zeroMinWidth>
              <Typography className={classes.cardContentTitle}
                gutterBottom noWrap
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
          }
        </CardActionArea>
        <CardActions className={classes.cardActions} disableSpacing>
          <IconButton aria-label="favorites"
            onClick={handleClickFavorite}
          >
            <FavoriteIcon fontSize="small" 
              color={is_favorited ? "secondary" : "action"}
            />
          </IconButton>
          <IconButton aria-label="share"
            onClick={handleClickCopy}
          >
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
          {
            isEditable
            ? <IconButton className={classes.settingsIcon}
                aria-label="setting"
                onClick={handleClickEditDone}
              >
                <DoneIcon fontSize="small" />
              </IconButton>
            : <IconButton className={classes.settingsIcon}
                aria-label="setting"
                onClick={handleClickEdit}
                >
                <CreateIcon fontSize="small" />
              </IconButton>
          }
        </CardActions>
      </Card>
      <Snackbar open={copySuccessAlert}
        alertText="링크 복사가 완료되었습니다."
        handleClose={handleCopySuccessAlert}
      />
    </div>
  )
}
