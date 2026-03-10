import React from "react";
import { SectionList, Text, StyleSheet, View } from 'react-native';

const sections = [
  {title: 'Seção 1', data: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']},
  {title: 'Seção 2', data: ['Item 6', 'Item 7', 'Item 8']},
  {title: 'Seção 3', data: ['Item 9', 'Item 10', 'Item 11']},
];

export default function App(){
  return(
    <SectionList
      sections={sections}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.text}>{item}</Text>
        </View>
      )}
      renderSectionHeader={({ section }) => (
        <Text style={styles.header}>{section.title}</Text>
      )}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#d0d0d0',
    padding: 10,
    borderRadius: 8,
  },
  item: {
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#f9fbe7',
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
  },
});