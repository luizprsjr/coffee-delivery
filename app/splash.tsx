import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { Button, Text, View } from 'react-native'

export default function Splash() {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 3000)
  }, [router])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Splash</Text>
      <Button title="home" onPress={() => router.push('/')} />
    </View>
  )
}
