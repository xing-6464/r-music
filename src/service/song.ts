import { Song, Songs } from '@/types/type'
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

const lyricMap = new Map<string, string>()
export function getLyric(song: Song) {
  if (song.lyric) return Promise.resolve(song.lyric)

  const mid = song.mid
  const lyric = lyricMap.get(mid)
  if (lyric) return Promise.resolve(lyric)

  return get('/api/getLyric', {
    mid,
  }).then((res) => {
    const lyric = res ? res.lyric : '[00:00:00]该歌曲暂时无法获取歌词暂无歌词'
    lyricMap.set(mid, lyric)
    return lyric
  })
}
