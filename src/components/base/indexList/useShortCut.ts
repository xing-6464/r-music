import { Singers } from '@/view/type'
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
    y2?: number
    anchorIndex?: number
  } | null>(null)

  function stopAndDefault(e: React.TouchEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
  }

  function onShortcutTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    stopAndDefault(e)
    const anchorIndex = parseInt(e.target.dataset.index)
    setTouch((prev) => ({
      ...prev,
      y1: e.touches[0].pageY,
      anchorIndex: anchorIndex,
    }))
    console.log(touch)

    scrollTo(anchorIndex)
  }

  function onShortcutTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    stopAndDefault(e)
    setTouch((prev) => ({ ...prev, y2: e.touches[0].pageY }))
    if (touch && touch.y2 && touch.y1 && touch.anchorIndex) {
      const delta = ((touch.y2 - touch.y1) / ANCHOR_HEIGHT) | 0
      const anchorIndex = touch.anchorIndex + delta
      console.log(touch)
      console.log(anchorIndex)

      scrollTo(anchorIndex)
    }
  }

  function onShortcutTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
    stopAndDefault(e)
  }

  function scrollTo(index: number) {
    index = Math.max(0, Math.min(shortcutList.length - 1, index))
    const targetEl = groupRef.current?.children[index]
    const scroll = scrollRef.current.scroll.current
    scroll.scrollToElement(targetEl, 20, false, false)
  }

  return {
    shortcutList,
    onShortcutTouchMove,
    onShortcutTouchStart,
    onShortcutTouchEnd,
    scrollRef,
  }
}
