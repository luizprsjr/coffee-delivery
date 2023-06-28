import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'

import { CartItem } from '../src/components/cartItem'
import { NavHeader } from '../src/components/navHeader'
import { coffeeList } from '../src/data/coffee-list'
import { RootState } from '../src/store/index'
import { theme } from '../src/styles/theme'

export default function Cart() {
  const shoppingCart = useSelector(
    (state: RootState) => state.shoppingCart.items,
  )

  const coffeeListWithoutHeader = coffeeList.flatMap((coffee) => coffee.data)

  const cartItems = shoppingCart.flatMap((cartItem) => {
    const matchingItems = coffeeListWithoutHeader.filter(
      (item) => item.id === cartItem.id,
    )

    return matchingItems.map((matchingItem) => ({
      cartItemId: cartItem.id + String(cartItem.size),
      ...matchingItem,
      size: cartItem.size,
      quantity: cartItem.quantity,
    }))
  })

  console.log(cartItems)

  return (
    <>
      <StatusBar style="dark" translucent />
      <View>
        <NavHeader title="Carrinho" />

        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.cartItemId}
          renderItem={({ item, index }) => <CartItem item={item} />}
          style={{
            borderTopWidth: 1,
            borderTopColor: theme.colors.gray_700,
          }}
        />
      </View>
    </>
  )
}
