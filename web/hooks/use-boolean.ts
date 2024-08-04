import { useCallback, useState } from "react"

export interface UseBoolean {
  state: boolean
  setState: React.Dispatch<React.SetStateAction<boolean>>
  setTrue: () => void
  setFalse: () => void
  toggle: () => void
}

export function useBoolean(defaultValue = false): UseBoolean {
  const [state, setState] = useState(Boolean(defaultValue))

  const setTrue = useCallback(() => {
    setState(true)
  }, [])

  const setFalse = useCallback(() => {
    setState(false)
  }, [])

  const toggle = useCallback(() => {
    setState((prev) => !prev)
  }, [])

  return { state, setState, setTrue, setFalse, toggle }
}
