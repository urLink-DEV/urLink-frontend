/* global chrome */
import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'
import useStyles from './styles/AlarmPopover'

export default function AlarmPopover(props) {
  const classes = useStyles()
  const {list} = props

  const onClickAlarm = () => {
    console.log('click Alarm')
  }

  return (
    <List className={classes.root}>
      {list.map((e, i) => 
        <ListItem key={i} button onClick={onClickAlarm}>
        <ListItemAvatar>
          <Avatar className={classes.avatar}>
            {e.img ? <img className={classes.img} src={e.img}/> : <ImageIcon />}
          </Avatar>
        </ListItemAvatar>
        <ListItemText className={classes.text} 
          primary={e.title} 
          secondary={e.date}
        />
      </ListItem>
      )}
    </List>
  )
}
