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
    isEditTitle, 
    selected, 
    dragFinished, 
    historyDragFinished, 
    selectedCategoryTitle,
  } = props

  const classes = useStyles()

  const [categoryTitle, setCategoryTitle] = useState(text)

  useEffect(() => {
    if (selected) {
      setCategoryTitle(selectedCategoryTitle)
    }
  }, [selectedCategoryTitle])
  

  return (
    <div className={classes.listTab + (selected ? ' ' + classes.selected : '') 
      + (selected && isEditTitle ? ' ' + classes.modifying : '')}>
      <Paper className={classes.root + (dragFinished || historyDragFinished ? ' dragFinished' : '')} 
        component="div" id={id}
      >
        <InputBase className={classes.input + (selected ? ' selected': '')}
          value={categoryTitle}
          disabled
          disableUnderline
        />
        <div className={classes.linkBox}>
          <div className={classes.urlCountBox + (!isFavorited ? ' ' + classes.marginRight : '')}>
            {urlCount === 0 ? '링크 없음' : urlCount + ' 링크'} 
          </div>
          {isFavorited ? <img draggable='false' className={classes.favoriteStar} alt="favorite-star" src={star} /> : ''}
        </div>
      </Paper>
    </div>
  )
}