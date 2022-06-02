import { Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material'
import { withStyles } from '@mui/styles'
import { makeStyles } from '@mui/styles'

export const StyledDialog = withStyles((theme) => ({
  paperWidthSm: {
    padding: '36px 48px 40px',
    width: 508,
    height: 315,
    boxShadow: '8px 8px 24px rgba(0, 0, 0, 0.12)',
    borderRadius: 8,
    justifyContent: 'space-between',
  },
}))(Dialog)

export const StyledDialogTitle = withStyles((theme) => ({
  root: { fontWeight: 'bold', padding: 0 },
}))(DialogTitle)

export const StyledDialogContent = withStyles((theme) => ({
  root: { padding: 0, display: 'inline-block', flex: '0 1 auto' },
}))(DialogContent)

export const StyledDialogActions = withStyles((theme) => ({
  root: {
    display: 'flex',
    flex: '0 0 auto',
    padding: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
}))(DialogActions)

export const useStyles = makeStyles((theme) => ({
  categoryNameInput: {
    width: '100%',
    height: 59,
    background: '#FCFCFC',
    border: '1px solid #AAAAAA',
    borderRadius: 8,
    padding: 16,
    fontSize: 18,
    color: '#333',
    '&::placeholder': {
      color: '#999',
    },
    '&:focus': {
      border: `1px solid ${theme.palette.primary.main}`,
      outline: 'none',
    },
  },
  modalButton: {
    width: 86,
    height: 48,
    fontWeight: 'bold',
    color: '#666666',
    background: '#fff',
    border: '1px solid #E6E6E6',
    borderRadius: 8,

    '&.confirm': {
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
    },
  },
}))
