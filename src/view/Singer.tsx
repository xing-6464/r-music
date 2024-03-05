import { useEffect, useState } from 'react'
import getSingerList from '../service/singer'
import { Singers } from './type'

import styles from './Singer.module.scss'
import IndexList from '../components/base/indexList/IndexList'
import Loading from '../components/base/loading/Loading'

function Singer() {
  const [singers, setSingers] = useState<Singers>([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const get = async () => {
      const result = await getSingerList()
      setSingers(result.singers)
      setIsLoading(false)
    }

    get()
  }, [])

  if (isLoading) {
    return <Loading />
  } else {
    return (
      <div className={styles.singer}>
        <IndexList data={singers} />
      </div>
    )
  }
}

export default Singer
