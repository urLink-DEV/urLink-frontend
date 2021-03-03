import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { linksRead, selectLinks } from '@modules/link'

export function useLinks({ categoryId }) {
  const dispatch = useDispatch()
  const links = useSelector(selectLinks)
  const pending = useSelector((state) => state.pending[linksRead.TYPE])
  const error = useSelector((state) => state.error[linksRead.TYPE])

  const reload = () => {
    dispatch(linksRead.request({ categoryId }))
  }

  React.useEffect(() => {
    // If not loaded yet
    if (pending === undefined && categoryId) {
      dispatch(linksRead.request({ categoryId }))
    }
  }, [dispatch, pending, categoryId])

  return { pending, error, links, reload }
}
