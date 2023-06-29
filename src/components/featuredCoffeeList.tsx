import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated'

import { featuredCoffee } from '../data/featured-coffee'
import { FeaturedCoffeeCard } from './FeaturedCoffeeCard'

export function FeaturedCoffeeList() {
  const translateX = useSharedValue(0)

  const scrollXHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateX.value = event.contentOffset.x
    },
  })

  return (
    <Animated.FlatList
      data={featuredCoffee}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <FeaturedCoffeeCard index={index} data={item} translateX={translateX} />
      )}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{ zIndex: 1, marginTop: -103 }}
      contentContainerStyle={{ gap: 32, paddingHorizontal: 32 }}
      onScroll={scrollXHandler}
      scrollEventThrottle={16}
      bounces={false}
    />
  )
}
