import { Fab } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

export const StyledFab = withStyles((theme) => ({
  root: {
    position: 'absolute',
    bottom: 7,
    right: 5,
    width: 40,
    height: 40,
    margin: 0,
    borderRadius: '50%',
  },
}))(Fab)
