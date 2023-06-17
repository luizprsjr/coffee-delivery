import { StyleSheet } from 'react-native'
import Animated, { SlideInUp } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Index() {
  const { top } = useSafeAreaInsets()

  return (
    <Animated.ScrollView style={styles.container}>
      <Animated.View
        entering={SlideInUp.duration(1000)}
        style={[styles.introContainer, { height: 342 + top }]}
      ></Animated.View>
    </Animated.ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  introContainer: {
    backgroundColor: '#272221',
  },
})
