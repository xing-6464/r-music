import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useEffect, useState, useMemo, useRef } from 'react'
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import { setCurrentIndex, setPlayingState } from '@/store/rootReducer'

BScroll.use(Slide)

function useMiddleSlider() {
  const [slider, setSlider] = useState<BScroll | null>(null)
  const sliderWrapperRef = useRef<HTMLDivElement | null>(null)

  const dispatch = useAppDispatch()
  const fullScreen = useAppSelector((state) => state.root.fullScreen)
  const playList = useAppSelector((state) => state.root.playList)
  const currentIndex = useAppSelector((state) => state.root.currentIndex)

  const sliderShow = useMemo(() => {
    return !fullScreen && !!playList
  }, [fullScreen, playList])

  useEffect(() => {
    if (sliderShow) {
      setSlider((oldSlider) => {
        if (!sliderWrapperRef.current) return null
        if (oldSlider) {
          oldSlider.refresh()
          return oldSlider
        } else {
          const slider = new BScroll(sliderWrapperRef.current, {
            click: true,
            scrollX: true,
            scrollY: false,
            momentum: false,
            bounce: false,
            probeType: 2,
            slide: {
              autoplay: false,
              loop: true,
            },
          })
          slider.on('slidePageChanged', ({ pageX }: { pageX: number }) => {
            dispatch(setCurrentIndex(pageX))
            dispatch(setPlayingState(true))
          })
          slider.goToPage?.(currentIndex, 0, 0)
          return slider
        }
      })
    }

    return () => {
      if (slider) {
        slider.destroy()
        setSlider(null)
      }
    }
  }, [sliderShow])

  useEffect(() => {
    if (slider && sliderShow) {
      slider.goToPage?.(currentIndex, 0, 0)
    }
  }, [currentIndex])

  return { sliderWrapperRef, slider }
}

export default useMiddleSlider
