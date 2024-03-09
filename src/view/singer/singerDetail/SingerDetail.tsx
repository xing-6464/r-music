import { useEffect, useMemo, useState } from 'react'

import MusicList from '@/components/musicList/MusicList'
import { getSingerDetail } from '@/service/singer'
import { useSinger } from '../Singer'
import { processSongs } from '@/service/song'
import styles from './SingerDetail.module.scss'
import { Songs } from '@/types/type'

// interface SingerDetailProps {
//   singer?: Singer
// }

function SingerDetail() {
  const { singer } = useSinger()
  const [songs, setSongs] = useState<Songs>([])
  const [loading, setLoading] = useState(true)

  const pic = useMemo(() => {
    return singer && singer.pic
  }, [singer])

  const title = useMemo(() => {
    return singer && singer.name
  }, [singer])

  useEffect(() => {
    const get = async () => {
      if (singer) {
        const result = await getSingerDetail(singer)
        const songs = await processSongs(result.songs)
        setSongs(songs)
        setLoading(false)
      }
    }
    get()
  }, [])
  return (
    <div className={styles['singer-detail']}>
      <MusicList
        songs={songs}
        pic={pic ? pic : ''}
        title={title ? title : ''}
        loading={loading}
      />
    </div>
  )
}
export default SingerDetail
