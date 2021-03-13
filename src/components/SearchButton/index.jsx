import React, { useRef, useState } from 'react'

import { Popover } from '@material-ui/core'
import ToggleButton from '@material-ui/lab/ToggleButton'

import SearchImg from '@assets/images/search.png'

import useStyles, { StyledToggleButtonGroup } from './style'

function SearchButton({ buttonProps, inputProps, listSearchFilter, onSelectButton, selectedName }) {
  const classes = useStyles()

  const searchButtonRef = useRef(null)
  const [openSearchBox, setOpenSearchBox] = useState(false)

  return (
    <>
      <button
        className={classes.searchBtn}
        ref={searchButtonRef}
        aria-describedby="search-input-box-popover"
        onClick={() => setOpenSearchBox((open) => !open)}
        {...buttonProps}
      >
        <img src={SearchImg} className={classes.searchIcon} alt="search-input-box-popover" />
        <span className={classes.searchBtnText}>Search</span>
      </button>
      <Popover
        id="search-input-box-popover"
        open={openSearchBox}
        onClose={() => setOpenSearchBox((open) => !open)}
        anchorEl={searchButtonRef.current}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <div className={classes.inputBox}>
          <div className={classes.marginBottom10}>
            <img src={SearchImg} className={classes.searchIcon} alt="search-icon" />
            <span className={classes.searchBtnText}>Search</span>
          </div>
          <div>
            <input className={classes.textfield} placeholder="검색어를 입력해 주세요." {...inputProps} />
          </div>
          {listSearchFilter && (
            <div>
              <StyledToggleButtonGroup size="small" exclusive value={selectedName} onChange={onSelectButton}>
                {listSearchFilter.map(({ search, name }) => (
                  <ToggleButton
                    key={search}
                    className={classes.popoverBtn}
                    value={search}
                    variant="contained"
                    size="small"
                  >
                    {name}
                  </ToggleButton>
                ))}
              </StyledToggleButtonGroup>
            </div>
          )}
        </div>
      </Popover>
    </>
  )
}

export default SearchButton
