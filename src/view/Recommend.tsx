import { useEffect, useState } from 'react'
import { getRecommend } from '../service/recommend'
import styles from './Recommend.module.scss'
import Slider, { type Sliders } from '../components/base/slider/Slider'

function Recommend() {
  const [sliders, setSliders] = useState<Sliders>([])

  useEffect(() => {
    const get = async () => {
      const result = await getRecommend()
      setSliders(result.sliders)
    }

    get()
  }, [])

  return (
    <div className={styles.recommend}>
      <div className={styles['slider-wrapper']}>
        <div className={styles['slider-content']}>
          {sliders.length && <Slider sliders={sliders} />}
        </div>
      </div>
    </div>
  )
}

export default Recommend
