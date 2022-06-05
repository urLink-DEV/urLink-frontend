import { Avatar } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles, withStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 360,
    minHeight: 305,
    maxHeight: 524,
    overflow: 'scroll',
    backgroundColor: theme.palette.background.theme,
  },
  title: {
    width: 100,
    height: 29,
    fontSize: 20,
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#000000',
  },
  listItem: {
    paddingLeft: 10,
    backgroundColor: theme.palette.background.paper,
  },
  avatar: {
    marginRight: 10,
  },
  icon: {
    width: 56,
    height: 56,
  },
  cover: {
    height: 217,
    backgroundSize: 'auto',
  },
  text: {
    '& .MuiListItemText-primary': {
      fontSize: 14,
    },
    '& .MuiListItemText-secondary': {
      fontSize: 11,
    },
  },
  noticeText: {
    '& .MuiListItemText-secondary': {
      fontWeight: 'bold',
      color: '#2083ff',
    },
  },
  readText: {
    '& .MuiListItemText-primary': {
      color: '#b9b9b9 !important',
    },
    '& .MuiListItemText-secondary': {
      color: '#b9b9b9 !important',
    },
  },
  bgGrey: {
    backgroundColor: `${grey[200]} !important`,
  },
}))

export const SmallAvatar = withStyles((theme) => ({
  root: {
    width: 28,
    height: 28,
    border: `2px solid ${theme.palette.background.paper}`,
    backgroundColor: '#2083ff',
  },
}))(Avatar)

export default useStyles
