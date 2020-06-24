import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

export default function UrlinkSnackbar(props) {

  const {alertText, open, handleClose} = props

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert elevation={6} variant="filled" severity="info">
        {alertText}
      </Alert>
    </Snackbar>
  )
}