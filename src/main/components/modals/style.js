import { Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

export const StyledDialog = withStyles((theme) => ({
  paperWidthSm: {
    width: 340,
    height: 216,
  },
}))(Dialog)

export const StyledDialogContent = withStyles((theme) => ({
  root: {
    '&:first-child': {
      padding: '60px 30px',
      overflowY: 'hidden',
    },
  },
}))(DialogContent)

export const StyledDialogContentText = withStyles((theme) => ({
  root: {
    marginBottom: 12,

    color: theme.palette.text.primary,

    fontSize: 14,
  },
}))(DialogContentText)

export const StyledDialogActions = withStyles((theme) => ({
  root: {
    display: 'flex',
    flex: '0 0 auto',
    padding: 8,

    borderTop: '1px solid rgba(0, 0, 0, 0.15)',

    alignItems: 'center',
    justifyContent: 'space-around',
  },
}))(DialogActions)
