import { useEffect, useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { ERROR } from '@modules/error'
import { linksRead, linkSelector } from '@modules/link'
import { INIT, PENDING } from '@modules/pending'

const useLinks = ({ detact = false, categoryId, selectedName, keyword }) => {
  const dispatch = useDispatch()
  const pending = useSelector((state) => state[PENDING][linksRead.TYPE])
  const error = useSelector((state) => state[ERROR][linksRead.TYPE])
  const links = useSelector(linkSelector.listData)

  const reload = useCallback(() => {
    if (categoryId) dispatch(linksRead.request({ categoryId }))
  }, [dispatch, categoryId])

  const filterChangeLoad = useCallback(() => {
    if (categoryId) {
      dispatch(
        linksRead.request({
          categoryId,
          [selectedName]: keyword,
        })
      )
    }
  }, [dispatch, selectedName, keyword, categoryId])

  useEffect(() => {
    if (pending === INIT) {
      reload()
    }
  }, [pending, reload])

  useEffect(() => {
    if (detact) {
      filterChangeLoad()
    }
  }, [detact, filterChangeLoad])

  return { pending, error, links, reload }
}

export default useLinks
