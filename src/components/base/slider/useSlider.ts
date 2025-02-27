import { type MutableRefObject, useEffect, useRef, useState } from 'react'

import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'

BScroll.use(Slide)

export default function useSlider(
  wrapperRef: MutableRefObject<HTMLElement | null>,
) {
  const slider = useRef<null | BScroll>(null)
  const [currentPageIndex, setCurrentPageIndex] = useState(0)

  useEffect(() => {
    slider.current = new BScroll(wrapperRef.current as HTMLElement, {
      click: true,
      scrollX: true,
      scrollY: false,
      momentum: false,
      bounce: false,
      probeType: 2,
      slide: true,
    })

    slider.current?.on('slideWillChange', (page: { pageX: number }) => {
      setCurrentPageIndex(page.pageX)
    })

    return () => {
      slider.current?.destroy()
      slider.current = null
    }
  }, [])

  return {
    slider,
    currentPageIndex,
  }
}
