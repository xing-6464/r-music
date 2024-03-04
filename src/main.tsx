import ReactDOM from 'react-dom/client'
import router from './router/index.tsx'
import { RouterProvider } from 'react-router-dom'

import '@/assets/scss/index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
