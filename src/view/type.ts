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
