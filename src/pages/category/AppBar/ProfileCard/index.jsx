import React from 'react';
import { toast } from 'react-toastify';

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

import defaultProfileImg from '@images/logo/profileImg.png'

import { useUser, useUserData } from '@modules/user';
import { useDialog, MODAL_NAME } from '@modules/ui';

function ProfileCard() {
  const classes = useStyles();
  const { data } = useUserData();
  const { removeThunk, logoutThunk } = useUser();
  const { open: termsOpen, toggle: termsToggle, close: termsClose } = useDialog(
    MODAL_NAME.TERMS_MODAL
  );
  const { open: removUserOpen, toggle: removUserToggle, close: removUserClose } = useDialog(
    MODAL_NAME.REMOVE_USER_ALERT_MODAL
  );

  const handleLogout = async () => {
    try {
      await logoutThunk();
      window.location.href = '/index.html';
    } catch (error) {
      toast.error(error?.response?.data?.message || '네트워크 오류!!');
    }
  };

  const handleRemoveUser = async () => {
    try {
      await removeThunk();
      window.location.href = '/index.html';
    } catch (error) {
      toast.error(error?.response?.data?.message || '네트워크 오류!!');
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
    </>
  );
}

export default ProfileCard;
