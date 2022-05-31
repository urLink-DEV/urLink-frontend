import React, { useEffect, useCallback, memo, useState, useMemo, useRef } from 'react'

import { Badge, List, Popover, Drawer } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { alarmNoticeSelector } from '@/modules/alarmNotice'
import { useHistoryLinks } from '@/modules/historyLink'
import alarmImg from '@assets/images/alarm.png'
import historyImg from '@assets/images/history.png'
import personImg from '@assets/images/person.png'
import useDebounce from '@hooks/useDebounce'
import SearchBar from '@main/components/SearchBar'
import { linkSearchFilterChangeState } from '@modules/link'
import { GAEvent } from '@utils/ga'

import AlarmList from './AlarmList'
import DraggableHistoryList from './DraggableHistoryList'
import Profile from './Profile'
import useStyles, { StyledListItem } from './style'

const SEARCH_FILTER_LIST = [
  { search: 'path', name: '주소', description: '링크 도메인 주소로 검색' },
  { search: 'title', name: '제목', description: '링크 제목으로 검색' },
]

function AppBar() {
  const classes = useStyles()

  const dispatch = useDispatch()
  const alarmList = useSelector(alarmNoticeSelector.listData)

  const { reload } = useHistoryLinks()

  const notReadAlarmList = useMemo(() => {
    return alarmList?.filter((item) => !item?.alarm_has_read)
  }, [alarmList])

  const alarmRef = useRef(null)
  const profileRef = useRef(null)

  const [historyOpen, setOpenHistory] = useState(false)
  const [openAlarm, setOpenAlarm] = useState(false)
  const [openProfile, setOpenProfile] = useState(false)

  const [selectedName, setSelectedName] = useState(SEARCH_FILTER_LIST[0].search)
  const [keyword, setKeyword] = useState('')

  const debouncedKeyword = useDebounce(keyword, 250)

  const handleChangeInput = useCallback((e) => {
    setKeyword(e.target.value)
  }, [])

  const handleResetInput = useCallback(() => {
    setKeyword('')
  }, [])

  const handleSelectName = useCallback(
    (e) => {
      handleResetInput()
      setSelectedName(e.target.value)
      GAEvent('메인', '검색 주제 바꾸기')
    },
    [handleResetInput]
  )

  useEffect(() => {
    dispatch(linkSearchFilterChangeState({ selectedName, keyword: debouncedKeyword }))
  }, [dispatch, selectedName, debouncedKeyword])

  return (
    <>
      <div className={classes.appBar}>
        <SearchBar
          inputProps={{
            value: keyword,
            onChange: handleChangeInput,
          }}
          searchFilterList={SEARCH_FILTER_LIST}
          onSelectName={handleSelectName}
          selectedName={selectedName}
        />
        <List className={classes.iconButtonGroup}>
          <StyledListItem
            button
            aria-describedby="history-drawer"
            onClick={() => {
              reload()
              setOpenHistory((open) => !open)
              GAEvent('앱바', '방문기록 드로어 버튼 클릭')
            }}
          >
            <img className={classes.imgButton} src={historyImg} alt="history drawer icon button" />
          </StyledListItem>

          <StyledListItem
            button
            ref={alarmRef}
            aria-describedby="alarm-popover"
            onClick={() => {
              setOpenAlarm((open) => !open)
              GAEvent('앱바', '알람 팝업 버튼 클릭')
            }}
          >
            <Badge
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
              badgeContent={notReadAlarmList?.length}
              max={99}
              color="primary"
            >
              <img className={classes.imgButton} src={alarmImg} alt="alarm list icon button" />
            </Badge>
            <Popover
              id="alarm-popover"
              open={openAlarm}
              anchorEl={alarmRef.current}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <AlarmList />
            </Popover>
          </StyledListItem>

          <StyledListItem
            button
            ref={profileRef}
            aria-describedby="profile-popover"
            onClick={() => {
              setOpenProfile((open) => !open)
              GAEvent('앱바', '프로필 팝업 버튼 클릭')
            }}
          >
            <img className={classes.imgButton} src={personImg} alt="profile popover icon button" />
          </StyledListItem>
          <Popover
            id="profile-popover"
            open={openProfile}
            onClose={() => setOpenProfile((open) => !open)}
            anchorEl={profileRef.current}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Profile />
          </Popover>
        </List>
      </div>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={historyOpen}
        onClose={() => setOpenHistory(false)}
      >
        <DraggableHistoryList />
      </Drawer>
    </>
  )
}

export default memo(AppBar)
