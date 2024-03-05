import { FC, useRef } from 'react'
import useScroll from './useScroll'

interface ScrollProps {
  click: boolean
  cls: string
  children: JSX.Element
}

const Scroll: FC<ScrollProps> = ({ children, click, cls }) => {
  const rootRef = useRef<HTMLElement | null>(null)
  useScroll(rootRef, { click })
  return (
    <div ref={rootRef as any} className={cls}>
      {children}
    </div>
  )
}

export default Scroll
