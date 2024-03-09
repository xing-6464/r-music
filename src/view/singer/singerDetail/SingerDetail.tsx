import styles from './SingerDetail.module.scss'
import { useEffect } from 'react'
import { getSingerDetail } from '@/service/singer'
import { useSinger } from '../Singer'

// interface SingerDetailProps {
//   singer?: Singer
// }

function SingerDetail() {
  const { singer } = useSinger()

  useEffect(() => {
    const get = async () => {
      if (singer) {
        const result = await getSingerDetail(singer)
        console.log(result)
      }
    }
    get()
  }, [])
  return <div className={styles['singer-detail']}>Hello</div>
}
export default SingerDetail
