import { MutableRefObject, useEffect, useRef } from 'react'
import ObserveDOM from '@better-scroll/observe-dom'

import BScroll, { Options } from '@better-scroll/core'

BScroll.use(ObserveDOM)

export default function useScroll(
  wrapperRef: MutableRefObject<HTMLElement | null>,
  options?: Options,
) {
  const scroll = useRef<null | BScroll>(null)

  useEffect(() => {
    scroll.current = new BScroll(wrapperRef.current!, {
      observeDOM: true,
      ...options,
    })

    return () => {
      scroll.current?.destroy()
    }
  }, [])
}
