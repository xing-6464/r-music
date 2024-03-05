import { FC, useRef } from 'react'
import useScroll from './useScroll'

interface ScrollProps {
  cls: string
  click?: boolean
  probeType?: number
  emit?: (pos: any) => void
  children: JSX.Element
}

const Scroll: FC<ScrollProps> = ({
  children,
  click = true,
  cls,
  probeType = 0,
  emit,
}) => {
  const rootRef = useRef<HTMLElement | null>(null)
  useScroll(rootRef, { click, probeType }, emit!)

  return (
    <div ref={rootRef as any} className={cls}>
      {children}
    </div>
  )
}

export default Scroll
