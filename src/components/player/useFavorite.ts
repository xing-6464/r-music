import { save } from '@/assets/ts/array-store'
import { FAVORITE_KEY } from '@/assets/ts/constant'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setFavoriteList } from '@/store/rootReducer'
import { Song } from '@/types/type'

function useFavorite() {
  const dispatch = useAppDispatch()
  const favoriteList = useAppSelector((state) => state.root.favoriteList)

  function getFavoriteIcon(song: Song) {
    return isFavorite(song) ? '_icon-favorite' : '_icon-not-favorite'
  }

  function toggleFavorite(song: Song) {
    let list: Song[] = []
    if (isFavorite(song)) {
      // remove from favorite list
    } else {
      // add to favorite list
      list = save(song, FAVORITE_KEY, compare)
    }

    function compare(item: Song) {
      return item.id === song.id
    }

    dispatch(setFavoriteList(list))
  }

  function isFavorite(song: Song) {
    return favoriteList.findIndex((item) => item.id === song.id) > -1
  }

  return {
    getFavoriteIcon,
    toggleFavorite,
  }
}

export default useFavorite
