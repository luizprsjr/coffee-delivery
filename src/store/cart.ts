import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Item {
  id: string
  size: number
  quantity: number
}

interface CartState {
  items: Item[]
}

const cartSlice = createSlice({
  name: 'shoppingCart',
  initialState: {
    items: [],
  } as CartState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      const item = state.items.find(
        (item) =>
          action.payload.id === item.id && action.payload.size === item.size,
      )

      if (item) {
        item.quantity += action.payload.quantity
      } else {
        state.items.push(action.payload)
      }
    },
    removeItem: (state, action: PayloadAction<Item>) => {
      state.items = state.items.filter((item) => {
        if (action.payload.id === item.id) {
          return action.payload.size !== item.size
        } else {
          return item
        }
      })
    },
    increaseQuantity: (state, action: PayloadAction<Item>) => {
      const item = state.items.find(
        (item) =>
          action.payload.id === item.id && action.payload.size === item.size,
      )
      if (item) {
        item.quantity += 1
      }
    },
    decreaseQuantity: (state, action: PayloadAction<Item>) => {
      const item = state.items.find(
        (item) =>
          action.payload.id === item.id && action.payload.size === item.size,
      )
      if (item) {
        item.quantity -= 1
      }
    },
  },
})

export const { addItem, removeItem, increaseQuantity, decreaseQuantity } =
  cartSlice.actions
export default cartSlice.reducer
