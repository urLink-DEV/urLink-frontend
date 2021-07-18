import React from 'react'

import { Snackbar, IconButton, Slide, Grow, Fade } from '@material-ui/core'
import Alert from '@material-ui/core/Alert'
import CloseIcon from '@material-ui/icons/Close'

function SnackbarTrasition({ transition, direction, ...rest }) {
  return (
    <Snackbar
      TransitionComponent={{ slide: Slide, grow: Grow, fade: Fade }[transition]}
      TransitionProps={{ direction }}
      {...rest}
    />
  )
}

function Toast({ open, type, message, close, ...props }) {
  return (
    <SnackbarTrasition
      open={open}
      autoHideDuration={3000}
      onClose={close}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transition="slide"
      direction="up"
      message={message}
      action={
        <IconButton color="inherit" onClick={close}>
          <CloseIcon />
        </IconButton>
      }
      {...props}
    >
      {type && (
        <Alert elevation={6} variant="filled" severity={type} onClose={close}>
          {message}
        </Alert>
      )}
    </SnackbarTrasition>
  )
}

export default Toast
