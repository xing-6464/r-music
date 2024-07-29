import React from 'react'
import style from './PlayList.module.scss'
import Scroll from '../base/scroll/Scroll'
import { useAppSelector } from '@/store/hooks'
import useMode from './useMode'
import useFavorite from './useFavorite'
import classNames from 'classnames'

function PlayList(props: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) {
  const { isOpen, setIsOpen } = props

  const playList = useAppSelector((state) => state.root.playList)
  const sequenceList = useAppSelector((state) => state.root.sequenceList)
  const { modeIcon, changeMode, modeText } = useMode()
  const { getFavoriteIcon, toggleFavorite } = useFavorite()

  function hide() {
    setIsOpen(false)
  }

  return (
    <div
      className={style['playlist']}
      style={{ display: isOpen && playList.length ? 'block' : 'none' }}
      onClick={() => hide()}
    >
      <div className={style['list-wrapper']}>
        <div className={style['list-header']}>
          <h1 className={style['title']}>
            <i
              className={classNames(modeIcon, style['icon'])}
              onClick={(e) => {
                e.stopPropagation()
                changeMode
              }}
            ></i>
            <span className={style['text']}>{modeText}</span>
          </h1>
        </div>
        <Scroll cls={style['list-content']} ref="scrollRef">
          <ul>
            {sequenceList.map((song) => (
              <li className={style['item']} key={song.id}>
                <i className={style['current']}></i>
                <span className={style['text']}>{song.name}</span>
                <span
                  className={style['favorite']}
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(song)
                  }}
                >
                  <i className={getFavoriteIcon(song)}></i>
                </span>
              </li>
            ))}
          </ul>
        </Scroll>
        <div
          className={style['list-footer']}
          onClick={(e) => {
            e.stopPropagation()
            hide()
          }}
        >
          <span>关闭</span>
        </div>
      </div>
    </div>
  )
}

export default PlayList
