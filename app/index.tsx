import { MapPin, ShoppingCart } from 'phosphor-react-native'
import { useRef, useState } from 'react'
import { Platform, SectionList, StyleSheet, View } from 'react-native'
import Animated, {
  interpolateColor,
  SlideInDown,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { CoffeeCard } from '../src/components/coffeeCard'
import { FeaturedCoffeeList } from '../src/components/featuredCoffeeList'
import { Filter } from '../src/components/filter'
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

  function goToSectionHeader(title: string, index: number) {
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
        <Filter
          currentSection={currentSection}
          goToSectionHeader={goToSectionHeader}
        />
      </Animated.View>

      <SectionListAnimated
        ref={sectionListRef}
        ListHeaderComponent={
          <>
            <Intro />

            <FeaturedCoffeeList />

            <Animated.View
              entering={SlideInDown.delay(1000).duration(1000)}
              style={styles.filterHeaderButtonsContainer}
            >
              <Filter
                currentSection={currentSection}
                goToSectionHeader={goToSectionHeader}
              />
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
        renderItem={({ item }) => <CoffeeCard item={item} />}
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

  filterHeaderButtonsContainer: {
    paddingHorizontal: 32,
    paddingTop: 30,
    marginBottom: 32,
  },

  filterButtonsTitle: {
    fontFamily: theme.fonts.title,
    fontSize: 16,
    color: theme.colors.gray_300,
  },
  filterButtonsContainer: {
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

  sectionHeader: {
    fontFamily: theme.fonts.title,
    fontSize: 14,
    color: theme.colors.gray_400,
    paddingHorizontal: 32,
    marginBottom: 24,
  },
})
