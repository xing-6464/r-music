import { get } from './base'

export default function getSingerList() {
  return get('/api/getSingerList')
}
