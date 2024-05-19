export type Sliders = {
  id: number
  link: string
  pic: string
}[]

export type Albums = {
  id: number
  pic: string
  title: string
  username: string
}[]

export interface Singer {
  id: number
  mid: string
  name: string
  pic: string
}

export type Singers = {
  list: Singer[]
  title: string
}[]

export interface Song {
  album: string
  duration: number
  id: number
  mid: string
  name: string
  pic: string
  singer: string
  url: string
  lyric?: string
}

export type Songs = Song[]
