import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react'
import styles from './ProgressBar.module.scss'

type Props = {
  progress: number
}

const progressBtnWidth = 16

function ProgressBar(props: Props) {
  const { progress } = props
  const progressBarRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  const progressStyle = useMemo<CSSProperties>(() => {
    return {
      width: `${offset}px`,
    }
  }, [offset])
  const btnStyle = useMemo<CSSProperties>(() => {
    return {
      transform: `translate3d(${offset}px, 0, 0)`,
    }
  }, [offset])

  useEffect(() => {
    if (!progressBarRef.current) return
    const barWidth = progressBarRef.current.clientWidth - progressBtnWidth
    setOffset(barWidth * progress)
  }, [progress])

  return (
    <div className={styles['progress-bar']} ref={progressBarRef}>
      <div className={styles['bar-inner']}>
        <div className={styles['progress']} style={progressStyle}></div>
        <div className={styles['progress-btn-wrapper']} style={btnStyle}>
          <div className={styles['progress-btn']}></div>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
