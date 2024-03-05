import { useLayoutEffect, useRef, useState } from 'react'
import { Singers } from '../../../view/type'

export default function useFixed(data: Singers) {
  const groupRef = useRef<HTMLUListElement | null>(null)
  const [, setListHeight] = useState<number[]>([])
  const [, setScrollY] = useState<number>()

  useLayoutEffect(() => {
    calculate()
  }, [data])

  const calculate = () => {
    const list = groupRef.current?.children
    let height = 0

    setListHeight(() => [])
    setListHeight((prev) => {
      prev.push(height)
      return prev
    })

    for (let i = 0; i < list!.length; i++) {
      height += list![i].clientHeight
      setListHeight((prev) => {
        prev.push(height)
        return prev
      })
    }
  }

  function onScroll(pos: any) {
    setScrollY(-pos.y)
  }

  return {
    groupRef,
    onScroll,
  }
}
