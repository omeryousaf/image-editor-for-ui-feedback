import { configureStore } from '@reduxjs/toolkit'
import imageAndPinsReducer from './imageAndPinsSlice'

export default configureStore({
  reducer: {
    imageAndPinsReducer: imageAndPinsReducer
  },
})