import { getLyric } from '@/service/song'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  addSongLyric,
  currentSong as getCurrentSong,
} from '@/store/rootReducer'
import { useEffect, useState, useRef } from 'react'
import Lyric from 'lyric-parser'

function useLyric({
  songReady,
  currentTime,
}: {
  songReady: boolean
  currentTime: number
}) {
  const currentLyric = useRef<any>(null)
  const lyricScrollRef = useRef<any>(null)
  const lyricListRef = useRef<HTMLDivElement>(null)
  const [currentLineNum, setCurrentLineNum] = useState<number>(0)

  const dispatch = useAppDispatch()
  const currentSong = useAppSelector(getCurrentSong)

  useEffect(() => {
    if (!currentSong.url || !currentSong.id) return

    const init = async () => {
      const lyric = await getLyric(currentSong)

      dispatch(addSongLyric({ song: currentSong, lyric }))
      if (currentSong.lyric && currentSong.lyric !== lyric) return
      // setCurrentLyric(() => new Lyric(lyric, handleLyric))
      currentLyric.current = new Lyric(lyric, handleLyric)
      if (songReady) {
        playLyric()
      }
    }

    init()

    return () => {
      if (!currentSong.url || !currentSong.id) return
      stopLyric()
      currentLyric.current = null
      setCurrentLineNum(() => 0)
    }
  }, [currentSong.url])

  function playLyric() {
    if (!currentLyric.current) return
    currentLyric.current.seek(currentTime * 1000)
  }

  function stopLyric() {
    if (!currentLyric.current) return
    currentLyric.current.stop()
  }

  function handleLyric({ lineNum }: { lineNum: number }) {
    setCurrentLineNum(lineNum)
    if (!lyricListRef.current || !lyricScrollRef.current) return
    if (lineNum > 5) {
      const lineEl = lyricListRef.current.children[lineNum - 5]
      lyricScrollRef.current.scroll.current.scrollToElement(lineEl, 1000)
    } else {
      lyricScrollRef.current.scroll.current.scrollTo(0, 0, 1000)
    }
  }

  return {
    currentLyric,
    currentLineNum,
    playLyric,
    lyricScrollRef,
    lyricListRef,
    stopLyric,
  }
}

export default useLyric
