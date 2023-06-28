import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'

import { CartItem } from '../src/components/cartItem'
import { NavHeader } from '../src/components/navHeader'
import { coffeeList } from '../src/data/coffee-list'
import { RootState } from '../src/store/index'
import { theme } from '../src/styles/theme'

export default function Cart() {
  const [total, setTotal] = useState(0)
  const router = useRouter()

  const { bottom } = useSafeAreaInsets()
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

  useEffect(() => {
    const total = cartItems.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity
    }, 0)

    setTotal(total)
  }, [cartItems])

  return (
    <>
      <StatusBar style="dark" translucent />
      <View style={styles.container}>
        <NavHeader title="Carrinho" />

        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.cartItemId}
          renderItem={({ item }) => <CartItem item={item} />}
          style={styles.flatList}
        />

        <View
          style={[styles.footer, { paddingBottom: bottom > 32 ? bottom : 32 }]}
        >
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Valor total</Text>
            <Text style={styles.price}>R$ {total.toFixed(2)}</Text>
          </View>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => router.push('confirmation')}
          >
            <Text style={styles.buttonText}>CONFIRMAR PEDIDO</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray_900,
  },
  flatList: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray_700,
  },
  footer: {
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    elevation: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    paddingHorizontal: 32,
    paddingTop: 32,
    gap: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceLabel: {
    fontFamily: theme.fonts.regular,
    fontSize: 16,
    color: theme.colors.gray_200,
  },
  price: {
    fontFamily: theme.fonts.title,
    fontSize: 20,
    color: theme.colors.gray_200,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 6,
    backgroundColor: theme.colors.dark_yellow,
  },
  buttonText: {
    fontFamily: theme.fonts.bold,
    fontSize: 14,
    lineHeight: 14 * 1.6,
    color: 'white',
    textTransform: 'uppercase',
  },
})
