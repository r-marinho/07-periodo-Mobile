# Fundamentos do React Native

> Material didático para aprender os conceitos básicos e fundamentais do React Native

Este material foi elaborado por um professor experiente em desenvolvimento mobile e produção de conteúdo. Contém explicações, boas práticas e três exemplos práticos que podem ser executados com Expo. Os exemplos foram pensados para rodar com o comando

```
npx create-expo-app meuApp --template blank --sdk-version 54
npx expo start --tunnel
```

# Sumário

1. Introdução
2. Componentes no React Native
3. Props e passagem de dados
4. Estado e o hook useState
5. Organização de arquivos e composição
6. Estilização básica
7. Exemplos práticos
   - Exemplo 1 Hello World
   - Exemplo 2 Componente com props
   - Exemplo 3 Componente com estado useState
8. Dicas, armadilhas comuns e próximos passos

# 1. Introdução

React Native permite criar aplicativos móveis usando JavaScript e JSX. A ideia central e reutilizar componentes que descrevem a interface e o comportamento da sua aplicação. O React Native provê componentes nativos como View, Text, Image e ScrollView que se traduzem em elementos nativos nas plataformas suportadas.

# 2. Componentes no React Native

Componentes sao as unidades de construção da interface. Hoje em dia a forma mais comum de criar componentes e por meio de funcoes, chamadas de componentes funcionais.

Exemplo de componente funcional simples

```jsx
import React from 'react'
import { View, Text } from 'react-native'

export default function MeuComponente() {
  return (
    <View>
      <Text>Exemplo de componente</Text>
    </View>
  )
}
```

Pontos importantes

- Componentes recebem props como parametros
- Componentes podem retornar outros componentes
- Mantenha componentes pequenos e focados em uma unica responsabilidade

# 3. Props e passagem de dados

Props sao propriedades que voce passa para um componente. Elas tornam o componente parametrizavel e reutilizavel.

Passagem de props e destructuring

```jsx
function Saudacao({ name }) {
  return <Text>Olá, {name}!</Text>
}
```

Exemplo de uso

```jsx
<Saudacao name="Maria" />
```

Boas praticas

- Use nomes claros para as props
- Prefira destructuring no parametro quando fizer sentido
- Para props opcionais voce pode usar valores padrao no parametro da funcao

```jsx
function Texto({ children = 'vazio' }) {
  return <Text>{children}</Text>
}
```

# 4. Estado e o hook useState

Estados sao dados que mudam ao longo do tempo e influenciam o que o componente mostra. O hook useState permite adicionar estado a componentes funcionais.

Como usar

```jsx
import React, { useState } from 'react'
import { View, Text, Button } from 'react-native'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <View>
      <Text>Você clicou {count} vezes</Text>
      <Button title="Clique aqui" onPress={() => setCount(count + 1)} />
    </View>
  )
}
```

Regras basicas para hooks

- Use hooks apenas dentro de componentes funcionais ou outros hooks
- Nao chame hooks dentro de condicoes, loops ou blocos que possam alterar a ordem de chamadas
- Sempre chame hooks no topo do componente

# 5. Organizacao de arquivos e composicao

Conforme a aplicacao cresce, separe componentes em arquivos e pastas. Segue uma estrutura recomendada para projetos pequenos

```
/MeuApp
 ├ App.js
 └ components
    ├ HelloWorld.js
    ├ Greeting.js
    └ Counter.js
```

Importe o componente no App.js e faça a composicao das telas. Componentes pequenos e reutilizaveis facilitam testes e manutencao.

# 6. Estilizacao basica

React Native usa objetos JavaScript para estilos. O helper StyleSheet ajuda a organizar os estilos, mas voce pode usar objetos literais.

Exemplo

```jsx
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  text: {
    fontSize: 20,
    margin: 10
  }
})
```

Conceitos importantes

- Flexbox e o principal modo de layout
- justifyContent alinha no eixo principal
- alignItems alinha no eixo cruzado
- Use padding e margin para espacamento

# 7. Exemplos praticos

Os tres exemplos abaixo podem ser copiados para arquivos em components e executados com Expo.

## Exemplo 1 Hello World

Versao no App.js

```jsx
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, World!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
})
```

Versao com componente externo

Arquivo components/HelloWorld.js

```jsx
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default function HelloWorld() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, World!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
})
```

## Exemplo 2 Componente com props

Arquivo components/Greeting.js

```jsx
import React from 'react'
import { Text, StyleSheet } from 'react-native'

export default function Greeting(props) {
  const { name } = props
  return <Text style={styles.greeting}>Olá, {name}!</Text>
}

const styles = StyleSheet.create({
  greeting: {
    fontSize: 18,
    margin: 5
  }
})
```

Uso no App.js

```jsx
import React from 'react'
import { View, StyleSheet } from 'react-native'
import Greeting from './components/Greeting'

export default function App() {
  return (
    <View style={styles.container}>
      <Greeting name="Gabriel" />
      <Greeting name="Miguel" />
      <Greeting name="Rafael" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
})
```

## Exemplo 3 Componente com estado useState

Arquivo components/Counter.js

```jsx
import React, { useState } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>Você clicou {count} vezes</Text>
      <Button title="Clique aqui" onPress={() => setCount(count + 1)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  counter: {
    fontSize: 20,
    marginBottom: 20
  }
})
```

Uso no App.js

```jsx
import React from 'react'
import Counter from './components/Counter'

export default function App() {
  return <Counter />
}
```

# 8. Dicas, armadilhas comuns e proximos passos

- Nao chame hooks condicionalmente, isso quebra o controle interno do React
- Prefira componentes pequenos e testaveis
- Evite repassar objetos literais em props sem memoizacao, para nao causar renders desnecessarios
- Para performance, aprenda sobre useMemo e useCallback
- Considere adotar TypeScript para tipagem de props e do estado
- Explore navegação com React Navigation, consumo de APIs com fetch ou axios, e gerenciamento global de estado com Context ou bibliotecas como Redux ou Zustand

# 9. Como executar os exemplos

1. Crie um projeto com o comando

```
npx create-expo-app meuApp --template blank --sdk-version 54
```

2. Copie a estrutura de pastas e arquivos descrita neste material
3. Execute

```
npx expo start --tunnel
```

4. Abra o Expo Go no seu celular e escaneie o QR code

# Referencias e leitura recomendada

- Documentacao oficial do React Native
- Tutorial do Expo
- React documentation sobre hooks

---

Obrigado por ler este material. Bons estudos e bom desenvolvimento mobile

