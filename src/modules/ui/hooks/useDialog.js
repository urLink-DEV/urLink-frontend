import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { openDialog, closeDialog, closeAllDialogs } from "@modules/ui"

const useDialog = () => {
	const dispatch = useDispatch()
	const dialogs = useSelector((state) => state.ui.dialogs)
	const open = useCallback(
		(type, props) => {
			dispatch(openDialog({ type, props }))
		},
		[dispatch]
	)
	const close = useCallback(
		(type) => {
			dispatch(closeDialog({ type }))
		},
		[dispatch]
	)
	const closeAll = useCallback(() => {
		if (dialogs.length) {
			dispatch(closeAllDialogs())
		}
	}, [dispatch, dialogs])

	return { open, close, closeAll }
}

export default useDialog
