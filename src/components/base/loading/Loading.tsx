import { FC } from 'react'
import styles from './Loading.module.scss'
import Image from './loading.gif'

interface LoadingProps {
  title?: string
}

const Loading: FC<LoadingProps> = ({ title = '正在加载' }) => {
  return (
    <div className={styles['loading']}>
      <div className={styles['loading-content']}>
        <img width="24" height="24" src={Image} />
        <p className={styles['desc']}>{title}</p>
      </div>
    </div>
  )
}

export default Loading
