import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import CategoryDrawer from '../components/CategoryDrawer';
import CategoryCard from '../components/CategoryCard';
import './Category.scss';


export default function CategoryPage(props) {

  const {
    getCategoryUrlInfoList,
    category,
    getCategory,
    writeCategory,
    updateCategory,
    deleteCategory
  } = props;

  const favoriteCategories = category.filter(data => data.is_favorited === true)
  const defaultCategories = category.filter(data => data.is_favorited === false)
  console.log('categoryPage', getCategoryUrlInfoList, category)

  useEffect(() => {
    getCategory()
  },[category])

  return (
    <div>
      <CategoryDrawer 
        defaultCategories={defaultCategories}
        favoriteCategories={favoriteCategories}
        getCategory={getCategory}
        writeCategory={writeCategory}
        updateCategory={updateCategory}
        deleteCategory={deleteCategory}
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




