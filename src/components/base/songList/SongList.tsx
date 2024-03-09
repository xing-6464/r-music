import type { Song, Songs } from '@/types/type'

import styles from './SongList.module.scss'

interface SongListProps {
  songs: Songs
}
function SongList({ songs }: SongListProps) {
  function getDesc(song: Song) {
    return `${song.singer}·${song.album}`
  }

  return (
    <ul className={styles['song-list']}>
      {songs.map((song) => (
        <li className={styles['item']} key={song.id}>
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
