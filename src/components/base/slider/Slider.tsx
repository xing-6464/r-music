import { FC, useRef } from 'react'

import cls from 'classnames'
import useSlider from './useSlider'

import styles from './Slider.module.scss'
import { type Sliders } from '../../../types/type'

interface SliderProps {
  sliders: Sliders
}

const Slider: FC<SliderProps> = ({ sliders }) => {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const { currentPageIndex } = useSlider(rootRef)

  return (
    <div className={styles.slider} ref={rootRef}>
      <div className={styles['slider-group']}>
        {sliders.map((item) => {
          return (
            <div className={styles['slider-page']} key={item.id}>
              <a href={item.link}>
                <img src={item.pic} />
              </a>
            </div>
          )
        })}
      </div>
      <div className={styles['dots-wrapper']}>
        {sliders.map((item, index) => {
          const classNames = cls(styles.dot, {
            [styles.active]: currentPageIndex === index,
          })
          return <span className={classNames} key={item.id}></span>
        })}
      </div>
    </div>
  )
}

export default Slider
