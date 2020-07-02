import React, { useState } from 'react'
import authAPI from '../../commons/apis/auth'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
// import Badge from '@material-ui/core/Badge'
import useStyles from './styles/ProfilePopOver'
import { TermsModal } from '../../components/modal'

import {useProfileContext} from '../../contexts/ProfileContext'


export default function ProfilePopOver(props) {
  
  const classes = useStyles()
  const profile = useProfileContext()

  // const [badgeInvisible, setBadgeInvisible] = React.useState(false)
  const [termsModalOpen, setTermsModalOpen] = useState(false)
  
  // // TODO 추후 공지 api 나오면 구상
  // const handleBadgeVisibility = () => {
  //   setBadgeInvisible(!badgeInvisible)
  // }
  const handleClickTermsOpen = () => {
    setTermsModalOpen(true)
  }
  const handleClickTermsModalClose = () => {
    setTermsModalOpen(false)
  }

  const onClickLogout = () => {
    authAPI.removeAccessToken()
    window.location.href = "/index.html"
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title}>
          내 정보
          </Typography>
        <Box className={classes.content}>
          <Grid container>
            <Avatar className={classes.profileImg} src={profile.img} />
            <Grid className={classes.profileInfoGrid}>
              <Typography className={classes.profileName}>
                {profile.name}
              </Typography>
              <Typography className={classes.profileEmail} color="textSecondary">
                {profile.email}
              </Typography>
              <Grid>
                <Button className={classes.profileBtn} size="small" onClick={handleClickTermsOpen}>약관보기</Button>
                <TermsModal openBool={termsModalOpen} onClose={handleClickTermsModalClose} />
                {/* <StyledBadge color="primary" variant="dot" invisible={badgeInvisible}>
                    <Button className={classes.profileBtn}
                      size="small">
                      공지보기
                    </Button>
                  </StyledBadge> */}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
      <CardActions>
        <Button className={classes.logoutBtn} variant="contained" onClick={onClickLogout}>
          로그아웃
        </Button>
      </CardActions>
    </Card>
  )
}