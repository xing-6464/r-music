import { useEffect, useState } from 'react'
import { getRecommend } from '../service/recommend'
import styles from './Recommend.module.scss'
import Slider from '../components/base/slider/Slider'
import Scroll from '../components/base/scroll/Scroll'
import type { Albums, Sliders } from './type'

function Recommend() {
  const [sliders, setSliders] = useState<Sliders>([])
  const [albums, setAlbums] = useState<Albums>([])

  useEffect(() => {
    const get = async () => {
      const result = await getRecommend()
      setAlbums(result.albums)
      setSliders(result.sliders)
    }

    get()
  }, [])

  return (
    <div className={styles.recommend}>
      <Scroll cls={styles['recommend-content']} click>
        <div>
          <div className={styles['slider-wrapper']}>
            <div className={styles['slider-content']}>
              {sliders.length && <Slider sliders={sliders} />}
            </div>
          </div>
          <div className={styles['recommend-list']}>
            <h1 className={styles['list-title']}>热门歌单列表</h1>
            <ul>
              {albums.map((item) => (
                <li className={styles['item']} key={item.id}>
                  <div className={styles['icon']}>
                    <img src={item.pic} width="60" height="60" />
                  </div>
                  <div className={styles['text']}>
                    <h2 className={styles['name']}>{item.username}</h2>
                    <p className={styles['title']}>{item.title}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Scroll>
    </div>
  )
}

export default Recommend
