import { useEffect, useMemo, useState } from 'react'

import MusicList from '@/components/musicList/MusicList'
import { getSingerDetail } from '@/service/singer'
import { useSinger } from '../Singer'
import { processSongs } from '@/service/song'
import styles from './SingerDetail.module.scss'
import { Singer, Songs } from '@/types/type'
import storage from 'good-storage'
import { SINGER_KEY } from '@/assets/ts/constant'
import { useLocation, useNavigate, useParams } from 'react-router'

function SingerDetail() {
  const { singer } = useSinger()
  const [songs, setSongs] = useState<Songs>([])
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const location = useLocation()
  const nav = useNavigate()

  const computedSinger = useMemo<Singer | null>(() => {
    let ret: Singer | null = null
    if (singer) {
      ret = singer
    } else {
      const cacheS = storage.session.get(SINGER_KEY)
      if (cacheS && cacheS.mid === params.id) {
        ret = cacheS as Singer
      }
    }

    return ret
  }, [singer, params])

  const pic = useMemo(() => {
    return computedSinger && computedSinger.pic
  }, [computedSinger])

  const title = useMemo(() => {
    return computedSinger && computedSinger.name
  }, [computedSinger])

  useEffect(() => {
    const get = async () => {
      if (computedSinger) {
        const result = await getSingerDetail(computedSinger)
        const songs = await processSongs(result.songs)
        setSongs(songs)
        setLoading(false)
      } else {
        const path = location.pathname.split('/')[1]
        nav(`/${path}`)
      }
    }
    get()
  }, [computedSinger, location])

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
