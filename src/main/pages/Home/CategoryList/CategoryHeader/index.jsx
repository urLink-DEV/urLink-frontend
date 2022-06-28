import React from 'react'

import useStyles from './style'

function CategoryHeader({ type }) {
  const classes = useStyles()

  return <div className={classes.categoryHeader}>{type === 'favorite' ? 'Favorite' : 'Category'}</div>
}

export default React.memo(CategoryHeader)
