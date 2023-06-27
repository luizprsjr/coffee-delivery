import { configureStore } from '@reduxjs/toolkit'

import cartReducer from './cart'

export const store = configureStore({
  reducer: {
    shoppingCart: cartReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
