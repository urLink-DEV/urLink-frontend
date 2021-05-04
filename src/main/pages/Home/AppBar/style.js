import { ListItem } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    zIndex: theme.zIndex.drawer,

    height: '100vh',

    backgroundColor: '#fff',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
  },
  toolBar: {
    paddingTop: 32,
  },
  imgButton: {
    width: 20,
    height: 20,

    '& > img': {
      objectFit: 'contain',
    },
  },
  drawer: {
    '& > .MuiDrawer-paper': {
      zIndex: theme.zIndex.drawer - 1,
    },
    '& > .MuiDrawer-paperAnchorRight': {
      right: 50,
    },
  },
}))

export const StyledListItem = withStyles((theme) => ({
  root: {
    height: 40,
    margin: '17px auto',

    borderRadius: 4,

    '&:hover': {
      backgroundColor: '#d6e4f5',
      '& img': {
        filter: 'brightness(10)',
      },
    },
  },
}))(ListItem)

export default useStyles
