import React, { useEffect, useCallback, memo, useState, useMemo, useRef } from 'react'

import OutboxIcon from '@mui/icons-material/Outbox'
import { Badge, List, Popover, Drawer } from '@mui/material'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'

import { AlertModal } from '@/main/components/modals'
import { alarmNoticeSelector } from '@/modules/alarmNotice'
import { categorySelector, useCategories } from '@/modules/category'
import { useHistoryLinks } from '@/modules/historyLink'
import { createBookmark, createBookmarkFolder } from '@/utils/chromeApis/bookmarks'
import alarmImg from '@assets/images/alarm.png'
import historyImg from '@assets/images/history.png'
import personImg from '@assets/images/person.png'
import useDebounce from '@hooks/useDebounce'
import SearchBar from '@main/components/SearchBar'
import { linkSearchFilterChangeState, linkSelector, linksReadThunk, useLinks } from '@modules/link'
import { uiSelector, useToast, useDialog, MODAL_NAME } from '@modules/ui'
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
  const category = useSelector(categorySelector.selectedCategory)
  const alarmList = useSelector(alarmNoticeSelector.listData)
  const isAppBarInversion = useSelector(uiSelector.isAppBarInversion)
  const { categories } = useCategories()
  const links = useSelector((state) => linkSelector.linksData(state))
  const { openToast } = useToast()

  const {
    open: migrateBookmarksOpen,
    toggle: migrateBookmarksToggle,
    close: migrateBookmarksClose,
  } = useDialog(MODAL_NAME.BOOKMARKS_MIGRATION_MODAL)
  const { reload } = useHistoryLinks()

  const notReadAlarmList = useMemo(() => {
    return alarmList?.filter((item) => !item?.alarm_has_read)
  }, [alarmList])

  const alarmRef = useRef(null)
  const profileRef = useRef(null)

  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [isAlarmOpen, setIsAlarmOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isReadyForMigration, setIsReadyForMigration] = useState(false)

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

  const fetchAllLinkData = async () => {
    //로딩 처리 필요
    migrateBookmarksClose()
    if (categories.length) {
      for (const category of categories) {
        await dispatch(linksReadThunk({ categoryId: category.id }, { key: category.id }))
      }
    }
    setIsReadyForMigration(true)
  }

  const handleMigrateBookmarks = useCallback(() => {
    const callback = (urlinkFolderId) => {
      for (const category of categories) {
        //카테고리 별로 북마크 폴더 생성
        createBookmarkFolder({ id: urlinkFolderId, title: category.name }, (id) => {
          for (const link of links[category.id]) {
            //카테고리 북마크 폴더 내에 링크 삽입
            createBookmark({
              id,
              title: link.title,
              url: link.path,
            })
          }
        })
      }

      setIsReadyForMigration(false)
      openToast({ type: 'success', message: '이동이 완료되었습니다. 북마크를 확인해주세요.' })
    }
    //유어링크 북마크 폴더 생성
    createBookmarkFolder({ id: '1', title: 'urLink Bookmarks' }, callback)
  }, [links, categories, openToast])

  useEffect(() => {
    dispatch(linkSearchFilterChangeState({ selectedName, keyword: debouncedKeyword }))
  }, [dispatch, selectedName, debouncedKeyword])

  useEffect(() => {
    if (isReadyForMigration) handleMigrateBookmarks()
  }, [isReadyForMigration, handleMigrateBookmarks])

  return (
    <>
      <div
        className={clsx(classes.appBar, {
          [classes.appBarInversion]: isAppBarInversion || isHistoryOpen,
        })}
      >
        <SearchBar
          inputProps={{
            value: keyword,
            onChange: handleChangeInput,
          }}
          searchFilterList={SEARCH_FILTER_LIST}
          selectedName={selectedName}
          onSelectName={handleSelectName}
          onReset={handleResetInput}
          disabled={!category?.id || isHistoryOpen}
        />
        <List className={classes.iconButtonGroup}>
          <StyledListItem
            button
            aria-describedby="bookmarks"
            onClick={() => {
              migrateBookmarksToggle()
              GAEvent('앱바', '북마크 이동 버튼 클릭')
            }}
          >
            <OutboxIcon />
          </StyledListItem>

          <StyledListItem
            button
            aria-describedby="history-drawer"
            onClick={() => {
              reload()
              setIsHistoryOpen((open) => !open)
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
              setIsAlarmOpen((open) => !open)
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
              open={isAlarmOpen}
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
              setIsProfileOpen((open) => !open)
              GAEvent('앱바', '프로필 팝업 버튼 클릭')
            }}
          >
            <img className={classes.imgButton} src={personImg} alt="profile popover icon button" />
          </StyledListItem>
          <Popover
            id="profile-popover"
            open={isProfileOpen}
            onClose={() => setIsProfileOpen((open) => !open)}
            anchorEl={profileRef.current}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Profile />
          </Popover>
        </List>
      </div>

      {migrateBookmarksOpen && (
        <AlertModal
          openBool={migrateBookmarksOpen}
          btnYesText="이동"
          contentText="모든 링크를 북마크로 이동하시겠습니까?"
          handleClose={migrateBookmarksClose}
          handleYesClick={fetchAllLinkData}
        />
      )}

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      >
        {isHistoryOpen && <DraggableHistoryList />}
      </Drawer>
    </>
  )
}

export default memo(AppBar)
