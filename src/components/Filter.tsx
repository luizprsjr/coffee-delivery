import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { coffeeList } from '../data/coffee-list'
import { theme } from '../styles/theme'
import { FilterButton } from './FilterButton'

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
          <FilterButton
            key={item.title}
            item={item}
            index={index}
            goToSectionHeader={goToSectionHeader}
            isChecked={item.title === currentSection}
          />
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
})
