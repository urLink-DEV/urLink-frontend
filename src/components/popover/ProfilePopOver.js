import React, {useState} from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Badge from '@material-ui/core/Badge'
import {useProfileContext} from '../../contexts/ProfileContext'
import useStyles, {StyledBadge} from './styles/ProfilePopOver'

export default function ProfilePopOver() {
  
  const classes = useStyles()
  const profile = useProfileContext()

  const [badgeInvisible, setBadgeInvisible] = React.useState(false);

  // TODO 추후 공지 api 나오면 구상
  const handleBadgeVisibility = () => {
    setBadgeInvisible(!badgeInvisible);
  };

  return (
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title}>
            내 정보
          </Typography>
          <Box className={classes.content}>
          <Grid container>
            <Avatar className={classes.profileImg} src={profile.img}/>
            <Grid className={classes.profileInfoGrid}>
              <Typography className={classes.profileName}>
                {profile.name}
              </Typography>
              <Typography className={classes.profileEmail} color="textSecondary">
                {profile.email}
              </Typography>
              <Grid>
                <Button className={classes.profileBtn}
                  size="small">
                  약관보기
                </Button>
                <StyledBadge color="primary" variant="dot" invisible={badgeInvisible}>
                  <Button className={classes.profileBtn}
                    size="small">
                    공지보기
                  </Button>
                </StyledBadge>
              </Grid>
            </Grid>
          </Grid>
          </Box>
        </CardContent>
        <CardActions>
          <Button className={classes.logoutBtn} variant="contained">로그아웃</Button>
        </CardActions>
      </Card>
  )
}