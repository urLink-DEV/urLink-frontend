import { ListItem } from '@mui/material'
import { makeStyles, withStyles } from '@mui/styles'

export const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'sticky',
    top: 0,
    zIndex: 100,

    paddingTop: 12,
    paddingBottom: 12,

    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',

    backgroundColor:
      theme.palette.type !== 'dark' ? theme.palette.colorGroup.lightGrey : theme.palette.background.default,
  },
  appBarInversion: {
    backgroundColor: '#FFFFFF',
  },
  imgButton: {
    width: 17,
    height: 17,

    '& > img': {
      objectFit: 'contain',
    },
  },
  iconButtonGroup: {
    padding: 0,
    marginLeft: 11,
    marginRight: 37,
    display: 'flex',
    gap: 11,
  },
  drawer: {
    '& > .MuiDrawer-paper': {
      zIndex: theme.zIndex.drawer - 1,
    },
    '& > .MuiDrawer-paperAnchorRight': {
      top: 73,
    },
  },
}))

export const StyledListItem = withStyles((theme) => ({
  root: {
    width: 48,
    height: 48,

    backgroundColor: 'white',
    borderRadius: 8,

    '&:hover': {
      backgroundColor: '#d6e4f5',
      '& img': {
        filter: 'brightness(10)',
      },
    },
  },
}))(ListItem)

export default useStyles
