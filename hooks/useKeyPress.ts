import { useEffect, useState } from "react"


export const useKeyPress = ({ key, onKeyUp, onKeyDown }: any) => {
  const [isPressed, setPressed] = useState(false)

  useEffect(() => {
    const handleDown = (event: any) => {
      const { key: pressedKey } = event
      if (key === pressedKey) {
        if (onKeyDown) onKeyDown()

        setPressed(true)
      }
    }

    const handleUp = (event: any) => {
      const { key: releasedKey } = event

      if (key === releasedKey) {
        if (onKeyUp) onKeyUp()

        setPressed(false)
      }
    }

    window.addEventListener("keyup", handleUp)
    window.addEventListener("keydown", handleDown)

    return () => {
      window.removeEventListener("keyup", handleUp)
      window.removeEventListener("keydown", handleDown)
    }
  }, [])

  return isPressed
}

export default useKeyPress