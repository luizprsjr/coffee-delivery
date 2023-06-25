import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { coffeeList } from '../data/coffee-list'
import { theme } from '../styles/theme'

interface FilterProps {
  currentSection: string
  goToSectionHeader: (title: string, index: number) => void
}

export function Filter({ currentSection, goToSectionHeader }: FilterProps) {
  return (
    <>
      <Text style={styles.filterButtonsTitle}>Nossos cafés</Text>

      <View style={styles.filterButtonsContainer}>
        {coffeeList.map((item, index) => (
          <TouchableOpacity
            key={item.title}
            style={[
              styles.filterButton,
              {
                backgroundColor:
                  item.title === currentSection
                    ? theme.colors.purple
                    : 'transparent',
              },
            ]}
            onPress={() => {
              goToSectionHeader(item.title, index)
            }}
          >
            <Text
              style={[
                styles.buttonTitle,
                {
                  color:
                    item.title === currentSection
                      ? theme.colors.white
                      : theme.colors.purple,
                  textTransform: 'uppercase',
                },
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  filterButtonsTitle: {
    fontFamily: theme.fonts.title,
    fontSize: 16,
    color: theme.colors.gray_300,
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    marginTop: 18,
    gap: 8,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: theme.colors.purple,
    borderRadius: 100,
  },
  buttonTitle: {
    fontFamily: theme.fonts.bold,
    fontSize: 10,
  },
})
