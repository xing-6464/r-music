import { useAppSelector } from '@/store/hooks'
import { useLayoutEffect, useRef, useState } from 'react'

function useCd() {
  const cdRef = useRef<HTMLDivElement>(null)
  const cdImageRef = useRef<HTMLImageElement>(null)

  const playing = useAppSelector((state) => state.root.playing)

  const [cdCls, setCdCls] = useState<'playing' | ''>('')

  useLayoutEffect(() => {
    if (!cdRef.current || !cdImageRef.current) return
    if (!playing) {
      syncTransform(cdRef.current, cdImageRef.current)
      setCdCls('')
    } else {
      setCdCls('playing')
    }
  }, [playing, cdRef, cdImageRef])

  function syncTransform(wrapper: HTMLDivElement, inner: HTMLImageElement) {
    const wrapperTransform = getComputedStyle(wrapper).transform || 'none'
    const innerTransform = getComputedStyle(inner).transform
    wrapper.style.transform =
      wrapperTransform === 'none'
        ? innerTransform
        : innerTransform.concat(' ', wrapperTransform)
  }

  return {
    cdCls,
    cdRef,
    cdImageRef,
  }
}

export default useCd
