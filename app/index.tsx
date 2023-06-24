import { MapPin, ShoppingCart } from 'phosphor-react-native'
import { useRef, useState } from 'react'
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

import { FeaturedCoffeeList } from '../src/components/featuredCoffeeList'
import { Intro } from '../src/components/intro'
import { Coffee, coffeeList, CoffeeTypes } from '../src/data/coffee-list'
import { theme } from '../src/styles/theme'

const SectionListAnimated = Animated.createAnimatedComponent(
  SectionList<Coffee, CoffeeTypes>,
)

export default function Index() {
  const [currentSection, setCurrentSection] = useState('')
  const [isButtonChangeBlocked, setIsButtonChangeBlocked] = useState(false)

  const translateY = useSharedValue(0)
  const { top } = useSafeAreaInsets()

  const sectionListRef = useRef<SectionList<Coffee, CoffeeTypes>>()

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

  function handleSectionListScroll({ viewableItems }) {
    if (!isButtonChangeBlocked) {
      setCurrentSection(viewableItems[3]?.section.title)
    }
  }

  function goToSectionHeader(title, index) {
    sectionListRef.current.scrollToLocation({
      animated: true,
      itemIndex: Platform.OS === 'ios' ? 1 : 0,
      sectionIndex: index,
      viewOffset: Platform.OS === 'android' ? top + 170 : top + 220,
    })
    setIsButtonChangeBlocked(true)
    setCurrentSection(title)
    setTimeout(() => {
      setIsButtonChangeBlocked(false)
    }, 500)
  }

  return (
    <View style={styles.container}>
      <Animated.View style={fixedHeaderStyles}>
        <View style={[styles.fixedHeaderContainer, { marginTop: top }]}>
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
        <Text style={styles.fixedFilterButtonsTitle}>Nossos cafés</Text>

        <View style={styles.fixedFilterButtonsContainer}>
          {coffeeList.map((item, index) => (
            <TouchableOpacity
              key={item.title}
              style={[
                styles.filterButton,
                {
                  backgroundColor:
                    item.title === currentSection
                      ? theme.colors.purple
                      : 'transparent',
                },
              ]}
              onPress={() => {
                goToSectionHeader(item.title, index)
              }}
            >
              <Text
                style={[
                  styles.buttonTitle,
                  {
                    color:
                      item.title === currentSection
                        ? theme.colors.white
                        : theme.colors.purple,
                    textTransform: 'uppercase',
                  },
                ]}
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

            <FeaturedCoffeeList />

            <Animated.View
              entering={SlideInDown.delay(1000).duration(1000)}
              style={{ paddingHorizontal: 32 }}
            >
              <Text style={styles.filterButtonsTitle}>Nossos cafés</Text>

              <View style={styles.filterButtonsContainer}>
                {coffeeList.map((item, index) => (
                  <TouchableOpacity
                    key={item.title}
                    style={[
                      styles.filterButton,
                      {
                        backgroundColor:
                          item.title === currentSection
                            ? theme.colors.purple
                            : 'transparent',
                      },
                    ]}
                    onPress={() => {
                      goToSectionHeader(item.title, index)
                    }}
                  >
                    <Text
                      style={[
                        styles.buttonTitle,
                        {
                          color:
                            item.title === currentSection
                              ? theme.colors.white
                              : theme.colors.purple,
                          textTransform: 'uppercase',
                        },
                      ]}
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
        onViewableItemsChanged={handleSectionListScroll}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        removeClippedSubviews={Platform.OS === 'ios'}
        stickySectionHeadersEnabled={false}
        bounces={false}
        renderSectionHeader={({ section: { title } }) => {
          return (
            <Animated.Text
              entering={SlideInDown.delay(1000).duration(1000)}
              style={styles.sectionHeader}
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

  fixedHeaderContainer: {
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

  shadow: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  fixedFilterButtonsTitle: {
    fontFamily: theme.fonts.title,
    fontSize: 16,
    color: theme.colors.gray_300,
  },
  fixedFilterButtonsContainer: {
    flexDirection: 'row',
    marginTop: 18,
    gap: 8,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: theme.colors.purple,
    borderRadius: 100,
  },
  buttonTitle: {
    fontFamily: theme.fonts.bold,
    fontSize: 10,
  },

  filterButtonsTitle: {
    fontFamily: theme.fonts.title,
    fontSize: 16,
    color: theme.colors.gray_300,
    marginTop: 30,
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    marginTop: 18,
    gap: 8,
    marginBottom: 32,
  },

  sectionHeader: {
    fontFamily: theme.fonts.title,
    fontSize: 14,
    color: theme.colors.gray_400,
    paddingHorizontal: 32,
    marginBottom: 24,
  },
})
