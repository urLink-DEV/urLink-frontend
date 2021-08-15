import React from 'react'

import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import InputBase from '@material-ui/core/InputBase'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import SearchIcon from '@material-ui/icons/Search'
import { DatePicker } from '@material-ui/pickers'

import useStyles from './style'

function SearchBar({ inputProps, listSearchFilter, onSelectName, selectedName, onChangeDate, selectedDate }) {
  const classes = useStyles()

  return (
    <Container className={classes.searchBar}>
      <SearchIcon className={classes.searchIcon} />
      <Divider className={classes.divider} orientation="vertical" flexItem={true} />
      <Select
        className={classes.inputSelect}
        disableUnderline={true}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
        }}
        value={selectedName}
        onChange={onSelectName}
      >
        {listSearchFilter?.map(({ search, name }) => (
          <MenuItem className={classes.menuItem} key={search} value={search}>
            {name}
          </MenuItem>
        ))}
      </Select>
      <Divider className={classes.divider} orientation="vertical" flexItem={true} />
      {selectedName === 'date' ? (
        <DatePicker
          className={classes.datePicker}
          disableFuture={true}
          disableToolbar
          format="yyyy-MM-DD"
          variant="inline"
          emptyLabel="날짜를 검색하려면 클릭하세요"
          value={selectedDate}
          onChange={onChangeDate}
        />
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
