import { ScrollView, StyleSheet } from 'react-native'

import { Intro } from '../src/components/intro'

export default function Index() {
  return (
    <ScrollView style={styles.container}>
      <Intro />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
})
