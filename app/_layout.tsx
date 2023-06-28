import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Provider } from 'react-redux'

import { Baloo2_700Bold } from '@expo-google-fonts/baloo-2'
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'

import { store } from '../src/store'

export default function Layout() {
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Baloo2_700Bold,
  })

  return (
    <>
      <StatusBar style="light" translucent />

      <Provider store={store}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: 'transparent' },
            animation: 'none',
          }}
        >
          <Stack.Screen name="index" redirect={!hasLoadedFonts} />
          <Stack.Screen name="splash" />
          <Stack.Screen name="product" />
          <Stack.Screen name="cart" />
          <Stack.Screen name="confirmation" />
        </Stack>
      </Provider>
    </>
  )
}
