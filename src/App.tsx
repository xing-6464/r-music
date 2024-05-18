import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import Header from './components/header/Header'
import Tab from './components/tab/Tab'
import Player from './components/player/Player'

function App() {
  const nav = useNavigate()
  const location = useLocation()
  useEffect(() => {
    if (location.pathname === '/') {
      nav('/recommend')
    }
  }, [location.pathname])

  return (
    <>
      <Header />
      <Tab />
      <Outlet />
      <Player />
    </>
  )
}

export default App
