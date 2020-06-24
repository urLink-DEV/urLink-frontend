import React, {useState, useRef, useEffect} from 'react'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/Input'
import {useCategoryDispatch} from '../../containers/category/CategoryContainer'
import useStyles from './styles/CategoryTab'


export default function CategoryTab({text, id, order, isFavorited, urlCount, selected, dragFinished, historyDragFinished, setSelectedCategoryTitle}) {
  const classes = useStyles()

  const dispatch = useCategoryDispatch()
  const [value, setValue] = useState(text)
  const [disabled, setDisabled] = useState(true)

  const inputRef = useRef()

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const onDoubleClick = () => {
    setDisabled(!disabled)
  }

  const updateText = (e) => {
      if (e.keyCode === 13) {
        dispatch.updateCategory(id, value, order, isFavorited )
        setDisabled(!disabled)
        setSelectedCategoryTitle(value)
      }
  }

  useEffect(() => {
    if(disabled === false) inputRef.current.children[0].focus()
  },[disabled])


  return (
    <div >
      <Paper 
        component="div" 
        className={classes.root + (dragFinished || historyDragFinished ? ' dragFinished' : '') } 
        id={`${id}`}
      >
      <InputBase 
        disableUnderline={true}
        ref={inputRef}
        className={classes.input + (selected ? ' selected': '')}
        disabled={disabled}
        onDoubleClick={onDoubleClick}
        value={value}
        onChange={handleChange}
        onKeyDown={updateText}
      />
      <div className={classes.urlCountBox}>링크 {urlCount}개</div>
      </Paper>
    </div>
  )
}