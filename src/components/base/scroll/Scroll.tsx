import { forwardRef, useImperativeHandle, useRef } from 'react'
import useScroll from './useScroll'

interface ScrollProps {
  cls: string
  click?: boolean
  probeType?: number
  emit?: (pos: any) => void
  children: JSX.Element
}

const Scroll = forwardRef<any, ScrollProps>(function Scroll(
  { children, click = true, cls, probeType = 0, emit },
  ref,
) {
  const rootRef = useRef<HTMLElement | null>(null)
  const scroll = useScroll(rootRef, { click, probeType }, emit!)
  useImperativeHandle(ref, () => ({
    scroll,
  }))
  return (
    <div ref={rootRef as any} className={cls}>
      {children}
    </div>
  )
})

export default Scroll
