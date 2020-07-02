import React, { useState } from 'react'

import Button from '@material-ui/core/Button'
import Popover from '@material-ui/core/Popover'
import Badge from '@material-ui/core/Badge'
import useStyles from './styles/CategoryAppBar'

import alarm from '../../images/alarm.png'
import person from '../../images/person.png'
import history from '../../images/history.png'

import AlarmPopOver from '../popover/AlarmPopover'
import ProfilePopOver from '../popover/ProfilePopOver'
import CategoryHistoryDrawer from './CategoryHistoryDrawer'
import ProfileContext from '../../contexts/ProfileContext'

export default function CategoryAppBar(props) {  
  const classes = useStyles()
  const { 
    getHistory, 
    draggedHistoryList, 
    setDraggedHistoryList, 
    selectedLinkList,
    setSelectedLinkList,
    onAlarmRead,
    onNoReturnAlarm,
    alarmList, 
    // newRecentNofitication,
    getUser
  } = props
  
  const [historyDrawerOpen, setHistoryDrawerOpen] = useState(false) // * history
  const [anchorAlarm, setAnchorAlarm] = useState(null)
  const [anchorProfile, setAnchorProfile] = useState(null)

  const alarmOpen = Boolean(anchorAlarm)
  const alarmId = alarmOpen ? 'alarm-popover' : undefined
  const profileOpen = Boolean(anchorProfile)
  const profileId = profileOpen ? 'profile-popover' : undefined

  const onClickHistoryDrawer = () => { // * history
    setHistoryDrawerOpen(!historyDrawerOpen)
  }

  const handleAlarmPopOverClick = (event) => {
    setAnchorAlarm(event.currentTarget)
  }

  const handleAlarmPopOverClose = () => {
    setAnchorAlarm(null)
  }

  const handleProfilePopOverClick = (event) => {
    setAnchorProfile(event.currentTarget)
  }

  const handleProfilePopOverClose = () => {
    setAnchorProfile(null)
  }

  return (
    <div>
      <div className={classes.appBar}>
        <div className="drawer-btn-group">
          <Button className={classes.imgButton} onClick={onClickHistoryDrawer}>
            <img src={history} alt="history button" />
          </Button>

          <Button
          className={classes.imgButton}
            aria-describedby={alarmId}
            onClick={handleAlarmPopOverClick}
          >
            <Badge
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              badgeContent={alarmList.length}
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
            <AlarmPopOver alarmList={alarmList} 
              onAlarmRead={onAlarmRead} 
              onNoReturnAlarm={onNoReturnAlarm} 
            />
          </Popover>
          
          <Button
            className={classes.imgButton}
            aria-describedby={profileId}
            onClick={handleProfilePopOverClick}
            >
            {/* <Badge
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              badgeContent={newRecentNofitication.length}
              color='primary'
              variant='dot'
            > */}
              <img src={person} alt='person button' />
            {/* </Badge> */}
          </Button>
          
          <Popover 
            id={profileId}
            open={profileOpen}
            onClose={handleProfilePopOverClose}
            anchorEl={anchorProfile}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
          >
            <ProfileContext getUser={getUser}>
              <ProfilePopOver />
            </ProfileContext>
          </Popover>
        </div>
      </div>

      <CategoryHistoryDrawer
        getHistory={getHistory}
        draggedHistoryList={draggedHistoryList} 
        setDraggedHistoryList={setDraggedHistoryList}
        selectedLinkList={selectedLinkList}
        setSelectedLinkList={setSelectedLinkList}
        historyDrawerOpen={historyDrawerOpen} 
        onClickHistoryDrawer={onClickHistoryDrawer}
      />
    </div>
  )
}