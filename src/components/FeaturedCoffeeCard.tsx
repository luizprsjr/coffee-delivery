import { useRouter } from 'expo-router'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Animated, {
  interpolate,
  SlideInRight,
  useAnimatedStyle,
  ZoomIn,
} from 'react-native-reanimated'

import { featuredCoffee } from '../data/featured-coffee'
import { theme } from '../styles/theme'

type CardProps = {
  index: number
  data: (typeof featuredCoffee)[0]
  translateX: Animated.SharedValue<number>
}

const PressableAnimated = Animated.createAnimatedComponent(Pressable)

export function FeaturedCoffeeCard({ index, data, translateX }: CardProps) {
  const CoffeeImg = data.svg

  const router = useRouter()

  const rStyleContainer = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      [(index - 1) * 164, index * 164, (index + 1) * 164],
      [0.8, 1, 0.8],
    )

    return {
      transform: [{ scaleY: scale }],
    }
  })

  const inverseScale = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      [(index - 1) * 164, index * 164, (index + 1) * 164],
      [1 / 0.8, 1, 1 / 0.8],
    )

    return {
      transform: [{ scaleY: scale }],
    }
  })

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      [(index - 1) * 164, index * 164, (index + 1) * 164],
      [0.8, 1, 0.8],
    )

    return {
      transform: [{ scale }],
    }
  })

  const rImageStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      [(index - 1) * 164, index * 164, (index + 1) * 164],
      [0.85, 1.1, 0.85],
    )

    return {
      transform: [{ scale }],
    }
  })

  return (
    <PressableAnimated
      onPress={() =>
        router.push({
          pathname: '/product',
          params: data,
        })
      }
      entering={SlideInRight.delay(index * 100 + 1000).duration(1000)}
      style={[styles.container, rStyleContainer]}
    >
      <Animated.View style={inverseScale}>
        <Animated.View style={[{ alignItems: 'center' }, rStyle]}>
          <Animated.View
            style={rImageStyle}
            entering={ZoomIn.delay(1000).duration(1000)}
          >
            <CoffeeImg style={styles.image} />
          </Animated.View>

          <View style={styles.coffeeTypeTextContainer}>
            <Text style={styles.coffeeTypeText}>{data.type}</Text>
          </View>

          <Text style={styles.coffeeName}>{data.name}</Text>

          <Text style={styles.description}>{data.description}</Text>

          <View style={styles.priceContainer}>
            <Text style={styles.pricePrefix}>
              R$ <Text style={styles.price}>{data.price.toFixed(2)}</Text>
            </Text>
          </View>
        </Animated.View>
      </Animated.View>
    </PressableAnimated>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 208,
    height: 262,
    backgroundColor: theme.colors.gray_800,
    alignItems: 'center',
    marginTop: 35,
    paddingHorizontal: 16,
    paddingBottom: 20,
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
  image: {
    marginTop: -30,
  },
  coffeeTypeTextContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: theme.colors.light_purple,
    borderRadius: 100,
    marginTop: 8,
  },
  coffeeTypeText: {
    fontFamily: theme.fonts.bold,
    fontSize: 10,
    color: theme.colors.dark_purple,
    textTransform: 'uppercase',
  },
  coffeeName: {
    fontFamily: theme.fonts.title,
    fontSize: 20,
    color: theme.colors.gray_200,
    marginTop: 14,
  },
  description: {
    fontFamily: theme.fonts.regular,
    fontSize: 12,
    color: theme.colors.gray_400,
    textAlign: 'center',
    marginTop: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
  },
  pricePrefix: {
    fontFamily: theme.fonts.regular,
    fontSize: 14,
    color: theme.colors.dark_yellow,
  },
  price: {
    fontFamily: theme.fonts.title,
    fontSize: 24,
    color: theme.colors.dark_yellow,
  },
})
