import { useRef } from 'react'
import {
  currentSong as getCurrentSong,
  setFullScreen,
} from '../../store/rootReducer'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import styles from './MiniPlayer.module.scss'
import { Transition } from 'react-transition-group'
// import classNames from 'classnames'
import useCd from './useCd'

function MiniPlayer() {
  const duration = 600

  const nodeRef = useRef(null)
  const dispatch = useAppDispatch()
  const currentSong = useAppSelector(getCurrentSong)
  const fullScreen = useAppSelector((state) => state.root.fullScreen)

  const { cdCls, cdImageRef, cdRef } = useCd()

  const defaultStyle = {
    transition: `all ${duration}ms cubic-bezier(0.45, 0, 0.55, 1)`,
    transform: 'translateY(0%)',
    opacity: 1,
  }

  const transitionStyles = {
    entering: { transform: 'translate3d(0, 100%, 0)', opacity: 0 },
    exited: { transform: 'translate3d(0, 100%, 0)', opacity: 0 },
  }

  function showNormalPlayer() {
    dispatch(setFullScreen(true))
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
          <div>
            <h2 className={styles.name}>{currentSong.name}</h2>
            <p className={styles.desc}>{currentSong.singer}</p>
          </div>
        </div>
      )}
    </Transition>
  )
}

export default MiniPlayer
