import { useState, useEffect } from 'react'

export function useDebounce(value, delay) {
  // 디바운스 할 값을 관리하기위한 상태값과 setter함수
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // 딜레이 이후 값을 업데이트한다.
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // 딜레이 기간중에 value혹은 delay값이 업데이트 되었다면 이(cleanup)함수를 실행한다.
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay]) // delay값이나 value값이 업데이트 되었다면 다시 호출한다.

  return debouncedValue
}
