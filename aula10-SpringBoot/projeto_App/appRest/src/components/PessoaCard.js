import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function PessoaCard({ pessoa, onPressDetalhes }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPressDetalhes}>
      <View style={styles.linhaSuperior}>
        <Text style={styles.nome}>{pessoa.nome}</Text>
        <Ionicons name="chevron-forward" size={20} color="#64748b" />
      </View>

      <Text style={styles.info}>Idade: {pessoa.idade}</Text>
      <Text style={styles.id}>Código: {pessoa.id}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2
  },
  linhaSuperior: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  nome: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a'
  },
  info: {
    fontSize: 15,
    color: '#475569',
    marginBottom: 4
  },
  id: {
    fontSize: 12,
    color: '#94a3b8'
  }
})