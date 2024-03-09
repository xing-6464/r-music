import Scroll from '../base/scroll/Scroll'

import { Songs } from '@/types/type'
import styles from './MusicList.module.scss'
import { CSSProperties, useMemo } from 'react'
import SongList from '../base/songList/SongList'

interface MusicListProps {
  songs: Songs
  title: string
  pic: string
}

function MusicList({ songs, title, pic }: MusicListProps) {
  const bgImageStyle = useMemo<CSSProperties>(() => {
    return {
      backgroundImage: `url(${pic})`,
    }
  }, [pic])

  return (
    <div className={styles['music-list']}>
      <div className={styles['back']}>
        <i className={styles['icon-back']}></i>
      </div>
      <h1 className={styles['title']}>{title}</h1>
      <div className={styles['bg-image']} style={bgImageStyle}>
        {/* <div className={styles['play-btn-wrapper']}>
          <div className={styles['play-btn']}>
            <i className={styles['icon-play']}></i>
            <span className={styles['text']}>随机播放全部</span>
          </div>
        </div> */}
        {/* <div className={styles['filter']}></div> */}
      </div>
      <Scroll cls={styles['list']}>
        <div className={styles['song-list-wrapper']}>
          <SongList songs={songs} />
        </div>
      </Scroll>
    </div>
  )
}

export default MusicList
