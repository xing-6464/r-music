import { useMemo, useRef, useState } from 'react'
import {
  currentSong as getCurrentSong,
  setFullScreen,
} from '../../store/rootReducer'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import styles from './MiniPlayer.module.scss'
import { Transition, TransitionStatus } from 'react-transition-group'
import useCd from './useCd'
import ProgressCircle from './ProgressCircle'
import classNames from 'classnames'
import useMiddleSlider from './useMiddleSlider'
import PlayList from './PlayList'

const duration = 600
const defaultStyle = {
  transition: `all ${duration}ms cubic-bezier(0.45, 0, 0.55, 1)`,
  transform: 'translateY(0%)',
  opacity: 1,
}

const transitionStyles: { [key in TransitionStatus]?: React.CSSProperties } = {
  entering: { transform: 'translate3d(0, 100%, 0)', opacity: 0 },
  exited: { transform: 'translate3d(0, 100%, 0)', opacity: 0 },
}
function MiniPlayer(props: { progress: number; togglePlay: () => void }) {
  const nodeRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useAppDispatch()
  const currentSong = useAppSelector(getCurrentSong)
  const fullScreen = useAppSelector((state) => state.root.fullScreen)
  const playing = useAppSelector((state) => state.root.playing)
  const playList = useAppSelector((state) => state.root.playList)

  const { cdCls, cdImageRef, cdRef } = useCd()
  const { sliderWrapperRef } = useMiddleSlider()

  const miniPlayIcon = useMemo(() => {
    return playing ? 'icon-pause-mini' : 'icon-play-mini'
  }, [playing])

  function showNormalPlayer() {
    dispatch(setFullScreen(true))
  }

  function showPlayList(e: React.MouseEvent) {
    e.stopPropagation()
    setIsOpen(true)
  }

  return (
    <Transition nodeRef={nodeRef} in={!fullScreen} timeout={duration}>
      {(state) => (
        <div
          ref={nodeRef}
          className={styles['mini-player']}
          onClick={showNormalPlayer}
          style={{
            display: fullScreen ? 'none' : '',
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          <div className={styles['cd-wrapper']}>
            <div className={styles.cd} ref={cdRef}>
              <img
                ref={cdImageRef}
                src={currentSong.pic}
                className={styles[cdCls]}
                width="40"
                height="40"
              />
            </div>
          </div>
          <div className={styles['slider-wrapper']} ref={sliderWrapperRef}>
            <div className={styles['slider-group']}>
              {playList.map((song) => (
                <div className={styles['slider-page']} key={song.id}>
                  <h2 className={styles.name}>{song.name}</h2>
                  <p className={styles.desc}>{song.singer}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.control}>
            <ProgressCircle radius={32} progress={props.progress}>
              <i
                className={classNames(styles['icon-mini'], miniPlayIcon)}
                onClick={(e) => {
                  e.stopPropagation()
                  props.togglePlay()
                }}
              ></i>
            </ProgressCircle>
          </div>
          <div className={styles['control']} onClick={showPlayList}>
            <i className={styles['icon-playlist']}></i>
          </div>
        </div>
      )}
    </Transition>
  )
}

export default MiniPlayer
