import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import Animated, {
  Keyframe,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import BrandName from '../src/assets/brand-name.svg'
import Logo from '../src/assets/logo.svg'
import { theme } from '../src/styles/theme'

const SIZE = Dimensions.get('screen').height + 200

export default function Splash() {
  const router = useRouter()

  function goBack() {
    setTimeout(() => {
      router.push('/')
    }, 1000)
  }

  const scale = useSharedValue(0)

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    }
  })

  const enteringKeyFrame = new Keyframe({
    from: {
      opacity: 0.9,
      transform: [{ translateX: 0 }],
    },
    to: {
      opacity: 1,
      transform: [{ translateX: -55 }],
    },
  })

  const brandEnteringKeyFrame = new Keyframe({
    from: {
      opacity: 0,
      transform: [{ translateX: 100 }],
    },
    to: {
      opacity: 1,
      transform: [{ translateX: 29 }],
    },
  })

  useEffect(() => {
    scale.value = withTiming(1, { duration: 1000 })
  }, [scale])

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animatedBackground, reanimatedStyle]} />

      <Animated.View
        entering={enteringKeyFrame.delay(1000).duration(500)}
        style={{ position: 'absolute' }}
      >
        <Logo />
      </Animated.View>

      <Animated.View
        entering={brandEnteringKeyFrame
          .delay(1000)
          .duration(500)
          .withCallback((finished) => {
            'worklet'
            if (finished) {
              runOnJS(goBack)()
            }
          })}
        style={{ position: 'absolute' }}
      >
        <BrandName />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.dark_purple,
  },
  animatedBackground: {
    height: SIZE,
    width: SIZE,
    borderRadius: SIZE,
    backgroundColor: theme.colors.purple,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
