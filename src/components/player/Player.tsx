import { useEffect, useRef, useMemo, useState } from 'react'
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
import useMode from './useMode'

function Player() {
  // state
  const audioRef = useRef<HTMLAudioElement>(null)
  const [songReady, setSongReady] = useState(false)

  // redux
  const dispatch = useAppDispatch()
  const fullScreen = useAppSelector((state) => state.root.fullScreen)
  const currentSong = useAppSelector(getCurrentSong)
  const playing = useAppSelector((state) => state.root.playing)
  const currentIndex = useAppSelector((state) => state.root.currentIndex)
  const playList = useAppSelector((state) => state.root.playList)

  // 修改播放模式 hooks
  const { modeIcon, changeMode } = useMode()

  // computed
  const playIcon = useMemo(() => {
    return playing ? '_icon-pause' : '_icon-play'
  }, [playing])
  const disabledCls = useMemo(() => {
    return songReady ? '' : styles.disable
  }, [songReady])

  // useEffect
  useEffect(() => {
    if (!currentSong.id || !currentSong.url) return
    if (!audioRef.current) return

    setSongReady(false)
    audioRef.current.src = currentSong.url
    audioRef.current.play()
  }, [currentSong])
  useEffect(() => {
    if (!songReady) return
    if (!audioRef.current) return
    playing ? audioRef.current.play() : audioRef.current.pause()
  }, [playing, songReady])

  function goBack() {
    dispatch(setFullScreen(false))
  }

  function togglePlay() {
    if (!songReady) return
    dispatch(setPlayingState(!playing))
  }

  function loop() {
    if (!audioRef.current) return
    audioRef.current.currentTime = 0
    audioRef.current.play()
  }

  function pause() {
    dispatch(setPlayingState(false))
  }

  function prev() {
    if (!songReady || !playList.length) return
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
    if (!songReady || !playList.length) return
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

  function ready() {
    if (songReady) return
    setSongReady(true)
  }

  function error() {
    setSongReady(true)
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
                <i className={modeIcon} onClick={changeMode}></i>
              </div>
              <div
                className={classNames(
                  styles.icon,
                  styles['i-left'],
                  disabledCls,
                )}
              >
                <i className="_icon-prev" onClick={prev}></i>
              </div>
              <div
                className={classNames(
                  styles.icon,
                  styles['i-center'],
                  disabledCls,
                )}
              >
                <i className={playIcon} onClick={togglePlay}></i>
              </div>
              <div
                className={classNames(
                  styles.icon,
                  styles['i-right'],
                  disabledCls,
                )}
              >
                <i className="_icon-next" onClick={next}></i>
              </div>
              <div className={classNames(styles.icon, styles['i-right'])}>
                <i className="_icon-not-favorite"></i>
              </div>
            </div>
          </div>
        </div>
      )}
      <audio
        ref={audioRef}
        onPause={pause}
        onCanPlay={ready}
        onError={error}
      ></audio>
    </div>
  )
}

export default Player
