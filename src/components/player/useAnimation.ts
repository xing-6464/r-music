import { useRef } from 'react'
import animations from 'create-keyframe-animation'

export default function useAnimation() {
  const cdWrapperRef = useRef<any>(null)

  function enter(isDone: boolean) {
    const { x, y, scale } = getPosAndScale()

    const animation = {
      0: {
        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
      },
      100: {
        transform: 'translate3d(0, 0, 0) scale(1)',
      },
    }

    animations.registerAnimation({
      name: 'move',
      animation,
      presets: {
        duration: 600,
        easing: 'cubic-bezier(0.45, 0, 0.55, 1)',
      },
    })

    animations.runAnimation(cdWrapperRef.current, 'move', () => {
      console.log(isDone)
    })
  }

  function afterEnter() {
    animations.unregisterAnimation('move')
    cdWrapperRef.current.animation = ''
  }

  function leave() {
    const { x, y, scale } = getPosAndScale()

    cdWrapperRef.current.style.transition =
      'all .6s cubic-bezier(0.45, 0, 0.55, 1)'
    cdWrapperRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
    cdWrapperRef.current.addEventListener('transitionend', next)

    function next() {
      cdWrapperRef.current.removeEventListener('transitionend', next)
    }
  }

  function afterLeave() {
    cdWrapperRef.current.style.transition = ''
    cdWrapperRef.current.style.transform = ''
  }

  function getPosAndScale() {
    const targetWidth = 40
    const paddingLeft = 40
    const paddingBottom = 30
    const paddingTop = 80
    const width = window.innerWidth * 0.8
    const x = -(window.innerWidth / 2 - paddingLeft)
    const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
    const scale = targetWidth / width

    return {
      x,
      y,
      scale,
    }
  }

  return {
    cdWrapperRef,
    enter,
    leave,
    afterEnter,
    afterLeave,
  }
}
