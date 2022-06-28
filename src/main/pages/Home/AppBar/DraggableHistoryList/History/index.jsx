import React, { memo, useCallback, useState } from 'react'

import LinkIcon from '@mui/icons-material/Link'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { IconButton, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@mui/material'
import clsx from 'clsx'

import logoImg from '@assets/images/logo/logo16.png'
import newTabImg from '@assets/images/new-tab.svg'
import { useToast } from '@modules/ui'
import { createTab } from '@utils/chromeApis/tab'
import copyLink from '@utils/copyLink'
import { GAEvent } from '@utils/ga'

import useStyles from './style'

function History({ isSelected = false, data = {}, ...props }) {
  const classes = useStyles()
  const { openToast } = useToast()

  const [faviconLink, setFaviconLink] = useState(`https://www.google.com/s2/favicons?domain=${data.hostName}`)

  const handleNewTab = useCallback(
    (e) => {
      e.stopPropagation()
      GAEvent('방문기록', '링크 새 탭 열기')
      createTab(data.url)
    },
    [data.url]
  )

  const handleLinkCopy = useCallback(
    (e) => {
      e.stopPropagation()
      GAEvent('방문기록', '링크 복사 하기')
      copyLink(data.url)
      openToast({ type: 'success', message: '링크가 복사 되었습니다.' })
    },
    [data.url, openToast]
  )

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
        <img className={classes.favicon} onError={() => setFaviconLink(logoImg)} src={faviconLink} alt={data.title} />
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
          <OpenInNewIcon className={classes.openInNewIcon} alt="새 창으로 열기" />
        </IconButton>
        <IconButton onClick={handleLinkCopy} className={classes.iconButton}>
          <LinkIcon className={classes.linkIcon} alt="링크 복사 하기" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default memo(History)
