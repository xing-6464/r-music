import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react'
import { Singers } from '../../../types/type'

export default function useFixed(data: Singers) {
  const groupRef = useRef<HTMLUListElement | null>(null)
  const [listHeight, setListHeight] = useState<number[]>([])
  const [scrollY, setScrollY] = useState<number>()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [distance, setDistance] = useState(0)

  const TITLE_HEIGHT = 30

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

  useEffect(() => {
    calculate()
  }, [data])

  useEffect(() => {
    for (let i = 0; i < listHeight.length - 1; i++) {
      const heightTop = listHeight[i]
      const heightBottom = listHeight[i + 1]
      if (scrollY && scrollY >= heightTop && scrollY <= heightBottom) {
        setCurrentIndex(i)
        setDistance(heightBottom - scrollY)
      }
    }
  }, [scrollY, listHeight])

  const calculate = () => {
    const list = groupRef.current?.children
    let height = 0

    setListHeight(() => [])
    set(height)

    for (let i = 0; i < list!.length; i++) {
      height += list![i].clientHeight
      set(height)
    }
  }

  function set(height: number) {
    setListHeight((prev) => [...prev, height])
  }

  function onScroll(pos: any) {
    setScrollY(-pos.y)
  }

  return {
    groupRef,
    fixedTitle,
    onScroll,
    fixedStyle,
    currentIndex,
  }
}
