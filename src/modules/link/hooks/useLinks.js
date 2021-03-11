import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { linksRead, linkSelector } from '@modules/link'

const INIT = undefined

export function useLinks({ detact = false, categoryId, selectedName, keyword }) {
  const dispatch = useDispatch()
  const links = useSelector(linkSelector.listData)
  const pending = useSelector((state) => state.pending[linksRead.TYPE])
  const error = useSelector((state) => state.error[linksRead.TYPE])

  const refresh = useCallback(() => {
    if (categoryId) dispatch(linksRead.request({ categoryId }))
  }, [dispatch, categoryId])

  const reload = useCallback(() => {
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
      refresh()
    }
  }, [pending, refresh])

  useEffect(() => {
    if (detact) {
      reload()
    }
  }, [detact, reload])

  return { pending, error, links, reload, refresh }
}
