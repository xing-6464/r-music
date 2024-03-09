import { Singers } from '@/view/type'
import { useMemo } from 'react'

export default function useShortCut(data: Singers) {
  const shortcutList = useMemo(() => {
    return data.map((group) => {
      return group.title
    })
  }, [data])

  return {
    shortcutList,
  }
}
