import { useEffect } from "react"

/**
 * Hook that alerts clicks outside of the passed ref
 */
export default function useOutsideAlerter(ref, bool, callback) {
  function handleClickOutside(event) {

    if (ref.current && !ref.current.contains(event.target)) {
      return callback()
    }
  }

  useEffect(() => {
    // Bind the event listener
    if (bool) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    
    return () => {
        // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref, bool])
}