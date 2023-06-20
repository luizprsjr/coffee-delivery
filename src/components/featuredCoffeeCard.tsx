import { Text, View } from 'react-native'

import { FeaturedCoffee } from '../data/featured-coffee'
import { theme } from '../styles/theme'

type ListProps = {
  index: number
  data: (typeof FeaturedCoffee)[0]
}

export function FeaturedCoffeeCard({ index, data }: ListProps) {
  const CoffeeImg = data.svg

  return (
    <View
      style={{
        width: 208,
        height: 262,
        backgroundColor: theme.colors.gray_800,
        alignItems: 'center',
        marginTop: 30,
        paddingHorizontal: 16,
        paddingBottom: 20,
        borderRadius: 6,
        borderTopRightRadius: 36,
        borderBottomLeftRadius: 36,
        borderWidth: 1,
        borderColor: theme.colors.gray_700,
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      }}
    >
      <CoffeeImg style={{ marginTop: -30 }} />

      <View
        style={{
          paddingVertical: 4,
          paddingHorizontal: 8,
          backgroundColor: theme.colors.light_purple,
          borderRadius: 100,
          marginTop: 8,
        }}
      >
        <Text
          style={{
            fontFamily: theme.fonts.bold,
            fontSize: 10,
            color: theme.colors.dark_purple,
            textTransform: 'uppercase',
          }}
        >
          {data.type}
        </Text>
      </View>

      <Text
        style={{
          fontFamily: theme.fonts.title,
          fontSize: 20,
          color: theme.colors.gray_200,
          marginTop: 14,
        }}
      >
        {data.name}
      </Text>

      <Text
        style={{
          fontFamily: theme.fonts.regular,
          fontSize: 12,
          color: theme.colors.gray_400,
          textAlign: 'center',
          marginTop: 4,
        }}
      >
        {data.description}
      </Text>

      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 14 }}
      >
        <Text
          style={{
            fontFamily: theme.fonts.regular,
            fontSize: 14,
            color: theme.colors.dark_yellow,
          }}
        >
          R${' '}
        </Text>
        <Text
          style={{
            fontFamily: theme.fonts.title,
            fontSize: 24,
            color: theme.colors.dark_yellow,
          }}
        >
          {data.price}
        </Text>
      </View>
    </View>
  )
}
