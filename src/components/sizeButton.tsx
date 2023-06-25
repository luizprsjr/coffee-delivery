import { Pressable, PressableProps, StyleSheet, Text } from 'react-native'
import Animated from 'react-native-reanimated'

import { theme } from '../styles/theme'

const PressableAnimated = Animated.createAnimatedComponent(Pressable)

type Props = PressableProps & {
  size: 114 | 140 | 227
}

export function SizeButton({ size, ...rest }: Props) {
  return (
    <PressableAnimated
      onPress={() => console.log(size)}
      style={styles.container}
      {...rest}
    >
      <Text style={styles.buttonText}>{size}ml</Text>
    </PressableAnimated>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: theme.colors.gray_700,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    flex: 1,
  },
  buttonText: {
    fontFamily: theme.fonts.regular,
    fontSize: 14,
    color: theme.colors.gray_300,
  },
})
