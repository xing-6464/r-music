import { useEffect } from 'react'
import getSingerList from '../service/singer'

function Singer() {
  useEffect(() => {
    const get = async () => {
      const result = await getSingerList()
      console.log(result)
    }

    get()
  }, [])
  return <div>Singer</div>
}

export default Singer
