import { FC, ReactNode } from 'react'
import styles from './Loading.module.scss'
import Image from './loading.gif'

interface LoadingProps {
  title?: string
  isLoading?: boolean
  children?: ReactNode
}

const Loading: FC<LoadingProps> = ({
  title = '正在加载',
  isLoading,
  children,
}) => {
  const element = (
    <div className={styles['loading']}>
      <div className={styles['loading-content']}>
        <img width="24" height="24" src={Image} />
        <p className={styles['desc']}>{title}</p>
      </div>
    </div>
  )

  if (isLoading == null) {
    return element
  } else {
    return isLoading ? element : <>{children}</>
  }
}

export default Loading
