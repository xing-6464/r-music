import { Singers } from '@/types/type'
import React, { useMemo, useRef, useState } from 'react'

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

  const [touch, setTouch] = useState<{
    y1?: number
    // y2?: number
    anchorIndex?: number
  } | null>(null)

  function stopAndDefault(e: React.TouchEvent<HTMLDivElement>) {
    // e.preventDefault()
    e.stopPropagation()
  }

  function onShortcutTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    stopAndDefault(e)
    const anchorIndex = parseInt((e.target as unknown as any).dataset.index)
    setTouch((prev) => ({
      ...prev,
      y1: e.touches[0].pageY,
      anchorIndex: anchorIndex,
    }))
    scrollTo(anchorIndex)
  }

  function onShortcutTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    stopAndDefault(e)
    if (touch && touch.y1 && touch.anchorIndex) {
      const delta = ((e.touches[0].pageY - touch.y1) / ANCHOR_HEIGHT) | 0
      const anchorIndex = touch.anchorIndex + delta
      scrollTo(anchorIndex)
    }
    // setTouch((prev) => ({ ...prev }))
  }

  function onShortcutTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
    stopAndDefault(e)
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
    onShortcutTouchEnd,
    scrollRef,
  }
}
