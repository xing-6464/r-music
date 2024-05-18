import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Recommend from '../view/recommend/Recommend'
import Search from '../view/search/Search'
import Singer from '../view/singer/Singer'
import TopList from '../view/topList/TopList'
import SingerDetail from '@/view/singer/singerDetail/SingerDetail'
import { Suspense } from 'react'

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
        children: [
          {
            path: ':id',
            element: (
              <Suspense>
                <SingerDetail />,
              </Suspense>
            ),
          },
        ],
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
