import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
import Popover from '@material-ui/core/Popover'
import Badge from '@material-ui/core/Badge'
import CategoryHistory from './CategoryHistory'
import CategoryHistoryList from './CategoryHistoryList'
import AlarmPopOver from '../popover/AlarmPopover'
import useStyles from './styles/CategoryAppBar'
import alarm from '../../images/alarm.png'
import person from '../../images/person.png'
import history from '../../images/history.png'

export default function CategoryAppBar(props) {

  const classes = useStyles()
  const {urlList, newAlarmList, newRecentNofitication, newProfileList} = props
  const [openDrawer, setOpenDrawer] = useState(false)
  const [anchorAlarm, setAnchorAlarm] = useState(null)
  const [anchorProfile, setAnchorProfile] = useState(null)

  const onClickHistoryDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  const handleAlarmPopOverClick = (event) => {
    console.log(event.currentTarget)
    setAnchorAlarm(event.currentTarget)
  };

  const handleAlarmPopOverClose = () => {
    setAnchorAlarm(null)
  };

  const handleProfilePopOverClick = (event) => {
    console.log(event.currentTarget)
    setAnchorProfile(event.currentTarget)
  };

  const handleProfilePopOverClose = () => {
    setAnchorProfile(null)
  };

  const alarmOpen = Boolean(anchorAlarm)
  const alarmId = alarmOpen ? 'alarm-popover' : undefined
  const profileOpen = Boolean(anchorProfile)
  const profileId = profileOpen ? 'profile-popover' : undefined

  return (
    <div>
      <div className={classes.appBar}>
        <div className="drawer-btn-group">
          <Button onClick={onClickHistoryDrawer}>
            <img src={history} alt="history button" />
          </Button>
          <Button
            aria-describedby={alarmId}
            onClick={handleAlarmPopOverClick}
          >
            <Badge
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              badgeContent={newAlarmList.length}
              max={99}
              color='primary'
            >
              <img src={alarm} alt="alarm button" />
            </Badge>
          </Button>
          <Popover
            id={alarmId}
            open={alarmOpen}
            onClose={handleAlarmPopOverClose}
            anchorEl={anchorAlarm}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            <AlarmPopOver list={newAlarmList}/>
          </Popover>
          <Button
            aria-describedby={profileId}
            onClick={handleProfilePopOverClick}
          >
            <Badge
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              badgeContent={newRecentNofitication.length}
              color='primary'
              variant='dot'
            >
              <img src={person} alt='person button' />
            </Badge>
          </Button>
          <Popover 
            id={profileId}
            open={profileOpen}
            onClose={handleProfilePopOverClose}
            anchorEl={anchorProfile}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            asdfasdf
          </Popover>
        </div>
      </div>
      <CategoryHistory open={openDrawer} onClickHistoryDrawer={onClickHistoryDrawer}>
        <CategoryHistoryList urlList={urlList}/>
      </CategoryHistory>
    </div>
    
  )
}