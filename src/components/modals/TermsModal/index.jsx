import React from 'react'

import { DialogTitle, Button } from '@material-ui/core'

import {
  StyledDialog,
  StyledDialogContent,
  StyledDialogContentText,
  StyledDialogActions,
} from '@components/modals/style'

import textInfo from './textInfo'

function TermsModal({ open, onClose, onYesClick, onYesText = '동의함', onNoClick, onNoText = '동의안함' }) {
  return (
    <StyledDialog
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
      open={open}
      onClose={onClose}
    >
      <DialogTitle id="alert-dialog-title" style={{ fontWeight: 'bold' }}>
        이용 약관 동의
      </DialogTitle>
      <StyledDialogContent>
        <StyledDialogContentText id="alert-dialog-description" dangerouslySetInnerHTML={{ __html: textInfo }} />
      </StyledDialogContent>
      <StyledDialogActions>
        {onYesClick && (
          <Button onClick={onYesClick} color="primary" autoFocus style={{ fontWeight: 'bold' }}>
            {onYesText}
          </Button>
        )}
        {onNoClick && (
          <Button onClick={onNoClick} color="primary" style={{ fontWeight: 'bold' }}>
            {onNoText}
          </Button>
        )}
      </StyledDialogActions>
    </StyledDialog>
  )
}

export default TermsModal
