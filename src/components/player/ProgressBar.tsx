import {
  CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react'
import styles from './ProgressBar.module.scss'

type Props = {
  progress: number
  onProgressChanging?: (value: number) => void
  onProgressChanged?: (value: number) => void
}

const progressBtnWidth = 16

const ProgressBar = forwardRef(function (props: Props, ref: any) {
  const { progress, onProgressChanged, onProgressChanging } = props

  const progressRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)
  const [touch, setTouch] = useState<{
    x1: number
    beginWidth: number
  }>({ x1: 0, beginWidth: 0 })

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
    setOffsetSet(progress)
  }, [progress])

  useImperativeHandle(ref, () => {
    return {
      setOffsetSet,
    }
  })

  function onTouchStart(e: React.TouchEvent) {
    setTouch({
      ...touch,
      x1: e.touches[0].pageX,
      beginWidth: progressRef.current?.clientWidth
        ? progressRef.current.clientWidth
        : 0,
    })
  }

  function onTouchMove(e: React.TouchEvent) {
    const delta = e.touches[0].pageX - touch.x1
    const tempWidth = touch.beginWidth + delta
    const barWidth = progressBarRef.current!.clientWidth - progressBtnWidth
    const progress = Math.min(1, Math.max(tempWidth / barWidth, 0))
    setOffset(barWidth * progress)
    onProgressChanging?.(progress)
  }

  function onTouchEnd() {
    const barWidth = progressBarRef.current!.clientWidth - progressBtnWidth
    const progress = progressRef.current!.clientWidth / barWidth
    onProgressChanged?.(progress)
  }

  function onClick(e: React.MouseEvent) {
    const rect = progressBarRef.current!.getBoundingClientRect()
    const offsetWidth = e.pageX - rect.left
    const barWidth = progressBarRef.current!.clientWidth - progressBtnWidth
    const progress = offsetWidth / barWidth
    onProgressChanged?.(progress)
  }

  function setOffsetSet(progress: number) {
    const barWidth = progressBarRef.current!.clientWidth - progressBtnWidth
    setOffset(barWidth * progress)
  }

  return (
    <div
      className={styles['progress-bar']}
      ref={progressBarRef}
      onClick={(e) => onClick(e)}
    >
      <div className={styles['bar-inner']}>
        <div
          className={styles['progress']}
          ref={progressRef}
          style={progressStyle}
        ></div>
        <div
          className={styles['progress-btn-wrapper']}
          style={btnStyle}
          onTouchStart={(e) => onTouchStart(e)}
          onTouchMove={(e) => onTouchMove(e)}
          onTouchEnd={() => onTouchEnd()}
        >
          <div className={styles['progress-btn']}></div>
        </div>
      </div>
    </div>
  )
})

export default ProgressBar
