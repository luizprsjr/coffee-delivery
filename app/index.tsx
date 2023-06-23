import { MapPin, ShoppingCart } from 'phosphor-react-native'
import { useRef } from 'react'
import {
  Platform,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Animated, {
  interpolateColor,
  SlideInDown,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { FeaturedCoffeeCard } from '../src/components/featuredCoffeeCard'
import { Intro } from '../src/components/intro'
import { Coffee, coffeeList, CoffeeTypes } from '../src/data/coffee-list'
import { FeaturedCoffee } from '../src/data/featured-coffee'
import { theme } from '../src/styles/theme'

export default function Index() {
  // const [currentSection, setcurrentSection] = useState('')

  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const { top } = useSafeAreaInsets()
  const SectionListAnimated = Animated.createAnimatedComponent(
    SectionList<Coffee, CoffeeTypes>,
  )

  const sectionListRef = useRef<SectionList<Coffee, CoffeeTypes>>()

  const scrollXHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateX.value = event.contentOffset.x
    },
  })
  const scrollYHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateY.value = event.contentOffset.y
    },
  })

  const fixedHeaderStyles = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      paddingHorizontal: 32,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: interpolateColor(
        translateY.value,
        [12.33, 484.33],
        ['transparent', theme.colors.gray_800],
      ),
      backgroundColor: interpolateColor(
        translateY.value,
        [12.33, 484.33],
        [theme.colors.gray_100, theme.colors.gray_900],
      ),
      width: '100%',
      opacity: translateY.value >= 12.33 ? 1 : 0,
      zIndex: translateY.value >= 12.33 ? 1 : -1,
    }
  })

  const fixedHeaderButtonsStyles = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      paddingHorizontal: 32,
      paddingVertical: 16,
      backgroundColor: theme.colors.gray_900,

      borderBottomWidth: 1,
      borderBottomColor: interpolateColor(
        translateY.value,
        [12.33, 484.33],
        ['transparent', theme.colors.gray_800],
      ),
      width: '100%',
      opacity: translateY.value >= 496 ? 1 : 0,
      zIndex: translateY.value >= 496 ? 1 : -1,
      top: Platform.OS === 'android' ? 90 : 112,
    }
  })

  const fixedHeaderTextStyles = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        translateY.value,
        [12.33, 484.33],
        [theme.colors.gray_900, theme.colors.gray_200],
      ),
    }
  })

  return (
    <View style={styles.container}>
      <Animated.View style={fixedHeaderStyles}>
        <View style={[styles.headerContainer, { marginTop: top }]}>
          <View style={styles.locationContainer}>
            <MapPin size={20} weight="fill" color={theme.colors.purple} />
            <Animated.Text style={[styles.locationText, fixedHeaderTextStyles]}>
              Barra do Piraí, RJ
            </Animated.Text>
          </View>
          <ShoppingCart
            size={20}
            weight="fill"
            color={theme.colors.dark_yellow}
          />
        </View>
      </Animated.View>

      <Animated.View style={[fixedHeaderButtonsStyles, styles.shadow]}>
        <Text
          style={{
            fontFamily: theme.fonts.title,
            fontSize: 16,
            color: theme.colors.gray_300,
          }}
        >
          Nossos cafés
        </Text>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 18,
            gap: 8,
          }}
        >
          {coffeeList.map((item, index) => (
            <TouchableOpacity
              key={item.title}
              style={{
                paddingVertical: 6,
                paddingHorizontal: 12,
                borderWidth: 1,
                borderColor: theme.colors.purple,
                borderRadius: 100,
              }}
              onPress={() => {
                sectionListRef.current.scrollToLocation({
                  animated: true,
                  itemIndex: Platform.OS === 'ios' ? 1 : 0,
                  sectionIndex: index,
                  viewOffset: top + 170,
                })
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

      <SectionListAnimated
        ref={sectionListRef}
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
              onScroll={scrollXHandler}
              scrollEventThrottle={16}
              bounces={false}
            />

            <Animated.View
              entering={SlideInDown.delay(1000).duration(1000)}
              style={{
                paddingHorizontal: 32,
              }}
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
                {coffeeList.map((item, index) => (
                  <TouchableOpacity
                    key={item.title}
                    style={{
                      paddingVertical: 6,
                      paddingHorizontal: 12,
                      borderWidth: 1,
                      borderColor: theme.colors.purple,
                      borderRadius: 100,
                    }}
                    onPress={() => {
                      sectionListRef.current.scrollToLocation({
                        animated: true,
                        itemIndex: Platform.OS === 'ios' ? 1 : 0,
                        sectionIndex: index,
                        viewOffset: top + 80,
                      })
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
        onScroll={scrollYHandler}
        scrollEventThrottle={16}
        bounces={false}
        renderSectionHeader={({ section: { title } }) => {
          // setcurrentSection(title)
          return (
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
          )
        }}
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

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontFamily: theme.fonts.regular,
    fontSize: 14,
  },
  fixedLocationText: {
    color: theme.colors.gray_200,
    fontFamily: theme.fonts.regular,
    fontSize: 14,
  },
  shadow: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
})
