import React from 'react'

import { Button } from '@mui/material'

import alertIcon from '@assets/images/logo/group-2.svg'
import {
  StyledDialog,
  StyledDialogContent,
  StyledDialogContentText,
  StyledDialogActions,
} from '@main/components/modals/style'

import useStyles from './style'

function AlertModal({
  openBool,
  handleClose,
  contentText,
  btnYesText = '확인',
  handleNoText = '취소',
  handleYesClick,
  handleNoClick,
}) {
  const classes = useStyles()

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
          <Button onClick={handleYesClick} color="primary" className={classes.alertModalBtn} autoFocus>
            {btnYesText}
          </Button>
        )}
        {(handleNoClick || handleClose) && (
          <Button onClick={handleNoClick || handleClose} color="primary" className={classes.alertModalBtn}>
            {handleNoText}
          </Button>
        )}
      </StyledDialogActions>
    </StyledDialog>
  )
}

export default AlertModal
