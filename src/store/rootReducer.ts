import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PLAY_MODE } from '../assets/ts/constant'
import { RootState } from '.'
import { shuffle } from '../assets/ts/util'
import type { Songs } from '@/types/type'

type PlayState = {
  sequenceList: Songs
  playList: Songs
  playing: boolean
  playMode: number
  currentIndex: number
  fullScreen: boolean
  favoriteList: Songs
}

const initialState: PlayState = {
  sequenceList: [],
  playList: [],
  playing: false,
  playMode: PLAY_MODE.sequence,
  currentIndex: -1,
  fullScreen: false,
  favoriteList: [],
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
    setFavoriteList(state: PlayState, action: PayloadAction<any[]>) {
      state.favoriteList = action.payload
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
    randomPlay(state: PlayState, action: PayloadAction<any[]>) {
      state.playMode = PLAY_MODE.random
      state.sequenceList = action.payload
      state.playing = true
      state.fullScreen = true
      state.playList = shuffle(action.payload)
      state.currentIndex = 0
    },
    changeMode(state: PlayState, action: PayloadAction<number>) {
      const currentId = currentSong({ root: state }).id
      const mode = action.payload
      if (mode === PLAY_MODE.random) {
        state.playList = shuffle(state.sequenceList)
      } else {
        state.playList = state.sequenceList
      }

      const index = state.playList.findIndex((song) => song.id === currentId)
      state.currentIndex = index
      state.playMode = mode
    },
  },
})

// 获取当前播放歌曲
export const currentSong = (state: RootState) =>
  state.root.playList[state.root.currentIndex] || {}

export const {
  setPlayingState,
  setSequenceList,
  setPlayList,
  setPlayMode,
  setCurrentIndex,
  setFullScreen,
  selectPlay,
  randomPlay,
  changeMode,
  setFavoriteList,
} = playSlice.actions
export default playSlice.reducer
