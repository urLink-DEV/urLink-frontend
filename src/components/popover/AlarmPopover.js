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

  return (
    <List className={classes.root}>
      {list.map(e => 
        <ListItem>
        <ListItemAvatar>
          <Avatar>
            {e.img ? <img className={classes.img} src={e.img}/> : <ImageIcon />}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={e.title} secondary={e.date} />
      </ListItem>
      )}
    </List>
  )
}
