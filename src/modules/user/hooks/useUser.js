import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { ERROR } from '@modules/error'
import { INIT, PENDING } from '@modules/pending'
import { userRead, userSelector } from '@modules/user'

const useUserData = () => {
  const dispatch = useDispatch()
  const data = useSelector(userSelector.data)
  const pending = useSelector((state) => state[PENDING][userRead.TYPE])
  const error = useSelector((state) => state[ERROR][userRead.TYPE])

  const reload = () => {
    dispatch(userRead.request())
  }

  useEffect(() => {
    if (pending === INIT) {
      dispatch(userRead.request())
    }
  }, [dispatch, pending])

  return { pending, error, data, reload }
}

export default useUserData
