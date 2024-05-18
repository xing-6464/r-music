import { configureStore } from '@reduxjs/toolkit'
import playReducer from './rootReducer'
import logger from 'redux-logger'

const store = configureStore({
  reducer: {
    root: playReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
