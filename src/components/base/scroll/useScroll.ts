import { MutableRefObject, useEffect, useRef } from 'react'
import ObserveDOM from '@better-scroll/observe-dom'

import BScroll, { Options } from '@better-scroll/core'

BScroll.use(ObserveDOM)

export default function useScroll(
  wrapperRef: MutableRefObject<HTMLElement | null>,
  options: Options,
  emit: (pos: any) => void,
) {
  const scroll = useRef<null | BScroll>(null)

  useEffect(() => {
    const scrollCurrent = (scroll.current = new BScroll(wrapperRef.current!, {
      observeDOM: true,
      ...options,
    }))

    if (options.probeType && options.probeType > 0) {
      // eslint-disable-next-line no-extra-semi
      ;(scrollCurrent as BScroll).on('scroll', (pos: any) => {
        emit(pos)
      })
    }

    return () => {
      scroll.current?.destroy()
    }
  }, [])

  return scroll
}
