import { useEffect } from "react"
import { getRecommend } from "../service/recommend"

function Recommend() {
  useEffect(() => {
    const get = async () => {
      const result = await getRecommend()
      console.log(result)
    }

    get()
  }, [])
  return <div>Recommend</div>
}

export default Recommend
