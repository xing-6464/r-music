import { CSSProperties, useState } from 'react'

let currentView: 'cd' | 'lyric' = 'cd'
const touch = { startX: 0, percent: 0 }

function useMiddleInteractive() {
  const [currentShow, setCurrentShow] = useState<'cd' | 'lyric'>('cd')

  const [middleLStyle, setMiddleLStyle] = useState<CSSProperties>()
  const [middleRStyle, setMiddleRStyle] = useState<CSSProperties>()

  function onMiddleTouchStart(e: React.TouchEvent) {
    touch.startX = e.touches[0].pageX
  }

  function onMiddleTouchMove(e: React.TouchEvent) {
    const deltaX = e.touches[0].pageX - touch.startX
    const left = currentView === 'cd' ? 0 : -window.innerWidth
    const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
    touch.percent = Math.abs(offsetWidth / window.innerWidth)

    if (currentView === 'cd') {
      if (touch.percent > 0.2) {
        setCurrentShow('lyric')
      } else {
        setCurrentShow('cd')
      }
    } else {
      if (touch.percent < 0.8) {
        setCurrentShow('cd')
      } else {
        setCurrentShow('lyric')
      }
    }

    setMiddleLStyle(() => ({
      opacity: 1 - touch.percent,
      transitionDuration: '0ms',
    }))
    setMiddleRStyle(() => ({
      transform: `translate3d(${offsetWidth}px,0,0)`,
      transitionDuration: '0ms',
    }))
  }

  function onMiddleTouchEnd() {
    let offsetWidth: number
    let opacity: number
    if (currentShow === 'cd') {
      currentView = 'cd'
      offsetWidth = 0
      opacity = 1
    } else {
      currentView = 'lyric'
      offsetWidth = -window.innerWidth
      opacity = 0
    }

    const duration = 300
    setMiddleLStyle(() => ({ opacity, transitionDuration: `${duration}ms` }))
    setMiddleRStyle(() => ({
      transform: `translate3d(${offsetWidth}px,0,0)`,
      transitionDuration: `${duration}ms`,
    }))
  }

  return {
    currentShow,
    middleLStyle,
    middleRStyle,
    onMiddleTouchEnd,
    onMiddleTouchMove,
    onMiddleTouchStart,
  }
}

export default useMiddleInteractive
