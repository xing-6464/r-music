import { Songs } from '@/types/type'
import { get } from './base'

export function processSongs(songs: Songs) {
  return get('/api/getSongsUrl', {
    mid: songs.map((song) => song.mid),
  }).then((result) => {
    const map = result.map
    return songs
      .map((song) => {
        song.url = map[song.mid]
        return song
      })
      .filter((song) => song.url.indexOf('vkey') > -1)
  })
}
