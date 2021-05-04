import { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { openDialog, closeDialog, closeAllDialogs, uiSelector } from '@modules/ui'

const useDialog = (type) => {
  const dispatch = useDispatch()
  const dialogs = useSelector(uiSelector.dialogs)
  const open = !!dialogs.find((dialog) => dialog.type === type)

  const toggle = useCallback(() => {
    if (open) {
      dispatch(closeDialog({ type }))
    } else {
      dispatch(openDialog({ type }))
    }
  }, [open, type, dispatch])

  const close = useCallback(() => {
    dispatch(closeDialog({ type }))
  }, [dispatch, type])

  const closeAll = useCallback(() => {
    if (dialogs.length) {
      dispatch(closeAllDialogs())
    }
  }, [dispatch, dialogs])

  return { open, toggle, close, closeAll }
}

export default useDialog
