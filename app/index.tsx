import { useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar, StatusBarStyle } from 'expo-status-bar'
import { ArrowRight, MapPin, ShoppingCart } from 'phosphor-react-native'
import { useEffect, useRef, useState } from 'react'
import {
  Platform,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Animated, {
  FadeInUp,
  interpolateColor,
  runOnJS,
  SlideInDown,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'

import { CoffeeCard } from '../src/components/coffeeCard'
import { FeaturedCoffeeList } from '../src/components/featuredCoffeeList'
import { Filter } from '../src/components/filter'
import { Intro } from '../src/components/intro'
import { Coffee, coffeeList, CoffeeTypes } from '../src/data/coffee-list'
import { RootState } from '../src/store'
import { theme } from '../src/styles/theme'

const SectionListAnimated = Animated.createAnimatedComponent(
  SectionList<Coffee, CoffeeTypes>,
)

export default function Index() {
  const [currentSection, setCurrentSection] = useState('')
  const [isButtonChangeBlocked, setIsButtonChangeBlocked] = useState(false)
  const [statusBarColor, setStatusBarColor] = useState<StatusBarStyle>('light')
  const [isToggleVisible, setIsToggleVisible] = useState(false)

  const router = useRouter()
  const { id, name, quantity, size } = useLocalSearchParams()
  const translateY = useSharedValue(0)
  const { top } = useSafeAreaInsets()

  const sectionListRef = useRef<SectionList<Coffee, CoffeeTypes>>()

  const shoppingCart = useSelector(
    (state: RootState) => state.shoppingCart.items,
  )

  const scrollYHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateY.value = event.contentOffset.y
      if (event.contentOffset.y > 275) {
        runOnJS(setStatusBarColor)('dark')
      } else {
        runOnJS(setStatusBarColor)('light')
      }
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

  useEffect(() => {
    if (id) {
      setIsToggleVisible(true)
    }
    setTimeout(() => {
      setIsToggleVisible(false)
    }, 5000)
  }, [id])

  return (
    <View style={styles.container}>
      <StatusBar style={statusBarColor} translucent />
      <Animated.View style={fixedHeaderStyles}>
        <View style={[styles.fixedHeaderContainer, { marginTop: top }]}>
          <View style={styles.locationContainer}>
            <MapPin size={20} weight="fill" color={theme.colors.purple} />
            <Animated.Text style={[styles.locationText, fixedHeaderTextStyles]}>
              Barra do Piraí, RJ
            </Animated.Text>
          </View>
          <TouchableOpacity
            hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}
            onPress={() => router.push('cart')}
          >
            {shoppingCart.length > 0 && (
              <View style={styles.cartCountContainer}>
                <Text style={styles.cartCountText}>{shoppingCart.length}</Text>
              </View>
            )}
            <ShoppingCart
              size={20}
              weight="fill"
              color={theme.colors.dark_yellow}
            />
          </TouchableOpacity>
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

      {isToggleVisible && (
        <Animated.View
          entering={FadeInUp.duration(400)}
          style={styles.toggleContainer}
        >
          <View>
            {shoppingCart.length > 0 && (
              <View style={styles.toggleCartCountContainer}>
                <Text style={styles.cartCountText}>{shoppingCart.length}</Text>
              </View>
            )}
            <View style={styles.toggleIconContainer}>
              <ShoppingCart
                size={20}
                weight="fill"
                color={theme.colors.white}
              />
            </View>
          </View>

          <Text style={styles.toggleRegularText}>
            {quantity} {+quantity > 1 ? 'cafés' : 'café'}{' '}
            <Text style={styles.toggleBoldText}>{name}</Text> de{' '}
            <Text style={styles.toggleBoldText}>{size}ml</Text> adicionado ao
            carrinho
          </Text>

          <TouchableOpacity
            style={styles.toggleButtonContainer}
            onPress={() => router.push('cart')}
          >
            <Text style={styles.toggleButtonText}>VER</Text>
            <ArrowRight size={20} color={theme.colors.purple} />
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray_900,
  },

  cartCountContainer: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.purple,
    top: -16,
    right: -16,
  },
  cartCountText: {
    fontFamily: theme.fonts.regular,
    fontSize: 12,
    color: theme.colors.white,
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

  toggleContainer: {
    position: 'absolute',
    flexDirection: 'row',
    gap: 20,
    paddingHorizontal: 32,
    paddingVertical: 28,
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
  },
  toggleCartCountContainer: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.purple,
    top: -8,
    right: -8,
    zIndex: 1,
  },
  toggleIconContainer: {
    padding: 8,
    backgroundColor: theme.colors.gray_500,
    borderRadius: 6,
  },
  toggleRegularText: {
    flex: 1,
    fontFamily: theme.fonts.regular,
    fontSize: 14,
    color: theme.colors.gray_400,
  },
  toggleBoldText: {
    fontFamily: theme.fonts.bold,
    fontSize: 14,
    color: theme.colors.gray_400,
  },
  toggleButtonContainer: {
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleButtonText: {
    fontFamily: theme.fonts.bold,
    fontSize: 12,
    color: theme.colors.purple,
    textTransform: 'uppercase',
  },
})
