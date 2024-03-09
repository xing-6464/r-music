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
  const RESERVED_HEIGHT = 40

  const [imageHeight, setImageHeight] = useState<number>(0)
  const imageRef = useRef<HTMLDivElement | null>(null)
  const [scrollY, setScrollY] = useState<number>(0)
  const [maxTranslateY, setMaxTranslateY] = useState<number>(0)

  const nav = useNavigate()

  const bgImageStyle = useMemo<CSSProperties>(() => {
    let zIndex = 0
    let paddingTop: string | number = '70%'
    let height: number | string = 0
    let translateZ = 0

    if (scrollY > maxTranslateY) {
      zIndex = 10
      paddingTop = 0
      height = `${RESERVED_HEIGHT}px`
      translateZ = 1
    }

    let scale = 1
    if (scrollY < 0) {
      scale = 1 + Math.abs(scrollY / imageHeight)
      console.log(scale)
    }

    return {
      zIndex,
      paddingTop,
      height,
      backgroundImage: `url(${pic})`,
      transform: `scale(${scale}) translateZ(${translateZ}px)`,
    }
  }, [pic, scrollY, maxTranslateY, imageHeight])

  const scrollStyle = useMemo<CSSProperties>(() => {
    return {
      top: `${imageHeight}px`,
    }
  }, [imageHeight])

  const filterStyle = useMemo<CSSProperties>(() => {
    let blur = 0
    if (scrollY >= 0) {
      blur = Math.min(maxTranslateY / imageHeight, scrollY / imageHeight) * 20
    }

    return {
      backdropFilter: `blur(${blur}px)`,
    }
  }, [scrollY, imageHeight, maxTranslateY])

  useEffect(() => {
    if (imageRef.current) {
      setImageHeight(imageRef.current?.clientHeight)
      setMaxTranslateY(imageHeight - RESERVED_HEIGHT)
    }
  }, [imageRef, imageHeight])

  function goBack() {
    nav(-1)
  }

  function onScroll(pos: any) {
    setScrollY(-pos.y)
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
        <div className={styles['filter']} style={filterStyle}></div>
      </div>
      {!loading ? (
        <Scroll
          cls={styles['list']}
          styles={scrollStyle}
          probeType={3}
          emit={onScroll}
        >
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
