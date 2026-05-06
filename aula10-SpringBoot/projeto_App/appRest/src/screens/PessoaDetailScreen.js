import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import api from '../services/api'

export default function PessoaDetailScreen({ navigation, route }) {
  const { id } = route.params
  const [pessoa, setPessoa] = useState(null)
  const [loading, setLoading] = useState(true)

  const carregarPessoa = async () => {
    try {
      const resposta = await api.get(`/api/pessoas/${id}`)
      setPessoa(resposta.data)
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível carregar os detalhes.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarPessoa()
  }, [id])

  const excluirPessoa = () => {
    Alert.alert(
      'Confirmar exclusão',
      'Deseja realmente excluir esta pessoa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.delete(`/api/pessoas/${id}`)
              Alert.alert('Sucesso', 'Pessoa excluída com sucesso.')
              navigation.goBack()
            } catch (erro) {
              Alert.alert('Erro', 'Não foi possível excluir a pessoa.')
            }
          }
        }
      ]
    )
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    )
  }

  if (!pessoa) {
    return (
      <View style={styles.center}>
        <Text style={styles.textoErro}>Pessoa não encontrada.</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>{pessoa.nome}</Text>

        <View style={styles.linha}>
          <Text style={styles.rotulo}>ID</Text>
          <Text style={styles.valor}>{pessoa.id}</Text>
        </View>

        <View style={styles.linha}>
          <Text style={styles.rotulo}>Idade</Text>
          <Text style={styles.valor}>{pessoa.idade}</Text>
        </View>
      </View>

      <View style={styles.acoes}>
        <TouchableOpacity
          style={[styles.botaoAcao, styles.botaoEditar]}
          onPress={() => navigation.navigate('PessoaForm', { id: pessoa.id })}
        >
          <Ionicons name="create-outline" size={20} color="#ffffff" />
          <Text style={styles.textoAcao}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botaoAcao, styles.botaoExcluir]}
          onPress={excluirPessoa}
        >
          <Ionicons name="trash-outline" size={20} color="#ffffff" />
          <Text style={styles.textoAcao}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 16,
    justifyContent: 'center'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc'
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 20
  },
  titulo: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 18
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0'
  },
  rotulo: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '600'
  },
  valor: {
    fontSize: 16,
    color: '#0f172a',
    fontWeight: '700'
  },
  acoes: {
    flexDirection: 'row',
    gap: 12
  },
  botaoAcao: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8
  },
  botaoEditar: {
    backgroundColor: '#16a34a'
  },
  botaoExcluir: {
    backgroundColor: '#dc2626'
  },
  textoAcao: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15
  },
  textoErro: {
    fontSize: 16,
    color: '#64748b'
  }
})