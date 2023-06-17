import { useRouter } from 'expo-router'
import { Button, StyleSheet, Text, View } from 'react-native'

export default function Index() {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Hello World!!!</Text>
        <Text style={styles.subtitle}>This is the first page of your app.</Text>

        <Button title="splash" onPress={() => router.push('splash')} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#8047F8',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: 960,
    marginHorizontal: 'auto',
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 36,
    color: '#fff',
  },
})
