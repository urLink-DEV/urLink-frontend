import { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { UI, DRAG, setDrag, clearDrag } from '@modules/ui'

const { DRAG_STATUS } = DRAG

const useDrag = (type) => {
  const dispatch = useDispatch()
  const { type: dragType, status: dragStatus, listData, data } = useSelector((state) => {
    return {
      type: state[UI].drag.type,
      status: state[UI].drag.status,
      ...state[UI].drag?.[type],
    }
  })

  const setDragData = useCallback(
    (dragData) => {
      if (Array.isArray(dragData)) {
        dispatch(
          setDrag({
            type,
            status: DRAG_STATUS,
            listData: dragData,
          })
        )
      } else {
        dispatch(
          setDrag({
            type,
            status: DRAG_STATUS,
            data: dragData,
          })
        )
      }
    },
    [type, dispatch]
  )

  const clearDragData = useCallback(() => {
    dispatch(clearDrag())
  }, [dispatch])

  return { dragType, dragStatus, listData, data, setDragData, clearDragData }
}

export default useDrag
