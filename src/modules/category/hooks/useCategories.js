import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  categoriesRead,
  selectCategories,
  selectFavoriteCategories,
  selectNotFavoriteCategories,
} from '@modules/category'

export function useCategories() {
  const dispatch = useDispatch()
  const categories = useSelector(selectCategories)
  const favoritedArr = useSelector(selectFavoriteCategories)
  const notFavoritedArr = useSelector(selectNotFavoriteCategories)
  const pending = useSelector((state) => state.pending[categoriesRead.TYPE]?.['isFirstCategory'])
  const error = useSelector((state) => state.error[categoriesRead.TYPE]?.['isFirstCategory'])

  const reload = () => {
    dispatch(categoriesRead.request())
  }

  React.useEffect(() => {
    dispatch(categoriesRead.request(undefined, { key: 'isFirstCategory' }))
  }, [dispatch])

  return { pending, error, categories, favoritedArr, notFavoritedArr, reload }
}
