import { getLyric } from '@/service/song'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  addSongLyric,
  currentSong as getCurrentSong,
} from '@/store/rootReducer'
import { useEffect } from 'react'
import Lyric from 'lyric-parser'

function useLyric() {
  const [currentLyric, setCurrentLyric] = useState(null)
  const dispatch = useAppDispatch()
  const currentSong = useAppSelector(getCurrentSong)

  useEffect(() => {
    if (!currentSong.url || !currentSong.id) return
    const init = async () => {
      const lyric = await getLyric(currentSong)

      dispatch(addSongLyric({ song: currentSong, lyric }))
      if (currentSong.lyric !== lyric) return
      setCurrentLyric(new Lyric(lyric, handleLyric))
    }

    init()
  }, [currentSong, dispatch])

  function handleLyric() {}
}

export default useLyric
