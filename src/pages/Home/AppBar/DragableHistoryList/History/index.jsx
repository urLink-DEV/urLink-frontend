import React, { useState } from 'react';
import clsx from 'clsx';
import { IconButton, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import useStyles from './style';
import logoImg from '@images/logo/logo16.png';
import linkCopyImg from '@images/link-copy.svg';
import newTabImg from '@images/new-tab.svg';
import { createTab } from '@commons/chromeApis/tab';
import copyLink from '@commons/utils/copyLink';
import { useToast } from '@modules/ui';

function History({ isSelected = false, data = {}, ...props }) {
  const classes = useStyles();
  const { openToast } = useToast();
  const [faviconLink, setFaviconLink] = useState(
    `https://www.google.com/s2/favicons?domain=${data.hostName}`
  );

  const handleNewTab = (e) => {
    e.stopPropagation();
    createTab(data.url);
  };

  const handleLinkCopy = (e) => {
    e.stopPropagation();
    copyLink(data.url);
    openToast({ type: 'success', message: '링크가 복사 되었습니다.' });
  };

  return (
    <ListItem
      button
      disableRipple
      classes={{
        container: clsx(classes.listItem, {
          [classes.selected]: isSelected,
        }),
        button: classes.listButton,
      }}
      {...props}
    >
      <ListItemIcon>
        <img
          className={classes.favicon}
          onError={() => setFaviconLink(logoImg)}
          src={faviconLink}
          alt={data.title}
        />
      </ListItemIcon>
      <ListItemText
        primary={
          <>
            <span className={classes.mainFont}>{data.title + ` (${data.visitCount})`}</span>
            <span className={classes.subFont}>{data.hostName}</span>
          </>
        }
      />
      <ListItemSecondaryAction className={classes.buttonGroup}>
        <IconButton onClick={handleNewTab} className={classes.iconButton}>
          <img src={newTabImg} alt="새 창으로 열기" title="새 창으로 열기" />
        </IconButton>
        <IconButton onClick={handleLinkCopy} className={classes.iconButton}>
          <img src={linkCopyImg} alt="링크 복사 하기" title="링크 복사 하기" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default History;
