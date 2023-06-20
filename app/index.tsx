import { FlatList, ScrollView, StyleSheet } from 'react-native'

import { FeaturedCoffeeCard } from '../src/components/featuredCoffeeCard'
import { Intro } from '../src/components/intro'
import { FeaturedCoffee } from '../src/data/featured-coffee'

export default function Index() {
  return (
    <ScrollView style={styles.container}>
      <Intro />

      <FlatList
        data={FeaturedCoffee}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <FeaturedCoffeeCard index={index} data={item} />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ zIndex: 1, marginTop: -88 }}
        contentContainerStyle={{ gap: 32, paddingHorizontal: 32 }}
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
