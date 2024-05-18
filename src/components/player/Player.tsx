import { useEffect, useRef } from 'react'
import { useAppSelector } from '@/store/hooks'
import { currentSong as getCurrentSong } from '@/store/rootReducer'
import styles from './Player.module.scss'

function Player() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const fullScreen = useAppSelector((state) => state.root.fullScreen)
  const currentSong = useAppSelector(getCurrentSong)
  console.log(currentSong)

  useEffect(() => {
    if (!currentSong.id || !currentSong.url) return
    if (!audioRef.current) return
    audioRef.current.src = currentSong.url
    audioRef.current.play()
  }, [currentSong])

  return (
    <div className={styles.player}>
      {fullScreen && (
        <div className={styles['normal-player']}>
          <div className={styles.background}>
            <img src={currentSong.pic} />
          </div>
          <div className={styles.top}>
            <div className={styles.back}>
              <i className={styles['icon-back']}></i>
            </div>
            <h1 className={styles.title}>{currentSong.name}</h1>

            <h2 className={styles['subtitle']}>{currentSong.singer}</h2>
          </div>
        </div>
      )}
      <audio ref={audioRef}></audio>
    </div>
  )
}

export default Player
