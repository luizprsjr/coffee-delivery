import { MagnifyingGlass, MapPin, ShoppingCart } from 'phosphor-react-native'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import Animated, { SlideInUp } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import CoffeeBeans from '../assets/coffee-beans.svg'
import { theme } from '../styles/theme'

export function Intro() {
  const { top } = useSafeAreaInsets()

  return (
    <Animated.View
      entering={SlideInUp.duration(1000)}
      style={[styles.introContainer, { height: 342 + top }]}
    >
      <View>
        <View style={[styles.headerContainer, { marginTop: top }]}>
          <View style={styles.locationContainer}>
            <MapPin size={20} weight="fill" color={theme.colors.purple} />
            <Text style={styles.locationText}>Barra do Piraí, RJ</Text>
          </View>
          <ShoppingCart
            size={20}
            weight="fill"
            color={theme.colors.dark_yellow}
          />
        </View>

        <Text style={styles.title}>
          Encontre o café perfeito para {'\n'} qualquer hora do dia
        </Text>

        <View style={styles.inputContainer}>
          <MagnifyingGlass size={16} color={theme.colors.gray_400} />
          <TextInput
            style={styles.input}
            placeholder="Pesquisar"
            placeholderTextColor={theme.colors.gray_400}
          ></TextInput>
        </View>
        <CoffeeBeans style={{ alignSelf: 'flex-end' }} />
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  introContainer: {
    paddingHorizontal: 32,
    paddingVertical: 28,
    backgroundColor: theme.colors.gray_100,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    color: theme.colors.gray_900,
    fontFamily: theme.fonts.regular,
    fontSize: 14,
  },
  title: {
    marginTop: 48,
    fontSize: 20,
    color: 'white',
    fontFamily: theme.fonts.title,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.gray_200,
    padding: 12,
    borderRadius: 4,
    marginTop: 15,
    gap: 8,
  },
  input: {
    color: theme.colors.gray_400,
    fontFamily: theme.fonts.regular,
    fontSize: 14,
  },
})
