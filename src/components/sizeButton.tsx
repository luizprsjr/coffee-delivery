import { useEffect } from 'react'
import { Pressable, PressableProps, StyleSheet } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { theme } from '../styles/theme'

const PressableAnimated = Animated.createAnimatedComponent(Pressable)

type Props = PressableProps & {
  size: 114 | 140 | 227
  changeSize: (size: number) => void
  isChecked: boolean
}

export function SizeButton({
  size,
  isChecked = false,
  changeSize,
  ...rest
}: Props) {
  const checked = useSharedValue(0)

  const animatedButtonContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        checked.value,
        [0, 1],
        [theme.colors.gray_700, 'transparent'],
      ),
      borderWidth: 1,
      borderColor: interpolateColor(
        checked.value,
        [0, 1],
        ['transparent', theme.colors.purple],
      ),
    }
  })

  useEffect(() => {
    checked.value = withTiming(isChecked ? 1 : 0, { duration: 1000 })
  }, [isChecked, checked])

  return (
    <PressableAnimated
      onPress={() => changeSize(size)}
      style={[styles.container, animatedButtonContainerStyle]}
      {...rest}
    >
      <Animated.Text
        style={[
          {
            fontFamily: isChecked ? theme.fonts.bold : theme.fonts.regular,
            color: isChecked ? theme.colors.purple : theme.colors.gray_300,
          },
        ]}
      >
        {size}ml
      </Animated.Text>
    </PressableAnimated>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 6,
  },
  buttonText: {
    fontFamily: theme.fonts.regular,
    fontSize: 14,
  },
})
