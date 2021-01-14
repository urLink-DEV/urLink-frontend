import React from 'react';

import { Dialog, DialogActions, DialogContent, DialogContentText, Button } from '@material-ui/core';

import useStyles from './style';

import alertIcon from '@images/logo/group-2.svg';

function AlertModal({
  openBool,
  handleClose,
  contentText,
  btnYesText,
  handleNoText,
  handleYesClick,
  handleNoClick,
}) {
  const classes = useStyles();

  return (
    <Dialog aria-describedby="alert-dialog-description" open={openBool} onClose={handleClose}>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" className={classes.alertModal}>
          <img className={classes.alertIcon} src={alertIcon} alt="alert-icon"></img>
          {contentText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {handleYesClick && (
          <Button
            onClick={handleYesClick}
            color="primary"
            className={classes.alertModalBtn}
            autoFocus
          >
            {btnYesText || '확인'}
          </Button>
        )}
        {(handleNoClick || handleClose) && (
          <Button
            onClick={handleNoClick || handleClose}
            color="primary"
            className={classes.alertModalBtn}
          >
            {handleNoText || '취소'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default AlertModal;
