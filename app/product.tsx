import { useLocalSearchParams, useRouter } from 'expo-router'
import { ArrowLeft, ShoppingCart } from 'phosphor-react-native'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Coffee from '../src/assets/coffee.svg'
import Smoke from '../src/assets/smoke.svg'
import { SizeButton } from '../src/components/sizeButton'
import { theme } from '../src/styles/theme'

export default function Product() {
  const router = useRouter()
  const { name, type, price, description } = useLocalSearchParams()
  const { top } = useSafeAreaInsets()

  return (
    <View style={styles.container}>
      <View style={[styles.darkArea, { paddingTop: top }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/')}>
            <ArrowLeft size={24} color={theme.colors.white} />
          </TouchableOpacity>

          <ShoppingCart size={20} weight="fill" color={theme.colors.purple} />
        </View>

        <View style={styles.nameAndPriceContainer}>
          <View>
            <Text style={styles.type}>{type}</Text>
            <Text style={styles.name} numberOfLines={2}>
              {name}
            </Text>
          </View>

          <View style={[styles.priceContainer]}>
            <Text style={styles.price$}>
              R$ <Text style={styles.price}>{price}</Text>
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
        <Text style={styles.selectTitle}>Selecione o tamanho: </Text>

        <View style={styles.buttonsContainer}>
          <SizeButton size={114} />
          <SizeButton size={140} />
          <SizeButton size={227} />
        </View>

        <View style={styles.addButtonContainer}>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>ADICIONAR</Text>
          </TouchableOpacity>
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

  nameAndPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 8,
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
    borderRadius: 100,
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
    color: theme.colors.gray_400,
  },

  buttonsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },

  addButtonContainer: {
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
