import { Singers } from '@/view/type'
import React, { useMemo, useRef } from 'react'

export default function useShortCut(
  data: Singers,
  groupRef: React.MutableRefObject<HTMLUListElement | null>,
) {
  const scrollRef = useRef<any>()

  const shortcutList = useMemo(() => {
    return data.map((group) => {
      return group.title
    })
  }, [data])

  function stopAndDefault(e: React.TouchEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
  }

  function onShortcutTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    // stopAndDefault(e)
    const anchorIndex = parseInt(e.target.dataset.index)
    const targetEl = groupRef.current?.children[anchorIndex]
    const scroll = scrollRef.current.scroll.current
    scroll.scrollToElement(targetEl, 50, false, false)
  }

  function onShortcutTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    // stopAndDefault(e)
  }

  function onShortcutTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
    // stopAndDefault(e)
  }

  return {
    shortcutList,
    onShortcutTouchMove,
    onShortcutTouchStart,
    onShortcutTouchEnd,
    scrollRef,
  }
}
