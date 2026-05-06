
# Projeto React Native com Expo para CRUD de Pessoas consumindo Spring Boot REST

CENTRO UNIVERSITÁRIO DE PATOS DE MINAS, UNIPAM

BACHARELADO EM SISTEMAS DE INFORMAÇÃO

DISCIPLINA: DESENVOLVIMENTO DE SISTEMAS DE INFORMAÇÃO AVANÇADOS II

PROFESSOR RAFAEL MARINHO E SILVA

## Apresentação do projeto

Este tutorial mostra como construir um aplicativo mobile em React Native com Expo para cadastrar, listar, detalhar, editar e excluir pessoas a partir de uma API REST criada em Spring Boot.

O material segue a mesma lógica didática do arquivo modelo `aulaSpring.md`, que organiza a construção em passos, explica cada camada e mostra o código com comentários pedagógicos fileciteturn1file0turn1file6. Também leva em conta o arquivo `pessoa.http`, que já aponta a base URL pública do Codespace e usa as rotas `POST /api/pessoas`, `GET /api/pessoas`, `GET /api/pessoas/{id}` e `DELETE /api/pessoas/{id}` como referência para os testes da API fileciteturn1file10.

A proposta do aplicativo é ter três telas principais:

1. Tela de listagem de pessoas.
2. Tela de cadastro e edição.
3. Tela de detalhes, com ícones para editar e excluir.

## Passo 1: entendendo a arquitetura da solução

A solução fica organizada em duas partes.

1. Backend Spring Boot, responsável por expor os endpoints REST.
2. Frontend mobile em React Native com Expo, responsável pela interface e pelas chamadas HTTP.

No backend, a API deve devolver e receber objetos `Pessoa` em JSON. No mobile, vamos consumir essa API com `axios`, organizar as rotas com React Navigation e exibir os dados com componentes nativos do React Native.

O arquivo `pessoa.http` mostra exatamente o estilo de comunicação esperado, com requisições `GET`, `POST` e `DELETE` para a mesma coleção de pessoas. Para completar o CRUD no aplicativo, o tutorial também inclui a rota de atualização `PUT /api/pessoas/{id}`. Se o seu backend ainda não possuir esse endpoint, ele precisa ser incluído no Spring Boot antes de testar a edição no app.

## Passo 2: criando o projeto no GitHub Codespaces

No Codespaces, crie o projeto com o comando que você já utiliza:

```bash
npx create-expo-app nomeProjeto --template blank@sdk-54
```

Depois entre na pasta do projeto:

```bash
cd nomeProjeto
```

Para iniciar a aplicação durante o desenvolvimento, use o comando com túnel, que gera uma URL pública para teste em qualquer dispositivo:

```bash
npx expo start --tunnel
```

A documentação oficial do Expo recomenda o comando `npx create-expo-app@latest` para iniciar projetos novos e também explica que `npx expo start --tunnel` cria uma URL pública para o aplicativo em desenvolvimento citeturn653606search8turn105990search9. Como você já trabalha com o template `blank@sdk-54`, o fluxo do tutorial mantém esse padrão.

## Passo 3: instalando as dependências

O projeto precisa de navegação, consumo de API e suporte a telas nativas.

Execute os comandos abaixo:

```bash
npm install axios @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler
```

O React Navigation informa que `react-native-screens` e `react-native-safe-area-context` devem ser instalados com `npx expo install` para manter compatibilidade com a versão do Expo usada no projeto. O stack nativo é a opção ideal para telas como lista, detalhes e formulário, porque cada nova tela fica sobre a anterior na pilha de navegação citeturn653606search0turn653606search1.

Para os ícones de edição e exclusão, vamos usar `@expo/vector-icons`, que já faz parte do ecossistema do Expo e permite usar conjuntos como Ionicons em componentes React citeturn653606search2.

## Passo 4: estrutura de pastas do aplicativo

Organize o projeto desta forma:

```text
nomeProjeto
├─ App.js
├─ src
│  ├─ services
│  │  └─ api.js
│  ├─ screens
│  │  ├─ PessoaListScreen.js
│  │  ├─ PessoaFormScreen.js
│  │  └─ PessoaDetailScreen.js
│  ├─ components
│  │  └─ PessoaCard.js
│  └─ theme
│     └─ colors.js
└─ package.json
```

Essa organização separa bem as responsabilidades. O arquivo `api.js` concentra a comunicação com a REST API. A pasta `screens` guarda as telas. A pasta `components` recebe partes reutilizáveis, como o cartão de pessoa. A pasta `theme` concentra cores e pequenos padrões visuais.

## Passo 5: configurando a base da API

Crie o arquivo `src/services/api.js` e configure a URL base da API.

```javascript
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://verbose-dollop-x597q5v7w4vq3v6g9-8080.app.github.dev',
  timeout: 10000
})

export default api
```

### Explicação do código

A constante `api` cria uma instância do `axios` já pronta para uso.

`baseURL` recebe a URL pública do Codespace. O valor acima foi extraído do arquivo `pessoa.http`, que já define o endereço público do backend para os testes da API fileciteturn1file10.

`timeout` evita que a aplicação fique esperando por muito tempo em caso de problema de conexão.

Ao usar essa instância, todas as chamadas ficam mais curtas, porque você não precisa repetir a URL completa em cada requisição.

## Passo 6: criando o modelo da pessoa no mobile

Crie o arquivo `src/types/Pessoa.js`.

```javascript
export const PessoaVazia = {
  id: null,
  nome: '',
  idade: ''
}
```

### Explicação do código

Esse objeto serve como estado inicial do formulário.

O campo `id` começa com `null`, porque uma nova pessoa ainda não existe no banco.

`nome` e `idade` começam vazios para o usuário preencher.

Se preferir, esse arquivo pode ser convertido em TypeScript mais tarde. Neste tutorial, usamos JavaScript para ficar mais próximo do template básico do Expo.

## Passo 7: componente reutilizável de cartão

Crie o arquivo `src/components/PessoaCard.js`.

```javascript
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
```

### Explicação do código

O componente `PessoaCard` representa cada registro na listagem.

`TouchableOpacity` permite que o cartão seja tocado.

`pessoa` é recebido por `props` e contém os dados que vieram da API.

`onPressDetalhes` abre a tela de detalhes quando o usuário toca no cartão.

Os ícones `Ionicons` vêm da biblioteca de ícones do Expo e são adequados para criar uma interface moderna e limpa citeturn653606search2.

## Passo 8: criando a tela de listagem

Crie o arquivo `src/screens/PessoaListScreen.js`.

```javascript
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
```

### Explicação do código

`useState` controla a lista, o carregamento e o gesto de atualizar puxando a tela para baixo.

`useFocusEffect` faz a listagem ser recarregada sempre que a tela recebe foco, o que é ótimo depois de criar, editar ou excluir um registro.

`api.get('/api/pessoas')` consome o mesmo estilo de rota exibido no arquivo `pessoa.http` fileciteturn1file10.

`FlatList` é a melhor opção para listas grandes no React Native, porque trabalha com renderização otimizada.

O botão com ícone de `add` leva para a tela de cadastro.

## Passo 9: criando a tela de formulário para cadastro e edição

Crie o arquivo `src/screens/PessoaFormScreen.js`.

```javascript
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
```

### Explicação do código

Essa tela serve tanto para cadastrar quanto para editar.

Quando existe `route.params.id`, o modo é de edição. Quando não existe, o modo é de cadastro.

No modo de edição, a tela busca a pessoa na API com `GET /api/pessoas/{id}`.

Na hora de salvar, o código decide entre `POST /api/pessoas` e `PUT /api/pessoas/{id}`. Esse comportamento segue a lógica de CRUD completa. No arquivo `pessoa.http`, o `POST` e o `GET` já aparecem como referência direta, e o `PUT` foi acrescentado aqui para fechar a operação de atualização fileciteturn1file10.

O `KeyboardAvoidingView` melhora a experiência em celulares quando o teclado aparece.

O `Alert` mostra mensagens simples de validação e erro.

## Passo 10: criando a tela de detalhes com ícones de editar e excluir

Crie o arquivo `src/screens/PessoaDetailScreen.js`.

```javascript
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
```

### Explicação do código

Essa tela abre o detalhe de uma pessoa específica usando o `id` recebido pela navegação.

`api.get('/api/pessoas/${id}')` busca os dados no backend.

O botão editar leva para a tela de formulário já preenchida com os dados da pessoa.

O botão excluir abre uma confirmação antes de executar a remoção.

A exclusão usa `DELETE /api/pessoas/{id}`, que também aparece no arquivo `pessoa.http` como rota de referência da API fileciteturn1file10.

## Passo 11: montando a navegação do aplicativo

Agora crie ou substitua o arquivo `App.js`.

```javascript
import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'

import PessoaListScreen from './src/screens/PessoaListScreen'
import PessoaFormScreen from './src/screens/PessoaFormScreen'
import PessoaDetailScreen from './src/screens/PessoaDetailScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator
          initialRouteName="PessoaList"
          screenOptions={{
            headerStyle: { backgroundColor: '#ffffff' },
            headerTitleStyle: { fontWeight: '700' },
            headerTintColor: '#0f172a',
            contentStyle: { backgroundColor: '#f8fafc' }
          }}
        >
          <Stack.Screen
            name="PessoaList"
            component={PessoaListScreen}
            options={{ title: 'Lista de Pessoas' }}
          />
          <Stack.Screen
            name="PessoaDetail"
            component={PessoaDetailScreen}
            options={{ title: 'Detalhes da Pessoa' }}
          />
          <Stack.Screen
            name="PessoaForm"
            component={PessoaFormScreen}
            options={{ title: 'Cadastro' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}
```

### Explicação do código

`NavigationContainer` é a base da navegação no React Navigation.

`createNativeStackNavigator` cria uma navegação em pilha, ideal para aplicativos com lista, detalhes e formulário.

`initialRouteName` define a primeira tela que o app abre.

`screenOptions` centraliza o estilo do cabeçalho.

`GestureHandlerRootView` ajuda o React Navigation a funcionar corretamente em apps React Native.

## Passo 12: entendendo como o app conversa com a API

A tela de listagem faz `GET /api/pessoas`.

A tela de detalhes faz `GET /api/pessoas/{id}`.

A tela de formulário envia `POST /api/pessoas` para cadastro e `PUT /api/pessoas/{id}` para atualização.

A tela de detalhes também executa `DELETE /api/pessoas/{id}`.

Essas chamadas seguem exatamente o padrão de operação que aparece no arquivo `pessoa.http`, com a adição do `PUT` para fechar o CRUD completo fileciteturn1file10.

## Passo 13: exemplo do arquivo pessoa.http para teste da API

Abaixo está uma versão sugerida do arquivo de testes para a API.

```http
@base_url = https://verbose-dollop-x597q5v7w4vq3v6g9-8080.app.github.dev

### Inserir nova pessoa
POST {{ base_url }}/api/pessoas
Content-Type: application/json

{
  "nome": "Gabriel",
  "idade": 28
}

### Listar todas as pessoas
GET {{ base_url }}/api/pessoas
Accept: application/json

### Buscar pessoa por ID
GET {{ base_url }}/api/pessoas/1
Accept: application/json

### Atualizar pessoa
PUT {{ base_url }}/api/pessoas/1
Content-Type: application/json

{
  "nome": "Gabriel Silva",
  "idade": 29
}

### Remover pessoa
DELETE {{ base_url }}/api/pessoas/1
Accept: */*
```

### Explicação do código

Esse arquivo ajuda a testar a API diretamente no VS Code.

A variável `@base_url` centraliza o endereço do backend e deixa o arquivo mais fácil de manter.

Os blocos separados com `###` representam cada operação do CRUD.

Se a atualização ainda não existir no backend, adicione primeiro o endpoint de edição no Spring Boot.

## Passo 14: deixando a interface limpa e moderna

Para uma aparência moderna, siga estas recomendações:

1. Use fundo claro com cartões brancos e sombras suaves.
2. Use bordas arredondadas nos botões e nos campos.
3. Use cores consistentes, como azul para ações principais, verde para editar e vermelho para excluir.
4. Mantenha bastante espaço interno, sem poluir a tela.
5. Use ícones para reforçar visualmente as ações.

O Expo já oferece suporte prático a ícones e o React Navigation facilita a troca de telas de forma natural em apps móveis citeturn653606search2turn653606search1.

## Passo 15: executando o projeto no Codespaces

Depois de criar os arquivos, execute o projeto:

```bash
npx expo start --tunnel
```

A documentação do Expo informa que o modo `--tunnel` gera um URL público, útil quando o acesso direto à rede local não é possível, como em ambientes remotos e Codespaces citeturn105990search1turn105990search9.

Se estiver usando a versão web do aplicativo no navegador, lembre-se de liberar o backend Spring Boot para aceitar requisições da origem correspondente. Em app nativo, esse cuidado normalmente não é necessário, mas em web pode ser obrigatório dependendo de como o backend foi configurado.

## Passo 16: checklist final do que o aplicativo precisa entregar

Antes de considerar o projeto pronto, confirme se ele atende aos itens abaixo.

1. A listagem carrega os dados da API.
2. O formulário cadastra um novo registro.
3. A tela de detalhes abre pelo ID.
4. O botão editar abre o formulário com dados preenchidos.
5. O botão excluir remove o registro e volta para a lista.
6. O visual está limpo, com boa leitura em telas pequenas.
7. A URL usada pelo app é a mesma que aparece no `pessoa.http`.

## Conclusão

Com essa estrutura, você terá um aplicativo React Native com Expo pronto para consumir um backend Spring Boot via REST, com navegação organizada, telas claras e uso real das operações do CRUD.

O material segue o mesmo espírito do seu arquivo-base em Markdown, mas agora adaptado para a camada mobile e para a comunicação com a API REST do projeto de pessoas fileciteturn1file0turn1file10.
