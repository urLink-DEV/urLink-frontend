import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Button,
} from '@material-ui/core';
import { TermsModal, AlertModal } from '@components/modals';
import useStyles from './style';
import defaultProfileImg from '@images/logo/profileImg.png';
import { useUserData, userRemoveThunk, userLogoutThunk } from '@modules/user';
import { useDialog, useToast, MODAL_NAME } from '@modules/ui';

function Profile() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data } = useUserData();
  const { open: termsOpen, toggle: termsToggle, close: termsClose } = useDialog(
    MODAL_NAME.TERMS_MODAL
  );
  const { open: removUserOpen, toggle: removUserToggle, close: removUserClose } = useDialog(
    MODAL_NAME.REMOVE_USER_ALERT_MODAL
  );
  const { openToast } = useToast();

  const handleLogout = async () => {
    try {
      await dispatch(userLogoutThunk());
      window.location.href = '/index.html';
    } catch (error) {
      openToast({ type: 'error', message: error?.response?.data?.message || '네트워크 오류!!' });
    }
  };

  const handleRemoveUser = async () => {
    try {
      await dispatch(userRemoveThunk());
      window.location.href = '/index.html';
    } catch (error) {
      openToast({ type: 'error', message: error?.response?.data?.message || '네트워크 오류!!' });
    }
  };

  return (
    <>
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
      {termsOpen && (
        <TermsModal
          open={termsOpen}
          onClose={termsClose}
          onYesText="닫기"
          onYesClick={termsClose}
        />
      )}
      {removUserOpen && (
        <AlertModal
          openBool={removUserOpen}
          btnYesText="탈퇴"
          contentText="카테고리와 저장한 링크가 모두 삭제되며 복구할 수 없습니다. 정말 탈퇴하시겠어요?"
          handleClose={removUserClose}
          handleYesClick={handleRemoveUser}
        />
      )}
    </>
  );
}

export default Profile;
