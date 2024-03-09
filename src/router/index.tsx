import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Recommend from '../view/recommend/Recommend'
import Search from '../view/search/Search'
import Singer from '../view/singer/Singer'
import TopList from '../view/topList/TopList'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/recommend',
        element: <Recommend />,
      },
      {
        path: '/singer',
        element: <Singer />,
      },
      {
        path: '/search',
        element: <Search />,
      },
      {
        path: '/top-list',
        element: <TopList />,
      },
    ],
  },
])

export default router
