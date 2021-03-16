import { useEffect } from 'react'

function useOutsideAlerter(ref, bool, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current?.contains(event.target)) {
        return callback()
      }
    }

    if (bool) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [ref, bool, callback])
}

export default useOutsideAlerter
