import React, {useState, useEffect} from 'react'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/Input'
import {useCategoryDispatch} from '../../containers/category/CategoryContainer'
import useStyles from './styles/CategoryTab'
import star from '../../images/star.svg'

export default function CategoryTab(props) {

  const {
    text, 
    id, 
    order, 
    isFavorited, 
    urlCount, 
    selected, 
    dragFinished, 
    historyDragFinished, 
    setSelectedCategoryTitle
  } = props

  const classes = useStyles()

  const dispatch = useCategoryDispatch()
  const [categoryTitle, setCategoryTitle] = useState(text)
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    if (!selected) {
      setDisabled(true)
      setCategoryTitle(text)
    }
  }, [selected])
  
  const handleChange = e => {
    setCategoryTitle(e.target.value)
  }

  const onDoubleClick = (e) => {
    e.preventDefault()
    console.log('double click')
    handleFocusIn(e)
  }

  const handleFocusIn = e => {
    setDisabled(false)
    console.log('focus on', id)
  }

  const handleFocusOut = () => {
    setDisabled(true)
    setCategoryTitle(text)
    console.log('focus out successs', id)
  }

  const updateText = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.keyCode === 13) {
      if (!categoryTitle) {
        setCategoryTitle(text)
        setDisabled(true)
      } else {
        dispatch.updateCategory(id, categoryTitle, order, isFavorited)
          .then(() => dispatch.getCategory())
          .then(() => {
            setSelectedCategoryTitle(categoryTitle)
            setDisabled(true)
          })
      }
    }
  }

  return (
    <div className={
      classes.listTab
      + (selected ? ' ' + classes.selected : '')
      + (!disabled && selected ? ' ' + classes.modifying : '')}>
      <Paper 
        component="div" 
        className={classes.root + (dragFinished || historyDragFinished ? ' dragFinished' : '')} 
        id={`${id}`}
      >
      <InputBase 
        disableUnderline={true}
        // inputRef={inputRef}
        className={classes.input + (selected ? ' selected': '')}
        disabled={disabled}
        value={categoryTitle}
        onDoubleClick={onDoubleClick}

        onFocus={handleFocusIn}
        onBlur={handleFocusOut}
        onChange={handleChange}
        onKeyUp={updateText}
      />
      <div className={classes.linkBox}>
        <div className={classes.urlCountBox + (!isFavorited ? ' ' + classes.marginRight : '')}>
          {urlCount === 0 ? '링크 없음' : urlCount + ' 링크'} 
        </div>
        {isFavorited ? <img className={classes.favoriteStar} alt="favorite-star" src={star} /> : ''}
      </div>
      </Paper>
    </div>
  )
}