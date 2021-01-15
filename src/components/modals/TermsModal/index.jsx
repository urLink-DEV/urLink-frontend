import React from 'react';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@material-ui/core';

import textInfo from './textInfo';

function TermsModal({ open, onClose, onYesClick, onYesText, onNoClick, onNoText }) {
  return (
    <Dialog
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
      open={open}
      onClose={onClose}
    >
      <DialogTitle id="alert-dialog-title" style={{ fontWeight: 'bold' }}>
        이용 약관 동의
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          dangerouslySetInnerHTML={{ __html: textInfo }}
        />
      </DialogContent>
      <DialogActions>
        {onYesClick && (
          <Button onClick={onYesClick} color="primary" autoFocus style={{ fontWeight: 'bold' }}>
            {onYesText || '동의함'}
          </Button>
        )}
        {onNoClick && (
          <Button onClick={onNoClick} color="primary" style={{ fontWeight: 'bold' }}>
            {onNoText || '동의안함'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default TermsModal;
