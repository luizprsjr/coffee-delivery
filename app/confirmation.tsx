import { useRouter } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import Illustration from '../src/assets/Illustration.svg'
import { theme } from '../src/styles/theme'

export default function Confirmation() {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <Illustration />
      <Text style={styles.title}>Uhu! Pedido confirmado</Text>
      <Text style={styles.subTitle}>
        Agora é só aguardar que logo o café{'\n'}chegará até você!
      </Text>

      <TouchableOpacity
        onPress={() => router.push('/')}
        style={styles.buttonContainer}
      >
        <Text style={styles.buttonText}>IR PARA HOME</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.gray_900,
  },
  title: {
    fontFamily: theme.fonts.title,
    fontSize: 24,
    color: theme.colors.dark_yellow,
    marginTop: 48,
  },
  subTitle: {
    fontFamily: theme.fonts.regular,
    fontSize: 14,
    color: theme.colors.gray_200,
    marginTop: 8,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 64,
    paddingVertical: 12,
    paddingHorizontal: 69,
    borderRadius: 6,
    backgroundColor: theme.colors.purple,
  },
  buttonText: {
    fontFamily: theme.fonts.bold,
    fontSize: 14,
    color: 'white',
    textTransform: 'uppercase',
  },
})
