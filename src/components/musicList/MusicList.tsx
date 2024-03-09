import Scroll from '../base/scroll/Scroll'

import { Songs } from '@/types/type'
import styles from './MusicList.module.scss'
import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react'
import SongList from '../base/songList/SongList'
import { useNavigate } from 'react-router'
import Loading from '../base/loading/Loading'

interface MusicListProps {
  songs: Songs
  title: string
  pic: string
  loading: boolean
}

function MusicList({ songs, title, pic, loading }: MusicListProps) {
  const [imageHeight, setImageHeight] = useState<number>(0)
  const imageRef = useRef<HTMLDivElement | null>(null)

  const nav = useNavigate()

  const bgImageStyle = useMemo<CSSProperties>(() => {
    return {
      backgroundImage: `url(${pic})`,
    }
  }, [pic])
  const scrollStyle = useMemo<CSSProperties>(() => {
    return {
      top: `${imageHeight}px`,
    }
  }, [imageHeight])

  useEffect(() => {
    if (imageRef.current) setImageHeight(imageRef.current?.clientHeight)
  }, [imageRef])

  function goBack() {
    nav(-1)
  }

  return (
    <div className={styles['music-list']}>
      <div className={styles['back']} onClick={goBack}>
        <i className={styles['icon-back']}></i>
      </div>
      <h1 className={styles['title']}>{title}</h1>
      <div ref={imageRef} className={styles['bg-image']} style={bgImageStyle}>
        {/* <div className={styles['play-btn-wrapper']}>
          <div className={styles['play-btn']}>
            <i className={styles['icon-play']}></i>
            <span className={styles['text']}>随机播放全部</span>
          </div>
        </div> */}
        <div className={styles['filter']}></div>
      </div>
      {!loading ? (
        <Scroll cls={styles['list']} styles={scrollStyle}>
          <div className={styles['song-list-wrapper']}>
            <SongList songs={songs} />
          </div>
        </Scroll>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default MusicList
