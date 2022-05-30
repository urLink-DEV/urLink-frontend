import React, { useState, useRef, useCallback } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import { CalendarPicker } from '@mui/lab'
import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import InputBase from '@mui/material/InputBase'
import MenuItem from '@mui/material/MenuItem'
import Popover from '@mui/material/Popover'
import Select from '@mui/material/Select'

import useStyles from './style'

function SearchBar({ inputProps, searchFilterList, onSelectName, selectedName, onChangeDate, selectedDate }) {
  const classes = useStyles()

  const pickerRef = useRef(null)
  const [openPicker, setOpenPicker] = useState(false)

  const handleChangeDate = useCallback(
    (date) => {
      onChangeDate(date)
      setOpenPicker(!openPicker)
    },
    [onChangeDate, openPicker]
  )

  return (
    <div className={classes.searchBar}>
      <Select
        variant="standard"
        disableUnderline={true}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          PaperProps: {
            className: classes.searchSelectPaper,
          },
        }}
        className={classes.searchSelect}
        value={selectedName}
        onChange={onSelectName}
        renderValue={(selected) => searchFilterList?.find((searchFilter) => searchFilter.search === selected)?.name}
      >
        {searchFilterList?.map(({ search, name, description }) => (
          <MenuItem className={classes.searchSelectItem} key={search} value={search}>
            <Typography fontSize={14} fontWeight={400} lineHeight={'20px'} color={'#666666'}>
              {name}
            </Typography>
            <Typography fontSize={14} fontWeight={400} lineHeight={'20px'} color={'#999999'}>
              {description}
            </Typography>
          </MenuItem>
        ))}
      </Select>
      <Divider className={classes.divider} orientation="vertical" />
      <SearchIcon className={classes.searchIcon} />
      {selectedName === 'date' ? (
        <>
          <Button
            className={classes.pickerBtn}
            ref={pickerRef}
            aria-describedby="calendar-popover"
            onClick={() => setOpenPicker((open) => !open)}
          >
            {selectedDate ? selectedDate.format('YYYY-MM-DD') : '날짜를 검색하려면 클릭하세요'}
          </Button>
          <Popover
            id="calendar-popover"
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
              onChange={handleChangeDate}
            />
          </Popover>
        </>
      ) : (
        <InputBase placeholder="찾고 싶은 링크를 검색하세요" classes={{ input: classes.searchInput }} {...inputProps} />
      )}
    </div>
  )
}

export default SearchBar
