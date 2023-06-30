import { useLocalSearchParams, useRouter } from 'expo-router'
import { ArrowLeft, Minus, Plus, ShoppingCart } from 'phosphor-react-native'
import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'

import Coffee from '../src/assets/coffee.svg'
import Smoke from '../src/assets/smoke.svg'
import { SizeButton } from '../src/components/SizeButton'
import { RootState } from '../src/store'
import { addItem } from '../src/store/cart'
import { theme } from '../src/styles/theme'

export default function Product() {
  const [size, setSize] = useState(null)
  const [quantity, setQuantity] = useState(1)

  const shoppingCart = useSelector(
    (state: RootState) => state.shoppingCart.items,
  )

  const dispatch = useDispatch()
  const router = useRouter()
  const { id, name, type, price, description } = useLocalSearchParams()
  const { top } = useSafeAreaInsets()
  const isSizeSelected = useSharedValue(0)

  const reanimatedSelectTitleStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        isSizeSelected.value,
        [0, 1],
        [theme.colors.gray_400, theme.colors.dark_red],
      ),
    }
  })

  const reanimatedSelectBtnSize = useAnimatedStyle(() => {
    return {
      flex: 1,
      height: 40,
      borderWidth: 1,
      borderColor: interpolateColor(
        isSizeSelected.value,
        [0, 1],
        ['transparent', theme.colors.dark_red],
      ),
      borderRadius: 6,
    }
  })

  function handleAddItem() {
    if (!size) {
      return (isSizeSelected.value = withSequence(
        withTiming(1, { duration: 600 }),
        withTiming(0, { duration: 600 }),
      ))
    }

    if (typeof id === 'string') {
      const newItem = {
        id,
        quantity,
        size,
      }

      router.push({
        pathname: '/',
        params: { ...newItem, name },
      })
      dispatch(addItem(newItem))
    }
  }

  function changeCoffeeSize(size: number) {
    setSize(size)
  }

  function handleIncreaseQuantity() {
    setQuantity((prev) => prev + 1)
  }

  function handleDecreaseQuantity() {
    if (quantity > 1) setQuantity((prev) => prev - 1)
  }

  return (
    <View style={styles.container}>
      <View style={[styles.darkArea, { paddingTop: top }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/')}>
            <ArrowLeft size={24} color={theme.colors.white} />
          </TouchableOpacity>

          <TouchableOpacity
            hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}
            onPress={() => router.push('cart')}
          >
            {shoppingCart.length > 0 && (
              <View style={styles.cartCountContainer}>
                <Text style={styles.cartCountText}>{shoppingCart.length}</Text>
              </View>
            )}
            <ShoppingCart size={20} weight="fill" color={theme.colors.purple} />
          </TouchableOpacity>
        </View>

        <View style={styles.nameAndPriceContainer}>
          <View>
            <View style={styles.typeContainer}>
              <Text style={styles.type}>{type}</Text>
            </View>
            <Text style={styles.name} numberOfLines={2}>
              {name}
            </Text>
          </View>

          <View style={[styles.priceContainer]}>
            <Text style={styles.price$}>
              R$ <Text style={styles.price}>{Number(price).toFixed(2)}</Text>
            </Text>
          </View>
        </View>

        <Text style={styles.description}>{description}</Text>

        <View style={styles.coffeeImageContainer}>
          <Smoke style={styles.smoke} />
          <Coffee style={styles.coffee} />
        </View>
      </View>

      <View style={styles.selectCoffeeContainer}>
        <Animated.Text style={[styles.selectTitle, reanimatedSelectTitleStyle]}>
          Selecione o tamanho:{' '}
        </Animated.Text>

        <View style={styles.buttonsContainer}>
          <Animated.View style={reanimatedSelectBtnSize}>
            <SizeButton
              size={114}
              isChecked={size === 114}
              changeSize={changeCoffeeSize}
            />
          </Animated.View>
          <Animated.View style={reanimatedSelectBtnSize}>
            <SizeButton
              size={140}
              isChecked={size === 140}
              changeSize={changeCoffeeSize}
            />
          </Animated.View>
          <Animated.View style={reanimatedSelectBtnSize}>
            <SizeButton
              size={227}
              isChecked={size === 227}
              changeSize={changeCoffeeSize}
            />
          </Animated.View>
        </View>

        <View style={styles.addButtonContainer}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={handleDecreaseQuantity}>
              <Minus size={20} color={theme.colors.purple} />
            </TouchableOpacity>

            <Text style={styles.quantityText}>{quantity}</Text>

            <TouchableOpacity onPress={handleIncreaseQuantity}>
              <Plus size={20} color={theme.colors.purple} />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
              <Text style={styles.addButtonText}>ADICIONAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray_900,
  },
  darkArea: {
    flex: 1,
    paddingHorizontal: 32,
    backgroundColor: theme.colors.gray_100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 26,
  },

  cartCountContainer: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.purple,
    top: -16,
    right: -16,
  },
  cartCountText: {
    fontFamily: theme.fonts.regular,
    fontSize: 12,
    color: theme.colors.white,
  },

  nameAndPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 8,
  },

  typeContainer: {
    borderRadius: 100,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  type: {
    fontFamily: theme.fonts.bold,
    fontSize: 10,
    color: theme.colors.white,
    textTransform: 'uppercase',
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: theme.colors.gray_200,
  },
  name: {
    fontFamily: theme.fonts.title,
    fontSize: 24,
    color: theme.colors.white,
    marginTop: 12,
    maxWidth: 225,
  },

  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  price$: {
    fontFamily: theme.fonts.regular,
    fontSize: 14,
    color: theme.colors.yellow,
  },
  price: {
    fontFamily: theme.fonts.title,
    fontSize: 36,
    color: theme.colors.yellow,
  },
  description: {
    fontFamily: theme.fonts.regular,
    fontSize: 16,
    color: theme.colors.gray_500,
    marginTop: 20,
  },

  coffeeImageContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginTop: 32,
    marginBottom: -74,
  },
  smoke: {
    alignSelf: 'center',
    marginBottom: -62,
    zIndex: 1,
  },
  coffee: {
    alignSelf: 'center',
  },

  selectCoffeeContainer: {
    paddingVertical: 42,
    paddingHorizontal: 32,
  },
  selectTitle: {
    fontFamily: theme.fonts.regular,
    fontSize: 14,
  },

  buttonsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    padding: 8,
  },
  quantityText: {
    fontFamily: theme.fonts.regular,
    fontSize: 16,
    color: theme.colors.gray_100,
  },

  addButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
    marginTop: 20,
    padding: 8,
    borderRadius: 6,
    backgroundColor: theme.colors.gray_700,
  },
  addButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: theme.colors.dark_purple,
    paddingHorizontal: 8,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontFamily: theme.fonts.bold,
    fontSize: 14,
    lineHeight: 22.4,
    color: theme.colors.white,
    textTransform: 'uppercase',
  },
})
