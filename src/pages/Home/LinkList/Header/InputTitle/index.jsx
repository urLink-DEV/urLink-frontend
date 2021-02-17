import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  categoriesRead,
  categorySelect,
  selectSelectedCategory,
  categoryModifyThunk,
} from '@modules/category'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import CreateIcon from '@material-ui/icons/Create'
import useStyles from './style'

function InputTitle() {

  const classes = useStyles()
  const dispatch = useDispatch()
  const selectedCategory = useSelector(selectSelectedCategory)
  const [categoryTitle, setCategoryTitle] = useState('')
  const [isModified, setIsModified] = useState(false)
  
  useEffect(() => {
    if (selectedCategory?.name) {
      setCategoryTitle(selectedCategory.name)
    }
  }, [selectedCategory])

  const handleChangeCategoryTitle = e => {
    let checks = /[a-zA-Z]/
    if(checks.test(e.target.value)) {
        if(e.target.value.length >= 14) return
    } else if (e.target.value.length >= 7) return
    setCategoryTitle(e.target.value)
  }

  const handleClickCategoryTitle = e => {
    e.stopPropagation()
  }
  
  const handleKeyupModifyCategoryTitle = async e => {
    if (e.keyCode === 13) {
      const response = await dispatch(
        categoryModifyThunk({ 
          name: categoryTitle, 
          id: selectedCategory?.id, 
          order: selectedCategory?.order, 
          is_favorited: selectedCategory?.isFavorited 
        })
      )
      console.log(response)
      dispatch(categorySelect({ ...response }))
      dispatch(categoriesRead.request());
      setIsModified(false)
    }
  }
  const handleClickModifyBtn = e => {
    e.stopPropagation()
    setCategoryTitle(selectedCategory?.name)
    setIsModified(true)
  }

  return (
    <div className={classes.title}>
      {isModified
        ? <InputBase className={classes.mainFont} 
          value={categoryTitle}
          onChange={handleChangeCategoryTitle}
          onClick={handleClickCategoryTitle}
          onKeyUp={handleKeyupModifyCategoryTitle}
        />
        : <div className={classes.mainFont}>
          {selectedCategory?.name}
          <IconButton
            aria-label="setting"
            onClick={handleClickModifyBtn}
          >
            <CreateIcon fontSize="small" />
          </IconButton>
        </div>
      }
    </div>
  )
}

export default InputTitle