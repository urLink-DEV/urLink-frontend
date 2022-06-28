import React, { useState, useRef, useCallback } from 'react'

import CancelIcon from '@mui/icons-material/Cancel'
import SearchIcon from '@mui/icons-material/Search'
import { CalendarPicker } from '@mui/lab'
import { IconButton, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import InputBase from '@mui/material/InputBase'
import MenuItem from '@mui/material/MenuItem'
import Popover from '@mui/material/Popover'
import Select from '@mui/material/Select'
import clsx from 'clsx'

import useStyles from './style'

function SearchBar({
  inputProps,
  searchFilterList,
  selectedName,
  onSelectName,
  onChangeDate,
  onReset,
  selectedDate,
  disabled,
}) {
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

  const handleCancelSearch = useCallback(() => {
    onReset()
  }, [onReset])

  return (
    <div
      className={clsx(classes.searchBar, {
        [classes.searchBarDisabled]: disabled,
      })}
    >
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
        disabled={disabled}
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
            disabled={disabled}
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
        <InputBase
          className={classes.searchInputBase}
          classes={{ input: classes.searchInput }}
          placeholder="찾고 싶은 링크를 검색하세요"
          disabled={disabled}
          {...inputProps}
        />
      )}
      {(inputProps?.value || selectedDate) && (
        <IconButton className={classes.searchInputCancel} onClick={handleCancelSearch}>
          <CancelIcon />
        </IconButton>
      )}
    </div>
  )
}

export default SearchBar
