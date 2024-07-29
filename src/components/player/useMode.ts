import { PLAY_MODE } from '@/assets/ts/constant'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { changeMode as changeModeAction } from '@/store/rootReducer'
import { useMemo } from 'react'

function useMode() {
  const dispatch = useAppDispatch()
  const playMode = useAppSelector((state) => state.root.playMode)

  const modeIcon = useMemo(() => {
    return playMode === PLAY_MODE.sequence
      ? '_icon-sequence'
      : playMode === PLAY_MODE.random
        ? '_icon-random'
        : '_icon-loop'
  }, [playMode])

  const modeText = useMemo(() => {
    return playMode === PLAY_MODE.sequence
      ? '顺序播放'
      : playMode === PLAY_MODE.random
        ? '随机播放'
        : '单曲循环'
  }, [playMode])

  function changeMode() {
    const mode = (playMode + 1) % 3
    dispatch(changeModeAction(mode))
  }

  return { modeIcon, modeText, changeMode }
}

export default useMode
