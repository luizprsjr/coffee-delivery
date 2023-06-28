import { useRouter } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Animated, { SlideInDown } from 'react-native-reanimated'

import { Coffee } from '../data/coffee-list'
import { theme } from '../styles/theme'

type CardProps = {
  item: Coffee
}

const TouchableOpacityAnimated =
  Animated.createAnimatedComponent(TouchableOpacity)

export function CoffeeCard({ item }: CardProps) {
  const CoffeeImg = item.svg
  const router = useRouter()

  return (
    <TouchableOpacityAnimated
      entering={SlideInDown.delay(1000).duration(1000)}
      style={styles.container}
      onPress={() =>
        router.push({
          pathname: '/product',
          params: item,
        })
      }
    >
      <CoffeeImg style={{ marginTop: -32, marginLeft: -8 }} />
      <View style={{ flex: 1, width: '100%' }}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price$}>
            R$ <Text style={styles.price}>{item.price.toFixed(2)}</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacityAnimated>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 32,
    marginBottom: 32,
    padding: 16,
    gap: 12,

    backgroundColor: theme.colors.gray_800,
    borderRadius: 6,
    borderTopRightRadius: 36,
    borderBottomLeftRadius: 36,
    borderWidth: 1,
    borderColor: theme.colors.gray_700,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  cardTitle: {
    fontFamily: theme.fonts.title,
    fontSize: 16,
    color: theme.colors.gray_200,
  },
  cardDescription: {
    fontFamily: theme.fonts.regular,
    fontSize: 12,
    color: theme.colors.gray_400,
    marginTop: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  price$: {
    fontFamily: theme.fonts.regular,
    fontSize: 14,
    color: theme.colors.dark_yellow,
  },
  price: {
    fontFamily: theme.fonts.title,
    fontSize: 20,
    color: theme.colors.dark_yellow,
  },
})
