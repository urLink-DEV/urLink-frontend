import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { categoriesRead, categorySelector } from '@modules/category'
import { ERROR } from '@modules/error'
import { PENDING } from '@modules/pending'

const useCategories = () => {
  const dispatch = useDispatch()
  const pending = useSelector((state) => state[PENDING][categoriesRead.TYPE]?.['isFirstCategory'])
  const error = useSelector((state) => state[ERROR][categoriesRead.TYPE]?.['isFirstCategory'])
  const categories = useSelector(categorySelector.listData)
  const favoritedArr = useSelector(categorySelector.favoriteCategories)
  const notFavoritedArr = useSelector(categorySelector.normalCategories)

  const reload = () => {
    dispatch(categoriesRead.request())
  }

  React.useEffect(() => {
    dispatch(categoriesRead.request(undefined, { key: 'isFirstCategory' }))
  }, [dispatch])

  return { pending, error, categories, favoritedArr, notFavoritedArr, reload }
}

export default useCategories
