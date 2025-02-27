import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react'
import { Singers } from '../../../types/type'

export default function useFixed(data: Singers) {
  const groupRef = useRef<HTMLUListElement | null>(null)
  const [scrollY, setScrollY] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0) // 当前选中的元素索引
  const [distance, setDistance] = useState(0) // 距离顶部的距离

  // li元素的高度
  const TITLE_HEIGHT = 30

  // 当前选中的元素的标题
  const fixedTitle = useMemo(() => {
    if (scrollY && scrollY < 0) {
      return ''
    }
    const currentGroup = data[currentIndex]
    return currentGroup ? currentGroup.title : ''
  }, [currentIndex, data, scrollY])

  const fixedStyle = useMemo<CSSProperties>(() => {
    const diff =
      distance > 0 && distance < TITLE_HEIGHT ? distance - TITLE_HEIGHT : 0
    return {
      transform: `translate3d(0,${diff}px,0)`,
    }
  }, [distance])

  // 计算li元素的高度
  const listHeights = useMemo(() => {
    if (groupRef.current == null) return []
    const list = groupRef.current?.children
    const heights = [0]
    let height = 0

    for (let i = 0; i < list!.length; i++) {
      height += list![i].clientHeight
      heights.push(height)
    }
    return heights
  }, [groupRef.current])

  useEffect(() => {
    if (listHeights.length === 0) return
    for (let i = 0; i < listHeights.length - 1; i++) {
      const heightTop = listHeights[i]
      const heightBottom = listHeights[i + 1]
      if (scrollY >= heightTop && scrollY <= heightBottom) {
        setCurrentIndex(i)
        setDistance(heightBottom - scrollY)
      }
    }
  }, [scrollY, listHeights])

  function onScroll(pos: any) {
    setScrollY(-pos.y)
  }

  return {
    groupRef,
    fixedTitle,
    onScroll,
    fixedStyle,
    currentIndex,
    setCurrentIndex,
  }
}
