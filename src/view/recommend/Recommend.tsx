import { useEffect, useState, Suspense } from 'react'
import { getRecommend } from '@/service/recommend'
import styles from './Recommend.module.scss'
import Slider from '@/components/base/slider/Slider'
import Scroll from '@/components/base/scroll/Scroll'
import type { Albums, Sliders } from '../../types/type'
import Loading from '@/components/base/loading/Loading'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import defaultPng from '../../assets/images/default.png'
import 'react-lazy-load-image-component/src/effects/blur.css'

function Recommend() {
  const [sliders, setSliders] = useState<Sliders>([])
  const [albums, setAlbums] = useState<Albums>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const get = async () => {
      const result = await getRecommend()
      setAlbums(result.albums)
      setSliders(result.sliders)
      setIsLoading(false)
    }

    get()
  }, [])

  if (isLoading) {
    return <Loading />
  } else {
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
                      <Suspense fallback={<img src={defaultPng} />}>
                        <LazyLoadImage
                          src={item.pic}
                          height="60"
                          width="60"
                          effect="blur"
                          placeholderSrc={defaultPng}
                        />
                      </Suspense>
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
}

export default Recommend
