import { get } from './base'
import { Singer } from '@/types/type'

export function getSingerList() {
  return get('/api/getSingerList')
}

export function getSingerDetail(singer: Singer) {
  return get('/api/getSingerDetail', {
    mid: singer.mid,
  })
}
