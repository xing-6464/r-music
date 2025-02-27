import axios from 'axios'

const ERR_OK = 0

axios.defaults.baseURL = 'http://113.44.81.153/music'

export function get(url: string, params?: any) {
  return axios
    .get(url, {
      params,
    })
    .then((res) => {
      const severData = res.data
      if (severData.code === ERR_OK) {
        return severData.result
      }
    })
    .catch((e) => {
      console.info(e)
    })
}
