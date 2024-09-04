import { FC } from 'react'

import { Singer, Singers } from '@/types/type'
import Scroll from '../scroll/Scroll'
import styles from './IndexList.module.scss'
import useFixed from './useFixed'
import useShortCut from './useShortCut'
import classNames from 'classnames'
import { LazyLoadImage } from 'react-lazy-load-image-component'

interface IndexListProps {
  data: Singers
  select?: (item: Singer) => void
}

const IndexList: FC<IndexListProps> = ({ data, select }) => {
  const { groupRef, fixedTitle, fixedStyle, currentIndex, onScroll } =
    useFixed(data)
  const {
    shortcutList,
    onShortcutTouchEnd,
    onShortcutTouchMove,
    onShortcutTouchStart,
    scrollRef,
  } = useShortCut(data, groupRef)

  function onItemClick(item: Singer) {
    select?.(item)
  }

  return (
    <Scroll
      cls={styles['index-list']}
      click
      probeType={3}
      emit={onScroll}
      ref={scrollRef}
    >
      <>
        <ul ref={groupRef}>
          {data.map((group) => (
            <li key={group.title} className={styles['group']}>
              <h2 className={styles['title']}>{group.title}</h2>
              <ul>
                {group.list.map((item) => (
                  <li
                    key={item.id}
                    className={styles['item']}
                    onClick={() => onItemClick(item)}
                  >
                    <LazyLoadImage
                      className={styles['avatar']}
                      src={item.pic}
                      effect="blur"
                    />
                    <span className={styles['name']}>{item.name}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div
          className={styles.fixed}
          style={{ ...fixedStyle, display: !fixedTitle ? 'none' : 'block' }}
        >
          <div className={styles['fixed-title']}>{fixedTitle}</div>
        </div>
        <div
          className={styles.shortcut}
          onTouchStart={(e) => onShortcutTouchStart(e)}
          onTouchMove={(e) => onShortcutTouchMove(e)}
          onTouchEnd={(e) => onShortcutTouchEnd(e)}
        >
          <ul>
            {shortcutList.map((item, index) => {
              const cls = classNames(styles.item, {
                [styles.current]: currentIndex === index,
              })
              return (
                <li key={item} className={cls} data-index={index}>
                  {item}
                </li>
              )
            })}
          </ul>
        </div>
      </>
    </Scroll>
  )
}

export default IndexList
