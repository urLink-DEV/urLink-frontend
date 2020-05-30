import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
import Popover from '@material-ui/core/Popover'
import CategoryHistory from './CategoryHistory'
import CategoryHistoryList from './CategoryHistoryList'
import useStyles from './styles/CategoryAppBar'
import alarm from '../../images/alarm.png'
import person from '../../images/person.png'
import history from '../../images/history.png'

export default function CategoryAppBar(props) {

  const classes = useStyles()
  const {urlList} = props
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
            <img src={alarm} alt="alarm button" />
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
            asdfasdf
          </Popover>
          <Button
            aria-describedby={profileId}
            onClick={handleProfilePopOverClick}
          >
            <img src={person} alt="person button" />
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