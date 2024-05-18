import type { Song, Songs } from '@/types/type'

import styles from './SongList.module.scss'

interface SongListProps {
  songs: Songs
  onSelect?: (song: Song, index: number) => void
}
function SongList({ songs, onSelect }: SongListProps) {
  function getDesc(song: Song) {
    return `${song.singer}·${song.album}`
  }

  function selectItem(song: Song, index: number) {
    onSelect?.(song, index)
  }

  return (
    <ul className={styles['song-list']}>
      {songs.map((song, index) => (
        <li
          className={styles['item']}
          key={song.id}
          onClick={() => selectItem(song, index)}
        >
          <div className={styles['content']}>
            <h2 className={styles['name']}>{song.name}</h2>
            <p className={styles['desc']}>{getDesc(song)}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default SongList
