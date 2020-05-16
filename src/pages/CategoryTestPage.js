import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import CategoryDrawer from '../components/CategoryDrawer';
import CategoryCard from '../components/CategoryCard';
import './Category.scss';
import {useCategoryState} from '../containers/CategoryContainer';

export default function CategoryTestPage({getCategoryUrlInfoList}) {

  const categories = useCategoryState()
  const favoriteCategories = categories.filter(data => data.is_favorited === true)
  const defaultCategories = categories.filter(data => data.is_favorited === false)

  return (
    <div>
      <CategoryDrawer
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
    </div>
  )
} 




