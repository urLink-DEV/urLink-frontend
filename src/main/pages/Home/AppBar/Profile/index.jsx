import React, { useCallback, Fragment } from 'react'

import { Typography, Grid, Card, CardContent, CardActions, Avatar, Button } from '@mui/material'
import { useDispatch } from 'react-redux'

import defaultProfileImg from '@assets/images/logo/profileImg.png'
import { TermsModal, AlertModal } from '@main/components/modals'
import { useDialog, useToast, MODAL_NAME } from '@modules/ui'
import { useUserData, userRemoveThunk, userLogoutThunk } from '@modules/user'

import useStyles from './style'

const { TERMS_MODAL } = MODAL_NAME
const { REMOVE_USER_ALERT_MODAL } = MODAL_NAME

function Profile() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { data } = useUserData()
  const { open: termsOpen, toggle: termsToggle, close: termsClose } = useDialog(TERMS_MODAL)
  const { open: removUserOpen, toggle: removUserToggle, close: removUserClose } = useDialog(REMOVE_USER_ALERT_MODAL)
  const { openToast } = useToast()

  const handleLogout = useCallback(async () => {
    try {
      await dispatch(userLogoutThunk())
      window.location.href = '/index.html'
    } catch (error) {
      openToast({ type: 'error', message: error?.response?.data?.message || '네트워크 오류!!' })
    }
  }, [dispatch, openToast])

  const handleRemoveUser = useCallback(async () => {
    try {
      await dispatch(userRemoveThunk())
      window.location.href = '/index.html'
    } catch (error) {
      openToast({ type: 'error', message: error?.response?.data?.message || '네트워크 오류!!' })
    }
  }, [dispatch, openToast])

  return (
    <Fragment>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title}>내 정보</Typography>
          <Grid container className={classes.content}>
            <Grid item>
              <Avatar className={classes.profileImg} src={data.img || defaultProfileImg} />
            </Grid>
            <Grid item className={classes.profileInfoGrid}>
              <Grid item>
                <Typography className={classes.profileName}>{data.username}</Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.profileEmail} color="textSecondary">
                  {data.email}
                </Typography>
              </Grid>
              <Grid container item>
                <Button className={classes.profileBtn} size="small" onClick={termsToggle}>
                  약관보기
                </Button>
                <Button className={classes.profileBtn} size="small" onClick={removUserToggle}>
                  회원탈퇴
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button className={classes.logoutBtn} variant="contained" onClick={handleLogout}>
            로그아웃
          </Button>
        </CardActions>
      </Card>
      {termsOpen && <TermsModal open={termsOpen} onClose={termsClose} onYesText="닫기" onYesClick={termsClose} />}
      {removUserOpen && (
        <AlertModal
          openBool={removUserOpen}
          btnYesText="탈퇴"
          contentText="카테고리와 저장한 링크가 모두 삭제되며 복구할 수 없습니다. 정말 탈퇴하시겠어요?"
          handleClose={removUserClose}
          handleYesClick={handleRemoveUser}
        />
      )}
    </Fragment>
  )
}

export default Profile
