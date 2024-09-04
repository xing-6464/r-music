import { FC, ReactNode } from 'react'
import styles from './Loading.module.scss'
import Image from './loading.gif'

interface LoadingProps {
  title?: string
  isLoading: boolean
  children: ReactNode
}

const Load: FC<LoadingProps> = ({
  title = '正在加载',
  isLoading,
  children,
}) => {
  if (!isLoading) {
    return <>{children}</>
  } else {
    return (
      <div className={styles['loading']}>
        <div className={styles['loading-content']}>
          <img width="24" height="24" src={Image} />
          <p className={styles['desc']}>{title}</p>
        </div>
      </div>
    )
  }
}

export default Load
