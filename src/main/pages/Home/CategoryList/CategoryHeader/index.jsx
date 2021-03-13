import React from 'react'

import useStyles from './style'

function CategoryHeader({ type }) {
  const classes = useStyles()

  return (
    <div className={type === 'favorite' ? classes.favoriteHeader : classes.categoryHeader}>
      <div className={type === 'favorite' ? classes.favoriteText : classes.categoryText}>
        {type === 'favorite' ? 'Favorite' : 'Category'}
      </div>
      <hr className={classes.hr} />
    </div>
  )
}

export default React.memo(CategoryHeader)
