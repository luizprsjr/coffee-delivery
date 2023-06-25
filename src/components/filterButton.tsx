import { useEffect } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { theme } from '../styles/theme'

const PressableAnimated = Animated.createAnimatedComponent(Pressable)

interface FilterButtonProps {
  item: any
  index: number
  goToSectionHeader: (title: string, index: number) => void
  isChecked: boolean
}

export function FilterButton({
  item,
  index,
  goToSectionHeader,
  isChecked = false,
}: FilterButtonProps) {
  const scale = useSharedValue(1)
  const checked = useSharedValue(0)

  const animatedButtonContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      backgroundColor: interpolateColor(
        checked.value,
        [0, 1],
        ['transparent', theme.colors.purple],
      ),
    }
  })

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        checked.value,
        [0, 1],
        [theme.colors.purple, theme.colors.white],
      ),
    }
  })

  function onPressIn() {
    scale.value = withTiming(1.1)
  }

  function onPressOut() {
    scale.value = withTiming(1)
  }

  useEffect(() => {
    checked.value = withTiming(isChecked ? 1 : 0)
  }, [isChecked, checked])

  return (
    <PressableAnimated
      key={item.title}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[styles.filterButton, animatedButtonContainerStyle]}
      onPress={() => {
        goToSectionHeader(item.title, index)
      }}
    >
      <Animated.Text style={[styles.buttonTitle, animatedTextStyle]}>
        {item.title}
      </Animated.Text>
    </PressableAnimated>
  )
}

const styles = StyleSheet.create({
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
    textTransform: 'uppercase',
  },
})
