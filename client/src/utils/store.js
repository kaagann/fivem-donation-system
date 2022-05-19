import { configureStore } from '@reduxjs/toolkit'
import TestReducer from "../test/Test";

export default configureStore({
  reducer: {
      user: TestReducer
  },
})