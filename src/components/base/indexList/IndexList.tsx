import { FC } from 'react'

import { Singers } from '../../../view/type'
import Scroll from '../scroll/Scroll'
import styles from './IndexList.module.scss'

interface IndexListProps {
  data: Singers
}
const IndexList: FC<IndexListProps> = ({ data }) => {
  return (
    <Scroll cls={styles['index-list']} click>
      <ul>
        {data.map((group) => (
          <li key={group.title} className={styles['group']}>
            <h2 className={styles['title']}>{group.title}</h2>
            <ul>
              {group.list.map((item) => (
                <li key={item.id} className={styles['item']}>
                  <img className={styles['avatar']} src={item.pic} />
                  <span className={styles['name']}>{item.name}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Scroll>
  )
}

export default IndexList
