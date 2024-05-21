import { useMemo } from 'react'
import styles from './ProgressCircle.module.scss'

type Props = {
  radius?: number
  progress?: number
  children?: React.ReactNode
}

function ProgressCircle(props: Props) {
  const dashArray = Math.PI * 100

  const { radius = 100, progress = 0, children } = props

  const dashOffset = useMemo(() => {
    return (1 - progress) * dashArray
  }, [progress])
  return (
    <div className={styles['progress-circle']}>
      <svg
        width={radius}
        height={radius}
        viewBox="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className={styles['progress-background']}
          r="50"
          cx="50"
          cy="50"
          fill="transparent"
        />
        <circle
          className={styles['progress-bar']}
          r="50"
          cx="50"
          cy="50"
          fill="transparent"
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
        />
      </svg>
      {children}
    </div>
  )
}

export default ProgressCircle
