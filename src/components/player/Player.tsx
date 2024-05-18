import { useEffect, useRef, useMemo } from 'react'
import { useAppSelector } from '@/store/hooks'
import {
  currentSong as getCurrentSong,
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

  function pause() {
    dispatch(setPlayingState(false))
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
                <i className="_icon-prev"></i>
              </div>
              <div
                className={classNames(styles.icon, styles['i-center'])}
                onClick={togglePlay}
              >
                <i className={playIcon}></i>
              </div>
              <div className={classNames(styles.icon, styles['i-right'])}>
                <i className="_icon-next"></i>
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
