import React from 'react'
import Grid from '@material-ui/core/Grid'
import CategoryAppBar from '../components/CategoryAppBar'
import CategoryDrawer from '../components/CategoryDrawer'
import CategoryCard from '../components/CategoryCard'
import {useCategoryState} from '../containers/CategoryContainer';
import HistoryContainer from '../containers/HistoryContainer'
import './Category.scss'

export default function CategoryPage({getCategoryUrlInfoList}) {

  const categories = useCategoryState()
  const favoriteCategories = categories.filter(data => data.is_favorited === true)
  const defaultCategories = categories.filter(data => data.is_favorited === false)
  // const {
  //   getCategories,
  //   getFavoriteCategories,
  //   getCategoryUrlInfoList,
  // } = props

  return (
    <CategoryDrawer
      appBar={<CategoryAppBar>
        <HistoryContainer />
      </CategoryAppBar>}
      defaultCategories={defaultCategories}
      favoriteCategories={favoriteCategories}
    >
      <Grid container spacing={2}>
        {getCategoryUrlInfoList.map(urlObj => 
          <Grid item xs={2}>
            <CategoryCard urlInfoList={urlObj} />
          </Grid>
        )}
      </Grid>
    </CategoryDrawer>
  )
}
