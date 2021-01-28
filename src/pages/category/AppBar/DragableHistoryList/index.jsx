import React, { Fragment, useRef, useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import clsx from 'clsx';
import { Card, CardContent, CardMedia, IconButton, List, Typography } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import SearchButton from '@components/SearchButton';
import useStyles from './style';
import HistoryDragBox from './HistoryDragBox';
import HistoryDateTitle from './HistoryDateTitle';
import History from './History';
import linkListSearchEmptyImg from '@images/group-17.png';
import linkListEmptyImg from '@images/group-19.png';
import { createTabList } from '@commons/chromeApis/tab';
import useOutsideAlerter from '@hooks/useOutsideAlerter';
import { useHistoryLinkListData } from '@modules/historyLink';
import { DROP_ZONE, DRAG, useDrag, useDropZone } from '@modules/ui';
const { LINK } = DRAG;
const { LINK_DROP_ZONE } = DROP_ZONE;

function DragableHistoryList() {
  const classes = useStyles();
  const { open, toggle, close } = useDropZone(LINK_DROP_ZONE);
  const historyListRef = useRef(null);
  const dragBoxRef = useRef(null);
  const [selectedList, setSelectedList] = useState([]);
  const { filter, listData, reload, search, next } = useHistoryLinkListData();
  const { setDragData, clearDragData } = useDrag(LINK);
  useOutsideAlerter(
    historyListRef,
    !!selectedList.length,
    useCallback(() => {
      setSelectedList([]);
    }, [])
  );

  const handleDragStart = ({ id, url: path }) => (e) => {
    e.stopPropagation();
    const dragListData = selectedList;
    const isSelectedItem = selectedList.find((selected) => selected.id === id);
    if (!isSelectedItem) {
      setSelectedList((listData) => listData.concat({ id, path }));
      dragListData.concat({ id, path });
    }
    setDragData(dragListData);
    e.dataTransfer.setDragImage(dragBoxRef.current, 110, 35);
  };

  const handleDragEnd = (_) => (e) => {
    e.stopPropagation();
    setSelectedList([]);
    clearDragData();
  };

  const handleToogleSelectIem = ({ id, url: path }) => (_e) => {
    const isSelected = selectedList.find((item) => item.id === id);
    if (isSelected) setSelectedList((listData) => listData.filter((data) => data.id !== id));
    else setSelectedList((listData) => listData.concat({ id, path }));
  };

  const handleHistorySearchScroll = (e) => {
    const scrollTop = e.currentTarget.scrollTop;
    const scrollHeight = e.currentTarget.scrollHeight;
    const clientHeight = e.currentTarget.clientHeight;
    if (Math.ceil(scrollTop + clientHeight) >= scrollHeight) next();
  };

  const handleHistorySearch = (e) => {
    const { keyCode } = e;
    const { value } = e.currentTarget;
    if (keyCode === 13) search(value);
  };

  const handleOpenNewTab = (_e) => {
    createTabList(selectedList.reduce((list, link) => list.concat(link.path), []));
  };

  const handleReload = debounce(reload, 400);

  useEffect(() => {
    if (!open && selectedList.length) toggle();
    else if (open && !selectedList.length) close();
  }, [selectedList, toggle, close, open]);

  return (
    <>
      <HistoryDragBox ref={dragBoxRef} selectedCount={selectedList.length} />
      <Card className={classes.root} onScroll={handleHistorySearchScroll}>
        <CardContent>
          <div className={classes.header}>
            <div className={classes.spread}>
              <Typography className={classes.mainText}>방문기록</Typography>
              <div className={classes.center}>
                <SearchButton
                  inputProps={{
                    defaultValue: filter.text,
                    onKeyDown: handleHistorySearch,
                  }}
                />
                {!!selectedList.length && (
                  <button className={classes.tabOpenButton} onClick={handleOpenNewTab}>
                    <span className={classes.tabOpenText}>탭 열기 ({selectedList.length})</span>
                  </button>
                )}
              </div>
            </div>
            <IconButton onClick={handleReload}>
              <RefreshIcon />
            </IconButton>
          </div>
          {!!listData.length ? (
            <List ref={historyListRef}>
              {listData.map((data) => (
                <Fragment key={data.id}>
                  <HistoryDateTitle data={data} />
                  <History
                    draggable
                    data-type="link"
                    data={data}
                    isSelected={selectedList.find((list) => list.id === data.id)}
                    onDragStart={handleDragStart({ id: data.id, url: data.url })}
                    onDragEnd={handleDragEnd()}
                    onClick={handleToogleSelectIem({ id: data.id, url: data.url })}
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
      </Card>
    </>
  );
}

export default DragableHistoryList;
