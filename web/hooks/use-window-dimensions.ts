"use client"

import { useEffect, useState } from "react"

interface WindowDimentions  {
  width: number | undefined
  height: number | undefined
}

export function useWindowDimensions(): WindowDimentions {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimentions>({ width: undefined, height: undefined })

  useEffect(() => {
    function handleResize() {
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight })
    }

    handleResize()

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, []) // Empty array ensures that effect is only run on mount

  return windowDimensions
}
