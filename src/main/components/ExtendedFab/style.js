import { Fab } from '@mui/material'
import { withStyles } from '@mui/styles'

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
