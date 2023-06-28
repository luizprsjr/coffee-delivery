import { Minus, Plus, Trash } from 'phosphor-react-native'
import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Coffee } from '../data/coffee-list'
import { theme } from '../styles/theme'

interface Item extends Coffee {
  size: number
  quantity: number
}

interface Props {
  item: Item
}

export function CartItem({ item }: Props) {
  const CoffeeImg = item.svg
  const [quantity, setQuantity] = useState(item.quantity)

  function handleIncreaseQuantity() {
    setQuantity((prev) => prev + 1)
  }

  function handleDecreaseQuantity() {
    if (quantity > 1) setQuantity((prev) => prev - 1)
  }

  return (
    <View style={styles.container}>
      <CoffeeImg width={64} height={64} />
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.size}>{item.size}ml</Text>

          <View style={styles.deleteAndQuantityAre}>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={handleDecreaseQuantity}>
                <Minus size={20} color={theme.colors.purple} />
              </TouchableOpacity>

              <Text style={styles.quantityText}>{quantity}</Text>

              <TouchableOpacity onPress={handleIncreaseQuantity}>
                <Plus size={20} color={theme.colors.purple} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.trash}>
              <Trash size={20} color={theme.colors.purple} />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.price}>R$ {item.price}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 20,
    paddingHorizontal: 32,
    paddingVertical: 26,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray_700,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: theme.fonts.regular,
    fontSize: 16,
    lineHeight: 16 * 1.3,
    color: theme.colors.gray_100,
  },
  size: {
    fontFamily: theme.fonts.regular,
    fontSize: 14,
    lineHeight: 16 * 1.3,
    color: theme.colors.gray_400,
  },
  deleteAndQuantityAre: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 20,
    padding: 8,
    borderWidth: 1,
    borderColor: theme.colors.gray_600,
    borderRadius: 6,
  },
  quantityText: {
    fontFamily: theme.fonts.regular,
    fontSize: 16,
    color: theme.colors.gray_100,
  },
  trash: {
    backgroundColor: theme.colors.gray_700,
    padding: 8,
    borderRadius: 6,
  },
  price: {
    fontFamily: theme.fonts.title,
    fontSize: 16,
    lineHeight: 16 * 1.3,
    color: theme.colors.gray_100,
  },
})
