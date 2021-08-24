import React, { Fragment, useRef, useState, useEffect, useCallback, useMemo } from 'react'

import { Card, CardContent, CardMedia, IconButton, List, Typography } from '@material-ui/core'
import { Refresh as RefreshIcon } from '@material-ui/icons'
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

import History from './History'
import HistoryDateTitle from './HistoryDateTitle'
import HistoryDragBox from './HistoryDragBox'
import useStyles from './style'

const { LINK } = DRAG
const { LINK_DROP_ZONE } = DROP_ZONE

const searchFilterList = [
  { search: 'text', name: '제목/주소' },
  { search: 'date', name: '날짜' },
]

function DragableHistoryList() {
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

  useOutsideAlerter(
    historyRootRef,
    !!selectedList.length,
    useCallback(() => {
      setSelectedList([])
    }, [])
  )

  const handleDragStart = useCallback(
    ({ id, url: path }) => (e) => {
      e.stopPropagation()
      const dragListData = selectedList
      const isSelectedItem = selectedList.find((selected) => selected.id === id)
      if (!isSelectedItem) {
        setSelectedList(selectedList.concat({ id, path }))
        dragListData.push({ id, path })
      }
      setDragData(dragListData)
      e.dataTransfer.setDragImage(dragBoxRef.current, 110, 35)
    },
    [selectedList, setDragData]
  )

  const handleDragEnd = useCallback(
    () => (e) => {
      e.stopPropagation()
      setSelectedList([])
    },
    []
  )

  const handleToggleSelectItem = useCallback(
    ({ id, url: path }) => () => {
      const isSelected = selectedList.find((item) => item.id === id)
      if (isSelected) setSelectedList(selectedList.filter((data) => data.id !== id))
      else setSelectedList((listData) => listData.concat({ id, path }))
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
    }, 400)
  }, [handleResetInput])

  const handleSelectName = useCallback(
    (e) => {
      handleResetInput()
      setSelectedName(e.target.value)
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
  }, [])

  const handleOpenNewTab = useCallback(() => {
    createTabList(selectedList.reduce((list, link) => list.concat(link.path), []))
  }, [selectedList])

  useEffect(() => {
    if (!open && selectedList.length) toggle()
    else if (open && !selectedList.length) close()
  }, [selectedList, toggle, close, open])

  useEffect(() => {
    historyContentRef.current.scrollTop = 0
    if (selectedName === 'text') {
      keywordSearch(debouncedKeyword)
    } else if (selectedName === 'date' && dateKeyword) {
      dateSearch(dateKeyword)
    } else {
      dateSearch(new Date())
    }
  }, [selectedName, keywordSearch, dateSearch, dateKeyword, debouncedKeyword])

  return (
    <Card ref={historyRootRef} className={classes.root}>
      <div className={classes.header}>
        <div className={classes.rowSpread}>
          <Typography className={classes.mainText}>방문기록</Typography>
          <div className={classes.center}>
            <IconButton className={classes.reloadIcon} onClick={handleReload}>
              <RefreshIcon />
            </IconButton>
            {!!selectedList.length && (
              <button className={classes.tabOpenButton} onClick={handleOpenNewTab}>
                <span className={classes.tabOpenText}>탭 열기 ({selectedList.length})</span>
              </button>
            )}
          </div>
        </div>
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
      </div>
      <CardContent ref={historyContentRef} className={classes.content} onScroll={handleHistoryListScroll}>
        {!!listData.length ? (
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

export default DragableHistoryList
