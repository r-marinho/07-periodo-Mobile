import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import api from '../services/api'

export default function PessoaFormScreen({ navigation, route }) {
  const pessoaId = route.params?.id ?? null
  const editando = pessoaId !== null

  const [nome, setNome] = useState('')
  const [idade, setIdade] = useState('')
  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    const carregarPessoa = async () => {
      if (!editando) {
        return
      }

      try {
        const resposta = await api.get(`/api/pessoas/${pessoaId}`)
        setNome(resposta.data.nome)
        setIdade(String(resposta.data.idade))
      } catch (erro) {
        Alert.alert('Erro', 'Não foi possível carregar os dados da pessoa.')
      }
    }

    carregarPessoa()
  }, [editando, pessoaId])

  const salvarPessoa = async () => {
    if (!nome.trim() || !idade.trim()) {
      Alert.alert('Atenção', 'Preencha nome e idade.')
      return
    }

    const payload = {
      nome: nome.trim(),
      idade: Number(idade)
    }

    try {
      setSalvando(true)

      if (editando) {
        await api.put(`/api/pessoas/${pessoaId}`, payload)
        Alert.alert('Sucesso', 'Pessoa atualizada com sucesso.')
      } else {
        await api.post('/api/pessoas', payload)
        Alert.alert('Sucesso', 'Pessoa cadastrada com sucesso.')
      }

      navigation.goBack()
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível salvar a pessoa.')
    } finally {
      setSalvando(false)
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.conteudo}>
        <Text style={styles.titulo}>
          {editando ? 'Editar pessoa' : 'Nova pessoa'}
        </Text>

        <View style={styles.campo}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o nome"
            value={nome}
            onChangeText={setNome}
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Idade</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite a idade"
            value={idade}
            onChangeText={setIdade}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity
          style={[styles.botaoSalvar, salvando && styles.botaoDesabilitado]}
          onPress={salvarPessoa}
          disabled={salvando}
        >
          <Text style={styles.textoBotao}>
            {salvando ? 'Salvando...' : 'Salvar'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc'
  },
  conteudo: {
    padding: 16,
    gap: 16
  },
  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 8
  },
  campo: {
    gap: 8
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155'
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#0f172a'
  },
  botaoSalvar: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8
  },
  botaoDesabilitado: {
    opacity: 0.7
  },
  textoBotao: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700'
  }
})