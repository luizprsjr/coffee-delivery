import {
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Animated, {
  SlideInDown,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated'

import { FeaturedCoffeeCard } from '../src/components/featuredCoffeeCard'
import { Intro } from '../src/components/intro'
import { Coffee, coffeeList, CoffeeTypes } from '../src/data/coffee-list'
import { FeaturedCoffee } from '../src/data/featured-coffee'
import { theme } from '../src/styles/theme'

export default function Index() {
  const translateX = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateX.value = event.contentOffset.x
    },
  })

  const SectionListAnimated = Animated.createAnimatedComponent(
    SectionList<Coffee, CoffeeTypes>,
  )

  return (
    <View style={styles.container}>
      <SectionListAnimated
        ListHeaderComponent={
          <>
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

            <Animated.View
              entering={SlideInDown.delay(1000).duration(1000)}
              style={{ paddingHorizontal: 32 }}
            >
              <Text
                style={{
                  fontFamily: theme.fonts.title,
                  fontSize: 16,
                  color: theme.colors.gray_300,
                  marginTop: 30,
                }}
              >
                Nossos cafés
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 18,
                  marginBottom: 32,
                  gap: 8,
                }}
              >
                {coffeeList.map((item) => (
                  <TouchableOpacity
                    key={item.title}
                    style={{
                      paddingVertical: 6,
                      paddingHorizontal: 12,
                      borderWidth: 1,
                      borderColor: theme.colors.purple,
                      borderRadius: 100,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: theme.fonts.bold,
                        fontSize: 10,
                        color: theme.colors.purple,
                        textTransform: 'uppercase',
                      }}
                    >
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Animated.View>
          </>
        }
        sections={coffeeList}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section: { title } }) => (
          <Animated.Text
            entering={SlideInDown.delay(1000).duration(1000)}
            style={{
              fontFamily: theme.fonts.title,
              fontSize: 14,
              color: theme.colors.gray_400,
              paddingHorizontal: 32,
              marginBottom: 24,
            }}
          >
            {title}
          </Animated.Text>
        )}
        renderItem={({ item }) => {
          const CoffeeImg = item.svg

          return (
            <Animated.View
              entering={SlideInDown.delay(1000).duration(1000)}
              style={{
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
              }}
            >
              <CoffeeImg style={{ marginTop: -32, marginLeft: -8 }} />
              <View style={{ flex: 1, width: '100%' }}>
                <Text
                  style={{
                    fontFamily: theme.fonts.title,
                    fontSize: 16,
                    color: theme.colors.gray_200,
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontFamily: theme.fonts.regular,
                    fontSize: 12,
                    color: theme.colors.gray_400,
                    marginTop: 4,
                  }}
                >
                  {item.description}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 8,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: theme.fonts.regular,
                      fontSize: 14,
                      color: theme.colors.dark_yellow,
                    }}
                  >
                    R${' '}
                  </Text>
                  <Text
                    style={{
                      fontFamily: theme.fonts.title,
                      fontSize: 20,
                      color: theme.colors.dark_yellow,
                    }}
                  >
                    {item.price}
                  </Text>
                </View>
              </View>
            </Animated.View>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray_900,
  },
})
