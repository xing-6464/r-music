import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import styles from './Tab.module.scss'

const tab = [
  {
    name: '推荐',
    path: '/recommend',
  },
  {
    name: '歌手',
    path: '/singer',
  },
  {
    name: '排行',
    path: '/top-list',
  },
  {
    name: '搜索',
    path: '/search',
  },
]

const Tab = () => {
  const [tabs] = useState(tab)

  return (
    <div className={styles.tab}>
      {tabs.map((item) => {
        return (
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? `${styles['tab-item']} ${styles.active}`
                : styles['tab-item']
            }
            key={item.path}
          >
            <span className={styles['tab-link']}>{item.name}</span>
          </NavLink>
        )
      })}
    </div>
  )
}

export default Tab
