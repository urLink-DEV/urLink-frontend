import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import EditableTitle from './EditableTitle'
import SearchButton from '@components/SearchButton'
import useStyles from './style'

function Header() {

  const classes = useStyles()

  return (
    <Toolbar container className={classes.toolbar}>
      <EditableTitle />
      {/* {selectedCardList.length > 0 ? (
        <>
          <Button onClick={handleClickOpenSelectedCardList}>탭 열기</Button>
          <Button color="secondary" onClick={handleClickDeleteSelectedCardList}>
            탭 삭제
          </Button>
        </>
      ) : null} */}
      <SearchButton />
    </Toolbar>
  )
}

export default Header