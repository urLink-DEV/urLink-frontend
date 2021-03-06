import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { linksRead, linkSelector } from '@modules/link'

export function useLinks({ categoryId }) {
  const dispatch = useDispatch()
  const links = useSelector(linkSelector.listData)
  const pending = useSelector((state) => state.pending[linksRead.TYPE])
  const error = useSelector((state) => state.error[linksRead.TYPE])

  const reload = useCallback(() => {
    dispatch(linksRead.request({ categoryId }))
  }, [dispatch, categoryId])

  useEffect(() => {
    if (pending === undefined && categoryId) {
      dispatch(linksRead.request({ categoryId }))
    }
  }, [dispatch, categoryId, pending])

  return { pending, error, links, reload }
}
