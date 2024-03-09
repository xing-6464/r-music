import { useEffect, useState } from 'react'
import { getSingerList } from '../../service/singer'
import { Singer as S, Singers } from '../../types/type'

import styles from './Singer.module.scss'
import IndexList from '../../components/base/indexList/IndexList'
import Loading from '../../components/base/loading/Loading'
import { Outlet, useNavigate, useOutletContext } from 'react-router'

type ContentType = { singer?: S }

function Singer() {
  const [singers, setSingers] = useState<Singers>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSinger, setSelectedSinger] = useState<S>()
  const nav = useNavigate()

  useEffect(() => {
    const get = async () => {
      const result = await getSingerList()
      setSingers(result.singers)
      setIsLoading(false)
    }

    get()
  }, [])

  function selectSinger(singer: S) {
    setSelectedSinger(singer)
    nav(`/singer/${singer.mid}`)
  }

  if (isLoading) {
    return <Loading />
  } else {
    return (
      <div className={styles.singer}>
        <IndexList data={singers} select={selectSinger} />
        <Outlet context={{ singer: selectedSinger } satisfies ContentType} />
      </div>
    )
  }
}

export function useSinger() {
  return useOutletContext<ContentType>()
}

export default Singer