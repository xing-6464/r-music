import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PLAY_MODE } from '../assets/ts/constant'
import { RootState } from '.'

type PlayState = {
  sequenceList: any[]
  playList: any[]
  playing: boolean
  playMode: number
  currentIndex: number
  fullScreen: boolean
}

const initialState: PlayState = {
  sequenceList: [],
  playList: [],
  playing: false,
  playMode: PLAY_MODE.sequence,
  currentIndex: -1,
  fullScreen: false,
}

const playSlice = createSlice({
  name: 'play',
  initialState,
  reducers: {
    setPlayingState(state: PlayState, action: PayloadAction<boolean>) {
      state.playing = action.payload
    },
    setSequenceList(state: PlayState, action: PayloadAction<any[]>) {
      state.sequenceList = action.payload
    },
    setPlayList(state: PlayState, action: PayloadAction<any[]>) {
      state.playList = action.payload
    },
    setPlayMode(state: PlayState, action: PayloadAction<number>) {
      state.playMode = action.payload
    },
    setCurrentIndex(state: PlayState, action: PayloadAction<number>) {
      state.currentIndex = action.payload
    },
    setFullScreen(state: PlayState, action: PayloadAction<boolean>) {
      state.fullScreen = action.payload
    },
    selectPlay(
      state: PlayState,
      action: PayloadAction<{ list: any[]; index: number }>,
    ) {
      state.playMode = PLAY_MODE.sequence
      state.sequenceList = action.payload.list
      state.playing = true
      state.fullScreen = true
      state.playList = action.payload.list
      state.currentIndex = action.payload.index
    },
  },
})

// 获取当前播放歌曲
export const currentSong = (state: RootState) =>
  state.root.playList[state.root.currentIndex]

export const {
  setPlayingState,
  setSequenceList,
  setPlayList,
  setPlayMode,
  setCurrentIndex,
  setFullScreen,
  selectPlay,
} = playSlice.actions
export default playSlice.reducer
