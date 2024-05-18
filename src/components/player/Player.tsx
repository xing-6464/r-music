import { useEffect, useRef, useMemo } from 'react'
import { useAppSelector } from '@/store/hooks'
import {
  currentSong as getCurrentSong,
  setCurrentIndex,
  setFullScreen,
  setPlayingState,
} from '@/store/rootReducer'
import styles from './Player.module.scss'
import { useAppDispatch } from '../../store/hooks'
import classNames from 'classnames'

function Player() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const dispatch = useAppDispatch()
  const fullScreen = useAppSelector((state) => state.root.fullScreen)
  const currentSong = useAppSelector(getCurrentSong)
  const playing = useAppSelector((state) => state.root.playing)
  const currentIndex = useAppSelector((state) => state.root.currentIndex)
  const playList = useAppSelector((state) => state.root.playList)

  const playIcon = useMemo(() => {
    return playing ? '_icon-pause' : '_icon-play'
  }, [playing])

  useEffect(() => {
    if (!currentSong.id || !currentSong.url) return
    if (!audioRef.current) return
    audioRef.current.src = currentSong.url
    audioRef.current.play()
  }, [currentSong])

  useEffect(() => {
    if (!audioRef.current) return
    playing ? audioRef.current.play() : audioRef.current.pause()
  }, [playing])

  function goBack() {
    dispatch(setFullScreen(false))
  }

  function togglePlay() {
    dispatch(setPlayingState(!playing))
  }

  function loop() {
    audioRef.current.currentTime = 0
    audioRef.current.play()
  }

  function pause() {
    dispatch(setPlayingState(false))
  }

  function prev() {
    if (!playList.length) return
    if (playList.length === 1) {
      loop()
    } else {
      let index = currentIndex - 1
      if (index === -1) index = playList.length - 1

      dispatch(setCurrentIndex(index))
      if (!playing) {
        dispatch(setPlayingState(true))
      }
    }
  }

  function next() {
    if (!playList.length) return
    if (playList.length === 1) {
      loop()
    } else {
      let index = currentIndex + 1
      if (index === playList.length) index = 0

      dispatch(setCurrentIndex(index))
      if (!playing) {
        dispatch(setPlayingState(true))
      }
    }
  }

  return (
    <div className={styles.player}>
      {fullScreen && (
        <div className={styles['normal-player']}>
          <div className={styles.background}>
            <img src={currentSong.pic} />
          </div>
          <div className={styles.top}>
            <div className={styles.back} onClick={goBack}>
              <i className={styles['icon-back']}></i>
            </div>
            <h1 className={styles.title}>{currentSong.name}</h1>
            <h2 className={styles['subtitle']}>{currentSong.singer}</h2>
          </div>
          <div className={styles.bottom}>
            <div className={styles.operators}>
              <div className={classNames(styles.icon, styles['i-left'])}>
                <i className="_icon-sequence"></i>
              </div>
              <div className={classNames(styles.icon, styles['i-left'])}>
                <i className="_icon-prev" onClick={prev}></i>
              </div>
              <div className={classNames(styles.icon, styles['i-center'])}>
                <i className={playIcon} onClick={togglePlay}></i>
              </div>
              <div className={classNames(styles.icon, styles['i-right'])}>
                <i className="_icon-next" onClick={next}></i>
              </div>
              <div className={classNames(styles.icon, styles['i-right'])}>
                <i className="_icon-not-favorite"></i>
              </div>
            </div>
          </div>
        </div>
      )}
      <audio ref={audioRef} onPause={pause}></audio>
    </div>
  )
}

export default Player
