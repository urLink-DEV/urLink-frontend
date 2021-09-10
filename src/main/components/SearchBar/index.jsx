import React, { useState, useRef } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import CalendarPicker from '@mui/lab/CalendarPicker'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import InputBase from '@mui/material/InputBase'
import MenuItem from '@mui/material/MenuItem'
import Popover from '@mui/material/Popover'
import Select from '@mui/material/Select'

import useStyles from './style'

function SearchBar({ inputProps, searchFilterList, onSelectName, selectedName, onChangeDate, selectedDate }) {
  const classes = useStyles()

  // Calendar Popper
  const pickerRef = useRef(null)
  const [openPicker, setOpenPicker] = useState(false)

  return (
    <Container className={classes.searchBar}>
      <SearchIcon className={classes.searchIcon} />
      <Divider className={classes.divider} orientation="vertical" flexItem={true} />
      <Select
        className={classes.inputSelect}
        variant="standard"
        disableUnderline={true}
        MenuProps={{
          getcontentanchorel: null,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        }}
        value={selectedName}
        onChange={onSelectName}
      >
        {searchFilterList?.map(({ search, name }) => (
          <MenuItem className={classes.menuItem} key={search} value={search}>
            {name}
          </MenuItem>
        ))}
      </Select>
      <Divider className={classes.divider} orientation="vertical" flexItem={true} />
      {selectedName === 'date' ? (
        <>
          <Button
            className={classes.pickerBtn}
            ref={pickerRef}
            aria-describedby="calendar-popper"
            onClick={() => setOpenPicker((open) => !open)}
          >
            {selectedDate ? new Date(selectedDate).toLocaleDateString() : '날짜를 검색하려면 클릭하세요'}
          </Button>
          <Popover
            id="calendar-popper"
            open={openPicker}
            onClose={() => setOpenPicker((open) => !open)}
            anchorEl={pickerRef.current}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <CalendarPicker
              className={classes.datePicker}
              disableFuture={true}
              date={selectedDate}
              onChange={onChangeDate}
            />
          </Popover>
        </>
      ) : (
        <InputBase
          placeholder="웹사이트 주소나 제목을 검색하세요"
          classes={{ input: classes.searchInput }}
          inputProps={{ 'aria-label': 'search' }}
          {...inputProps}
        />
      )}
    </Container>
  )
}

export default SearchBar
