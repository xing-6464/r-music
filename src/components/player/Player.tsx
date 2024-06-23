import { useEffect, useRef, useMemo, useState, SyntheticEvent } from 'react'

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
import useFavorite from './useFavorite'

import { formatTime } from '../../assets/ts/util'
import { PLAY_MODE } from '@/assets/ts/constant'
import useCd from './useCd'
import useLyric from './useLyric'
import useMiddleInteractive from './useMiddleInteractive'
import ProgressBar from './ProgressBar'
import Scroll from '../base/scroll/Scroll'
import MiniPlayer from './MiniPlayer'
import { Transition, TransitionStatus } from 'react-transition-group'
import useAnimation from './useAnimation'

const duration = 600
const defaultStyle: React.CSSProperties = {
  transition: `all ${duration}ms`,
  opacity: 1,
}
const topDefaultStyle: React.CSSProperties = {
  transition: `all ${duration}ms cubic-bezier(0.45, 0, 0.55, 1)`,
  transform: 'translate3d(0, 0, 0)',
}
const topTransitionStyles: { [key in TransitionStatus]?: React.CSSProperties } =
  {
    entering: { transform: 'translate3d(0, -100px, 0)' },
    exited: { transform: 'translate3d(0, -100px, 0)' },
  }
const buttonStyle: React.CSSProperties = {
  transition: `all ${duration}ms cubic-bezier(0.45, 0, 0.55, 1)`,
  transform: 'translate3d(0, 0, 0)',
}
const buttonTransitionStyles: {
  [key in TransitionStatus]?: React.CSSProperties
} = {
  entering: { transform: 'translate3d(0, 150px, 0)' },
  exited: { transform: 'translate3d(0, 150px, 0)' },
}
const transitionStyles: { [key in TransitionStatus]?: React.CSSProperties } = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exited: { opacity: 0 },
  exiting: { opacity: 0 },
}

function Player() {
  // state
  const nodeRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const barRef = useRef<any>(null)
  const [songReady, setSongReady] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [progressChanging, setProgressChanging] = useState(false)

  // redux
  const dispatch = useAppDispatch()
  const fullScreen = useAppSelector((state) => state.root.fullScreen)
  const currentSong = useAppSelector(getCurrentSong)
  const playing = useAppSelector((state) => state.root.playing)
  const currentIndex = useAppSelector((state) => state.root.currentIndex)
  const playList = useAppSelector((state) => state.root.playList)
  const playMode = useAppSelector((state) => state.root.playMode)

  // 修改播放模式 hooks
  const { modeIcon, changeMode } = useMode()
  const { toggleFavorite, getFavoriteIcon } = useFavorite()
  const { cdCls, cdRef, cdImageRef } = useCd()
  const {
    middleLStyle,
    middleRStyle,
    currentShow,
    onMiddleTouchStart,
    onMiddleTouchMove,
    onMiddleTouchEnd,
  } = useMiddleInteractive()
  const {
    currentLyric,
    currentLineNum,
    playLyric,
    lyricListRef,
    lyricScrollRef,
    stopLyric,
    pureMusicLyric,
    playingLyric,
  } = useLyric({
    songReady,
    currentTime,
  })
  const { cdWrapperRef, enter, afterEnter, leave, afterLeave } = useAnimation()

  // computed
  const playIcon = useMemo(() => {
    return playing ? '_icon-pause' : '_icon-play'
  }, [playing])
  const disabledCls = useMemo(() => {
    return songReady ? '' : styles.disable
  }, [songReady])
  const progress = useMemo(() => {
    return currentTime / currentSong.duration
  }, [currentTime, currentSong])

  // useEffect
  useEffect(() => {
    if (!currentSong.id || !currentSong.url) return
    if (!audioRef.current) return

    setCurrentTime(0)
    setSongReady(false)
    audioRef.current.src = currentSong.url
    audioRef.current.play()
  }, [currentSong])
  useEffect(() => {
    if (!songReady) return
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.play()
      playLyric()
    } else {
      audioRef.current.pause()
      stopLyric()
    }
  }, [playing, songReady])
  useEffect(() => {
    if (!barRef.current) return
    if (fullScreen) {
      barRef.current!.setOffsetSet?.(progress)
    }
  }, [fullScreen])

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
    dispatch(setPlayingState(true))
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
    playLyric()
    setSongReady(true)
  }

  function error() {
    setSongReady(true)
  }

  function end() {
    setCurrentTime(0)
    if (playMode === PLAY_MODE.loop) {
      loop()
    } else {
      next()
    }
  }

  function updateTime(e: SyntheticEvent<HTMLAudioElement, Event>) {
    if (progressChanging) return
    setCurrentTime(e.currentTarget.currentTime)
  }

  function onProgressChanging(progress: number) {
    setProgressChanging(true)
    setCurrentTime(currentSong.duration * progress)
    playLyric()
    stopLyric()
  }

  function onProgressChanged(progress: number) {
    audioRef.current!.currentTime = currentSong.duration * progress
    setCurrentTime(currentSong.duration * progress)

    // 播放
    if (!playing) {
      dispatch(setPlayingState(true))
    }

    playLyric()
  }

  return (
    <div
      className={styles.player}
      style={{ display: playList.length ? '' : 'none' }}
    >
      <Transition
        nodeRef={nodeRef}
        in={fullScreen}
        timeout={duration}
        onEnter={enter}
        onEntered={afterEnter}
        onExit={leave}
        onExited={afterLeave}
      >
        {(state) => (
          <div
            ref={nodeRef}
            className={styles['normal-player']}
            style={{
              display: fullScreen ? '' : 'none',
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            <div className={styles.background}>
              <img src={currentSong.pic} />
            </div>
            <div
              className={styles.top}
              style={{ ...topDefaultStyle, ...topTransitionStyles[state] }}
            >
              <div className={styles.back} onClick={goBack}>
                <i className={styles['icon-back']}></i>
              </div>
              <h1 className={styles.title}>{currentSong.name}</h1>
              <h2 className={styles['subtitle']}>{currentSong.singer}</h2>
            </div>
            <div
              className={styles.middle}
              onTouchStart={(e) => onMiddleTouchStart(e)}
              onTouchMove={(e) => onMiddleTouchMove(e)}
              onTouchEnd={onMiddleTouchEnd}
            >
              <div className={styles['middle-l']} style={middleLStyle}>
                <div className={styles['cd-wrapper']} ref={cdWrapperRef}>
                  <div className={styles.cd} ref={cdRef}>
                    <img
                      ref={cdImageRef}
                      src={currentSong.pic}
                      className={classNames('image', styles[cdCls])}
                    />
                  </div>
                </div>
                <div className={styles['playing-lyric-wrapper']}>
                  <div className={styles['playing-lyric']}>{playingLyric}</div>
                </div>
              </div>
              <Scroll
                cls={styles['middle-r']}
                ref={lyricScrollRef}
                styles={middleRStyle}
              >
                <div className={styles['lyric-wrapper']}>
                  {currentLyric.current && (
                    <div ref={lyricListRef}>
                      {currentLyric.current.lines?.map(
                        (line: any, index: number) => {
                          return (
                            <p
                              key={index}
                              className={classNames(styles.text, {
                                [styles.current]: currentLineNum === index,
                              })}
                            >
                              {line.txt}
                            </p>
                          )
                        },
                      )}
                    </div>
                  )}
                  {pureMusicLyric && (
                    <div className={styles['pure-music']}>
                      <p>{pureMusicLyric}</p>
                    </div>
                  )}
                </div>
              </Scroll>
            </div>
            <div
              className={styles.bottom}
              style={{ ...buttonStyle, ...buttonTransitionStyles[state] }}
            >
              <div className={styles['dot-wrapper']}>
                <span
                  className={classNames(styles.dot, {
                    [styles.active]: currentShow === 'cd',
                  })}
                ></span>
                <span
                  className={classNames(styles.dot, {
                    [styles.active]: currentShow === 'lyric',
                  })}
                ></span>
              </div>
              <div className={styles['progress-wrapper']}>
                <span className={classNames(styles.time, styles['time-l'])}>
                  {formatTime(currentTime)}
                </span>
                <div className={styles['progress-bar-wrapper']}>
                  <ProgressBar
                    ref={barRef}
                    progress={progress}
                    onProgressChanged={onProgressChanged}
                    onProgressChanging={onProgressChanging}
                  />
                </div>
                <span className={classNames(styles.time, styles['time-r'])}>
                  {formatTime(currentSong.duration)}
                </span>
              </div>
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
                  <i
                    className={getFavoriteIcon(currentSong)}
                    onClick={() => toggleFavorite(currentSong)}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        )}
      </Transition>
      <MiniPlayer progress={progress} togglePlay={togglePlay} />
      <audio
        ref={audioRef}
        onPause={pause}
        onCanPlay={ready}
        onError={error}
        onTimeUpdate={(e) => updateTime(e)}
        onEnded={end}
      />
    </div>
  )
}

export default Player
