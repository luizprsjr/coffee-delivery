import { ScrollView, StyleSheet } from 'react-native'
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated'

import { FeaturedCoffeeCard } from '../src/components/featuredCoffeeCard'
import { Intro } from '../src/components/intro'
import { FeaturedCoffee } from '../src/data/featured-coffee'

export default function Index() {
  const translateX = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateX.value = event.contentOffset.x
    },
  })

  return (
    <ScrollView style={styles.container}>
      <Intro />

      <Animated.FlatList
        data={FeaturedCoffee}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <FeaturedCoffeeCard
            index={index}
            data={item}
            translateX={translateX}
          />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ zIndex: 1, marginTop: -103 }}
        contentContainerStyle={{ gap: 32, paddingHorizontal: 32 }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        bounces={false}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
})
