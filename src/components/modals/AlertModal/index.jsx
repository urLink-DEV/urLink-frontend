import React from 'react';
import { Button } from '@material-ui/core';
import {
  StyledDialog,
  StyledDialogContent,
  StyledDialogContentText,
  StyledDialogActions,
} from '@components/modals/style';
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
    <StyledDialog aria-describedby="alert-dialog-description" open={openBool} onClose={handleClose}>
      <StyledDialogContent>
        <StyledDialogContentText id="alert-dialog-description" className={classes.alertModal}>
          <img className={classes.alertIcon} src={alertIcon} alt="alert-icon"></img>
          {contentText}
        </StyledDialogContentText>
      </StyledDialogContent>
      <StyledDialogActions>
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
      </StyledDialogActions>
    </StyledDialog>
  );
}

export default AlertModal;
