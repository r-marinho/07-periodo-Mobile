import React, { useCallback, useState } from 'react'
import { View, Text, FlatList, StyleSheet, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import api from '../services/api'
import PessoaCard from '../components/PessoaCard'

export default function PessoaListScreen({ navigation }) {
  const [pessoas, setPessoas] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const carregarPessoas = async () => {
    try {
      setLoading(true)
      const resposta = await api.get('/api/pessoas')
      setPessoas(resposta.data)
    } catch (erro) {
      console.log('Erro ao carregar pessoas', erro)
    } finally {
      setLoading(false)
    }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await carregarPessoas()
    setRefreshing(false)
  }

  useFocusEffect(
    useCallback(() => {
      carregarPessoas()
    }, [])
  )

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.titulo}>Pessoas</Text>
          <Text style={styles.subtitulo}>Cadastro, edição e exclusão</Text>
        </View>

        <TouchableOpacity
          style={styles.botaoNovo}
          onPress={() => navigation.navigate('PessoaForm')}
        >
          <Ionicons name="add" size={22} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={pessoas}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <PessoaCard
            pessoa={item}
            onPressDetalhes={() => navigation.navigate('PessoaDetail', { id: item.id })}
          />
        )}
        contentContainerStyle={pessoas.length === 0 ? styles.listaVazia : styles.lista}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <Text style={styles.textoVazio}>Nenhuma pessoa cadastrada.</Text>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 16
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a'
  },
  subtitulo: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4
  },
  botaoNovo: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center'
  },
  lista: {
    paddingBottom: 20
  },
  listaVazia: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  textoVazio: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: 16
  }
})