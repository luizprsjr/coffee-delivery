import { useRouter } from 'expo-router'
import { ArrowLeft } from 'phosphor-react-native'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { theme } from '../styles/theme'

interface Props {
  title: string
}

export function NavHeader({ title }: Props) {
  const { top } = useSafeAreaInsets()
  const router = useRouter()

  return (
    <View style={[styles.container, { marginTop: top }]}>
      <TouchableOpacity onPress={() => router.back()}>
        <ArrowLeft size={24} color={theme.colors.gray_100} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 28,
    paddingHorizontal: 32,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray_700,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontFamily: theme.fonts.title,
    fontSize: 16,
    color: theme.colors.gray_200,
    marginRight: 24,
  },
})
