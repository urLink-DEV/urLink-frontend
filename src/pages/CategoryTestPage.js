import React, {useEffect, useState} from 'react'
import Grid from '@material-ui/core/Grid'
import CategoryAppBar from '../components/CategoryAppBar'
import CategoryDrawer from '../components/CategoryDrawer'
import CategoryCard from '../components/CategoryCard'
import {useCategoryState} from '../containers/CategoryContainer';
import HistoryContainer from '../containers/HistoryContainer'
import './Category.scss'

export default function CategoryPage({getCategoryUrlInfoList}) {


  return (
    <CategoryDrawer
      appBar={<CategoryAppBar>
        <HistoryContainer />
      </CategoryAppBar>}
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
