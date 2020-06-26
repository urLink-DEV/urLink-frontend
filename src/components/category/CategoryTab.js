import React, {useState, useRef, useEffect} from 'react'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/Input'
import {useCategoryDispatch} from '../../containers/category/CategoryContainer'
import useStyles from './styles/CategoryTab'
import star from '../../images/star.svg'

export default function CategoryTab({
  text, 
  id, 
  order, 
  isFavorited, 
  urlCount, 
  selected, 
  dragFinished, 
  historyDragFinished, 
  setSelectedCategoryTitle}) {

  const classes = useStyles()

  const dispatch = useCategoryDispatch()
  const [categoryTitle, setCategoryTitle] = useState(text)
  const [prevCategoryTitle, setPrevCategoryTitle] = useState(text)
  const [disabled, setDisabled] = useState(true)

  const inputRef = useRef()

  const handleChange = (event) => {
    setCategoryTitle(event.target.value)
  }

  const onDoubleClick = () => {
    setDisabled(!disabled)
  }

  const updateText = (e) => {
      if (e.keyCode === 13) {
        if (e.target.value === '') {
          dispatch.updateCategory(id, prevCategoryTitle, order, isFavorited)
          .then(() => dispatch.getCategory())
          setDisabled(!disabled)
          setSelectedCategoryTitle(prevCategoryTitle)
          setCategoryTitle(prevCategoryTitle)
        } else {
          dispatch.updateCategory(id, categoryTitle, order, isFavorited)
          .then(() => dispatch.getCategory())
          setDisabled(!disabled)
          setSelectedCategoryTitle(categoryTitle)
        }
      }
  }

  useEffect(() => {
    if (!disabled) inputRef.current.children[0].focus()

    if (!selected && !disabled) {
      dispatch.updateCategory(id, prevCategoryTitle, order, isFavorited)
      .then(() => dispatch.getCategory())
      setDisabled(!disabled)
      setCategoryTitle(prevCategoryTitle)
    }

  },[disabled, categoryTitle, selected, prevCategoryTitle])


  return (
    <div className={
      classes.listItem
      + (selected ? ' ' + classes.selected : '')
      + (!disabled && selected ? ' ' + classes.modifying : '')}>
      <Paper 
        component="div" 
        className={classes.root + (dragFinished || historyDragFinished ? ' dragFinished' : '')
} 
        id={`${id}`}
      >
      <InputBase 
        disableUnderline={true}
        ref={inputRef}
        className={classes.input + (selected ? ' selected': '')}
        disabled={disabled}
        onDoubleClick={onDoubleClick}
        value={categoryTitle}
        onChange={handleChange}
        onKeyDown={updateText}
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