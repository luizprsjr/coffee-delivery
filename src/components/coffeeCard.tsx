import { Text, View } from 'react-native'
import Animated, { SlideInDown } from 'react-native-reanimated'

import { Coffee } from '../data/coffee-list'
import { theme } from '../styles/theme'

type CardProps = {
  item: Coffee
}

export function CoffeeCard({ item }: CardProps) {
  const CoffeeImg = item.svg

  return (
    <Animated.View
      entering={SlideInDown.delay(1000).duration(1000)}
      style={{
        flexDirection: 'row',
        marginHorizontal: 32,
        marginBottom: 32,
        padding: 16,
        gap: 12,

        backgroundColor: theme.colors.gray_800,
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
      <CoffeeImg style={{ marginTop: -32, marginLeft: -8 }} />
      <View style={{ flex: 1, width: '100%' }}>
        <Text
          style={{
            fontFamily: theme.fonts.title,
            fontSize: 16,
            color: theme.colors.gray_200,
          }}
        >
          {item.name}
        </Text>
        <Text
          style={{
            fontFamily: theme.fonts.regular,
            fontSize: 12,
            color: theme.colors.gray_400,
            marginTop: 4,
          }}
        >
          {item.description}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 8,
          }}
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
              fontSize: 20,
              color: theme.colors.dark_yellow,
            }}
          >
            {item.price}
          </Text>
        </View>
      </View>
    </Animated.View>
  )
}
