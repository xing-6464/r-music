import { Singers } from '@/types/type'
import React, { useMemo, useRef } from 'react'

export default function useShortCut(
  data: Singers,
  groupRef: React.MutableRefObject<HTMLUListElement | null>,
) {
  const ANCHOR_HEIGHT = 18

  const scrollRef = useRef<any>()

  const shortcutList = useMemo(() => {
    return data.map((group) => {
      return group.title
    })
  }, [data])

  const touch = useRef<{ y1?: number; y2?: number; anchorIndex?: number }>({})

  function stopAndDefault(e: React.TouchEvent<HTMLDivElement>) {
    e.stopPropagation()
  }

  function onShortcutTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    stopAndDefault(e)
    const anchorIndex = parseInt((e.target as unknown as any).dataset.index)
    touch.current.y1 = e.touches[0].pageY
    touch.current.anchorIndex = anchorIndex

    scrollTo(anchorIndex)
  }

  function onShortcutTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    stopAndDefault(e)
    touch.current.y2 = e.touches[0].pageY
    const delta = ((touch.current.y2 - touch.current.y1!) / ANCHOR_HEIGHT) | 0
    const anchorIndex = touch.current.anchorIndex! + delta

    scrollTo(anchorIndex)
  }

  function scrollTo(index: number) {
    if (isNaN(index)) {
      return
    }
    index = Math.max(0, Math.min(shortcutList.length - 1, index))
    const targetEl = groupRef.current?.children[index]
    const scroll = scrollRef.current.scroll.current
    scroll.scrollToElement(targetEl, 30, false, false)
  }

  return {
    shortcutList,
    onShortcutTouchMove,
    onShortcutTouchStart,
    scrollRef,
  }
}
