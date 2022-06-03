import React, { Fragment, useRef, useState, useEffect, useCallback, useMemo } from 'react'

import { Refresh as RefreshIcon } from '@mui/icons-material'
import { Card, CardContent, CardMedia, IconButton, List, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import clsx from 'clsx'
import { debounce } from 'lodash'

import linkListSearchEmptyImg from '@assets/images/group-17.png'
import linkListEmptyImg from '@assets/images/group-19.png'
import useDebounce from '@hooks/useDebounce'
import useOutsideAlerter from '@hooks/useOutsideAlerter'
import ScrollUpButton from '@main/components/ScrollUpButton'
import SearchBar from '@main/components/SearchBar'
import { useHistoryLinks } from '@modules/historyLink'
import { DROP_ZONE, DRAG, useDrag, useDropZone } from '@modules/ui'
import { createTabList } from '@utils/chromeApis/tab'
import { GAEvent } from '@utils/ga'

import History from './History'
import HistoryDateTitle from './HistoryDateTitle'
import HistoryDragBox from './HistoryDragBox'
import useStyles from './style'

const { LINK } = DRAG
const { LINK_DROP_ZONE } = DROP_ZONE

const searchFilterList = [
  { search: 'text', name: '제목/주소', description: '링크 제목 / 도메인 주소로 검색' },
  { search: 'date', name: '날짜', description: '날짜를 지정하여 검색' },
]

function DraggableHistoryList() {
  const classes = useStyles()
  const { filter, listData, dateSearch, keywordSearch, next } = useHistoryLinks()
  const { setDragData } = useDrag(LINK)
  const { open, toggle, close } = useDropZone(LINK_DROP_ZONE)

  const [selectedList, setSelectedList] = useState([])
  const [buttonOpen, setButtonOpen] = useState(null)

  const [selectedName, setSelectedName] = useState(searchFilterList[0].search)
  const [keyword, setKeyword] = useState('')
  const debouncedKeyword = useDebounce(keyword, 250)
  const [dateKeyword, setDateKeyword] = useState(null)

  const historyRootRef = useRef(null)
  const historyContentRef = useRef(null)
  const dragBoxRef = useRef(null)

  const handleCancelSelectedLink = useCallback(() => {
    setSelectedList([])
  }, [])

  useOutsideAlerter(historyRootRef, !!selectedList.length, handleCancelSelectedLink)

  const handleDragStart = useCallback(
    ({ id, url: path }) =>
      (e) => {
        e.stopPropagation()
        const dragListData = selectedList
        const isSelectedItem = selectedList.find((selected) => selected.id === id)
        if (!isSelectedItem) {
          setSelectedList(selectedList.concat({ id, path }))
          dragListData.push({ id, path })
        }
        setDragData(dragListData)
        e.dataTransfer.setDragImage(dragBoxRef.current, 110, 35)
        GAEvent('방문기록', '링크 드래그 시작')
      },
    [selectedList, setDragData]
  )

  const handleDragEnd = useCallback(
    () => (e) => {
      e.stopPropagation()
      setSelectedList([])
      GAEvent('방문기록', '링크 드래그 완료')
    },
    []
  )

  const handleToggleSelectItem = useCallback(
    ({ id, url: path }) =>
      () => {
        const isSelected = selectedList.find((item) => item.id === id)
        if (isSelected) setSelectedList(selectedList.filter((data) => data.id !== id))
        else setSelectedList((listData) => listData.concat({ id, path }))
        GAEvent('방문기록', '링크 선택 하기')
      },
    [selectedList]
  )

  const handleHistoryListScroll = useCallback(
    (e) => {
      const scrollTop = e.currentTarget.scrollTop
      const scrollHeight = e.currentTarget.scrollHeight
      const clientHeight = e.currentTarget.clientHeight
      setButtonOpen(scrollTop + clientHeight / 2 > clientHeight)
      if (Math.ceil(scrollTop + clientHeight) >= scrollHeight) next()
    },
    [next]
  )

  const handleResetInput = useCallback(() => {
    setKeyword('')
    setDateKeyword(null)
  }, [])

  const handleReload = useMemo(() => {
    return debounce(() => {
      setSelectedList([])
      handleResetInput()
      GAEvent('방문기록', '새로고침')
    }, 400)
  }, [handleResetInput])

  const handleSelectName = useCallback(
    (e) => {
      handleResetInput()
      setSelectedName(e.target.value)
      GAEvent('방문기록', '검색 주제 바꾸기')
    },
    [handleResetInput]
  )

  // title, url
  const handleChangeInput = useCallback((e) => {
    setKeyword(e.target.value)
  }, [])

  // date
  const handleChangeDate = useCallback((date) => {
    setDateKeyword(date)
    GAEvent('방문기록', '검색바에서 날짜 바꾸기')
  }, [])

  const handleOpenNewTab = useCallback(() => {
    createTabList(selectedList.reduce((list, link) => list.concat(link.path), []))
    GAEvent('방문기록', '복수의 링크 새 탭 열기')
  }, [selectedList])

  useEffect(() => {
    if (!open && selectedList.length) toggle()
    else if (open && !selectedList.length) close()
  }, [selectedList, toggle, close, open])

  useEffect(() => {
    historyContentRef.current.scrollTop = 0
    if (selectedName === 'text') {
      keywordSearch(debouncedKeyword)
    } else if (selectedName === 'date') {
      dateSearch(dateKeyword)
    }
  }, [selectedName, keywordSearch, dateSearch, dateKeyword, debouncedKeyword])

  return (
    <Card ref={historyRootRef} className={classes.root}>
      <div className={classes.header}>
        <div className={classes.rowSpread}>
          <Typography className={classes.mainText}>방문기록</Typography>
          <IconButton className={classes.reloadIcon} onClick={handleReload}>
            <RefreshIcon />
          </IconButton>
        </div>
        {!selectedList.length ? (
          <SearchBar
            inputProps={{
              value: keyword,
              onChange: handleChangeInput,
            }}
            searchFilterList={searchFilterList}
            onSelectName={handleSelectName}
            selectedName={selectedName}
            onChangeDate={handleChangeDate}
            selectedDate={dateKeyword}
          />
        ) : (
          <div className={classes.headerButtonGroup}>
            <Typography className={classes.headerSelectedLinkText}>{selectedList.length}개 선택</Typography>
            <Button className={classes.headerButton} onClick={handleCancelSelectedLink}>
              <Typography className={classes.headerButtonText}>선택 해제</Typography>
            </Button>
            <Button className={classes.headerButton} onClick={handleOpenNewTab}>
              <Typography className={classes.headerButtonText}>링크 열기</Typography>
            </Button>
          </div>
        )}
      </div>
      <CardContent ref={historyContentRef} className={classes.content} onScroll={handleHistoryListScroll}>
        {listData.length ? (
          <List>
            {listData.map((data) => (
              <Fragment key={data.id}>
                <HistoryDateTitle data={data} />
                <History
                  draggable
                  data-type={LINK}
                  data={data}
                  isSelected={selectedList.find((list) => list.id === data.id)}
                  onDragStart={handleDragStart({ id: data.id, url: data.url })}
                  onDragEnd={handleDragEnd()}
                  onClick={handleToggleSelectItem({ id: data.id, url: data.url })}
                />
              </Fragment>
            ))}
          </List>
        ) : filter.text ? (
          <div className={clsx(classes.center, classes.marginTop16)}>
            <CardMedia
              component="img"
              className={classes.imgContent}
              image={linkListSearchEmptyImg}
              alt="link search list is empty"
            />
          </div>
        ) : (
          <div className={clsx(classes.center, classes.marginTop16)}>
            <CardMedia
              component="img"
              className={classes.imgContent}
              image={linkListEmptyImg}
              alt="link list is empty"
            />
          </div>
        )}
      </CardContent>
      <HistoryDragBox ref={dragBoxRef} selectedCount={selectedList.length} />
      <ScrollUpButton targetRef={historyContentRef} open={buttonOpen} />
    </Card>
  )
}

export default DraggableHistoryList
