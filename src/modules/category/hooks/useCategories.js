import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCategories } from "@modules/category"

export function useCategories() {
	const dispatch = useDispatch()
	const categories = useSelector((state) => state.category.categories)
	const pending = useSelector((state) => state.pending[getCategories.TYPE])
	const error = useSelector((state) => state.error[getCategories.TYPE])

	const reload = () => {
		dispatch(getCategories.request())
	}

	React.useEffect(() => {
		// If not loaded yet
		if (pending === undefined) {
			dispatch(getCategories.request())
		}
	}, [dispatch, pending])

	return { pending, error, categories, reload }
}
